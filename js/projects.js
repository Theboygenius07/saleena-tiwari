/* Projects: builds the index and one visa per project from js/data.js, and the filters. */
(() => {
  const S = window.SITE;
  const ACCENT = ["#2f5bff", "#3d7a4f", "#d63a7a", "#57101e", "#1f63c6", "#c0332b", "#d18a1c"]; // from each visa's drawing
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const kind = (p) => (p.filters.includes("entrepreneurship") ? "Venture" : "Build");
  const mrz = (p) => `V<${p.title.toUpperCase().replace(/[^A-Z0-9]+/g, "<")}<<${p.n}<<SALEENA<<TIWARI`.padEnd(44, "<");

  /* index */
  document.getElementById("index").innerHTML = S.projects.map((p, i) => `
    <li data-i="${i}"><a href="#${p.slug}">
      <span class="index__n">${p.n}</span><span class="index__t">${esc(p.title)}</span>
      <span class="index__d">${esc(p.tagline)}</span><span class="index__go" aria-hidden="true">↓</span>
    </a></li>`).join("");

  /* visas */
  const section = (s) => {
    if (s.stats) return `<div class="sec"><h3>${esc(s.h)}</h3><div class="stats">${s.stats.map((t) => `<div><div class="stat__n">${esc(t.n)}</div><div class="stat__l">${esc(t.l)}</div></div>`).join("")}</div></div>`;
    return `<div class="sec"><h3>${esc(s.h)}</h3><p>${esc(s.p)}</p></div>`;
  };
  document.getElementById("visas").innerHTML = S.projects.map((p, i) => `
    <article class="sheet visa" id="${p.slug}" data-i="${i}" style="--accent:${ACCENT[i]};margin-top:var(--gap)">
        <aside class="visa__panel" aria-label="${esc(p.title)} visa">
          <div class="visa__head"><span>Visa · Visum · भिसा</span><span>No. ${p.n}</span></div>
          <div class="visa__art"><img class="illo" src="${p.visa}" alt="" data-label="${esc(p.title)}" loading="lazy" /></div>
          <dl class="visa__meta">
            <div><dt>Holder</dt><dd>Saleena Tiwari</dd></div>
            <div><dt>Type</dt><dd>${kind(p)}</dd></div>
            <div><dt>Fields</dt><dd>${p.filters.map((f) => S.filters.find((x) => x.key === f)?.label).join(", ")}</dd></div>
            <div><dt>Entries</dt><dd>Multiple</dd></div>
          </dl>
          <p class="visa__mrz" aria-hidden="true">${esc(mrz(p))}</p>
          <img class="visa__granted thunk" src="/assets/illustrations/stamp-granted.svg" alt="" style="--r:${[-12, 8, -6, 11, -9, 5, -14][i % 7]}deg;--delay:.25s" />
        </aside>
        <div class="visa__body">
          <h2 class="visa__title">${esc(p.title)}</h2>
          <p class="visa__tag">${esc(p.tagline)}</p>
          <div class="visa__shot"><img class="shot" src="${p.image}" alt="${esc(p.title)}" loading="lazy" decoding="async" /></div>
          <div class="sections">${p.sections.map(section).join("")}</div>
          ${p.embed ? `<div class="video" data-id="${esc(p.embed)}"><button type="button" aria-label="Play the ${esc(p.title)} demo"><img src="https://i.ytimg.com/vi/${esc(p.embed)}/hqdefault.jpg" alt="" loading="lazy" /><span class="video__play">▶ Play the demo</span></button></div>` : ""}
          ${p.links.length ? `<div class="links">${p.links.map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div>` : ""}
        </div>
    </article>`).join("");

  /* the index: the visa's drawing floats beside the cursor */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const peek = document.createElement("div");
    peek.className = "float-peek"; peek.setAttribute("aria-hidden", "true");
    peek.innerHTML = '<img alt="" />';
    document.body.appendChild(peek);
    const pimg = peek.querySelector("img");
    S.projects.forEach((p) => { const i = new Image(); i.src = p.thumb; });
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0, on = false;
    const step = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      peek.style.setProperty("--fx", (x + 32).toFixed(1) + "px");
      peek.style.setProperty("--fy", (y - 96).toFixed(1) + "px");
      raf = on || Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5 ? requestAnimationFrame(step) : 0;
    };
    const index = document.getElementById("index");
    index.addEventListener("pointermove", (e) => {
      tx = e.clientX; ty = e.clientY;
      const li = e.target.closest("li[data-i]");
      if (li) {
        const p = S.projects[+li.dataset.i];
        if (!pimg.src.endsWith(p.thumb.replace("..", ""))) pimg.src = p.thumb;
        if (!on) { x = tx; y = ty; }
        on = true; peek.classList.add("is-on");
      }
      if (!raf) raf = requestAnimationFrame(step);
    });
    index.addEventListener("pointerleave", () => { on = false; peek.classList.remove("is-on"); });
  }

  /* demo videos load only when asked */
  document.querySelectorAll(".video").forEach((v) => v.querySelector("button").addEventListener("click", () => {
    v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.dataset.id}?autoplay=1&rel=0" title="Demo video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  }));

  /* filters */
  const bar = document.getElementById("filters");
  const apply = (key) => {
    bar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.key === key)));
    S.projects.forEach((p, i) => {
      const show = key === "all" || (key === "featured" ? S.featured.includes(i) : p.filters.includes(key));
      document.querySelectorAll(`[data-i="${i}"]`).forEach((el) => el.classList.toggle("is-hidden", !show));
    });
  };
  bar.innerHTML = S.filters.map((f) => `<button type="button" data-key="${f.key}" aria-pressed="false">${esc(f.label)}</button>`).join("");
  bar.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) apply(b.dataset.key); });
  apply("all");
})();
