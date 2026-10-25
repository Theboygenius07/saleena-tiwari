/* Craft: luggage tags for the skills, and the 3D mini me (her own Blender model) as the carry-on. */
(() => {
  const S = window.SITE;

  /* ── luggage tags, best known first: each in its own colour, with a code like a baggage tag ── */
  const COLORS = [
    ["#e4572e", "#fff6ec"], ["#f2b63c", "#2a1d10"], ["#8fc1e3", "#13263a"], ["#57101e", "#f6e9d6"],
    ["#a9c79a", "#1f2a1a"], ["#f3a6c2", "#3a1222"], ["#2f5bd3", "#f3f1ff"], ["#d9b98c", "#2b1f12"],
  ];
  const CODE = { "Microsoft 365": "365", JavaScript: "JS", Java: "JVA", GitHub: "GH", SwiftUI: "SUI", Xcode: "XC", ElevenLabs: "11L",
    MediaPipe: "MP", "Whisper Flow": "WF", "Opus Clip": "OC", CapCut: "CC", Airtable: "AT", Notion: "NTN", Apify: "APF",
    Python: "PY", Blender: "BLN", Figma: "FIG", HTML: "HTML", CSS: "CSS" };
  const code = (n) => CODE[n] || n.replace(/[^A-Za-z0-9]/g, "").slice(0, 3).toUpperCase();
  const TILT = [-1.6, 1.1, -.6, 1.5, -1.1, .7];
  document.getElementById("tags").innerHTML = [...S.skills].sort((a, b) => b.rating - a.rating).map((s, i) => {
    const [c, fg] = COLORS[i % COLORS.length];
    return `
    <div class="ltag" style="--c:${c};--fg:${fg};--r:${TILT[i % TILT.length]}deg">
      <svg class="ltag__string" viewBox="0 0 30 24" aria-hidden="true"><path d="M23 12C15 12 9 5 1 3M23 12C15 13 8 17 1 21" /></svg>
      <div class="ltag__body">
        <img src="${s.icon}" alt="" loading="lazy" width="26" height="26" />
        <span class="ltag__text"><span class="ltag__name">${s.name}</span><span class="ltag__no">No. ${String(i + 1).padStart(2, "0")}</span></span>
        <span class="ltag__code" aria-hidden="true">${code(s.name)}</span>
      </div>
    </div>`;
  }).join("");

  /* ── the carry-on: same spin-and-settle as her original page ── */
  const wrap = document.getElementById("mini-me");
  if (!wrap || !window.THREE) return;
  const canvas = document.createElement("canvas"); wrap.appendChild(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  if ("outputColorSpace" in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0.12, 5.2); camera.lookAt(0, 0.02, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x4a1f27, 1.05));
  const key = new THREE.DirectionalLight(0xffffff, 1.55); key.position.set(3, 5, 4); scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.5); fill.position.set(-4, 2, 2); scene.add(fill);
  const spin = new THREE.Group(); scene.add(spin);
  const FACE = -Math.PI / 2;
  let angle = FACE, vel = 0, dragging = false, lastX = 0, settling = false, visible = true, dirty = true;
  spin.rotation.y = angle;
  const size = () => { const w = wrap.clientWidth, h = wrap.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); dirty = true; };
  size(); addEventListener("resize", size);
  new THREE.GLTFLoader().load("/GLB/mini-me/saleena-girl.glb", (g) => {
    const m = g.scene; let box = new THREE.Box3().setFromObject(m); const s = new THREE.Vector3(); box.getSize(s);
    m.scale.setScalar(2.15 / (s.y || 1)); box = new THREE.Box3().setFromObject(m); const c = new THREE.Vector3(); box.getCenter(c);
    m.position.sub(c); spin.add(m); dirty = true;
  }, undefined, (err) => console.error("mini me failed to load", err));
  wrap.addEventListener("pointerdown", (e) => { dragging = true; settling = false; vel = 0; lastX = e.clientX; wrap.classList.add("dragging"); try { wrap.setPointerCapture(e.pointerId); } catch {} });
  wrap.addEventListener("pointermove", (e) => { if (!dragging) return; const d = (e.clientX - lastX) * 0.011; lastX = e.clientX; angle += d; vel = d; dirty = true; });
  const release = () => { if (dragging) { dragging = false; settling = true; wrap.classList.remove("dragging"); } };
  wrap.addEventListener("pointerup", release); wrap.addEventListener("pointercancel", release);
  const nearest = () => FACE + 2 * Math.PI * Math.round((angle - FACE) / (2 * Math.PI));
  if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(wrap);
  (function loop() {
    requestAnimationFrame(loop);
    if (!visible) return;
    if (!dragging) {
      if (Math.abs(vel) > 0.0016) { angle += vel; vel *= 0.95; dirty = true; }
      else if (settling) { vel = 0; const t = nearest(); angle += (t - angle) * 0.08; dirty = true; if (Math.abs(t - angle) < 0.0015) { angle = t; settling = false; } }
    }
    if (!dirty) return;
    spin.rotation.y = angle; renderer.render(scene, camera); dirty = false;
  })();
})();
