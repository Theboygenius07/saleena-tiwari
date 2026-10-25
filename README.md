# Saleena Tiwari, portfolio

A static site: plain HTML, CSS and JavaScript, no build step. The About page opens on a passport. Scrolling opens it and zooms the open spread into the page.

- Pages sit at the root with clean addresses: `/` (the passport, also `/about`), `/projects`, `/craft`, `/education` and `/contact`. `vercel.json` sets this up, and old `/pages/…` links redirect.
- Content (projects, honors, skills) lives in `js/data.js`.
- Illustrations live in `assets/illustrations/`. They're drawn in code by `source/illustrations.mjs`.

## Link preview

`assets/og.jpg` is the image shown when the link is shared. It's drawn from `og.html`: run the site locally, open `/og.html`, and screenshot it at 1200 × 630.

## Run it locally

Double-click `start.command`, or run `python3 serve.py` and open http://localhost:8000. `serve.py` serves the same clean addresses Vercel does.

## Deploy on Vercel

Import this folder as a new project:
- Framework preset: Other.
- Build command: none.
- Output directory: the project root.

To turn on the analytics the pages already include, enable Web Analytics and Speed Insights in the project settings.
