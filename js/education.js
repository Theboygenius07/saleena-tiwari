/* Education: the itinerary map draws its route as you scroll. Each pin drops when the line
   reaches it, and the plane flies at the head of the line until it reaches its spot over the Atlantic. */
(() => {
  const map = document.querySelector(".map"), img = map && map.querySelector("img.illo");
  if (!img || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const NS = "http://www.w3.org/2000/svg";

  fetch(img.src).then((r) => (r.ok ? r.text() : Promise.reject())).then((txt) => {
    const holder = document.createElement("div");
    holder.className = "map__svg";
    holder.innerHTML = txt.replace(/<!--[\s\S]*?-->/g, "");
    const svg = holder.querySelector("svg");
    svg.removeAttribute("width"); svg.removeAttribute("height");
    svg.setAttribute("aria-hidden", "true");
    img.replaceWith(holder);
    map.classList.add("is-live");

    // the dotted legs are drawn through a solid mask, so the dots stay dots
    const defs = document.createElementNS(NS, "defs");
    svg.prepend(defs);
    let total = 0;
    const legs = [...svg.querySelectorAll("path[stroke-dasharray]")].map((p, i) => {
      const m = document.createElementNS(NS, "mask");
      m.id = "leg-" + i;
      m.setAttribute("maskUnits", "userSpaceOnUse");
      const q = document.createElementNS(NS, "path");
      q.setAttribute("d", p.getAttribute("d"));
      q.setAttribute("fill", "none"); q.setAttribute("stroke", "#fff");
      q.setAttribute("stroke-width", "16"); q.setAttribute("stroke-linecap", "round");
      m.appendChild(q); defs.appendChild(m);
      p.setAttribute("mask", `url(#leg-${i})`);
      const len = p.getTotalLength();
      q.style.strokeDasharray = `${len} ${len + 20}`;
      const leg = { p, q, len, start: total };
      total += len;
      return leg;
    });

    // each pin is a teardrop path followed by its white dot; group them so they drop together
    const pins = [...svg.querySelectorAll("path")].filter((p) => /A16 16/.test(p.getAttribute("d"))).map((p) => {
      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "pin");
      const dot = p.nextElementSibling;
      p.before(g); g.appendChild(p);
      if (dot && dot.tagName === "circle") g.appendChild(dot);
      return g;
    });
    const labels = [...map.querySelectorAll(".map__label")];

    // the plane: rides the head of the line, then waits at its drawn spot (the middle of the last leg)
    const plane = [...svg.querySelectorAll("g[transform]")].find((g) => /rotate/.test(g.getAttribute("transform")));
    const last = legs[legs.length - 1];
    let park = total;
    if (plane && last) {
      const m = /translate\(([\d.]+)[ ,]+([\d.]+)\)/.exec(plane.getAttribute("transform"));
      const px = +m[1], py = +m[2];
      let best = 1e9;
      for (let s = 0; s <= last.len; s += 2) {
        const pt = last.p.getPointAtLength(s), d = (pt.x - px) ** 2 + (pt.y - py) ** 2;
        if (d < best) { best = d; park = last.start + s; }
      }
    }
    const pointAt = (dist) => {
      const leg = legs.find((l) => dist <= l.start + l.len) || last;
      const s = Math.max(0, Math.min(leg.len, dist - leg.start));
      const a = leg.p.getPointAtLength(s), b = leg.p.getPointAtLength(Math.min(leg.len, s + 1.5)), c = leg.p.getPointAtLength(Math.max(0, s - 1.5));
      // the plane's nose points along -x, so turn it to face the direction of travel
      const ang = Math.atan2(b.y - c.y, b.x - c.x) * 180 / Math.PI + 180;
      return { x: a.x, y: a.y, ang };
    };

    let shown = -1, raf = 0;
    const draw = () => {
      raf = 0;
      const r = map.getBoundingClientRect(), vh = innerHeight;
      const t = Math.min(1, Math.max(0, (vh * 0.82 - r.top) / (vh * 0.42 + r.height * 0.5)));
      const head = t * total;
      legs.forEach((l) => {
        const k = Math.min(1, Math.max(0, (head - l.start) / l.len));
        l.q.style.strokeDashoffset = (l.len * (1 - k)).toFixed(1);
      });
      // a pin drops once the line has reached it
      const reached = t <= 0 ? -1 : legs.filter((l) => head >= l.start + l.len - 4).length;
      if (reached !== shown) {
        shown = reached;
        pins.forEach((g, i) => g.classList.toggle("is-down", i <= reached));
        labels.forEach((el, i) => el.classList.toggle("is-in", i <= reached));
      }
      if (plane) {
        const pt = pointAt(Math.min(head, park));
        plane.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)}) rotate(${pt.ang.toFixed(1)})`);
        plane.style.opacity = t > 0 ? 1 : 0;
      }
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", kick);
    draw();
  }).catch(() => {});
})();
