/* About: the passport opens with the scroll, the pictures fly out of the text, and the honours are stamps you can point at. */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  {
  /* ── the landing: the passport opens, then zooms in until the open spread is the page ── */
  const stage = document.getElementById("stage"), sticky = stage.querySelector(".stage__sticky");
  const base = document.getElementById("pp-base"), page = document.getElementById("pp-page");
  const cover = document.getElementById("pp-cover"), tpl = document.getElementById("pp-tpl");
  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const easeIO = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const mix = (a, b, t) => a + (b - a) * t;
  let vw = 0, vh = 0, wb = 0, hb = 0, wide = true;
  let blend = 0;      // 0 = zoom into the open spread, 1 = zoom into the data page alone
  const measure = () => {
    vw = sticky.clientWidth; vh = sticky.clientHeight; wide = vw >= 760 && vw > vh;
    // the closed passport: ICAO booklet proportions (88 × 125 mm)
    hb = Math.min(vh * .64, 620, (vw * .72) / .704); wb = hb * .704;
  };
  // where the spine sits and how big a page is, for a given point in the move
  const geo = (p, toPage) => {
    const B = easeIO(clamp01(p / .34)), Z = easeIO(clamp01((p - .4) / .44));
    const spread = wide && !toPage;
    const sx0 = vw / 2 - wb / 2, top0 = (vh - hb) / 2 + 12;
    const sxOpen = spread ? vw / 2 : sx0;                    // a spread centres on its spine
    return {
      B, Z,
      sx: mix(mix(sx0, sxOpen, B), spread ? vw / 2 : 0, Z),
      top: mix(top0, 0, Z),
      pw: mix(wb, spread ? vw / 2 : vw, Z),
      ph: mix(hb, vh, Z),
    };
  };
  const radius = (Z) => [2, 10].map((r) => (r * (1 - Z)).toFixed(1) + "px");
  const render = (p) => {
    const a = geo(p, false), b = geo(p, true), t = blend;
    const B = mix(a.B, b.B, t), Z = mix(a.Z, b.Z, t);
    const sx = mix(a.sx, b.sx, t), top = mix(a.top, b.top, t), pw = mix(a.pw, b.pw, t), ph = mix(a.ph, b.ph, t);
    const box = `translate(${sx.toFixed(1)}px, ${top.toFixed(1)}px)`;
    for (const el of [base, page, cover]) { el.style.width = pw.toFixed(1) + "px"; el.style.height = ph.toFixed(1) + "px"; }
    base.style.transform = box;
    page.style.transform = box;
    cover.style.transform = `${box} perspective(${Math.max(2400, pw * 4).toFixed(0)}px) rotateY(${(-180 * B).toFixed(2)}deg)`;
    base.style.opacity = (1 - clamp01(Z * 1.8)).toFixed(3);
    // zooming into the spread keeps the inside cover as the left page; into one page, it falls away
    // (faded face by face: opacity on the cover itself would flatten its 3D and show the front through)
    const fade = (1 - t * clamp01(Z * 1.6)).toFixed(3);
    cover.firstElementChild.style.opacity = cover.lastElementChild.style.opacity = fade;
    page.style.setProperty("--print", (1 - Z * .55).toFixed(3));
    page.style.setProperty("--edge", (.12 * (1 - Z)).toFixed(3));
    const [r2, r10] = radius(Z);
    page.style.borderRadius = cover.firstElementChild.style.borderRadius = `${r2} ${r10} ${r10} ${r2}`;
    cover.lastElementChild.style.borderRadius = `${r10} ${r2} ${r2} ${r10}`;
    stage.style.setProperty("--hint", (1 - clamp01(p * 9)).toFixed(3));
    if (tpl.firstChild) tpl.style.transform = `scale(${(pw / vw).toFixed(4)})`;
    if (B > .85) stage.classList.add("is-open");
  };

  let cur = 0, target = 0, raf = 0, auto = null;
  const scrollP = () => {
    const r = stage.getBoundingClientRect(), span = stage.offsetHeight - vh;
    return span > 0 ? clamp01(-r.top / span) : 1;
  };
  const tick = (now) => {
    if (auto) {
      const k = clamp01((now - auto.t0) / auto.ms);
      cur = mix(auto.from, 1, easeIO(k));
      blend = mix(auto.blend0, 1, clamp01(k / .35));
      render(cur);
      if (k < 1) raf = requestAnimationFrame(tick);
      else { raf = 0; location.href = auto.href; }
      return;
    }
    cur += (target - cur) * .16;
    if (Math.abs(target - cur) < .0005) cur = target;
    render(cur);
    raf = cur === target ? 0 : requestAnimationFrame(tick);
  };
  const read = () => { if (auto) return; target = scrollP(); if (!raf) raf = requestAnimationFrame(tick); };

  if (reduce) {
    stage.classList.add("is-static");
    measure(); cur = target = 1; render(1);
    addEventListener("resize", () => { measure(); render(1); });
  } else {
    measure(); cur = target = scrollP(); render(cur);
    addEventListener("scroll", read, { passive: true });
    addEventListener("resize", () => { measure(); render(cur); read(); });
  }

  // picking a page from the bar while the passport is still closed: open it and zoom into that page
  window.passportGo = (a) => {
    if (reduce || auto || cur > .97) return false;
    const href = a.getAttribute("href");
    if (/about\.html$/.test(href)) {
      const end = stage.getBoundingClientRect().top + scrollY + stage.offsetHeight - vh;
      if (window.lenis) window.lenis.scrollTo(end, { duration: 1.6 }); else scrollTo({ top: end, behavior: "smooth" });
      return true;
    }
    auto = { href, from: cur, blend0: blend, t0: 0, ms: 1500 };
    if (window.lenis) window.lenis.stop();
    fetch(href).then((r) => r.text()).then((html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const title = doc.querySelector(".title-page");
      if (!title) throw new Error("no title page");
      const filters = title.querySelector("#filters");
      if (filters) {   // the projects filters are built by script on that page
        filters.innerHTML = window.SITE.filters.map((f, i) => `<button type="button" aria-pressed="${i === 0}">${f.label}</button>`).join("");
      }
      tpl.style.width = vw + "px"; tpl.style.height = vh + "px";
      tpl.replaceChildren(document.importNode(title, true));
      page.classList.add("is-template");
      auto.t0 = performance.now();
      if (!raf) raf = requestAnimationFrame(tick);
    }).catch(() => { location.href = href; });
    return true;
  };
  // coming back with the browser's back button: put the passport back the way the scroll says
  addEventListener("pageshow", (e) => {
    if (!e.persisted) return;
    auto = null; blend = 0; page.classList.remove("is-template"); tpl.replaceChildren();
    if (window.lenis) window.lenis.start();
    measure(); cur = target = scrollP(); render(cur);
  });
  }

  /* ── the stamps ── */
  const S = window.SITE, stampPage = document.getElementById("stamp-page");
  // where each stamp lands on the page: x %, y %, size px, tilt
  const SPOTS = [[16, 30, 168, -9], [41, 24, 150, 6], [67, 32, 140, -4], [87, 26, 150, 11], [22, 70, 150, 5], [47, 66, 176, -7], [70, 72, 150, 8], [88, 70, 140, -12]];
  const title = document.getElementById("stamp-title"), text = document.getElementById("stamp-text"), photo = document.getElementById("stamp-photo");
  let on = null;
  const show = (b, h) => {
    if (on) on.classList.remove("is-on");
    on = b; b.classList.add("is-on");
    title.textContent = h.title; text.textContent = h.text; photo.src = h.photo; photo.alt = h.title;
  };
  S.honours.forEach((h, i) => {
    const [x, y, s, r] = SPOTS[i % SPOTS.length];
    const b = document.createElement("button");
    b.type = "button"; b.className = "stamp thunk";
    b.style.cssText = `--x:${x}%;--y:${y}%;--s:${s}px;--r:${r}deg;--delay:${(i * 0.08).toFixed(2)}s`;
    b.setAttribute("aria-label", h.title);
    const img = new Image(); img.className = "illo"; img.alt = ""; img.dataset.label = h.title; img.src = h.stamp;
    img.addEventListener("error", () => window.illoFallback(img), { once: true });
    b.appendChild(img);
    b.addEventListener("mouseenter", () => show(b, h));
    b.addEventListener("focus", () => show(b, h));
    b.addEventListener("click", () => show(b, h));
    stampPage.appendChild(b);
    window.reveal(b);
  });
  // preload the honour photos so the card swaps instantly
  S.honours.forEach((h) => { const i = new Image(); i.src = h.photo; });

  /* ── the reel, after oyin.design: pictures lift out of their words, pile up in the middle,
        fan out into a ring round the caption, then drift away as you keep scrolling ── */
  const reel = document.getElementById("reel"), fly = document.getElementById("fly");
  const items = [];
  S.projects.forEach((p, i) => {
    items.push({ key: "p" + i, src: p.thumb, label: p.title, href: "projects.html#" + p.slug });
    const h = S.honours[i]; if (h) items.push({ key: "h" + i, src: h.photo, label: h.title, href: "#stamps", stamp: h.stamp });
  });
  S.honours.slice(S.projects.length).forEach((h, j) => items.push({ key: "h" + (S.projects.length + j), src: h.photo, label: h.title, href: "#stamps", stamp: h.stamp }));
  const rnd = (n) => { const x = Math.sin(n * 91.7 + 13.1) * 43758.5453; return x - Math.floor(x); };   // stable per card
  const cards = items.map((it, i) => {
    const a = document.createElement("a");
    a.className = "card"; a.href = it.href; a.tabIndex = -1;
    a.innerHTML = `<div class="card__inner"><img src="${it.src}" alt="" decoding="async" /><span>${it.label}</span></div>`;
    fly.appendChild(a);
    // the picture in the sentence sits in a slot, so the hole stays when the picture leaves
    const img = document.querySelector(`[data-fly="${it.key}"]`);
    let slot = null;
    if (img && !reduce) {
      slot = document.createElement("span");
      slot.className = "peek__slot";
      img.before(slot); slot.appendChild(img);
    }
    return { ...it, el: a, slot, jx: (rnd(i) - .5) * 34, jy: (rnd(i + 7) - .5) * 26, jr: (rnd(i + 3) - .5) * 12, tilt: (rnd(i + 11) - .5) * 6, fx: (rnd(i + 5) - .5) * .8 };
  });

  if (reduce) {
    reel.classList.add("is-static");
    const grid = document.createElement("div");
    grid.style.cssText = "display:flex;flex-wrap:wrap;gap:1.2rem;justify-content:center;margin-top:3rem";
    cards.forEach((c) => { c.el.style.cssText = "position:relative;--cw:150px"; grid.appendChild(c.el); });
    reel.querySelector(".reel__sticky").appendChild(grid);
    fly.remove();
    return;
  }

  const N = cards.length, clamp = (v) => Math.min(1, Math.max(0, v));
  const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const lerp = (a, b, t) => a + (b - a) * t;
  let vw = 0, vh = 0, cw = 0, ch = 0, running = false;
  const measure = () => {
    vw = innerWidth; vh = innerHeight;
    cw = Math.round(Math.max(96, Math.min(172, vw * .115)));
    fly.style.setProperty("--cw", cw + "px");
    ch = cards[0].el.offsetHeight || cw * .9;
  };
  // every position below is the centre of the picture (not the caption), so a card can sit
  // exactly on its slot in the sentence before it moves
  const frame = () => {
    const y = scrollY, top = reel.getBoundingClientRect().top + y, span = reel.offsetHeight - vh;
    const A = clamp((y - (top - vh)) / (vh * .85));                 // words → pile
    const B = clamp((y - top) / (span * .33));                       // pile → ring
    const C = clamp((y - top - span * .6) / (span * .4 + vh * .75)); // ring → away, still going as the stamps scroll in
    reel.style.setProperty("--cap", clamp(B * 1.5 - .3).toFixed(3));
    fly.classList.toggle("is-on", A > 0 && C < 1);
    fly.classList.toggle("is-ring", B > .98 && C < .08);
    const cx = vw / 2, cy = vh / 2, ih = cw * 2 / 3;
    const rx = Math.min(vw * .41, vw / 2 - cw * .62), ry = Math.min(vh * .36, vh / 2 - ch * .62);
    const spin = C * .45;
    cards.forEach((c, i) => {
      const d = i / N;
      const a = ease(clamp((A - d * .35) / .65)), b = ease(clamp((B - d * .25) / .75)), cc = clamp(C);
      // start: on its slot in the sentence, or below the screen if it has none
      let sx = cx + c.fx * vw, sy = vh + ih, ss = .9, sr = c.jr * 2;
      if (c.slot) {
        const r = c.slot.getBoundingClientRect();
        sx = r.left + r.width / 2; sy = r.top + r.height / 2; ss = r.width / cw; sr = 0;
        c.slot.classList.toggle("is-empty", A > d * .35);
      }
      const th = -Math.PI / 2 + (i / N) * Math.PI * 2 + spin;
      const grow = 1 + ease(cc) * 1.25;            // the ring opens out past the edges of the screen
      const ringX = cx + Math.cos(th) * rx * grow, ringY = cy + Math.sin(th) * ry * grow;
      let x = lerp(sx, cx + c.jx, a), yy = lerp(sy, cy + c.jy, a), s = lerp(ss, 1, a), r = lerp(sr, c.jr, a);
      x = lerp(x, ringX, b); yy = lerp(yy, ringY, b); s = lerp(s, .9, b); r = lerp(r, c.tilt, b);
      c.el.style.transform = `translate(${(x - cw / 2).toFixed(1)}px, ${(yy - ih / 2).toFixed(1)}px) rotate(${r.toFixed(2)}deg) scale(${s.toFixed(3)})`;
      c.el.style.opacity = (1 - ease(clamp((cc - .6) / .4))).toFixed(3);
      c.el.style.setProperty("--t", clamp((b - .82) / .18).toFixed(3));   // captions only once the pictures reach the ring
      c.el.style.zIndex = b > .5 ? Math.round(ringY) : i;
    });
  };
  const loop = () => {
    const r = reel.getBoundingClientRect();
    const near = r.top < vh * 2.2 && r.bottom > -vh;
    if (near) frame();
    else if (fly.classList.contains("is-on")) { fly.classList.remove("is-on"); cards.forEach((c) => c.slot && c.slot.classList.remove("is-empty")); }
    if (near) requestAnimationFrame(loop); else running = false;
  };
  const kick = () => { if (!running) { running = true; requestAnimationFrame(loop); } };
  measure();
  addEventListener("resize", () => { measure(); kick(); });
  addEventListener("scroll", kick, { passive: true });
  kick();
})();
