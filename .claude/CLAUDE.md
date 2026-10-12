# josh36wood.com — build brief for Claude Code

Read this file in full before any change. It is the single source of truth for the rebuild. If a mock-up, an old page in this repo, or an older brief disagrees with this file, this file wins. Last reconciled: 12 October 2026.

## Who you are working with
- Campaign manager: **Maite**. Rider: **Josh** (public name Josh Wood, never Joshua on the site).
- Maite edits only through the GitHub web editor. She has no local environment. Everything must build and deploy from GitHub alone.
- Explain the plan step by step and wait for Maite's go-ahead before making changes. One focused question at a time.
- Build one page per branch and pull request. Maite reviews and merges. Never push directly to `main`.

## Stack
- Jekyll on GitHub Pages, built and deployed by GitHub Actions from `main`. Custom domain via `CNAME` (keep it).
- Plugins: only those GitHub Pages supports (`jekyll-redirect-from`, `jekyll-seo-tag`, `jekyll-sitemap`).
- No build tools, frameworks or npm. Plain HTML, one shared CSS file, minimal vanilla JS.
- Fonts from Google Fonts only: Archivo (`wdth,wght@62..125,100..900`) and Newsreader italic (`ital,opsz,wght@1,6..72,300..600`).
- Google Analytics ID: `G-56M0RX694E`. It loads only after the visitor presses Accept on the cookie banner (`assets/js/consent.js`); never add a `gtag` tag directly to a layout or page. Formspree form ID `xeenoqyo` if a contact form is used.

## Target structure
```
_config.yml
_layouts/default.html      # shared head, header, nav, footer
_layouts/article.html      # Journey article: dark hero + editorial Q&A
_includes/nav.html
_includes/footer.html
_includes/consent.html       # cookie banner
assets/css/site.css        # tokens + components, one file
assets/js/consent.js       # loads Google Analytics only after Accept
assets/img/                # optimised images, organised by page
index.html                 # homepage
story/index.html
athlete/index.html
journey/before-the-grid/index.html
journey/walking-the-track/index.html
journey/red-bull-selection-event/index.html
media/index.html           # media kit
work-with-josh/index.html  # Partner with Josh
privacy/index.html         # Privacy, linked from the footer on every page
```
Page content lives in the page files as plain HTML so Maite can find and edit text in the web editor. Do not move copy into data files or front matter beyond titles and descriptions.

## Navigation (every page)
Story / Athlete / Journey / Media / Work with Josh.
- Journey links to `/#journey` (the homepage Journey section with the three articles).
- Media links to `/media/`. Work with Josh links to `/work-with-josh/`.
- There is no Partners page and no Racing page. Partners appear only as the homepage Partners section and "Already on board" on Work with Josh.
- Articles use the shared site header and nav, not the cut-down header in the mock-ups. No "All entries" link.
- "Next in the Journey" loops: Before the grid → Walking the track → The Red Bull selection event, two years on → Before the grid.
- Homepage "How he trains" links to `/athlete/`.

## Approved mock-ups
Exact copies of the approved pages, with their photos, are in `.claude/reference/` (exported 12 October 2026). **Build from these folders.** Each has an `index.html` and the images it uses:

| Folder | Page |
|---|---|
| `home/` | Homepage (images extracted from the original into files) |
| `story/` | Story |
| `athlete/` | Athlete |
| `media/` | Media kit |
| `work-with-josh/` | Work with Josh |
| `journey-before-the-grid/` | Journey article |
| `journey-walking-the-track/` | Journey article |
| `journey-red-bull-selection-event/` | Journey article |

Links inside the reference files point to claude.ai artifact URLs; replace them with the site paths in Navigation above. The mock-up enquiry form on Work with Josh does not send; wire it to Formspree on the live site. The film placeholder on Work with Josh stays out until Maite supplies the film.

`.claude/reference/` is excluded from the published site (Jekyll skips dot-folders) but the repo is public, so the files are visible on GitHub.

Original artifacts, for reference only:

| Page | Artifact | Version |
|---|---|---|
| Homepage | https://claude.ai/artifact/99mYxYcVYA1Ejw4AuDZKBm | v10 |
| Story | https://claude.ai/artifact/PJGpWcVebKiFXDG8h22FKs | v14 |
| Athlete | https://claude.ai/artifact/L9hrqQkdTzNB71Q41rSkpD | v12 |
| Work with Josh | https://claude.ai/artifact/6JjCWSkapvk3wcoVYUkFyH | v17 |
| Media kit | https://claude.ai/artifact/LKB7k2r44yjfA9weif1oxT | v5 |
| Journey: Before the grid | https://claude.ai/artifact/5pDnHitKzn6WvAPHf7b7Hr | — |
| Journey: Walking the track | https://claude.ai/artifact/FTSTEDVuM5MRQams5tm5wJ | v2 |
| Journey: The Red Bull selection event, two years on | https://claude.ai/artifact/Bd77pRJQfeHzK37onfP8CG | — |

- Do not use the Media kit components doc (RGRTqKmcAPzzJJUhJZ4c9e); it carries retired motocross, "selected" and age wording.
- Reproduce copy from the mock-ups exactly. Do not rewrite, extend or "improve" it. If copy is missing, leave a visible `TO CONFIRM` marker in an HTML comment and list it in the pull request.

## Design tokens
```css
--asphalt: #232422;  --line-white: #F5F5F1;  --concrete: #62645F;
--violet: #5B2A86;   --violet-light: #B79CDB; --sierra: #CDBB9E;
--surface-alt: #EBEBE6; --rule: #D4D5CF;     --rule-dark: #4A4C48;
--font-head: "Archivo", "Helvetica Neue", Arial, sans-serif;
--font-voice: "Newsreader", Georgia, "Times New Roman", serif;
```
- Dark mode: redefine surface tokens under `prefers-color-scheme: dark` (bg `#1B1C1A`, fg `#F5F5F1`, muted `#A9ABA4`, links `--violet-light`).
- Number mark: "36" in white on violet, Archivo 800, `font-stretch: 112%`.
- Josh's own words (answers, quotes) are Newsreader italic. Everything else is Archivo.
- Max content width 1296px, side gutters `clamp(20px, 5vw, 72px)`. Must work at 360px wide with no horizontal scroll.
- Photos are uncropped unless the mock-up crops them. Every image has descriptive alt text, width and height.

## Cookies, privacy and data (decided 12 October 2026)
- Cookie banner on every page: Accept and Reject styled identically, short plain wording, small and fixed to the bottom of the screen. Choice is stored in `localStorage` (`analytics-consent`). Footer has a "Cookie settings" button that reopens it.
- Footer links to `/privacy/` and carries the "Cookie settings" button on every page.
- Enquiry data (name, brand, email, message) goes through Formspree, is used only to reply, and is never shared or sold.
- Retention: enquiries are kept for 12 months after the last reply, then deleted.
- Deletion requests go to `maiteland@josh36wood.com`.
- If tracking or forms change, update `privacy/index.html` in the same pull request.

## Content rules (non-negotiable)
- Direct, factual, peer-to-peer. No exclamation marks. No filler.
- **Retired phrases, never use:** rising star, elite, prestigious, act now, limited slots, "investing in". Also never: future champion, the next JuniorGP star, exclusive.
- **No race results anywhere:** no results sections, labels, positions, points or links to results. Describe what he did, not how he placed.
- **Red Bull:** "invited to the Red Bull MotoGP Rookies Cup Selection Event, one of around 120 riders". Never "selected", "tryouts" or "Rookies team".
- **Quaresma:** "invited to race as a wildcard for Team Quaresma". Never "selected to ride".
- **No motocross career.** He tried a dirt bike in 2022 and never competed off-road.
- **Championship claims:** do not say he races in JuniorGP or any championship beyond the confirmed facts below. The next objective is the ESBK Talent Cup. Never "two championships".
- **Safeguarding:** no age, no date of birth, no school, no home location beyond "based in Málaga", no dated weekly schedule (days, times, places), no shirtless photos.
- **Audience figures** always carry a date and source, exactly as below.
- **Partners:** product-only partners are never called "sponsors". Only approved brands appear (see Resolved).
- **Press list:** outlet, format and date only, each linked. No old headlines (several are "help" appeals). Shaw Marketing Services never appears.
- **Footer:** no YouTube link until the channel is live (TO CONFIRM comment sits in `_includes/footer.html`).
- **Contact address everywhere:** `maiteland@josh36wood.com`. Retire media@, partnerships@, sponsorships@ and any belallure.travel address.
- **Prices:** tier prices and partnership terms may appear on `/work-with-josh/` only, as shown in the approved mock-up. No prices or cost figures anywhere else (the Athlete costs band lists items, not amounts).
- No PDFs of pages unless Maite asks.

## Confirmed facts
- Josh Wood, #36, American, based in Málaga. Trains at SPN Academy with coach Nico Ferreira. No racing family; came into the sport through the academy.
- Go-karting as a kid. 2022: first dirt bike, then circuit riding on a 165cc. 2023: Spanish national cups.
- 2024: joined SPN Academy; invited to race as a wildcard for Team Quaresma; MIR Moto5 as a wildcard; invited to the Red Bull MotoGP Rookies Cup Selection Event, one of around 120 riders.
- 2025: PreMoto3. 2026: finished school, trains full time. Next objective (2027): ESBK Talent Cup. Calendar: "To be confirmed".
- Training: gym four days a week, track three days a week.
- Costs (items only): track time, coaching, travel, gym, road bike hire; tyres (a set about every two weeks), brakes, boots (every two to three months), race leathers, cycling kit; two helmets a season (race and training).
- Instagram @josh.wood36 (https://www.instagram.com/josh.wood36/): 3,200 followers (12 Oct 2026); 9,767 profile visits a month (Instagram Insights, Oct 2026); pinned posts 138K, 43.2K and 31.7K views (8 Oct 2026).

## Press
| Outlet | Format | Date | Link |
|---|---|---|---|
| Talk Radio Europe | Radio interview | — | https://www.youtube.com/watch?v=7Y-HCc9knzs |
| RTV Marbella with Nicole King | Television interview | — | https://www.youtube.com/watch?v=4qCWz0P031k&t=1875s |
| Euro Weekly News | Newspaper | April 2026 | https://euroweeklynews.com/2026/04/22/juniorgp-world-championship-the-race-is-on/ |
| Essential Magazine | Print feature | June 2025 | https://issuu.com/essentialmagazine/docs/essential_magazine_june_2025 |
| Planet Marbella | Feature interview | April 2025 | https://www.planetmarbella.com/can-josh-break-into-the-big-time/ |
| SUR in English | Profile | February 2025 | https://www.surinenglish.com/sport/josh-appeals-for-help-fulfil-his-dream-20250217074611-nt.html |
| Diario Sur | Newspaper | February 2025 | https://www.diariosur.es/costadelsol/josh-ayuda-sueno-convertirse-campeon-20250215213318-nt.html |
| Área Costa del Sol | Online | — | https://www.areacostadelsol.com/costa-del-sol/josh-wood-fuengiroleno-que-suena-con-correr-en-motogp/ |
| FTV (Fuengirola Televisión) | Television | — | No link yet |
| Marbella Noticias | Television | — | No link yet |

## Media kit story angles (approved)
1. An American learning the European ladder. 2. The academy route. 3. Racing the generation coming through. 4. What a rider actually learns. 5. Honest about the climb.
Outreach-only angles (not on the site): no racing family; a student of the sport.

## Images
- Never embed base64 images. Reference files in `assets/img/`.
- Optimise before committing: JPEG, long edge 2000px max for heroes and 1400px for inline, quality ~82, EXIF stripped (removes location data).
- Photos with open questions (see below) go in behind an HTML comment `<!-- PENDING: reason -->` so they are easy to find and swap.
- Credit photographers where Maite supplies a credit.

## Launch clean-up (only in the launch pull request, after Maite confirms)
- Remove pitch decks: `deck.html`, `deck_es.html`, `deck_pt.html`, `deck-old.html`, `request-deck.html`, `slides/`, `Joshua_Wood_2026.pdf`. Redirect the old deck URLs to `/work-with-josh/` with `jekyll-redirect-from`.
- Remove `shaw_logo.png` and any Shaw reference.
- Remove the old `partner.html` and redirect it to `/work-with-josh/`.
- `gallery.html`, `hero_video.mp4` and unused root images: ask Maite before deleting anything not listed here.

## Resolved (12 October 2026)
- Red Bull walk-out photo (Story) and Red Bull article hero: keep as is, faces unblurred.
- Photos: Maite bought the photos, so no photographer credit is needed on the site (including DBkiller Moment).
- Partner approvals: GoPro, Hyperice, Manta Sleep, Lumie and VOITED have all approved. List them as shown in the mock-ups (product partners, never "sponsors").
- Athlete flat track photos (both yellow Suzuki photos): Maite approved all photos on 12 October 2026. Both are on the Athlete page.
- Red Bull article: "selectors" and "selected riders" in the interviewer's questions are approved as written. This is the only place "selected" may appear.
- Media kit: the long bio keeps "no racing family" and "a student of the sport", and the Euro Weekly News pull quote stays (attributed to the outlet, no date). Talk Radio Europe and RTV Marbella are listed without dates.
- Google Analytics keeps visit data for 2 months (stated on `/privacy/`; the GA account setting must match).

## Open items (do not resolve by guessing)
1. FTV and Marbella Noticias links once uploaded to YouTube.
2. Racing calendar stays "To be confirmed" until announced.
3. Livery and logo positions to confirm with team and championship before partners sign; tyre categories subject to ESBK and team rules.
4. Media kit: full-resolution photos and credits on request; confirm whether Josh gives interviews in English and Spanish.
5. Athlete page: more photos to come (clothed strength training); road cycling photo is only 736px wide.

## Build order
1. Scaffold: `_config.yml`, layouts, nav, footer, `site.css` with tokens. No content changes to live pages yet.
2. Journey articles (three, shared `article` layout).
3. Story. 4. Athlete. 5. Media kit. 6. Work with Josh. 7. Homepage (last, so every link it carries already exists).
8. Launch clean-up and redirects.

Before opening each pull request, check the page against the content rules: search the diff for retired phrases, "selected", "motocross", "sponsor" next to a product partner, any age, any result, any address other than maiteland@josh36wood.com, and any price outside `/work-with-josh/`.
