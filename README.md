# kento baba — portfolio

Your personal site, in English and 日本語. Happy birthday — 19 December. 🎞️

Everything you see on the site comes from **one file: `content.js`**.
You never need to touch the HTML, CSS or JavaScript to update it.

```
index.html      ← landing page
chapter.html    ← one template for all 3 chapters (chapter.html#qut / #workato / #uni)
case.html       ← one template for every case study (case.html#eoy-party, #bundaberg …)
content.js      ← ALL the words, EN + 日本語  ← edit this
css/style.css   ← colours, fonts, layout
js/             ← animations, language switch, page builders
images/         ← your photos, résumé PDF
favicon.svg     ← the little icon in the browser tab
```

---

## 1. How to edit text

Open `content.js` on GitHub (click the file → the ✏️ pencil icon), change the words, then press **Commit changes**. The site updates by itself in about a minute.

Every piece of text comes in two languages:

```js
title: { en: 'Welcome Party', ja: 'ウェルカムパーティー' },
```

Anything in **[square brackets]** or **［］** is a placeholder waiting for you.

**Three rules so nothing breaks**
1. Keep the quote marks `'…'` around text. If your text has an apostrophe (`what's`), use double quotes instead: `"what's"`.
2. Keep the commas at the end of lines.
3. If the page goes blank after an edit, a comma or quote is missing — undo the last change (GitHub keeps every version under **History**).

---

## 2. Add your photos

1. Make the photos smaller first (around **1600px wide**, under **500 KB** each — squoosh.app is free and easy). Wide 3:2 photos look best on the film strips.
2. On GitHub, open the `images` folder → **Add file → Upload files**. Folders help: `images/film/`, `images/qut/`, `images/eoy/` …
3. Tell `content.js` where they are:

**Landing page — "Through the lens"** (your 35mm shots):
```js
film: [
  { src: 'images/film/01.jpg', place: 'Tokyo', year: '2025' },
  { src: 'images/film/02.jpg', place: 'Saitama', year: '2024' },
],
```

**A chapter or a case study film roll:**
```js
film: [
  { src: 'images/eoy/01.jpg', caption: { en: 'Doors open', ja: '開場' } },
],
```

Until you add photos, numbered placeholder frames show instead.

**A video** (the "Recap reel" on the End-of-Year Party page): upload an `.mp4` (keep it under ~25 MB), then set `video: 'images/eoy/recap.mp4'`.

---

## 3. Add a project

Copy one of the small blocks in `cases` and change it:

```js
{
  id: 'welcome-party',          // short name, no spaces — used in the web address
  chapter: 'qut',               // qut / workato / uni / personal
  code: 'A2',                   // its track number in the chapter
  word: 'HELLO',                // the word drawn in ASCII on the chapter preview
  category: 'events',           // events / content / design / research / partnerships / leadership / data / personal
  title: { en: '…', ja: '…' },
  line:  { en: '…', ja: '…' }
},
```

It appears automatically in the archive, the chapter tracklist and the "next in this chapter" link.

**Give it a full case-study page:** add a `page: { … }` part. The easiest way is to copy the `page` from `eoy-party` (for an event) or `bundaberg` (for research) and rewrite it. Without a `page`, the project shows as **SOON**.

**Delete a project:** remove its whole `{ … },` block.

Sections a case page can use: `text` (paragraphs), `list`, `steps`, `cards`, `reel` (video) and `outcome` (result + a quote).

---

## 4. Fill-in checklist

Siree filled in everything she knew. These are yours:

**Landing page**
- [ ] `home.filmLine` — a line on why you shoot film
- [ ] `film` — 6–12 of your favourite 35mm shots
- [ ] Workato line in `experience` — replace "[Add details]"

**Chapter 01 — QUT Japan**
- [ ] `sub` — committee size
- [ ] `stats` — events run, number of partners
- [ ] `timeline` — months for the Welcome Party and a milestone; what you set out to change; what you handed over
- [ ] `film` — photos from the year
- [ ] `quote` — what leading QUT Japan taught you

**End-of-Year Party page**
- [ ] date, venue, team size
- [ ] attendees, partners, budget, posts
- [ ] the goal, the outcome, a quote from someone who was there, your reflection
- [ ] photos from the night + the recap reel

**Other QUT Japan projects** — Welcome Party, Partnerships & sponsors (how many / who), Social content, Leading the committee (team size)

**Chapter 02 — Workato**
- [ ] WOW Tokyo — your role, audience, one result
- [ ] Content creation and graphic design — examples and results
- [ ] stats, timeline months, quote
- [ ] Check with Workato what you're allowed to show publicly before adding internal work.

**Chapter 03 — University**
- [ ] Bundaberg — your role, team size, semester, the recommendations, reflection, slides/charts as images
- [ ] two more university projects (or delete the placeholders)
- [ ] a highlight or award for the stats box (or replace it)

**Off duty pages**
- [ ] Photography — photos (with categories), favourite frame, camera details, why film
- [ ] Music — 4 tracks on repeat, why you love it
- [ ] Fashion — lookbook photos, brands
- [ ] Design — posters for the wall, favourite pieces
- [ ] Or delete any you don't want

---

## 5. Good to know

- **Language switch:** the 日本語 / EN button remembers each visitor's choice.
- **The "EXP 00 / 36" counter** is a 36-exposure film roll: every page a visitor opens is one shot, and so is a click on the landing hero. At 36 a little "roll complete" note appears.
- **Résumé:** replace `images/Kento_Baba_Resume.pdf` with a new file of the same name.
- **Reduced motion:** visitors who turn off animations on their device get a still version automatically.
- **Hosting:** GitHub Pages — Settings → Pages → Deploy from branch → `main` / root.

---

## 6. The Off duty pages (Photography, Music, Fashion, Design)

These live in `cases` with `chapter: 'personal'`. Each one has its own look:

- **Photography** (`layout: 'photo'`): add photos to `photos` — each one with `src`, a `category` (one of the `photoFilters` ids: street / people / places / night — rename or add your own) and a `caption`. They play inside the camera at the top of the page, with filter buttons. The labels around the camera come from `specs` and `details`. `feature` is your favourite frame — visitors can zoom into it like a map. The landing page's "Through the lens" strip (`film` near the bottom of content.js) is the preview; its button links here.
- **Music**: `tracks` is the "On repeat" player. For each track: `title`, `artist`, `length` ('3:45'). Optional: `link` (Spotify / YouTube — shows a LISTEN ↗ button), `cover` (an image), `audio` (a short mp3 clip, so the play button really plays).
- **Fashion** (`style: 'editorial'`): `film` becomes the lookbook (6 photos look best — they show in black & white until hovered). `favourites` are the brands.
- **Design** (`style: 'art'`): `film` becomes "the wall" — pieces visitors can drag around. `favourites` are museum-style labels; add `src` to show the piece.

Every page ends with `closing` — one line about what it brings to your work.
To remove one of these pages, delete its whole block.
