import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

export const config = { api: { bodyParser: false } };
const run = promisify(execFile);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const form = formidable({ maxFileSize: 25 * 1024 * 1024, keepExtensions: true });
  const [fields, files] = await form.parse(req);
  const text = String(fields.text?.[0] || "").trim();
  const ref = Array.isArray(files.sample) ? files.sample[0] : files.sample;
  if (!ref?.filepath) return res.status(400).json({ error: "A voice sample is required" });
  if (!text || text.length > 1000) {
    try { fs.unlinkSync(ref.filepath); } catch {}
    return res.status(400).json({ error: "Enter a voice message between 1 and 1,000 characters." });
  }
  const output = path.join("/tmp", `aura-voice-${Date.now()}.wav`);
  try {
    await run("/Users/ben/fanflow-voice-venv/bin/f5-tts_infer-cli", ["--model", "F5TTS_v1_Base", "--ref_audio", ref.filepath, "--ref_text", "", "--gen_text", text, "--output_file", output], { timeout: 180000 });
    res.setHeader("Content-Type", "audio/wav");
    return res.status(200).send(fs.readFileSync(output));
  } catch (error) {
    return res.status(503).json({ error: "Voice preview failed or took too long. Try a shorter message and a clear voice sample." });
  } finally {
    try { fs.unlinkSync(ref.filepath); } catch {}
    try { fs.unlinkSync(output); } catch {}
  }
}
