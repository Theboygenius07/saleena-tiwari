/* Shared furniture for every page: the bar, the back cover, illustration
   placeholders, smooth scrolling, and stamps pressed on as they come into view. */
(() => {
  const PAGES = [["about", "About"], ["projects", "Projects"], ["craft", "Craft"], ["education", "Education"], ["contact", "Contact"]];
  const here = document.body.dataset.page;
  const S = window.SITE || { person: { socials: [] } };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── the bar ── */
  const barSlot = document.querySelector("[data-bar]");
  let bar = null;
  if (barSlot) {
    barSlot.outerHTML = `
      <header class="bar" id="bar">
        <a class="bar__mark" href="about.html" aria-label="Saleena Tiwari, home">ST</a>
        <nav aria-label="Pages">
          <ul class="bar__links" id="bar-links">
            ${PAGES.filter(([slug]) => slug !== "contact").map(([slug, label]) => `<li><a href="${slug}.html"${slug === here ? ' aria-current="page"' : ""}>${label}</a></li>`).join("")}
          </ul>
        </nav>
        <button class="bar__menu" type="button" aria-expanded="false" aria-controls="bar-links">Menu</button>
        <a class="bar__cta" href="contact.html"${here === "contact" ? ' aria-current="page"' : ""}>Say hello <span aria-hidden="true">→</span></a>
      </header>`;
    bar = document.getElementById("bar");
    const btn = bar.querySelector(".bar__menu");
    const setOpen = (open) => { bar.classList.toggle("is-open", open); btn.setAttribute("aria-expanded", String(open)); btn.textContent = open ? "Close" : "Menu"; };
    btn.addEventListener("click", () => setOpen(!bar.classList.contains("is-open")));
    addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    document.addEventListener("click", (e) => { if (bar.classList.contains("is-open") && !bar.contains(e.target)) setOpen(false); });
    // on the landing, picking a page opens the passport into it first (about.js)
    bar.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (a && window.passportGo && window.passportGo(a)) { e.preventDefault(); setOpen(false); }
    });
  }

  /* ── the back cover ── */
  const backSlot = document.querySelector("[data-back]");
  if (backSlot) {
    const onContact = here === "contact";
    backSlot.outerHTML = `
      <footer class="back-cover">
        <div class="back-cover__inner">
          <p class="kicker">Back cover</p>
          <h2>${onContact ? "Safe travels. See you soon." : "Write me a postcard."}</h2>
          ${onContact ? "" : `<a class="btn btn--light" href="contact.html">Say hello <span class="btn__arrow" aria-hidden="true">→</span></a>`}
        </div>
        <div class="back-cover__foot">
          <span>© ${new Date().getFullYear()} Saleena Tiwari</span>
          <span class="back-cover__social">${S.person.socials.map((s) => `<a href="${s.href}" target="_blank" rel="noopener">${s.label}</a>`).join("")}</span>
          <a href="#top">Back to top ↑</a>
        </div>
        <p class="back-cover__mrz" aria-hidden="true">P&lt;SALEENA&lt;&lt;TIWARI${"&lt;".repeat(60)}</p>
      </footer>`;
  }

  window.updateBar = () => {};   // kept for about.js; the floating strip reads on every background

  /* ── illustrations that haven't been drawn yet show a quiet placeholder ── */
  window.illoFallback = (img) => {
    const box = document.createElement("div");
    box.className = "illo-missing";
    box.textContent = img.dataset.label || "Illustration on its way";
    if (img.getAttribute("style")) box.setAttribute("style", img.getAttribute("style"));
    img.replaceWith(box);
  };
  document.querySelectorAll("img.illo").forEach((img) => {
    if (img.complete && img.naturalWidth === 0) window.illoFallback(img);
    else img.addEventListener("error", () => window.illoFallback(img), { once: true });
  });

  /* ── smooth scrolling (Lenis) ── */
  if (!reduce && window.Lenis) {
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    window.lenis = lenis;
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    // in-page links glide instead of jumping
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      const id = a.getAttribute("href").slice(1);
      const to = !id || id === "top" ? 0 : document.getElementById(id);
      if (to === null) return;
      e.preventDefault();
      lenis.scrollTo(to, { offset: to === 0 ? 0 : -(bar ? bar.getBoundingClientRect().bottom : 0) - 24, duration: 1.3 });
      if (id && id !== "top") history.replaceState(null, "", "#" + id);
    });
  }

  /* ── stamps are pressed on as they come into view ── */
  const io = !reduce && "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      }), { threshold: 0.5 })
    : null;
  window.reveal = (el) => (io ? io.observe(el) : el.classList.add("is-in"));
  document.querySelectorAll(".thunk").forEach(window.reveal);
})();
