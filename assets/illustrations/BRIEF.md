# Saleena Tiwari portfolio: illustration brief

Saleena is a Computer Science (Honors) student at Georgia Tech, COO of Cohort, and a
builder of small products. She grew up in Germany (Schleswig-Holstein) and speaks
English, German and Nepali.

Her portfolio is being redesigned as a **passport that is also a sketchbook**:

- The About page opens on a burgundy passport cover. Inside are cream sketchbook pages
  with margin labels.
- Projects are visas, honours are passport stamps, Education is an itinerary and Contact
  is a postcard.
- Pacing and type follow oyin.design: calm and editorial, with one reading column. The
  illustrations bring the personality.

## The hand

- One consistent hand across everything, like the grill stickers: flat colour, one ink
  outline weight, and depth from a darker shade of the same colour. No gradients.
- It should feel drawn in a travel sketchbook: confident, slightly loose, never clip-art.
- Palette (use these, shades of them are fine):
  - wine `#57101e` (her colour, the passport cover)
  - gold `#c9a24b` (foil)
  - ink navy `#1E2B40` (outlines and text)
  - paper `#f3ede2` (the page, so leave it unfilled)
  - stamp red `#b5302a`, stamp blue `#2f4fa2`, stamp green `#3d7a4f`
  - plus each project's own accent where it helps
- Everything sits on cream paper, except the crest, which sits on wine.
- Plain vector SVG: no raster, no filters. Use a transparent background and a viewBox
  fitted to the drawing.
- **Text:** only the stamps and the postmark carry text. Draw that text as paths, or use
  `<text>` with font-family "Saans, Helvetica, Arial". Keep it short and in capitals.

## Pieces (write to this folder with these names)

### 1. `cover-crest.svg`: the passport emblem, gold on wine
A crest like the one on a real passport, reimagined for her. Ideas:
- an open laptop at the centre,
- a small mountain range behind it (for Nepali),
- a laurel or wave border,
- a tiny star or spark.

It should be **gold line art only** (`#c9a24b` plus one darker gold), with no fill
colours, because it sits on the wine cover. It's shown at about 160 to 240 px.

### 2. Visas, one per project (`visa-01-cohort.svg` … `visa-07-greentop.svg`)
Each is the illustration on that project's visa page. Make them square-ish. They're
shown at about 220 to 360 px, and each should still read at 80 px.

| No. | Project | What it is | Idea |
|---|---|---|---|
| 01 | Cohort | An AI assistant for student life, with a social network built in (2,083+ waitlist) | a backpack with a little speech bubble or spark coming out of it |
| 02 | Pantry | "The fridge in your pocket": track what you have, waste less, buy smarter | a fridge door opening out of a phone |
| 03 | HypeHub | An AI dance coach that teaches the moves instead of letting you fake them | a dancing figure mid-move with motion lines, a phone camera watching |
| 04 | X automation | A free pipeline that turns her private journal into ready-to-post drafts every weekday morning | an open journal with a paper plane taking off from it |
| 05 | LinkedIn scraper | One-click sync of a client/employee database with LinkedIn data | two stacked database cylinders with circular sync arrows and a profile card |
| 06 | YAP | Talk into your phone and get organised notes out, for visual learners | a phone with sound waves turning into colourful sticky notes |
| 07 | GreenTop | Turns Atlanta's cool-roof mandate into an action plan for building owners | a building with a bright white cool roof under a big sun, a little checklist |

### 3. Stamps, one per honour (`stamp-01-…svg` … `stamp-08-…svg`)
These are rubber passport-entry stamps:
- **Ink:** one ink colour per stamp, with slightly uneven ink, a broken edge here and
  there, and a double border line. Vary the shapes: circle, oval, rectangle, rounded
  rectangle, hexagon.
- **Size:** they're shown at about 120 to 200 px, tilted and overlapping on a visa page.
- **Dates:** no dates, since we don't have them.

| Name | Text on the stamp | Small picture | Ink |
|---|---|---|---|
| `stamp-01-waves-of-action.svg` | WAVES OF ACTION · FELLOW · FRANCE | a catamaran sail on waves | blue |
| `stamp-02-jugend-debattiert.svg` | JUGEND DEBATTIERT · STATE FINALIST | a speech bubble | red |
| `stamp-03-faculty-honors.svg` | FACULTY HONORS · 4.0 GPA | a big "4.0" | green |
| `stamp-04-rise-fellow.svg` | RISE · GLOBAL FELLOW · 1 OF 100 | a rising sun | wine |
| `stamp-05-rise-summit.svg` | RISE SUMMIT · OXFORD | college spires | blue |
| `stamp-06-georgia-tech.svg` | GEORGIA TECH · CS HONORS · ATLANTA | a small tower or tech gear | gold |
| `stamp-07-start-scholar.svg` | START · SCHOLAR · DEUTSCHLAND | a star | red |
| `stamp-08-state-representative.svg` | STATE REPRESENTATIVE · SCHLESWIG-HOLSTEIN | a lighthouse (it's a coastal state) | green |

### 4. Doodle kit (`doodle-*.svg`, ink navy, single colour)
Margin scribbles for the sketchbook pages. They're shown at about 40 to 140 px.
- `doodle-arrow.svg`: a curly hand-drawn arrow
- `doodle-star.svg`: a small star
- `doodle-underline.svg`: a wavy underline, long and thin
- `doodle-circle.svg`: a loose circle scribble, to circle a word
- `doodle-plane.svg`: a paper plane with a dashed trail
- `doodle-tape.svg`: a strip of washi tape (semi-transparent gold is fine here)
- `doodle-paperclip.svg`: a paperclip

### 5. Contact postcard
- `postage-stamp.svg`: a postage stamp with a perforated edge and a tiny illustration of
  the Atlanta skyline at sunset. It's shown at about 120 px.
- `postmark.svg`: a round postmark reading "ATLANTA GA" with wavy cancellation lines, in
  ink navy.

### 6. `itinerary-map.svg`: the Education page map
A simple illustrated map with a dashed flight path connecting the real places in her
story:
- Schleswig-Holstein in northern Germany, where she went to school,
- France, the sea fellowship,
- Oxford, the Rise Summit,
- Atlanta, Georgia Tech.

Give each a small pin. Show only loose coastline outlines, not a real atlas. It's wide
(about 2:1) and shown at up to 900 px.

## Output and checks
- Write everything to this folder: `assets/illustrations/`.
- Leave preview PNGs in `assets/illustrations/preview/`: the whole set on paper, and the
  crest on wine.
- Seyi's portfolio session (portfolio-f8) will place them and send screenshots back.
