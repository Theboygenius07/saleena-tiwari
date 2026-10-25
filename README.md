# Saleena Tiwari, portfolio

A static site: plain HTML, CSS and JavaScript, no build step. The About page opens on a passport. Scrolling opens it and zooms the open spread into the page.

- Pages live in `pages/`. `/` redirects to `pages/about.html`.
- Content (projects, honors, skills) lives in `js/data.js`.
- Illustrations live in `assets/illustrations/`. They're drawn in code by `source/illustrations.mjs`.

## Run it locally

Double-click `start.command`, or run `python3 -m http.server` in this folder and open http://localhost:8000.

## Deploy on Vercel

Import this folder as a new project:
- Framework preset: Other.
- Build command: none.
- Output directory: the project root.

To turn on the analytics the pages already include, enable Web Analytics and Speed Insights in the project settings.
