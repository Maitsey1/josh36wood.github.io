// Checks the built site (_site/) against the brief. Run after `jekyll build`.
// Looks at visible text, not URLs. Messages are written for Maite, in plain words.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";

const rules = yaml.load(await readFile("_data/copy_rules.yml", "utf8"));
const SITE = "_site";
const problems = [];

async function* pages(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!["assets", "slides"].includes(e.name)) yield* pages(p); }
    else if (e.name.endsWith(".html")) yield p;
  }
}

const decode = (s) => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&rsquo;|&#8217;/g, "’");
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

for await (const file of pages(SITE)) {
  const url = "/" + path.relative(SITE, file).replace(/index\.html$/, "");
  // Old pages that are being replaced by redirects are checked once they're gone.
  if (/^\/(deck|deck_es|deck_pt|partner|request-deck|gallery|legacy-home)(\.html|\/)?$/.test(url)) continue;
  const html = await readFile(file, "utf8");
  const body = (html.match(/<body[\s\S]*<\/body>/i)?.[0] ?? html)
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, " ");
  const text = decode(body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
  const say = (msg) => problems.push(`${url}: ${msg}`);

  for (const m of text.matchAll(/\[[^\]]{2,}\]/g)) say(`unfilled placeholder "${m[0].slice(0, 60)}". Fill it in or leave the field empty.`);
  for (const m of text.matchAll(/(?:[€$£]\s?\d[\d.,]*|\b\d[\d.,]*\s?(?:€|EUR|USD|GBP)\b)/g)) say(`a price or amount ("${m[0]}"). The site never shows money figures.`);
  for (const phrase of rules.retired_phrases) {
    if (new RegExp(`(?<![\\w])${esc(phrase)}(?![\\w])`, "i").test(text)) say(`the retired phrase "${phrase}". Reword it.`);
  }
  for (const m of text.matchAll(/!/g)) { say("an exclamation mark. The site doesn't use them."); break; }
  for (const m of body.matchAll(/<img\b[^>]*>/gi)) {
    const alt = m[0].match(/\balt\s*=\s*("([^"]*)"|'([^']*)')/i);
    if (!alt) say(`an image has no alt text (${(m[0].match(/src="([^"]+)"/) || [])[1] ?? "unknown file"}). Add a description.`);
    else if (!(alt[2] ?? alt[3]).trim()) say(`an image has empty alt text (${(m[0].match(/src="([^"]+)"/) || [])[1] ?? "unknown file"}). Add a description.`);
  }
  for (const m of html.matchAll(/href\s*=\s*"([^"]+)"/gi)) {
    if (rules.donation_hosts.some((h) => new RegExp(`//([\\w-]+\\.)*${esc(h)}`, "i").test(m[1]))) say(`a link to a donation or crowdfunding site (${m[1]}). Remove it.`);
  }
}

if (problems.length) {
  console.error(`\nContent check found ${problems.length} problem${problems.length > 1 ? "s" : ""}:\n` + problems.map((p) => " - " + p).join("\n") + "\n");
  process.exit(1);
}
console.log("Content check passed.");
