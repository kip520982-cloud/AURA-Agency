import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "node:fs/promises";

export const config = { api: { bodyParser: false } };
const PREFIX = "score_9, score_8_up, score_7_up, source_anime, masterpiece, photorealistic, ultra-detailed skin, 1girl";
const NEGATIVE = "score_4, score_3, ugly, deformed, blurry, bad anatomy, bad hands, mutated, 3d render, cartoon";
const locations: Record<string, string> = { Beach: "sunny beach, natural daylight", "Indoor studio": "indoor studio, soft studio lighting", "Hotel bedroom": "hotel bedroom, warm natural light", "City evening": "city evening, cinematic lights" };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const [fields, files] = await formidable({ maxFileSize: 25 * 1024 * 1024 }).parse(req);
  const source = Array.isArray(files.image) ? files.image[0] : files.image;
  const preset = String(Array.isArray(fields.preset) ? fields.preset[0] : fields.preset || "Beach");
  const instruction = String(Array.isArray(fields.instruction) ? fields.instruction[0] : fields.instruction || "");
  if (!process.env.CIVITAI_API_KEY) return res.status(500).json({ error: "Image service is not configured yet." });
  if (!source?.filepath) return res.status(400).json({ error: "A source photo is required." });
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const storageKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !storageKey) return res.status(500).json({ error: "Image storage is not configured." });
  const objectPath = `${Date.now()}-${source.originalFilename || "source-image"}`.replace(/[^a-zA-Z0-9._-]/g, "_");
  const bytes = await fs.readFile(source.filepath);
  const upload = await fetch(`${supabaseUrl}/storage/v1/object/creator-source-images/${objectPath}`, { method: "POST", headers: { apikey: storageKey, Authorization: `Bearer ${storageKey}`, "Content-Type": source.mimetype || "image/jpeg", "x-upsert": "true" }, body: bytes });
  if (!upload.ok) return res.status(502).json({ error: "The source image could not be uploaded securely." });
  const signed = await fetch(`${supabaseUrl}/storage/v1/object/sign/creator-source-images/${objectPath}`, { method: "POST", headers: { apikey: storageKey, Authorization: `Bearer ${storageKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ expiresIn: 3600 }) });
  const signedData = await signed.json();
  const imageUrl = signedData.signedURL ? `${supabaseUrl}/storage/v1${signedData.signedURL}` : "";
  if (!imageUrl) return res.status(502).json({ error: "A temporary image link could not be created." });
  const image = (await fs.readFile(source.filepath)).toString("base64");
  let identityTags = "natural skin tone, natural hair colour, natural eye colour, matching source lighting";
  try {
    const vision = await fetch("http://127.0.0.1:11434/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.OLLAMA_MODEL || "gemma3:4b", stream: false, messages: [{ role: "user", content: "Describe only the visible identity and lighting details needed to keep this person consistent. Return a short comma-separated list with skin tone, hair colour, eye colour and lighting. Do not identify the person.", images: [image] }] }) });
    if (vision.ok) identityTags = (await vision.json()).message?.content?.replace(/[\n\r]/g, " ").slice(0, 300) || identityTags;
  } catch {}
  const resources = process.env.CIVITAI_IP_ADAPTER_MODEL_ID ? [{ model: `civitai:${process.env.CIVITAI_IP_ADAPTER_MODEL_ID}`, weight: 0.6 }] : [];
  const payload = { baseModel: "Pony", model: "civitai:174687@2937668", params: { prompt: `${PREFIX}, ${identityTags}, ${instruction}, ${locations[preset] || locations.Beach}, creator_identity_trigger`, negativePrompt: NEGATIVE, steps: 22, cfgScale: 6, width: 832, height: 1216, sampler: "Euler a" }, steps: [{ $type: "imageToImage", imageUrl, strength: 0.4 }], resources };
  const response = await fetch("https://civitai.com/api/v2/consumer/recipes/imageGen", { method: "POST", headers: { Authorization: `Bearer ${process.env.CIVITAI_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  if (!response.ok) return res.status(502).json({ error: "Civitai could not start the image job." });
  return res.status(200).json(await response.json());
}
