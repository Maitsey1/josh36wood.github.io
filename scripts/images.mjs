// Generates AVIF/WebP/JPEG variants of every photo in assets/uploads/ into assets/img/,
// plus _data/images.json (name -> {w, h, widths}) that _includes/picture.html reads.
import sharp from "sharp";
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const SRC = "assets/uploads", OUT = "assets/img", WIDTHS = [480, 960, 1600];
const force = process.argv.includes("--force");
await mkdir(OUT, { recursive: true });
const manifest = {};
const exists = (p) => stat(p).then(() => true, () => false);

for (const file of (await readdir(SRC)).sort()) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const name = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const img = sharp(path.join(SRC, file), { failOn: "none" }).rotate();
  const { width, height } = await img.metadata().then(async () => sharp(await img.clone().toBuffer()).metadata());
  const widths = WIDTHS.filter((w) => w < width);
  if (!widths.includes(width) && width <= WIDTHS.at(-1)) widths.push(width);
  if (!widths.length) widths.push(width);
  for (const w of widths) {
    for (const [ext, fmt, opts] of [["avif", "avif", { quality: 55, effort: 4 }], ["webp", "webp", { quality: 75 }], ["jpg", "jpeg", { quality: 80, mozjpeg: true }]]) {
      const out = path.join(OUT, `${name}-${w}.${ext}`);
      if (!force && (await exists(out))) continue;
      await img.clone().resize({ width: w, withoutEnlargement: true })[fmt](opts).toFile(out);
    }
  }
  manifest[name] = { w: width, h: height, widths };
  console.log(`${file} -> ${name} [${widths.join(", ")}]`);
}
await writeFile("_data/images.json", JSON.stringify(manifest, null, 2) + "\n");
