// Builds AVIF, WebP and JPEG variants of every original in assets/uploads/ into assets/img/,
// and writes _data/images.json (name -> intrinsic size and widths) for _includes/picture.html.
// Stops with a plain message for HEIC files, files over 20 MB, or files carrying GPS data.
// sharp drops all metadata from the outputs. Outputs already built are reused (cache).
import sharp from "sharp";
import exifReader from "exif-reader";
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const SRC = "assets/uploads", OUT = "assets/img", WIDTHS = [640, 1280, 1920], MAX_BYTES = 20 * 1024 * 1024;
const exists = (p) => stat(p).then(() => true, () => false);
const problems = [];
const manifest = {};
await mkdir(OUT, { recursive: true });

for (const file of (await readdir(SRC)).sort()) {
  const full = path.join(SRC, file);
  const ext = path.extname(file).toLowerCase();
  if ([".heic", ".heif"].includes(ext)) { problems.push(`${full}: HEIC isn't supported. Export it as a JPEG and upload that instead.`); continue; }
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;
  const size = (await stat(full)).size;
  if (size > MAX_BYTES) { problems.push(`${full}: ${(size / 1048576).toFixed(1)} MB is over the 20 MB limit. Re-export it smaller and upload that instead.`); continue; }

  const img = sharp(full, { failOn: "none" }).rotate();
  const meta = await sharp(full, { failOn: "none" }).metadata();
  if (meta.exif) {
    let hasGps = false;
    try { hasGps = Boolean(exifReader(meta.exif).GPSInfo); } catch { hasGps = meta.exif.includes("GPS"); }
    if (hasGps) { problems.push(`${full}: this photo carries GPS location data. Remove the location (re-export without it) and upload it again.`); continue; }
  }
  const swap = (meta.orientation ?? 1) >= 5;
  const [w, h] = swap ? [meta.height, meta.width] : [meta.width, meta.height];
  const name = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const widths = WIDTHS.filter((x) => x < w);
  if (!widths.length || w <= WIDTHS.at(-1)) widths.push(w);   // never upscale; include the original width once
  const uniq = [...new Set(widths)].sort((a, b) => a - b);

  for (const x of uniq) {
    for (const [e, fmt, opts] of [["avif", "avif", { quality: 55, effort: 4 }], ["webp", "webp", { quality: 75 }], ["jpg", "jpeg", { quality: 80, mozjpeg: true }]]) {
      const out = path.join(OUT, `${name}-${x}.${e}`);
      if (await exists(out)) continue;
      await img.clone().resize({ width: x, withoutEnlargement: true })[fmt](opts).toFile(out);
    }
  }
  manifest[name] = { w, h, widths: uniq };
}

if (problems.length) {
  console.error("\nPhoto problems, fix these and run again:\n" + problems.map((p) => " - " + p).join("\n") + "\n");
  process.exit(1);
}
await writeFile("_data/images.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`Processed ${Object.keys(manifest).length} photos.`);
