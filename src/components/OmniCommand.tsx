import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AppShell } from "./AuraApp";
import {
  Archive,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  FileImage,
  Filter,
  LockKeyhole,
  Mic,
  Image,
  MessageSquare,
  Plus,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from "lucide-react";

type Mode = "scheduler" | "rotator" | "inbox" | "crm" | "vault" | "financials" | "protection" | "voice" | "image";
const modes: { id: Mode; label: string; icon: typeof CalendarDays }[] = [
  { id: "scheduler", label: "Schedule posts", icon: CalendarDays },
  { id: "rotator", label: "Smart links", icon: SlidersHorizontal },
  { id: "inbox", label: "All messages", icon: MessageSquare },
  { id: "crm", label: "Fans & relationships", icon: Users },
  { id: "vault", label: "Content library", icon: Archive },
  { id: "financials", label: "Earnings tracking", icon: CircleDollarSign },
  { id: "protection", label: "Content protection", icon: ShieldCheck },
  { id: "voice", label: "Voice messages", icon: Mic },
];
const accounts = [
  { initials: "ST", name: "Stacey Thurston", state: "ok" },
  { initials: "MW", name: "Mira Wren", state: "ok" },
  { initials: "SH", name: "Sage Holloway", state: "warn" },
  { initials: "AR", name: "Aura Studio", state: "ok" },
];

function Rail({
  active,
  onPick,
}: {
  active: number;
  onPick: (index: number) => void;
}) {
  return (
    <aside className="omni-rail" aria-label="Creator accounts">
      <Link href="/dashboard" className="omni-rail-logo">
        A
      </Link>
      {accounts.map((account, index) => (
        <button
          key={account.name}
          title={account.name}
          aria-label={`Switch to ${account.name}`}
          className={active === index ? "active" : ""}
          onClick={() => onPick(index)}
        >
          <span>{account.initials}</span>
          <i className={account.state} />
        </button>
      ))}
      <button className="omni-rail-add" aria-label="Add creator">
        <Plus size={16} />
      </button>
    </aside>
  );
}

function Scheduler() {
  const [selected, setSelected] = useState("Tue 16");
  const [queued, setQueued] = useState(8);
  return (
    <div className="omni-work">
      <div className="omni-work-head">
        <div>
          <p className="kicker gold">POSTS</p>
          <h1>Schedule posts</h1>
          <p>Plan one post for each channel.</p>
        </div>
        <button className="gold-button" onClick={() => setQueued((v) => v + 1)}>
          <Plus size={15} /> Add post to plan
        </button>
      </div>
      <div className="scheduler-layout">
        <section className="omni-panel">
          <div className="omni-panel-head">
            <h2>June 2026</h2>
            <div className="omni-tabs">
              <button className="active">Week</button>
              <button>Month</button>
            </div>
          </div>
          <div className="omni-calendar-days">
            {[
              "Mon 15",
              "Tue 16",
              "Wed 17",
              "Thu 18",
              "Fri 19",
              "Sat 20",
              "Sun 21",
            ].map((day) => (
              <button
                className={selected === day ? "active" : ""}
                onClick={() => setSelected(day)}
                key={day}
              >
                {day.split(" ")[0]}
                <strong>{day.split(" ")[1]}</strong>
              </button>
            ))}
          </div>
          <div className="omni-calendar-grid">
            {["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"].map(
              (time, i) => (
                <div key={time}>
                  <span>{time}</span>
                  {i === 1 && (
                    <button className="omni-post reddit">
                      Reddit · teaser
                    </button>
                  )}
                  {i === 3 && (
                    <button className="omni-post x">X · thread</button>
                  )}
                  {i === 5 && (
                    <button className="omni-post premium">
                      Fansly · paid post
                    </button>
                  )}
                </div>
              ),
            )}
          </div>
        </section>
        <aside className="omni-panel omni-compose">
          <p className="kicker gold">{selected}</p>
          <h2>Post setup</h2>
          <div className="omni-dropzone">
            <FileImage size={22} />
            <strong>Add a photo or video</strong>
            <span>Choose a photo or video from your content library</span>
          </div>
          <label>
            Caption
            <textarea
              defaultValue="New set is live tonight. Pick your favourite…"
              rows={4}
            />
          </label>
          <div className="omni-channel-toggles">
            <button className="active">Reddit</button>
            <button className="active">X</button>
            <button>Instagram</button>
            <button className="active">Fansly</button>
          </div>
          <p className="omni-fine">
            {queued} posts currently queued. This preview does not publish
            anywhere.
          </p>
        </aside>
      </div>
    </div>
  );
}

function Rotator() {
  const [of, setOf] = useState(60);
  const fansly = 100 - of;
  return (
    <div className="omni-work">
      <div className="omni-work-head">
        <div>
          <p className="kicker gold">SMART LINKS</p>
          <h1>Smart links</h1>
          <p>Choose where people go and see which links bring new fans.</p>
        </div>
        <button className="gold-button">
          <Plus size={15} /> Create link
        </button>
      </div>
      <div className="omni-split-layout">
        <section className="omni-panel">
          <div className="omni-panel-head">
            <h2>Active links</h2>
            <button className="text-button">Manage all</button>
          </div>
          {[
            ["TikTok Bio 01", "aura.link/stacey", "4,821", "7.8%"],
            ["X Pinned Link", "aura.link/mira-x", "2,104", "9.2%"],
            ["Reddit Profile", "aura.link/sage-r", "1,187", "5.4%"],
          ].map((link) => (
            <div className="omni-link-row" key={link[0]}>
              <div>
                <strong>{link[0]}</strong>
                <span>{link[1]}</span>
              </div>
              <span>{link[2]} clicks</span>
              <b>{link[3]} new fan rate</b>
              <button aria-label={`Edit ${link[0]}`}>
                <ChevronRight size={15} />
              </button>
            </div>
          ))}
        </section>
        <section className="omni-panel">
          <p className="kicker gold">TIKTOK BIO 01</p>
          <h2>Routing rules</h2>
          <div className="omni-route">
            <div>
              <span>OnlyFans</span>
              <strong>{of}%</strong>
            </div>
            <input
              aria-label="OnlyFans traffic weight"
              type="range"
              min="0"
              max="100"
              value={of}
              onChange={(e) => setOf(Number(e.target.value))}
            />
          </div>
          <div className="omni-route">
            <div>
              <span>Fansly</span>
              <strong>{fansly}%</strong>
            </div>
            <div className="omni-progress">
              <i style={{ width: `${fansly}%` }} />
            </div>
          </div>
          <div className="omni-rule-card">
            <Filter size={16} />
            <div>
              <strong>Audience condition</strong>
              <span>US iOS traffic prioritised to OnlyFans</span>
            </div>
            <button>Configure</button>
          </div>
          <div className="omni-rule-card">
            <ShieldCheck size={16} />
            <div>
              <strong>Privacy condition</strong>
              <span>Local geo protection is enabled</span>
            </div>
            <button>Review</button>
          </div>
        </section>
      </div>
    </div>
  );
}

const conversations = [
  {
    name: "@luxe_james",
    source: "OF",
    text: "Can you make something just for me?",
    priority: 98,
  },
  {
    name: "@sophie_w",
    source: "Fansly",
    text: "That last set was perfect…",
    priority: 87,
  },
  {
    name: "@jayden_nz",
    source: "Snap",
    text: "When is the next drop?",
    priority: 71,
  },
];
function Inbox({ creator = "Stacey Thurston" }: { creator?: string }) {
  const [selected, setSelected] = useState(0);
  const [draft, setDraft] = useState("I might have something special planned…");
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("warm and playful");
  const [behaviour, setBehaviour] = useState("natural conversation");
  const [delay, setDelay] = useState("5 minutes");
  const suggestReply = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai/reply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: item.text, creator, tone, behaviour, delay, context: "Creator likes friendly replies, early access offers and custom requests." }) });
      const data = await response.json();
      if (data.reply) setDraft(data.reply);
    } finally { setLoading(false); }
  };
  const item = conversations[selected];
  return (
    <div className="omni-work">
      <div className="omni-work-head compact">
        <div>
          <p className="kicker gold">MESSAGES</p>
          <h1>All messages</h1>
        </div>
        <span className="omni-live">
          <i /> 3 platforms connected
        </span>
      </div>
      <div className="omni-inbox">
        <section className="omni-thread-list">
          <div className="omni-search">
            <Search size={15} />
            <input placeholder="Search conversations" />
          </div>
          {conversations.map((conversation, index) => (
            <button
              className={selected === index ? "active" : ""}
              key={conversation.name}
              onClick={() => setSelected(index)}
            >
              <span className="omni-thread-avatar">
                {conversation.name.slice(1, 3).toUpperCase()}
              </span>
              <div>
                <strong>
                  {conversation.name} <i>{conversation.source}</i>
                </strong>
                <span>{conversation.text}</span>
              </div>
              <b>{conversation.priority}</b>
            </button>
          ))}
        </section>
        <section className="omni-transcript">
          <header>
            <div>
              <p className="kicker gold">
                {item.source} · PRIORITY {item.priority}
              </p>
              <h2>{item.name}</h2>
            </div>
            <button className="text-button">View profile</button>
          </header>
          <div className="omni-messages">
            <p className="from">
              Can you make something just for me?<span>18:04</span>
            </p>
            <p className="to">
              I might have something special planned. What did you have in mind?
              <span>Aura draft · 18:05</span>
            </p>
            <p className="from">
              Something exclusive, I want it first.<span>18:07</span>
            </p>
          </div>
          <div className="omni-reply">
            <div className="reply-settings"><label>Tone<select value={tone} onChange={e => setTone(e.target.value)}><option>warm and playful</option><option>flirty and confident</option><option>calm and personal</option><option>short and direct</option></select></label><label>Behaviour<select value={behaviour} onChange={e => setBehaviour(e.target.value)}><option>natural conversation</option><option>ask a follow-up question</option><option>guide towards a paid post</option><option>keep it friendly, no selling</option></select></label><label>Delay<select value={delay} onChange={e => setDelay(e.target.value)}><option>Reply now</option><option>2 minutes</option><option>5 minutes</option><option>15 minutes</option><option>30 minutes</option></select></label></div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              aria-label="Reply draft"
              rows={3}
            />
            <div>
              <button className="text-button">Save note</button>
              <button className="gold-button" onClick={suggestReply} disabled={loading}>
                <Send size={14} /> {loading ? "Writing…" : "Suggest a reply"}
              </button>
            </div>
          </div>
        </section>
        <aside className="omni-context">
          <p className="kicker gold">FAN CONTEXT</p>
          <h2>{item.name}</h2>
          <div className="omni-context-metric">
                <span>Total spent</span>
            <strong>$2,480</strong>
          </div>
          <div className="omni-context-metric">
            <span>Last purchase</span>
            <strong>$120 · 4 days ago</strong>
          </div>
          <div className="omni-context-metric">
            <span>Interest signals</span>
            <strong>Customs · early access</strong>
          </div>
          <button className="omni-vault-inject">
                <Archive size={15} /> Add content
          </button>
        </aside>
      </div>
    </div>
  );
}

function Crm() {
  const [query, setQuery] = useState("");
  const rows = conversations.filter(
    (c) => c.name.includes(query.toLowerCase()) || !query,
  );
  return (
    <div className="omni-work">
      <div className="omni-work-head">
        <div>
          <p className="kicker gold">FAN RELATIONSHIPS</p>
          <h1>Fans & relationships</h1>
          <p>See who needs a reply and who spends the most.</p>
        </div>
        <button className="gold-button">
          <Plus size={15} /> Add note
        </button>
      </div>
      <section className="omni-panel">
        <div className="omni-panel-head">
          <div className="omni-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fans"
            />
          </div>
          <button className="text-button">
            Filters <Filter size={14} />
          </button>
        </div>
        <div className="omni-crm-table">
          <div className="head">
            <span>Fan</span>
            <span>Source</span>
              <span>Total spent</span>
            <span>Last activity</span>
            <span>Signal</span>
          </div>
          {rows.map((row, i) => (
            <button key={row.name}>
              <span>
                <i>{row.name.slice(1, 3).toUpperCase()}</i>
                {row.name}
              </span>
              <span>{row.source}</span>
              <strong>{["$2,480", "$840", "$322"][i]}</strong>
              <span>{["12 min ago", "42 min ago", "1 hr ago"][i]}</span>
              <b>{["VIP", "Warm", "Watch"][i]}</b>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function VaultView() {
  const [asset, setAsset] = useState(0);
  const assets = [
    "Studio set · 14 photos",
    "Behind the scenes · 3 clips",
    "VIP mirror set · 8 photos",
    "Teaser pack · 6 assets",
  ];
  return (
    <div className="omni-work">
      <div className="omni-work-head">
        <div>
          <p className="kicker gold">CONTENT LIBRARY</p>
          <h1>Content library</h1>
          <p>Keep your photos and videos ready to use.</p>
        </div>
        <button className="gold-button">
            <Plus size={15} /> Add photo or video
        </button>
      </div>
      <div className="omni-vault-layout">
        <section className="omni-asset-grid">
          {assets.map((item, index) => (
            <button
              key={item}
              className={asset === index ? "active" : ""}
              onClick={() => setAsset(index)}
            >
              <span className={`asset-cover a${index}`}>
                <FileImage size={20} />
              </span>
              <strong>{item}</strong>
              <small>{["PPV $18", "PPV $35", "PPV $28", "Promo"][index]}</small>
            </button>
          ))}
        </section>
        <aside className="omni-panel">
          <p className="kicker gold">SELECTED CONTENT</p>
          <h2>{assets[asset]}</h2>
          <div className="omni-asset-preview">
            <FileImage size={34} />
          </div>
          <div className="omni-context-metric">
            <span>Duplicate check</span>
            <strong>
              <Check size={13} /> Clear
            </strong>
          </div>
          <div className="omni-context-metric">
            <span>Watermark</span>
            <strong>Creator ID enabled</strong>
          </div>
          <div className="omni-context-metric">
            <span>Destination fit</span>
            <strong>Fansly · OF · X preview</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Financials() {
  return (
    <div className="omni-work">
      <div className="omni-work-head">
        <div>
          <p className="kicker gold">MONEY</p>
          <h1>Earnings tracking</h1>
          <p>See your numbers clearly. Aura never holds or moves your money.</p>
        </div>
        <button className="gold-button">Export statement</button>
      </div>
      <div className="stat-grid">
        <div className="stat-card">
          <span>Total shown by platforms</span>
          <strong>$58,920</strong>
          <small className="positive">This month</small>
        </div>
        <div className="stat-card">
          <span>Your estimated share</span>
          <strong>$42,680</strong>
          <small className="gold">72.4%</small>
        </div>
        <div className="stat-card">
          <span>Estimated agency share</span>
          <strong>$16,240</strong>
          <small className="gold">27.6%</small>
        </div>
        <div className="stat-card">
          <span>Platform payout status</span>
          <strong>$8,940</strong>
          <small>Friday</small>
        </div>
      </div>
      <div className="aura-notice"><ShieldCheck size={17} /> Aura is read-only here: your creator platforms handle payments. These figures are for tracking and planning only.</div>
      <div className="omni-split-layout">
        <section className="omni-panel">
          <div className="omni-panel-head">
            <h2>Estimated split</h2>
            <span className="gold">June 2026</span>
          </div>
          <div className="omni-donut">
            <div>
              <strong>72.4%</strong>
              <span>Creator net</span>
            </div>
          </div>
          <div className="omni-legend">
            <span>
              <i className="creator" /> Creator $42,680
            </span>
            <span>
              <i className="agency" /> Agency $16,240
            </span>
          </div>
        </section>
        <section className="omni-panel">
          <div className="omni-panel-head">
            <h2>Latest platform payments</h2>
            <button className="text-button">View all</button>
          </div>
          {[
            ["Stacey Thurston", "$4,280", "Friday"],
            ["Mira Wren", "$3,960", "Friday"],
            ["Sage Holloway", "$700", "Pending review"],
          ].map((row) => (
            <div className="omni-link-row" key={row[0]}>
              <div>
                <strong>{row[0]}</strong>
                <span>{row[2]}</span>
              </div>
              <b>{row[1]}</b>
              <button>
                <ChevronRight size={15} />
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function VoiceMessages() {
  const [sample, setSample] = useState(false);
  const [approval, setApproval] = useState(true);
  const [preview, setPreview] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [sampleFile, setSampleFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [generating, setGenerating] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [voiceText, setVoiceText] = useState("Hey lovely, thanks for your message. I’ll put something special together for you.");
  const [recording, setRecording] = useState(false);
  const [prompt, setPrompt] = useState(0);
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const prompts = ["Hi, thanks for being here. I hope you’re having a lovely day.", "Tell me about something you’re excited about this week.", "That sounds amazing — I’d love to hear more about it.", "Thanks for your support. It honestly means a lot to me.", "I’ve got something special planned and I can’t wait to share it with you.", "What kind of content would you like to see next?"];
  const toggleRecording = async () => {
    if (recording && recorder.current) { recorder.current.stop(); return; }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const next = new MediaRecorder(stream); chunks.current = [];
    next.ondataavailable = e => chunks.current.push(e.data);
    next.onstop = () => { stream.getTracks().forEach(track => track.stop()); const file = new File([new Blob(chunks.current, { type: "audio/webm" })], "voice-sample.webm", { type: "audio/webm" }); setSampleFile(file); setRecording(false); setSample(true); };
    recorder.current = next; next.start(); setRecording(true);
  };
  const makePreview = async () => {
    if (!sampleFile || !voiceText.trim()) return;
    setGenerating(true); setVoiceError(""); setPreview(false);
    try {
      const body = new FormData(); body.append("sample", sampleFile); body.append("text", voiceText);
      const response = await fetch("/api/voice/preview", { method: "POST", body });
      if (!response.ok) { const data = await response.json().catch(() => ({})); throw new Error(data.error || "The voice preview could not be created."); }
      const blob = await response.blob(); if (audioUrl) URL.revokeObjectURL(audioUrl); setAudioUrl(URL.createObjectURL(blob)); setPreview(true);
    } catch (error) { setVoiceError(error instanceof Error ? error.message : "Voice preview failed. Please try again."); }
    finally { setGenerating(false); }
  };
  return <div className="omni-work"><div className="omni-work-head"><div><p className="kicker gold">VOICE MESSAGES</p><h1>Sound like yourself</h1><p>Make short voice notes in your own voice, with your approval every time.</p></div><span className="omni-live"><i /> Creator-controlled</span></div><div className="voice-steps"><span className="active">1. Add your sample</span><span className={sample ? "active" : ""}>2. Make a preview</span><span className={preview ? "active" : ""}>3. Listen and approve</span></div><div className="dashboard-grid"><section className="omni-panel"><div className="omni-panel-head"><div><h2>Voice sample</h2><p className="muted">A clear 2–5 minute recording works best.</p></div><span className="gold">Private by default</span></div><label className="voice-upload"><Mic size={22} /><strong>{sample ? "Voice sample added" : "Upload a recording"}</strong><span>{sample ? "Ready to make a preview" : "Choose a file from your computer"}</span><input type="file" accept="audio/*" onChange={e => { const f = e.target.files?.[0] || null; setSampleFile(f); setSample(!!f); }} /></label><button className={`record-button ${recording ? "recording" : ""}`} onClick={toggleRecording}><Mic size={16} /> {recording ? "Stop recording" : "Record my voice instead"}</button>{recording && <div className="recording-prompt"><span>Read this out loud:</span><strong>{prompts[prompt]}</strong><button className="text-button" onClick={() => setPrompt(i => (i + 1) % prompts.length)}>Next prompt</button><small>Keep reading for around two minutes. Speak naturally and take your time.</small></div>}<div className="aura-notice"><ShieldCheck size={17} /> Only use your own voice, or a voice where you have clear permission. Delete it any time.</div></section><section className="omni-panel"><div className="omni-panel-head"><h2>How it can be used</h2></div><div className="aura-toggle-row"><div><strong>Ask me before sending</strong><span>Every voice note waits for your approval.</span></div><button className={approval ? "on" : ""} onClick={() => setApproval(v => !v)}><i /></button></div><div className="aura-toggle-row"><div><strong>Suggested voice notes</strong><span>Show a draft when a fan asks for something personal.</span></div><button className="on"><i /></button></div><div className="aura-toggle-row"><div><strong>Automatic sending</strong><span>Off in this preview. Nothing is sent automatically.</span></div><button><i /></button></div></section></div><section className="omni-panel"><div className="omni-panel-head"><div><h2>Try a preview</h2><p className="muted">Write a short note and listen before using it.</p></div><button className="gold-button" disabled={!sampleFile || !voiceText.trim() || generating} onClick={makePreview}><Mic size={14} /> {generating ? "Making audio…" : preview ? "Preview ready" : "Make voice preview"}</button></div><textarea className="voice-text" rows={3} value={voiceText} maxLength={1000} onChange={e => setVoiceText(e.target.value)} />{voiceError && <div className="aura-notice">{voiceError}</div>}{preview && audioUrl && <div className="voice-preview-card"><audio controls src={audioUrl} /></div>}<p className="omni-fine">Voice preview is generated locally and must be approved before use.</p></section></div>;
}

function ImageStudio() {
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState("");
  const [mode, setMode] = useState("recolour");
  const [colour, setColour] = useState("#ec86b6");
  const [brush, setBrush] = useState(24);
  const [painted, setPainted] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const paint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const el = canvas.current; if (!el || !drawing.current || busy) return;
    const rect = el.getBoundingClientRect(); const ctx = el.getContext("2d"); if (!ctx) return;
    ctx.fillStyle = "white"; ctx.beginPath();
    ctx.arc((event.clientX - rect.left) * el.width / rect.width, (event.clientY - rect.top) * el.height / rect.height, brush * el.width / rect.width / 2, 0, Math.PI * 2); ctx.fill(); setPainted(true);
  };
  const generate = async () => {
    if (!file || busy) return; setBusy(true); setStatus(mode === "recolour" ? "Applying colour…" : "Making a subtle variation on the Mac mini…");
    try {
      const body = new FormData(); body.append("image", file); body.append("mode", mode); body.append("instruction", instruction); body.append("colour", colour);
      if (mode === "recolour") {
        const blob = await new Promise<Blob | null>(resolve => canvas.current?.toBlob(resolve, "image/png"));
        if (!blob) throw new Error("Please paint a selection first."); body.append("mask", blob, "selection.png");
      }
      const response = await fetch("/api/image/fooocus", { method: "POST", body });
      if (!response.ok) { const data = await response.json().catch(() => ({})); throw new Error(data.error || "Could not edit photo"); }
      const url = URL.createObjectURL(await response.blob()); if (result) URL.revokeObjectURL(result); setResult(url); setStatus("Edited photo ready");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Could not edit photo"); } finally { setBusy(false); }
  };
  return <div className="omni-work"><div className="omni-work-head"><div><p className="kicker gold">IMAGE STUDIO</p><h1>Edit your photo</h1><p>Start with your original. Recolour a selected area, or choose a subtle variation.</p></div><span className="omni-live"><i /> Runs on Mac mini</span></div>
    <section className="omni-panel image-studio-panel">
      <label className="voice-upload"><Image size={24} /><strong>{file ? file.name : "Add a photo"}</strong><span>Choose the original photo to edit</span><input disabled={busy} type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0] || null; setFile(f); if (source) URL.revokeObjectURL(source); setSource(f ? URL.createObjectURL(f) : ""); setPainted(false); setStatus(""); setResult(""); const el = canvas.current; el?.getContext("2d")?.clearRect(0,0,el.width,el.height); }} /></label>
      <div className="image-fields"><label>Edit type<select disabled={busy} value={mode} onChange={e => setMode(e.target.value)}><option value="recolour">Change clothing colour</option><option value="variation">Subtle photo variation</option></select></label>
      {mode === "recolour" ? <><label>New colour<input disabled={busy} type="color" value={colour} onChange={e => setColour(e.target.value)} /></label><label>Brush size<input disabled={busy} type="range" min="4" max="80" value={brush} onChange={e => setBrush(Number(e.target.value))} /></label></> : <label>Describe the variation<input disabled={busy} value={instruction} onChange={e => setInstruction(e.target.value)} placeholder="e.g. slightly warmer lighting" /></label>}</div>
      {mode === "recolour" ? <p>Paint only over the clothing you want to recolour. Unpainted areas stay unchanged. Use a small brush around edges.</p> : <p>Uses your uploaded photo with a low variation strength. Small details can change; use clothing colour mode to preserve everything outside your selection.</p>}
      {source && <div style={{position:"relative", width:"fit-content", maxWidth:"100%", margin:"16px auto"}}><img src={source} alt="Original photo" style={{display:"block",maxWidth:"100%",maxHeight:650}} onLoad={e => { const el = canvas.current; if (el) { el.width = e.currentTarget.naturalWidth; el.height = e.currentTarget.naturalHeight; setPainted(false); } }} /><canvas ref={canvas} aria-label="Paint clothing to recolour" style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.45,touchAction:"none",cursor:"crosshair",display:mode === "recolour" ? "block" : "none"}} onPointerDown={e => {drawing.current = true; e.currentTarget.setPointerCapture(e.pointerId); paint(e);}} onPointerMove={paint} onPointerUp={() => {drawing.current = false;}} onPointerCancel={() => {drawing.current = false;}} /></div>}
      {mode === "recolour" && source && <button className="text-button" disabled={busy} onClick={() => { const el = canvas.current; el?.getContext("2d")?.clearRect(0,0,el.width,el.height); setPainted(false); }}>Clear selection</button>}
      <button className="gold-button" disabled={!file || busy || (mode === "recolour" && !painted)} onClick={generate}><Image size={15} /> {busy ? "Editing…" : "Apply edit"}</button>
      {status && <div className="aura-notice" role="status">{status}</div>}{result && <div className="image-result"><img src={result} alt="Edited photo" /><a className="gold-button" href={result} download="aura-edited-photo.png">Download edited photo</a></div>}
      <p className="omni-fine">Your original photo is kept intact. Edits run locally on the Mac mini.</p>
    </section></div>;
}

function Protection() {
  const [review, setReview] = useState(false);
  const [sent, setSent] = useState(false);
  return <div className="omni-work"><div className="omni-work-head"><div><p className="kicker gold">CONTENT PROTECTION</p><h1>Find copied content</h1><p>Review possible copies of your photos and videos before taking action.</p></div><span className="omni-live"><i /> Demo mode</span></div><section className="omni-panel"><div className="omni-panel-head"><div><h2>Possible matches</h2><p className="muted">3 results need your review</p></div><span className="gold">Last check: Today, 10:42am</span></div>{sent && <div className="aura-notice"><ShieldCheck size={17} /> Notice marked ready — nothing was sent in this preview.</div>}<div className="omni-protection-match"><div className="protection-thumb"><FileImage size={28} /></div><div className="protection-copy"><strong>example-host.test/post/4821</strong><span>Visual match · 94% confidence · Found 18 minutes ago</span><small>Screenshot, source link and capture time are attached.</small></div><button className="gold-button" onClick={() => setReview(true)}>Review match</button></div><div className="omni-protection-match"><div className="protection-thumb"><FileImage size={28} /></div><div className="protection-copy"><strong>mirror-site.test/content/991</strong><span>Visual match · 87% confidence · Found 42 minutes ago</span><small>Screenshot and source link are attached.</small></div><button className="text-button" onClick={() => setReview(true)}>Review match</button></div></section>{review && <section className="omni-panel protection-review"><div className="omni-panel-head"><div><p className="kicker gold">REVIEW</p><h2>Check this result</h2></div><button className="text-button" onClick={() => setReview(false)}>Close</button></div><div className="protection-preview"><div className="protection-preview-image"><FileImage size={46} /><span>Preview of the reported post</span></div><div><h3>Does this look like your content?</h3><p className="muted">Compare the preview with your original post. If it is yours, prepare a formal copyright takedown notice.</p><div className="protection-details"><span>Rights holder<strong>{accounts[0].name}</strong></span><span>Evidence<strong>Screenshot + source link</strong></span><span>Website<strong>example-host.test</strong></span></div></div></div><div className="protection-actions"><button className="text-button" onClick={() => setReview(false)}>Not my content</button><button className="gold-button" onClick={() => setSent(true)}><Send size={14} /> Prepare takedown notice</button></div></section>}</div>;
}

export default function OmniCommand() {
  const [mode, setMode] = useState<Mode>("scheduler");
  const [account, setAccount] = useState(0);
  const Current = mode === "inbox" ? () => <Inbox creator={accounts[account].name} /> : {
    scheduler: Scheduler,
    rotator: Rotator,
    inbox: Inbox,
    crm: Crm,
    vault: VaultView,
    financials: Financials,
    protection: Protection,
    voice: VoiceMessages,
    image: ImageStudio,
  }[mode];
  return (
    <AppShell
      active="dashboard"
      title="All-in-one workspace"
      subtitle={`${accounts[account].name} · Posts, messages, links, fans and money in one place`}
    >
      <div className="omni-command">
        <Rail active={account} onPick={setAccount} />
        <nav className="omni-nav">
          <p className="kicker">TOOLS</p>
          {modes.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={mode === item.id ? "active" : ""}
                onClick={() => setMode(item.id)}
                key={item.id}
              >
                <Icon size={17} />
                {item.label}
              </button>
            );
          })}
          <div className="omni-nav-bottom">
            <LockKeyhole size={15} />
            <span>
              Preview only
              <br />
              No live accounts
            </span>
          </div>
        </nav>
        <main className="omni-canvas">
          <Current />
        </main>
      </div>
    </AppShell>
  );
}
