"""Talk to onara-queen in Telegram. Voice notes or text in → text out by default.

One process. No LiveKit. No Gradio.

  TELEGRAM_BOT_TOKEN=... uv run python onara_telegram_bot.py

Text replies are the default. Voice notes and pictures are opt-in when the user
explicitly asks in that chat (e.g. "voice note", "send me a pic of that").
Pics go through local Forge at FORGE_BASE using the locked settings from the
successful reference gen `00000-700452866` (reaxl_v20_SDXL, GPU weights 2482 MB).
"""

from __future__ import annotations

import base64
import io
import os
import re
import time
from pathlib import Path

import httpx
from dotenv import load_dotenv

load_dotenv(Path.home() / ".env")
load_dotenv(Path(__file__).resolve().parent / ".env", override=True)

TOKEN = (os.getenv("TELEGRAM_BOT_TOKEN") or "").strip()
OLLAMA_BASE = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434/v1")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "onara-queen:latest")
DEEPGRAM_KEY = (os.getenv("DEEPGRAM_API_KEY") or "").strip()
FISH_KEY = (
    os.getenv("FISH_API_KEY") or os.getenv("FISH_AUDIO_API_KEY") or ""
).strip()
FISH_VOICE = os.getenv(
    "ONARA_FISH_VOICE", "8076d03f2ead4af2a99cc18a451000d1"
)
FORGE_BASE = (os.getenv("FORGE_BASE_URL") or "http://127.0.0.1:7865").rstrip("/")
# Locked to reference output 00000-700452866 (png info / UserComment).
FORGE_MODEL = os.getenv("FORGE_MODEL", "reaxl_v20_SDXL")
FORGE_TOTAL_VRAM_MB = 24576  # 2482 + 22094 from their GPU Setting line
# GPU Weights (MB) — 10.10% / 2482 MB weights, 89.90% / 22094 MB inference.
FORGE_GPU_WEIGHT_MB = int(os.getenv("FORGE_GPU_WEIGHT_MB", "2482"))
FORGE_INFERENCE_MEMORY_MB = FORGE_TOTAL_VRAM_MB - FORGE_GPU_WEIGHT_MB  # 22094
FORGE_STEPS = 16
FORGE_CFG = 5.0
FORGE_WIDTH = 1024
FORGE_HEIGHT = 576
FORGE_SAMPLER = "DPM++ 2M SDE"
FORGE_SCHEDULER = "Karras"
# Fresh random seed each generation (do not pin 700452866).
FORGE_SEED = int(os.getenv("FORGE_SEED", "-1"))
API = f"https://api.telegram.org/bot{TOKEN}"

SYSTEM = """You are texting Ben on Telegram. You are the onara-queen — kinky, uncensored, into onara/fart play and dirty talk.

Output ONLY words Ben should read (or hear if he asks for a voice note).
- Usually 1–3 full sentences. Warm, teasing, explicit when it fits.
- Never one-word replies. No asterisks, brackets, stage directions, or narration.
- Moans as mmm, sighs as ahh, farts as pffft.
- Never mention AI, bots, models, Forge, SDXL, or limitations.
- Do not offer to send voice notes or pictures unless he asked. Text is the default.
- If he asks for a pic/photo of “that” / what you just described, keep answering in character; the app will generate the image from your recent description. Still reply with a short teasing line, not a prompt dump."""

_STAGE_RE = re.compile(
    r"\*[^*]+\*|\{[^}]+\}|\[[^\]]+\]|"
    r"^(?:action|narration|stage|ooc)\s*:.*$",
    re.IGNORECASE | re.MULTILINE,
)

_VOICE_ASK_RE = re.compile(
    r"(?i)\b("
    r"voice\s*notes?|send\s+(?:a\s+)?voice|voice\s+messag(?:e|es)|"
    r"read\s+(?:this|it|that)\s+out|read\s+(?:it|that|this)\s+(?:to\s+me|aloud)|"
    r"speak\s+(?:it|that|this)|say\s+(?:it|that)\s+(?:out\s+loud|aloud)|"
    r"tts|audio\s+reply|voice\s+reply"
    r")\b"
)

_PIC_ASK_RE = re.compile(
    r"(?i)\b("
    r"(?:send|show|give|snap|drop|make|generate|draw|render)\s+"
    r"(?:me\s+)?(?:a\s+|an\s+|some\s+)?(?:pic(?:ture)?s?|photos?|images?|shots?)|"
    r"(?:pic(?:ture)?s?|photos?|images?)\s+of|"
    r"selfie|nudes?"
    r")\b"
)

_PIC_OF_RE = re.compile(
    r"(?i)(?:pic(?:ture)?|photo|image|shot|selfie)\s+of\s+(.+?)(?="
    r"\s+(?:and\s+)?(?:send|show|give|also|voice|read)\b|[.!?]|$)"
)
_DEIXIS_RE = re.compile(
    r"(?i)^(that|this|it|her|him|you|yourself|the\s+above|what\s+you\s+(?:just\s+)?(?:said|described))$"
)

# chat_id -> message history
_chats: dict[int, list[dict[str, str]]] = {}


def _spoken(text: str) -> str:
    cleaned = _STAGE_RE.sub(" ", text)
    cleaned = re.sub(r"[*_`#~>]+", "", cleaned)
    cleaned = re.sub(r"\s{2,}", " ", cleaned).strip()
    parts = [p.strip() for p in re.split(r"(?<=[.!?])\s+", cleaned) if p.strip()]
    return " ".join(parts[:3]) if parts else cleaned


def wants_voice(text: str) -> bool:
    return bool(_VOICE_ASK_RE.search(text or ""))


def wants_picture(text: str) -> bool:
    return bool(_PIC_ASK_RE.search(text or ""))


def _last_assistant_blurb(chat_id: int) -> str:
    hist = _chats.get(chat_id) or []
    for msg in reversed(hist):
        if msg.get("role") == "assistant":
            content = (msg.get("content") or "").strip()
            if content:
                return content
    return ""


def build_forge_prompt(
    user_text: str, reply: str, prior_description: str = ""
) -> str:
    """SDXL prompt from conversational context — her last description / the thing
    she was talking about — not a separate full prompt from the user.

    `prior_description` must be captured BEFORE the current LLM turn is appended
    to history, so “pic of that” uses what she already said.
    """
    explicit = ""
    for m in _PIC_OF_RE.finditer(user_text or ""):
        candidate = m.group(1).strip(" .!?,;:\"'")
        # Ignore pure deixis like "that" / "this" — those mean use chat context.
        if not candidate or _DEIXIS_RE.fullmatch(candidate):
            continue
        explicit = candidate
        break

    # If the user named a real subject ("pic of your …"), that leads.
    # Pure deixis ("pic of that") falls back to her prior description.
    if explicit:
        pieces = [explicit, prior_description, reply]
    else:
        pieces = [prior_description, reply]
    seen: set[str] = set()
    ordered: list[str] = []
    for p in pieces:
        if not p:
            continue
        key = p.lower()
        if key in seen:
            continue
        seen.add(key)
        ordered.append(p)
    base = " ".join(ordered[:2]).strip() or reply or user_text
    # Keep it short-ish for SDXL; low-res run, no LoRAs.
    base = re.sub(r"\s+", " ", base).strip()
    if len(base) > 500:
        base = base[:500].rsplit(" ", 1)[0]
    return (
        f"{base}, photorealistic, natural lighting, detailed skin, "
        f"solo woman, intimate candid photo"
    )


def tg(method: str, **params):
    with httpx.Client(timeout=60.0) as c:
        r = c.post(f"{API}/{method}", json=params)
        r.raise_for_status()
        data = r.json()
        if not data.get("ok"):
            raise RuntimeError(data)
        return data["result"]


def tg_file(method: str, files: dict, data: dict):
    with httpx.Client(timeout=120.0) as c:
        r = c.post(f"{API}/{method}", data=data, files=files)
        r.raise_for_status()
        body = r.json()
        if not body.get("ok"):
            raise RuntimeError(body)
        return body["result"]


def download_file(file_id: str) -> bytes:
    meta = tg("getFile", file_id=file_id)
    path = meta["file_path"]
    url = f"https://api.telegram.org/file/bot{TOKEN}/{path}"
    with httpx.Client(timeout=120.0) as c:
        r = c.get(url)
        r.raise_for_status()
        return r.content


def stt_bytes(audio: bytes, filename: str = "voice.ogg") -> str:
    if not DEEPGRAM_KEY:
        return ""
    with httpx.Client(timeout=60.0) as c:
        r = c.post(
            "https://api.deepgram.com/v1/listen?model=nova-3&language=en&smart_format=true",
            headers={
                "Authorization": f"Token {DEEPGRAM_KEY}",
                "Content-Type": "application/octet-stream",
            },
            content=audio,
        )
        r.raise_for_status()
        alt = r.json()["results"]["channels"][0]["alternatives"][0]
        return (alt.get("transcript") or "").strip()


def llm(chat_id: int, user_text: str) -> str:
    hist = _chats.setdefault(chat_id, [{"role": "system", "content": SYSTEM}])
    hist.append({"role": "user", "content": user_text})
    msgs = [hist[0]] + hist[1:][-16:]
    with httpx.Client(timeout=120.0) as c:
        r = c.post(
            f"{OLLAMA_BASE.rstrip('/')}/chat/completions",
            json={
                "model": OLLAMA_MODEL,
                "messages": msgs,
                "temperature": 0.85,
                "max_tokens": 140,
            },
        )
        r.raise_for_status()
        text = r.json()["choices"][0]["message"]["content"]
    spoken = _spoken(text)
    hist.append({"role": "assistant", "content": spoken})
    return spoken


def fish_tts(text: str) -> bytes | None:
    if not FISH_KEY:
        return None
    with httpx.Client(timeout=60.0) as c:
        r = c.post(
            "https://api.fish.audio/v1/tts",
            headers={
                "Authorization": f"Bearer {FISH_KEY}",
                "Content-Type": "application/json",
                "model": "s2.1-pro-free",
            },
            json={
                "text": text,
                "reference_id": FISH_VOICE,
                # Opus-in-OGG = native Telegram voice-note bubble.
                "format": "opus",
            },
        )
        if r.status_code != 200 or len(r.content) < 100:
            print(f"Fish TTS {r.status_code}: {r.text[:200]}", flush=True)
            return None
        return r.content


def forge_ensure_settings() -> None:
    """Pin model + GPU split from reference gen (2482 MB weights / 22094 MB compute)."""
    payload = {
        "sd_model_checkpoint": FORGE_MODEL,
        "forge_preset": "xl",
        "xl_GPU_MB": FORGE_GPU_WEIGHT_MB,
        "forge_inference_memory": FORGE_INFERENCE_MEMORY_MB,
        "xl_t2i_sampler": FORGE_SAMPLER,
        "xl_t2i_scheduler": FORGE_SCHEDULER,
        "xl_t2i_cfg": FORGE_CFG,
        "xl_t2i_width": FORGE_WIDTH,
        "xl_t2i_height": FORGE_HEIGHT,
    }
    with httpx.Client(timeout=60.0) as c:
        r = c.post(f"{FORGE_BASE}/sdapi/v1/options", json=payload)
        r.raise_for_status()


def forge_reachable() -> bool:
    try:
        with httpx.Client(timeout=5.0) as c:
            r = c.get(f"{FORGE_BASE}/sdapi/v1/sd-models")
            return r.status_code == 200
    except Exception as e:
        print(f"Forge unreachable at {FORGE_BASE}: {e}", flush=True)
        return False


def forge_txt2img(prompt: str) -> bytes | None:
    """Generate via Forge with locked reference settings. No LoRAs. Fresh seed each time."""
    try:
        forge_ensure_settings()
    except Exception as e:
        print(f"Forge options failed: {e}", flush=True)
    body = {
        "prompt": prompt,
        "negative_prompt": (
            "blurry, low quality, deformed, watermark, text, logo, "
            "extra limbs, bad anatomy, cartoon, anime"
        ),
        "steps": FORGE_STEPS,
        "cfg_scale": FORGE_CFG,
        "width": FORGE_WIDTH,
        "height": FORGE_HEIGHT,
        "seed": FORGE_SEED,  # -1 = new random seed each gen
        "batch_size": 1,
        "n_iter": 1,
        "sampler_name": FORGE_SAMPLER,
        "scheduler": FORGE_SCHEDULER,
        # No LoRAs / always-on extras.
        "script_name": None,
        "script_args": [],
        "alwayson_scripts": {},
        "override_settings": {
            "sd_model_checkpoint": FORGE_MODEL,
            "forge_preset": "xl",
            "xl_GPU_MB": FORGE_GPU_WEIGHT_MB,
            "forge_inference_memory": FORGE_INFERENCE_MEMORY_MB,
        },
        # Keep the pinned GPU split after the call (do not snap back to a heavier load).
        "override_settings_restore_afterwards": False,
    }
    try:
        with httpx.Client(timeout=300.0) as c:
            r = c.post(f"{FORGE_BASE}/sdapi/v1/txt2img", json=body)
            if r.status_code != 200:
                print(f"Forge txt2img {r.status_code}: {r.text[:300]}", flush=True)
                return None
            data = r.json()
            images = data.get("images") or []
            if not images:
                print("Forge txt2img returned no images", flush=True)
                return None
            raw = images[0]
            # Gradio sometimes prefixes data URL metadata.
            if "," in raw[:64]:
                raw = raw.split(",", 1)[1]
            return base64.b64decode(raw)
    except Exception as e:
        print(f"Forge txt2img error: {e}", flush=True)
        return None


def handle_update(upd: dict) -> None:
    msg = upd.get("message") or upd.get("edited_message")
    if not msg:
        return
    chat_id = msg["chat"]["id"]
    text = (msg.get("text") or msg.get("caption") or "").strip()

    if text in {"/start", "/help"}:
        tg(
            "sendMessage",
            chat_id=chat_id,
            text=(
                "Hey. Send a voice note or type — I'm here.\n"
                "Text by default. Say “voice note” if you want audio, "
                "or “send me a pic of that” for a picture of what I just described."
            ),
        )
        return
    if text == "/clear":
        _chats.pop(chat_id, None)
        tg("sendMessage", chat_id=chat_id, text="Memory wiped. Fresh start.")
        return

    user_text = text
    if msg.get("voice") or msg.get("audio"):
        media = msg.get("voice") or msg.get("audio")
        tg("sendChatAction", chat_id=chat_id, action="typing")
        raw = download_file(media["file_id"])
        user_text = stt_bytes(raw)
        if not user_text:
            tg(
                "sendMessage",
                chat_id=chat_id,
                text="Couldn't catch that — try again or type it.",
            )
            return

    if not user_text:
        return

    want_voice = wants_voice(user_text)
    want_pic = wants_picture(user_text)
    # Capture before llm() so “pic of that” uses her previous description.
    prior_description = _last_assistant_blurb(chat_id) if want_pic else ""

    print(
        f"[{chat_id}] YOU: {user_text}  "
        f"(voice={want_voice} pic={want_pic})",
        flush=True,
    )
    tg("sendChatAction", chat_id=chat_id, action="typing")
    reply = llm(chat_id, user_text)
    print(f"[{chat_id}] HER: {reply}", flush=True)

    # Pictures only when explicitly asked; prompt from chat context / last description.
    if want_pic:
        tg("sendChatAction", chat_id=chat_id, action="upload_photo")
        prompt = build_forge_prompt(user_text, reply, prior_description)
        print(f"[{chat_id}] FORGE prompt: {prompt[:200]}", flush=True)
        img = forge_txt2img(prompt)
        if img:
            try:
                tg_file(
                    "sendPhoto",
                    files={"photo": ("onara.png", io.BytesIO(img), "image/png")},
                    data={"chat_id": str(chat_id), "caption": reply[:1024]},
                )
            except Exception as e:
                print(f"sendPhoto failed: {e}", flush=True)
                tg("sendMessage", chat_id=chat_id, text=reply)
                tg(
                    "sendMessage",
                    chat_id=chat_id,
                    text="Couldn't attach the pic — Forge hiccup. Text still stands.",
                )
        else:
            tg("sendMessage", chat_id=chat_id, text=reply)
            tg(
                "sendMessage",
                chat_id=chat_id,
                text="Forge didn't spit out a pic just now — try asking again in a sec.",
            )
        # If they also asked for voice, still send it below; otherwise done after pic+caption.
        if not want_voice:
            return

    # Voice only when explicitly asked; otherwise plain text.
    if want_voice:
        audio = fish_tts(reply)
        if audio:
            tg("sendChatAction", chat_id=chat_id, action="record_voice")
            try:
                tg_file(
                    "sendVoice",
                    files={"voice": ("reply.ogg", io.BytesIO(audio), "audio/ogg")},
                    data={"chat_id": str(chat_id), "caption": reply[:1024]},
                )
                return
            except Exception as e:
                print(f"sendVoice failed: {e}", flush=True)
        # Fall through to text if TTS/send failed.
        if not want_pic:
            tg("sendMessage", chat_id=chat_id, text=reply)
        return

    if not want_pic:
        tg("sendMessage", chat_id=chat_id, text=reply)


def main() -> None:
    if not TOKEN:
        raise SystemExit(
            "TELEGRAM_BOT_TOKEN missing. Create a bot with @BotFather and put the token in .env"
        )
    me = tg("getMe")
    print(f"bot @{me.get('username')} online — talk to her in Telegram", flush=True)
    if forge_reachable():
        try:
            forge_ensure_settings()
            print(
                f"Forge ok at {FORGE_BASE} — model={FORGE_MODEL} "
                f"gpu_weights={FORGE_GPU_WEIGHT_MB}MB "
                f"inference={FORGE_INFERENCE_MEMORY_MB}MB "
                f"{FORGE_WIDTH}x{FORGE_HEIGHT} steps={FORGE_STEPS} "
                f"cfg={FORGE_CFG} sampler={FORGE_SAMPLER} sched={FORGE_SCHEDULER}",
                flush=True,
            )
        except Exception as e:
            print(f"Forge reachable but options pin failed: {e}", flush=True)
    else:
        print(
            f"Forge NOT reachable at {FORGE_BASE} — pics will fail until it is up",
            flush=True,
        )
    # Do NOT call getUpdates(offset=-1) — that discards pending messages.
    offset = 0
    while True:
        try:
            # Long-poll; httpx timeout must exceed Telegram's timeout.
            with httpx.Client(timeout=70.0) as c:
                r = c.post(
                    f"{API}/getUpdates",
                    json={"offset": offset, "timeout": 50},
                )
                r.raise_for_status()
                data = r.json()
                if not data.get("ok"):
                    raise RuntimeError(data)
                updates = data["result"]
            for upd in updates:
                offset = max(offset, upd["update_id"] + 1)
                try:
                    handle_update(upd)
                except Exception as e:
                    import traceback

                    print(f"handler error: {e}", flush=True)
                    traceback.print_exc()
                    try:
                        msg = upd.get("message") or {}
                        chat_id = (msg.get("chat") or {}).get("id")
                        if chat_id:
                            tg(
                                "sendMessage",
                                chat_id=chat_id,
                                text="Hold on — say that again?",
                            )
                    except Exception:
                        pass
        except Exception as e:
            msg = str(e)
            if TOKEN and TOKEN in msg:
                msg = msg.replace(TOKEN, "***")
            print(f"poll error: {msg}", flush=True)
            time.sleep(2)


if __name__ == "__main__":
    main()
