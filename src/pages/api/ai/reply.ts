import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = { reply: string; provider: string; demo?: boolean } | { error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const message = String(req.body?.message || "").trim();
  if (!message) return res.status(400).json({ error: "Message is required" });

  const creator = String(req.body?.creator || "the creator");
  const tone = String(req.body?.tone || "warm and playful");
  const behaviour = String(req.body?.behaviour || "natural conversation");
  const context = String(req.body?.context || "");
  const system = `Write one short reply for ${creator}. Use natural New Zealand English and light Kiwi wording where it fits (for example, lovely, keen, reckon), but do not force slang. Tone: ${tone}. Behaviour: ${behaviour}. Keep it under 30 words, do not use quotation marks, do not mention AI, and do not make promises. ${context ? `Creator context: ${context}` : ""}`;
  if (process.env.GROK_API_KEY) {
    const response = await fetch("https://api.x.ai/v1/chat/completions", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.GROK_API_KEY}` }, body: JSON.stringify({ model: process.env.GROK_MODEL || "grok-3-mini", messages: [{ role: "system", content: system }, { role: "user", content: message }], temperature: 0.7, max_tokens: 80 }) });
    if (response.ok) {
      const data = await response.json();
      return res.status(200).json({ reply: data.choices?.[0]?.message?.content?.trim() || "Thanks for your message — I’ll get back to you shortly.", provider: "Grok" });
    }
  }
  if (process.env.USE_LOCAL_AI === "true") {
    const response = await fetch("http://127.0.0.1:11434/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.OLLAMA_MODEL || "gemma3:4b", stream: false, messages: [{ role: "system", content: system }, { role: "user", content: message }] }) });
    if (!response.ok) return res.status(502).json({ error: "Local AI request failed" });
    const data = await response.json();
    return res.status(200).json({ reply: data.message?.content?.trim() || "Thanks for your message — I’ll get back to you shortly.", provider: "Ollama" });
  }
  if (process.env.GEMINI_API_KEY) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL || "gemini-2.5-flash-lite"}:generateContent?key=${process.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: "user", parts: [{ text: message }] }] }) });
    if (!response.ok) return res.status(502).json({ error: "AI provider request failed" });
    const data = await response.json();
    return res.status(200).json({ reply: data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Thanks for your message — I’ll get back to you shortly.", provider: "Gemini" });
  }
  return res.status(200).json({ reply: "Thanks for your message — I’ll get back to you shortly.", provider: "Demo", demo: true });
}
