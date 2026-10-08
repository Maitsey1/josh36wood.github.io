# josh36wood.com build brief

This site is the record of Josh Wood's racing career. Story, training and racing lead; media and partnerships follow. Nothing on the site asks for money. This brief is the single source for positioning, facts, design and build rules. Maite manages Josh's career and approves all direction and copy; the brief changes only with her approval.

## How we work
- All rebuild work happens on the `rebuild` branch. Never commit to or push `main`: the site goes live when Maite merges the draft pull request from `rebuild`.
- One chunk per session: foundations, then Home, then Story and Racing, then Media and the media kit, then the remaining pages.
- Start each session with a short plan (what will change, which files, what you need) and wait for Maite's go-ahead.
- Before each push, run a production build and the content check; both must pass. End with a plain-language summary: what changed, which preview pages to check, and what you need from Maite.
- Maite has no local environment. She reviews on GitHub's pull request interface, often on her phone, and edits words and photos in Pages CMS. Write summaries and pull request descriptions for her, not for a developer.
- Never invent facts, dates, results, quotes, outlets or captions. Leave the field empty and list it in your summary.
- Prefer plain HTML, CSS and small vanilla JavaScript. Explain any new dependency or third-party script before adding it.
- When Maite approves a change to anything in this brief, update the brief in the same pull request.
- Homepage reference: `.claude/reference/home-desktop.html` and `.claude/reference/home-phone.html`, the approved mock-up. Follow its structure, section order, spacing and type closely. Its words are drafts, its photos are labelled stand-ins, and its `cqw` units mean viewport width on the live site.

## The repository is public
Everything committed is public, including drafts and history. Never commit prices or partnership terms, proposals, outreach lists or targets, private contact details, analytics exports, internal notes, or text in Josh's voice that he hasn't approved. Formspree endpoints and analytics site tokens are public by design.

## Positioning and voice
- Josh is an American athlete building a professional racing career in Europe. The site makes people follow that career; partnerships follow from the audience it builds.
- The first screen and the intro beneath it answer four questions: who he is, why his story is interesting, what he's working toward, and why to follow.
- Three voices, each with one job:
  - The record (Story, Racing, Media kit): third person, dated and specific. A journalist can check every claim.
  - Josh (quotes, Journey entries, his captions): first person, from his own answers, lightly edited, approved by him. Set in Newsreader Italic.
  - Management (Work with Josh, forms): "we", peer-to-peer, one clear ask per page.
- Direct and factual. Sentence case, no exclamation marks, no adjectives standing in for facts.
- Retired, never used: rising star, future champion, elite, prestigious, born to race, driven by passion, fuelled by adrenaline, ready to break through, limited slots, act now, the window is closing. No sentence in which Josh "needs" backing. No charity or fundraising framing, no cost figures, no donation or crowdfunding links.
- The site is in Josh Wood's name, and enquiries "are handled by his management team". Don't introduce team, academy or company names unless Maite supplies them.

## Fact standards
| Topic | Use | Never |
|---|---|---|
| Name | Josh Wood. Formal bios open with Joshua "Josh" Wood | Alternating Josh and Joshua |
| Age | One `age` value in the profile data feeds every mention, including the hero's "Seventeen" | Hard-coded ages; date of birth |
| Nationality and base | American, based in Málaga, Spain | British identity; any location more precise than Málaga |
| Now | Finished school in 2026; trains and races full-time | The name of his school |
| Training | Trains with SPN Academy under coach Nico Ferreira | "Elite coach", "the world's top riders" |
| Red Bull | Invited to the 2024 Red Bull MotoGP Rookies Cup Selection Event, one of around 120 riders worldwide | "Red Bull Rookie", "tryouts", "1/120" as a headline figure |
| Racing history | 2023: first races, Spanish national cups (Circuito de Campillos). 2024: joined SPN Academy; Red Bull selection event. 2025–2026: MIR Racing Cup, Moto5 and PreMoto3 | "Resistance races" (the term is endurance races) |
| 2027 | "A full European championship programme". Details once confirmed | "Two championships"; naming a championship before Maite confirms it |
| Championships | The exact championship and class he is entered in | "JuniorGP" as shorthand, "highest junior level", "first stage of the road to MotoGP", "proven pathway" |
| Audience | Championship broadcast figures, credited to the championship, with source and date | Series reach presented as Josh's reach; unsourced viewer numbers |
| Partners | The relationship as it is: product partner, ambassador, founding partner. One line each, shown once the brand approves it | "Sponsor" for product-only relationships; "investing in" |
| Press | Published coverage only: outlet, format and date, with the link on the outlet name | Headlines, bylines, credit lines, agency or personal social posts |

## Safeguarding (Josh is under 18)
- All contact goes to management: media@josh36wood.com, partnerships@josh36wood.com and the two forms. Never a phone number, Josh's own address, or direct messages as a contact route.
- No school, home area, routines, or training times and places beyond named circuits and SPN Academy.
- Strip all metadata from every published image. Originals sit in the public repo, so the build fails if one carries GPS data.
- Photos in which other young riders are identifiable stay out of the media kit download pack.
- No comments or user-generated content.

## Sitemap and URLs
Navigation: Story, Racing, Athlete, Journey, Media, Partners, plus a "Work with Josh" button. On phones, a single Menu button.

| URL | Page |
|---|---|
| `/` | Home, in the reference mock-up's section order |
| `/story/` | The full story |
| `/racing/` | Racing now, then results by season |
| `/athlete/` | Training: "Race weekends are the short part" |
| `/journey/`, `/journey/<slug>/` | Dated entries, newest first |
| `/media/` | Coverage and interviews |
| `/media/kit/` | Bios, key facts, approved Q&A, rights-cleared photos with credits, media contact |
| `/partners/` | Partners and how each fits his life |
| `/work-with-josh/` | For brands. Proposals sent privately on request; no decks, prices or tiers |
| `/follow/` | Race-weekend dispatch sign-up and Instagram |
| `/privacy/` | Privacy notice (text supplied by Maite) |
| `/404.html` | Not found, with links to Home, Media kit and Work with Josh |

A 2027 programme page is added only once the programme is confirmed.

- Redirects with jekyll-redirect-from: `/deck.html`, `/partner.html`, `/request-deck.html`, `/deck_es.html` and `/deck_pt.html` to `/work-with-josh/`; `/gallery.html` to `/journey/`; `/press/` to `/media/kit/`.
- No pitch decks on the site or in the repo. Old direct links to the 2026 PDF land on the 404 page.
- Remove the old pages (`index.html`, `deck*.html`, `partner.html`, `request-deck.html`, `gallery.html`); their URLs become the redirects above.
- Keep `CNAME` and `hero_video.mp4` (unused until a short loop is cut). Delete `Joshua_Wood_2026.pdf`, `deck-old.html`, `media.3-jpeg`, `training4.jpeg` (duplicate of `Nico_Training.jpeg`), `slides/`, `sponsor_bike.png`, `sponsor_suit.png`, `media1.png`, `media2.png` and `shaw_logo.png`. Replace `favicon.svg` and `favicon.png`. Move all other photos and logos into the media folder with their file names unchanged.

## Architecture
- Jekyll 4 with jekyll-seo-tag, jekyll-sitemap and jekyll-redirect-from. Pin Ruby and Node versions.
- Production: a GitHub Actions workflow builds every push to `main` with `JEKYLL_ENV=production`, runs the content check and deploys to GitHub Pages. Pull requests run the same build and check without deploying.
- Exclude from the built site: `.claude/`, `scripts/`, `node_modules/`, `package*.json`, `Gemfile*`, `README*`.

### Content and Pages CMS
- Templates hold structure only. Every visible word and photo comes from front matter, a Markdown body or a data file that Pages CMS edits through `.pages.yml`: status line, profile facts, homepage copy, timeline, training, racing (next round, latest result, results history), press, partners, Instagram strip, Josh's approved quotes, Journey entries and each page's text.
- In `.pages.yml`, give every field a plain label and short help text, and make alt text required on every image field. Media folder: `assets/uploads/`, originals only.
- On `main`, Pages CMS edits go live on save, after the build. The content check is the guard.

### Images
- A Node build step using sharp turns each original into AVIF and WebP with a JPEG fallback at three widths (about 640, 1280 and 1920 px, never upscaled), strips metadata, and records intrinsic sizes for width and height attributes. Cache the output between builds.
- One `picture` include takes the original's path, alt text, sizes and priority. The hero loads eagerly with high fetch priority; everything else is lazy.
- Originals may be JPEG, PNG or WebP. For HEIC, files over 20 MB, or GPS data, stop the build with a message naming the file and the fix.

### Content check
- Runs on the built pages. Checks visible text, not URLs, for prices or currency amounts, unfilled `[placeholders]` and retired phrases (listed in `_data/copy_rules.yml`). Checks for images without alt text and links to donation or crowdfunding sites.
- Components whose required fields are empty are left out in production. Previews show them with a visible "Missing: field name" marker.
- Messages name the file and the problem in plain words, since Maite reads them in GitHub.

### Integrations
- Forms: Formspree, one form for media and one for partnerships, endpoints in `_config.yml`. Submit with fetch, confirm inline, include a spam honeypot and a no-JavaScript fallback. Until an endpoint is set, show the email address instead.
- Race-weekend dispatch: a plain form posting to the provider's endpoint (MailerLite proposed), double opt-in at the provider, no provider script. Hidden in production until the endpoint is set.
- Analytics: no Google Analytics. One cookieless provider (Cloudflare Web Analytics proposed), production only, off until its token is set. Count enquiries and sign-ups by their confirmation pages.
- Instagram: a curated six-photo strip from a data file, linking to instagram.com/josh.wood36. No embed or feed script.
- YouTube: plain links, or click-to-load embeds from youtube-nocookie.com. No iframe before the click.
- Fonts: self-hosted WOFF2, Latin and Latin Extended subsets. No requests to Google.
- The site sets no cookies.

## Design system
Documentary, not deck: photography carries the excitement, the interface stays quiet, and the number 36 is the one bold device.

| Token | Hex | Use |
|---|---|---|
| asphalt | #232422 | Text; dark sections (hero, Racing now, footer) |
| line-white | #F5F5F1 | Page background; text on dark |
| concrete | #62645F | Captions, dates, secondary text on light |
| violet | #5B2A86 | The 36, monogram, links and focus on light |
| violet-light | #B79CDB | Links, focus and the status dot on dark |
| sierra | #CDBB9E | Follow band, image placeholders, captions on dark |
| surface-alt | #EBEBE6 | Alternate light sections |
| rule, rule-dark | #D4D5CF, #4A4C48 | Hairlines on light, on dark |

- Archivo variable (wdth 62–125, wght 100–900). Body 18px (17px on phones), line height 1.55, normal width, lines under 75 characters. Headings heavy and semi-expanded: name 800 at 112% width; section titles 780 at 110%, letter-spacing −0.02em; card titles 750 at 106%.
- Newsreader Italic (opsz 6–72, wght 300–600), only for Josh's own words.
- Scale from the reference: name clamp(72px, 12.8vw, 184px), 84px on phones; section titles clamp(34px, 4.2vw, 58px); intro clamp(23px, 2.3vw, 32px); Josh's quote clamp(26px, 2.7vw, 40px); captions 13px.
- Tabular figures for years, dates and results. Sentence case. No all-caps labels.
- Phone-first. Content max-width 1296px; side padding clamp(20px, 5vw, 72px); section padding clamp(64px, 8vw, 120px). Left-aligned; on desktop, text in five or six of 12 columns beside full-bleed or seven-column images.
- Photos run full-bleed or uncropped, with square corners, and type never sits across a face. Every photo is captioned with place and month.
- The 36 is set very large once per page, cropped by the screen edge, and hidden from screen readers.
- Buttons: 4px radius, at least 48px tall, weight 650. Links: violet, weight 650, underline offset 4px. Touch targets at least 44px.
- Daylight pages, dark film: editorial sections on light ground; the hero, Racing now and video moments go dark.
- Motion: nothing on scroll. Movement only in response to a tap or swipe, plus one hero sequence once the film loop exists. Respect reduced motion.
- Avoid: checkered flags, speedometers, red-and-black, condensed all-caps headlines, stat counters, numbered "01" cards, rows of identical rounded cards, shadows, gradients, parallax, middle-dot meta strings, arrows appended to links.

## Quality bar
- Mobile: main content painted within 2.5 s on a mid-range phone over 4G; under 1 MB transferred before any hero film; Lighthouse mobile 90+ in all four categories; layout shift under 0.1.
- WCAG 2.2 AA: contrast, alt text, visible focus, skip link, captions on video, reduced motion, labelled forms, logical headings.
- Search: a title and description per page, social cards, one Person JSON-LD block (name Josh Wood, alternateName Joshua Wood, nationality United States, homeLocation Málaga, sameAs Instagram and YouTube once it exists), sitemap.xml, robots.txt, canonical URLs on https://josh36wood.com.
- Favicon and touch icons: the 36 monogram redrawn in Archivo, as SVG with outlined text plus PNG sizes.

## Launch checklist (Maite)
1. Approve the full preview.
2. Google Workspace: media@ and partnerships@ receive mail; sponsorships@ stays as an alias.
3. Formspree endpoints, dispatch endpoint and analytics token set. Privacy text supplied and checked by her adviser, including whether an Aviso Legal page is needed.
4. Settings → Pages → Source: "GitHub Actions", then merge the pull request straight away.
5. Check redirects on the live domain, submit sitemap.xml in Google Search Console, point Pages CMS at `main`, and update outreach templates and email signatures so nothing points to the old deck.
