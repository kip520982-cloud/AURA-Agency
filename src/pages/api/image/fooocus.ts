import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

export const config = { api: { bodyParser: false } };
const run = promisify(execFile);

// Gradio returns update objects; completed images are in the final gallery.
function findImage(value: unknown): string | undefined {
  if (typeof value === "string") {
    return /\.(png|jpe?g|webp)$/i.test(value) && fs.existsSync(value) ? value : undefined;
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      const image = findImage(item);
      if (image) return image;
    }
  } else if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return findImage(record.value) || findImage(record.name) || findImage(record.path);
  }
  return undefined;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const [fields, files] = await formidable({ maxFileSize: 25 * 1024 * 1024 }).parse(req);
  const image = Array.isArray(files.image) ? files.image[0] : files.image;
  const instruction = String(Array.isArray(fields.instruction) ? fields.instruction[0] : fields.instruction || "");
  if (!image?.filepath) return res.status(400).json({ error: "Please add a photo first." });
  const mode = fields.mode?.[0] || "recolour";
  if (!["recolour", "variation"].includes(mode)) return res.status(400).json({ error: "Choose a supported photo edit." });
  if (mode === "recolour") {
    const mask = Array.isArray(files.mask) ? files.mask[0] : files.mask;
    const colour = fields.colour?.[0] || "#ec86b6";
    if (!mask || !/^#[0-9a-f]{6}$/i.test(colour)) return res.status(400).json({ error: "Paint over the clothing and choose a colour first." });
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "aura-recolour-"));
    const destination = path.join(directory, "edited.png");
    try {
      await run("/Users/ben/Fooocus/.venv/bin/python", [path.join(process.cwd(), "scripts/recolour.py"), image.filepath, mask.filepath, colour, destination], { timeout: 60000 });
      res.setHeader("Content-Type", "image/png");
      return res.status(200).send(fs.readFileSync(destination));
    } catch {
      return res.status(422).json({ error: "Could not apply the colour. Check your photo and paint a selection first." });
    } finally { fs.rmSync(directory, { recursive: true, force: true }); }
  }
  try {
    const { stdout } = await run("/Users/ben/Fooocus/.venv/bin/python", ["/Users/ben/Fooocus/aura_img2img.py", image.filepath, instruction], { timeout: 3600000 });
    const values = JSON.parse(stdout.trim());
    const output = findImage(values?.[3]) || findImage(values?.[2]);
    if (!output || !fs.existsSync(output)) return res.status(502).json({ error: "Fooocus did not return an image." });
    res.setHeader("Content-Type", "image/png");
    return res.status(200).send(fs.readFileSync(output));
  } catch (error) {
    const failure = error as { killed?: boolean; code?: string | number };
    const timedOut = failure.killed === true;
    console.error("Aura variation failed", { timedOut, code: failure.code });
    return res.status(timedOut ? 504 : 502).json({ error: timedOut
      ? "Aura stopped waiting after one hour. Fooocus may still be processing this photo; do not submit a duplicate variation."
      : "The photo variation failed to return. Fooocus may still be processing; check its status before trying again." });
  }
}
