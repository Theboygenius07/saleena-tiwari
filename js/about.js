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
  let vw = 0, vh = 0, wb = 0, hb = 0, wide = true, plateW = 0, plateH = 0, stageTop = 0, stageH = 0, animSpan = 0, holdSpan = 0;
  let blend = 0;      // 0 = zoom into the open spread, 1 = zoom into the data page alone
  const dpPlate = document.getElementById("dp-plate"), inPlate = document.getElementById("in-plate");
  const face = cover.firstElementChild, inside = cover.lastElementChild, hint = document.getElementById("stage-hint");
  const measure = () => {
    vw = sticky.clientWidth; vh = sticky.clientHeight; wide = vw >= 760 && vw > vh;
    // the closed passport: ICAO booklet proportions (88 × 125 mm)
    hb = Math.min(vh * .64, 620, (vw * .72) / .704); wb = hb * .704;
    // each page's content is laid out once, at the size it ends up on screen; after that it's only scaled
    const fw = wide ? vw / 2 : vw;
    plateH = Math.min(vh, fw / .704); plateW = plateH * .704;
    stage.style.setProperty("--plate-w", plateW.toFixed(1) + "px");
    stage.style.setProperty("--plate-h", plateH.toFixed(1) + "px");
    stageTop = stage.getBoundingClientRect().top + scrollY; stageH = stage.offsetHeight;
    // the scroll it takes to open and zoom; whatever's left of the stage is the hold before the rest of the page
    animSpan = vh * (wide ? 2 : 2.6); holdSpan = Math.max(0, stageH - vh - animSpan);
    const ppEl = document.getElementById("pp");
    if (ppEl) { ppEl.style.setProperty("--ox", vw / 2 + "px"); ppEl.style.setProperty("--oy", vh / 2 + 12 + "px"); }
    last = {};
  };
  // where the spine sits, how big a page is and how far the whole book is scaled, for a point in the move
  const geo = (p, toPage) => {
    if (!wide && !toPage) return phoneGeo(p);
    const B = easeIO(clamp01(p / .34)), Z = easeIO(clamp01((p - .4) / .44));
    const spread = wide && !toPage;
    const sx0 = vw / 2 - wb / 2, sxOpen = spread ? vw / 2 : sx0;     // a spread centres on its spine
    return {
      B, Z, s: 1,
      sx: mix(mix(sx0, sxOpen, B), spread ? vw / 2 : 0, Z),
      cy: mix(vh / 2 + 12, vh / 2, Z),
      pw: mix(wb, spread ? vw / 2 : vw, Z),
      ph: mix(hb, vh, Z),
    };
  };
  // on a phone the spread is wider than the screen: open it small enough to see both pages,
  // zoom into the scrapbook page, then slide across to the data page
  const phoneGeo = (p) => {
    const B = easeIO(clamp01(p / .3)), Z = easeIO(clamp01((p - .36) / .26)), P = easeIO(clamp01((p - .68) / .24));
    const sOpen = Math.min(1, (vw * .47) / wb);
    let s = mix(1, sOpen, B), sx = mix(vw / 2 - wb / 2, vw / 2, B), cy = vh / 2 + 12, pw = wb, ph = hb;
    s = mix(s, 1, Z); pw = mix(pw, vw, Z); ph = mix(ph, vh, Z); sx = mix(sx, vw, Z); cy = mix(cy, vh / 2, Z);   // the scrapbook page fills the screen
    sx = mix(sx, 0, P);                                                                                          // then across to the data page
    return { B, Z, s, sx, cy, pw, ph };
  };
  // only touch a style when its value changes, so a frame that moves one thing doesn't restyle the rest
  let last = {};
  const set = (el, key, prop, val) => { if (last[key] !== val) { last[key] = val; el.style[prop] = val; } };
  const plate = (el, key, pw, ph, center) => {
    const k = Math.min(pw / plateW, ph / plateH);
    set(el, key, "transform", `translate(${((pw - plateW * k) / 2).toFixed(1)}px, ${((ph - plateH * k) * center).toFixed(1)}px) scale(${k.toFixed(4)})`);
  };
  let warm = false;   // for a couple of frames after layout, plates sit at full size so they're drawn sharp
  const render = (p) => {
    const a = geo(p, false), b = geo(p, true), t = blend;
    const B = mix(a.B, b.B, t), Z = mix(a.Z, b.Z, t), s = mix(a.s, b.s, t);
    const sx = mix(a.sx, b.sx, t), cy = mix(a.cy, b.cy, t), pw = mix(a.pw, b.pw, t), ph = mix(a.ph, b.ph, t);
    const W = pw.toFixed(1) + "px", H = ph.toFixed(1) + "px";
    for (const [el, k] of [[base, "b"], [page, "p"], [cover, "c"]]) { set(el, k + "w", "width", W); set(el, k + "h", "height", H); }
    const box = `translate(${sx.toFixed(1)}px, ${(cy - ph / 2).toFixed(1)}px) scale(${s.toFixed(4)})`;
    set(base, "bt", "transform", box);
    set(page, "pt", "transform", box);
    set(cover, "ct", "transform", `${box} perspective(${Math.max(2400, pw * 4).toFixed(0)}px) rotateY(${(-180 * B).toFixed(2)}deg)`);
    if (warm) { set(dpPlate, "dp", "transform", "none"); set(inPlate, "ip", "transform", "none"); }
    else { plate(dpPlate, "dp", pw, ph, wide ? .5 : .3); plate(inPlate, "ip", pw, ph, wide ? .5 : .3); }
    const bo = 1 - clamp01(Z * 1.8);
    set(base, "bo", "opacity", bo.toFixed(3)); set(base, "bv", "visibility", bo < .01 ? "hidden" : "");
    // once the cover has turned past upright its front can't be seen: stop drawing it
    set(face, "fv", "visibility", B > .55 ? "hidden" : "");
    // zooming into the spread keeps the inside cover as the left page; into one page, it falls away
    // (faded face by face: opacity on the cover itself would flatten its 3D and show the front through)
    const fade = (1 - t * clamp01(Z * 1.6)).toFixed(3);
    set(face, "fo", "opacity", fade); set(inside, "io", "opacity", fade);
    const q = Math.round(Z * 40) / 40;   // corners and edges square off in steps, not every frame
    const r2 = (2 * (1 - q)).toFixed(1) + "px", r10 = (10 * (1 - q)).toFixed(1) + "px", r4 = (4 * (1 - q)).toFixed(1) + "px", r16 = (16 * (1 - q)).toFixed(1) + "px";
    set(page, "pr", "borderRadius", `${r2} ${r10} ${r10} ${r2}`);
    set(face, "fr", "borderRadius", `${r4} ${r16} ${r16} ${r4}`);
    set(inside, "ir", "borderRadius", `${r10} ${r2} ${r2} ${r10}`);
    set(page, "pe", "borderColor", `rgba(28, 25, 24, ${(.12 * (1 - q)).toFixed(3)})`);
    if (hint) set(hint, "h", "opacity", (1 - clamp01(p * 9)).toFixed(3));
    if (tpl.firstChild) set(tpl, "tp", "transform", `scale(${(pw / vw).toFixed(4)})`);
    if (B > .85) stage.classList.add("is-open");
    if (!auto && !reduce && pathReady) setPath(p > .3);
  };
  const warmUp = () => {
    warm = true; render(cur);
    requestAnimationFrame(() => requestAnimationFrame(() => { warm = false; render(cur); }));
  };

  /* while it's closed, the passport leans toward the cursor and its foil catches the light */
  const pp = document.getElementById("pp");
  const lean = { tx: 0, ty: 0, gx: 50, lx: 32, ly: 22, T: { tx: 0, ty: 0, gx: 50, lx: 32, ly: 22 }, raf: 0 };
  const leanTick = () => {
    const closed = 1 - clamp01(cur * 14);             // gone as soon as it starts to open
    let moving = false;
    for (const k of ["tx", "ty", "gx", "lx", "ly"]) {
      const goal = k === "tx" || k === "ty" ? lean.T[k] * closed : lean.T[k];
      lean[k] += (goal - lean[k]) * .09;
      if (Math.abs(goal - lean[k]) > .02) moving = true;
    }
    const still = Math.abs(lean.tx) < .01 && Math.abs(lean.ty) < .01;
    pp.style.transform = still ? "" : `perspective(1400px) rotateX(${lean.ty.toFixed(2)}deg) rotateY(${lean.tx.toFixed(2)}deg)`;
    if (cur < .02) {
      face.style.setProperty("--gx", lean.gx.toFixed(1) + "%");
      face.style.setProperty("--lx", lean.lx.toFixed(1) + "%");
      face.style.setProperty("--ly", lean.ly.toFixed(1) + "%");
    }
    lean.raf = moving ? requestAnimationFrame(leanTick) : 0;
  };
  if (!reduce && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    addEventListener("pointermove", (e) => {
      const nx = e.clientX / innerWidth * 2 - 1, ny = e.clientY / innerHeight * 2 - 1;
      const r = face.getBoundingClientRect();
      Object.assign(lean.T, {
        tx: nx * 7, ty: -ny * 6, gx: 50 - nx * 40,
        lx: ((e.clientX - r.left) / r.width) * 100, ly: ((e.clientY - r.top) / r.height) * 100,
      });
      if (!lean.raf) lean.raf = requestAnimationFrame(leanTick);
    }, { passive: true });
    addEventListener("scroll", () => { if (!lean.raf) lean.raf = requestAnimationFrame(leanTick); }, { passive: true });
  }

  let cur = 0, target = 0, raf = 0, auto = null;
  // the address follows the passport: / is the closed passport (home), /about is the passport open
  let shownAs = null;
  const startOpen = /^\/about\/?$/.test(location.pathname);
  let pathReady = !startOpen;      // arriving at /about: leave the address alone until the jump below has landed
  const aboutTile = document.querySelector('.bar__links a[href="/about"]');
  const setPath = (opened) => {
    const want = opened ? "about" : "home";
    if (want === shownAs) return;
    shownAs = want;
    const path = want === "about" ? "/about" : "/";
    if (location.pathname !== path) history.replaceState(history.state, "", path + location.search + location.hash);
    document.title = want === "about" ? "About · Saleena Tiwari" : "Saleena Tiwari";
    if (aboutTile) want === "about" ? aboutTile.setAttribute("aria-current", "page") : aboutTile.removeAttribute("aria-current");
  };
  // "open" means the end of the zoom, not the end of the hold that follows it
  const stageEnd = () => stageTop + animSpan;
  const scrollP = () => (animSpan > 0 ? clamp01((scrollY - stageTop) / animSpan) : 1);
  // the hold: the open spread stays on screen, and a line fills as you keep scrolling toward the rest
  const more = document.getElementById("stage-more"), moreFill = document.getElementById("stage-more-fill");
  const holdP = () => (holdSpan > 0 ? clamp01((scrollY - stageTop - animSpan) / holdSpan) : 1);
  const renderHold = () => {
    const h = holdP(), show = scrollY > stageTop + animSpan * .97 && h < 1;
    set(more, "mo", "opacity", show ? Math.min(1, (scrollY - stageTop - animSpan * .97) / (vh * .12)).toFixed(3) : "0");
    set(moreFill, "mf", "transform", `scaleX(${h.toFixed(3)})`);
  };
  const tick = (now) => {
    raf = 0;
    if (auto) {
      const k = clamp01((now - auto.t0) / auto.ms);
      cur = mix(auto.from, 1, easeIO(k));
      blend = mix(auto.blend0, 1, clamp01(k / .35));
      render(cur);
      if (k < 1) raf = requestAnimationFrame(tick);
      else location.href = auto.href;
      return;
    }
    cur = target = scrollP(); render(cur); renderHold();
  };
  // the scroll is already smoothed by Lenis: follow it exactly, in the same frame it moves
  const read = () => { if (auto) return; if (!raf) raf = requestAnimationFrame(tick); };

  if (reduce) {
    stage.classList.add("is-static");
    measure(); cur = target = 1; render(1);
    addEventListener("resize", () => { measure(); render(1); });
  } else {
    measure();
    // arriving at /about: start with the passport already open. Done now and again once the page
    // has loaded, because the browser puts the scroll back to the top when loading finishes.
    if (startOpen) {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      const jump = () => {
        if (scrollY < stageEnd() - 2) {
          scrollTo(0, stageEnd());
          // Lenis measures the page lazily; make it measure now, or it clamps the jump back to the top
          if (window.lenis) { window.lenis.resize(); window.lenis.scrollTo(stageEnd(), { immediate: true, force: true }); }
        }
        cur = target = scrollP(); render(cur);
      };
      jump();
      const settle = () => { jump(); pathReady = true; setPath(cur > .3); };
      if (document.readyState === "complete") requestAnimationFrame(settle); else addEventListener("load", () => requestAnimationFrame(settle), { once: true });
    }
    cur = target = scrollP(); warmUp();
    if (window.lenis) window.lenis.on("scroll", () => { if (!auto) { cur = target = scrollP(); render(cur); renderHold(); } });
    else addEventListener("scroll", read, { passive: true });
    addEventListener("resize", () => { measure(); cur = target = scrollP(); warmUp(); });
    if (document.fonts) document.fonts.ready.then(() => { measure(); render(cur); });
  }

  // picking a page from the bar while the passport is still closed: open it and zoom into that page
  window.passportGo = (a) => {
    const href = a.getAttribute("href");
    // home and About are both this page: close the passport, or open it, without leaving
    if ((href === "/" || href === "/about") && !reduce && !auto) {
      const to = href === "/" ? 0 : stageEnd();
      if (window.lenis) window.lenis.scrollTo(to, { duration: 1.6 }); else scrollTo({ top: to, behavior: "smooth" });
      return true;
    }
    if (reduce || auto || cur > .97) return false;
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
    items.push({ key: "p" + i, src: p.thumb, label: p.title, href: "/projects#" + p.slug });
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
  let vw = 0, vh = 0, cw = 0, ch = 0, running = false, reelTop = 0, reelH = 0;
  // where everything sits on the page is measured here, not every frame
  const measure = () => {
    vw = innerWidth; vh = innerHeight;
    cw = Math.round(Math.max(96, Math.min(172, vw * .115)));
    fly.style.setProperty("--cw", cw + "px");
    ch = cards[0].el.offsetHeight || cw * .9;
    reelTop = reel.getBoundingClientRect().top + scrollY; reelH = reel.offsetHeight;
    cards.forEach((c) => {
      if (!c.slot) return;
      const r = c.slot.getBoundingClientRect();
      c.at = { x: r.left + r.width / 2, y: r.top + scrollY + r.height / 2, w: r.width };
    });
  };
  // every position below is the centre of the picture (not the caption), so a card can sit
  // exactly on its slot in the sentence before it moves
  const frame = () => {
    const y = scrollY, top = reelTop, span = reelH - vh;
    const A = clamp((y - (top - vh)) / (vh * .85));                 // words → pile
    const B = clamp((y - top) / (span * .33));                       // pile → ring
    const C = clamp((y - top - span * .6) / (span * .4 + vh * .75)); // ring → away, still going as the stamps scroll in
    reel.style.setProperty("--cap", clamp(B * 1.5 - .3).toFixed(3));
    const on = A > 0 && C < 1;
    fly.classList.toggle("is-on", on);
    fly.classList.toggle("is-ring", B > .98 && C < .08);
    if (!on) { cards.forEach((c) => c.slot && c.slot.classList.remove("is-empty")); return; }   // nothing on screen to move
    const cx = vw / 2, cy = vh / 2, ih = cw * 2 / 3;
    const rx = Math.min(vw * .41, vw / 2 - cw * .62), ry = Math.min(vh * .36, vh / 2 - ch * .62);
    const spin = C * .45;
    cards.forEach((c, i) => {
      const d = i / N;
      const a = ease(clamp((A - d * .35) / .65)), b = ease(clamp((B - d * .25) / .75)), cc = clamp(C);
      // start: on its slot in the sentence, or below the screen if it has none
      let sx = cx + c.fx * vw, sy = vh + ih, ss = .9, sr = c.jr * 2;
      if (c.slot) {
        sx = c.at.x; sy = c.at.y - y; ss = c.at.w / cw; sr = 0;
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
    const rt = reelTop - scrollY;
    const near = rt < vh * 2.2 && rt + reelH > -vh;
    if (near) frame();
    else if (fly.classList.contains("is-on")) { fly.classList.remove("is-on"); cards.forEach((c) => c.slot && c.slot.classList.remove("is-empty")); }
    if (near) requestAnimationFrame(loop); else running = false;
  };
  const kick = () => { if (!running) { running = true; requestAnimationFrame(loop); } };
  measure();
  addEventListener("resize", () => { measure(); kick(); });
  // text can reflow once fonts and pictures arrive, moving the slots: measure again then
  if (document.fonts) document.fonts.ready.then(measure);
  addEventListener("load", measure, { once: true });
  addEventListener("scroll", kick, { passive: true });
  kick();
})();
