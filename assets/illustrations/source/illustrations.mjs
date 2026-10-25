#!/usr/bin/env node
/**
 * Saleena Tiwari's passport-sketchbook illustrations (BRIEF.md), drawn by code in the grill stickers' hand:
 * flat colour, one ink-navy outline weight, depth from a darker shade of the same colour, no gradients, no
 * filters, no raster. Stamps get their worn rubber look from a mask of seeded specks and nicks (still plain
 * vector). Stamp and postmark text is <text> in "Saans, Helvetica, Arial", each line held to a set length
 * (textLength) so it lays out the same in any of those faces. Each viewBox is fitted to its drawing.
 *
 *   node assets/illustrations/source/illustrations.mjs   → assets/illustrations/*.svg and preview/*.png
 */
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(HERE, '..')
const FONTS = resolve(HERE, '../../../fonts')
const require = createRequire('/Users/user/Projects/cutroom/package.json')
const { chromium } = require('playwright')

/* the hand */
const INK = '#1E2B40', PAPER = '#f3ede2', WINE = '#57101e', GOLD = '#c9a24b', GOLD2 = '#9c7a2e'
const RED = '#b5302a', BLUE = '#2f4fa2', GREEN = '#3d7a4f', CREAM = '#FFF8EC', W = '#FFFFFF', OL = 8
const shade = (hex, f = 0.74) => '#' + [1, 3, 5].map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * f).toString(16).padStart(2, '0')).join('')
const tint = (hex, f = 0.45) => '#' + [1, 3, 5].map((i) => { const v = parseInt(hex.slice(i, i + 2), 16); return Math.round(v + (255 - v) * f).toString(16).padStart(2, '0') }).join('')
const o = (extra = '') => `stroke="${INK}" stroke-width="${OL}" stroke-linejoin="round" stroke-linecap="round" ${extra}`
const rr = (x, y, w, h, r) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"`
const poly = (pts) => 'M' + pts.map((p) => p.map((v) => +v.toFixed(1)).join(' ')).join('L') + 'Z'
const tube = (d, w, col, ol = OL) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + ol * 2}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`
let seed = 11
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296)
const FONT = 'Saans, Helvetica, Arial'

const PIECES = []
const add = (name, art, { bg = PAPER } = {}) => PIECES.push({ name, art, bg })

/* ------------------------------------------------------------------ 1. the cover's crest: gold line art */
{
  const g = (w = 6, c = GOLD) => `fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`
  // a laurel: two branches rising from the base up the sides, leaves along each, alternately in and out
  const R = 150, deg = Math.PI / 180
  const branch = (from, to) => { const a0 = from * deg, a1 = to * deg; return `M${(200 + R * Math.cos(a0)).toFixed(1)} ${(206 + R * Math.sin(a0)).toFixed(1)}A${R} ${R} 0 0 ${to > from ? 1 : 0} ${(200 + R * Math.cos(a1)).toFixed(1)} ${(206 + R * Math.sin(a1)).toFixed(1)}` }
  const leaves = (from, to) => Array.from({ length: 9 }, (_, k) => {
    const a = from + ((to - from) * (k + 0.6)) / 9, x = 200 + R * Math.cos(a * deg), y = 206 + R * Math.sin(a * deg)
    const along = to > from ? a + 180 : a, tilt = (k % 2 ? 1 : -1) * 34
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(along + tilt).toFixed(1)})"><path d="M0 0C11 -10 11 -30 0 -42C-11 -30 -11 -10 0 0Z" ${g(5)}/><path d="M0 -4V-34" ${g(3, GOLD2)}/></g>`
  }).join('')
  add('cover-crest', `
  <path d="${branch(100, 232)}" ${g(5)}/><path d="${branch(80, -52)}" ${g(5)}/>
  ${leaves(100, 232)}${leaves(80, -52)}
  <path d="M138 342Q200 366 262 342" ${g(6)}/><path d="M184 352L200 370L216 352" ${g(5)}/>
  <path d="M104 214L150 150L176 182L214 118L258 186L282 160L300 214" ${g(6, GOLD2)}/>
  <path d="M206 132L214 118L222 132" ${g(4, GOLD2)}/>
  ${rr(146, 176, 108, 72, 8)} ${g(7)}/>
  ${rr(158, 188, 84, 48, 3)} ${g(4, GOLD2)}/>
  <path d="M128 262H272L262 248H138Z" ${g(7)}/>
  <path d="M200 198L204 208L214 212L204 216L200 226L196 216L186 212L196 208Z" ${g(4)}/>
  <path d="M200 40L206 56L222 58L210 68L214 84L200 76L186 84L190 68L178 58L194 56Z" ${g(5)}/>`, { bg: WINE })
}

/* ------------------------------------------------------------------ 2. visas: one per project */
add('visa-01-cohort', (() => { const c = '#3358ff'; return `
  <path d="M120 150Q120 104 200 104Q280 104 280 150V318Q280 340 258 340H142Q120 340 120 318Z" fill="${c}" ${o()}/>
  <path d="M152 104Q152 70 200 70Q248 70 248 104" fill="none" ${o('stroke-width="12"')}/>
  <path d="M120 200Q200 226 280 200" fill="none" stroke="${shade(c)}" stroke-width="10"/>
  ${rr(150, 240, 100, 74, 16)} fill="${shade(c)}" ${o()}/>
  <path d="M168 262H232" stroke="${tint(c, 0.6)}" stroke-width="7" stroke-linecap="round"/>
  <path d="M120 150Q120 104 200 104Q280 104 280 150V318Q280 340 258 340H142Q120 340 120 318Z" fill="none" ${o()}/>
  <path d="M262 92Q262 40 316 40H336Q372 40 372 76Q372 112 336 112H306L286 132L290 106Q262 100 262 92Z" fill="${CREAM}" ${o()}/>
  <circle cx="300" cy="76" r="8" fill="${c}"/><circle cx="324" cy="76" r="8" fill="#F8A81B"/><circle cx="348" cy="76" r="8" fill="${RED}"/>
  <path d="M86 92L92 108L108 114L92 120L86 136L80 120L64 114L80 108Z" fill="#F8C93C" ${o('stroke-width="5"')}/>` })())

add('visa-02-pantry', (() => { const c = GREEN; return `
  ${rr(150, 60, 150, 280, 26)} fill="${INK}" ${o()}/>
  ${rr(163, 82, 124, 236, 10)} fill="${tint('#BFE3F2', 0.5)}"/>
  <path d="M163 150H287M163 214H287M163 270H287" stroke="${INK}" stroke-width="5" opacity="0.5"/>
  <circle cx="190" cy="132" r="15" fill="${RED}" ${o('stroke-width="5"')}/><path d="M190 117Q194 108 200 108" fill="none" stroke="${GREEN}" stroke-width="5" stroke-linecap="round"/>
  ${rr(224, 104, 30, 44, 6)} fill="${W}" ${o('stroke-width="5"')}/>${rr(224, 104, 30, 12, 4)} fill="${BLUE}"/>
  <path d="M184 168L206 206M196 166L190 176" fill="none" stroke="#F08A24" stroke-width="12" stroke-linecap="round"/><path d="M196 162L202 152M190 164L186 154" stroke="${GREEN}" stroke-width="5" stroke-linecap="round"/>
  <circle cx="250" cy="194" r="16" fill="${c}" ${o('stroke-width="5"')}/><circle cx="268" cy="250" r="14" fill="#F2C94C" ${o('stroke-width="5"')}/><circle cx="196" cy="252" r="16" fill="${RED}" ${o('stroke-width="5"')}/>
  <path d="M163 82L80 106Q70 110 70 120V292Q70 302 80 304L163 318Z" fill="${CREAM}" ${o()}/>
  <path d="M163 82L80 106Q70 110 70 120V292Q70 302 80 304L163 318Z" fill="${tint(c, 0.82)}"/>
  <path d="M163 82L80 106Q70 110 70 120V292Q70 302 80 304L163 318Z" fill="none" ${o()}/>
  <path d="M92 168V230" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
  <path d="M98 128H150M98 270H150" stroke="${c}" stroke-width="6" stroke-linecap="round" opacity="0.7"/>` })())

add('visa-03-hypehub', (() => { const c = '#E0457B'; return `
  <path d="M60 300Q200 330 340 300" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round" opacity="0.35"/>
  <path d="M96 150Q80 170 92 194M104 214Q92 236 108 256" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
  ${tube('M200 178L150 128', 22, c)}${tube('M206 176L262 140L294 96', 22, c)}
  ${tube('M196 232L150 268L120 296', 24, shade(c))}${tube('M206 232L238 280L286 290', 24, c)}
  <path d="M176 160Q200 148 226 160L220 240Q200 250 182 240Z" fill="${c}" ${o()}/>
  <circle cx="206" cy="120" r="26" fill="#F2C9A0" ${o()}/>
  <path d="M182 108Q190 84 214 90Q236 96 230 120Q220 104 196 112Z" fill="${INK}"/>
  <path d="M312 70L320 54M330 86L348 80M300 56L298 38" stroke="#F8A81B" stroke-width="7" stroke-linecap="round"/>
  <g transform="rotate(-10 320 230)">${rr(290, 196, 64, 108, 12)} fill="${INK}" ${o()}/>${rr(298, 206, 48, 74, 4)} fill="${tint(c, 0.7)}"/><circle cx="322" cy="292" r="5" fill="${W}"/><circle cx="335" cy="216" r="5" fill="${RED}"/></g>
  <path d="M290 230Q260 226 248 216" fill="none" stroke="${INK}" stroke-width="4" stroke-dasharray="2 9" stroke-linecap="round"/>` })())

add('visa-04-x-automation', (() => { const c = WINE; return `
  <path d="M56 284L200 304L344 284V312L200 332L56 312Z" fill="${c}" ${o()}/>
  <path d="M60 140Q130 118 200 150V306Q130 278 60 290Z" fill="${CREAM}" ${o()}/>
  <path d="M340 140Q270 118 200 150V306Q270 278 340 290Z" fill="${W}" ${o()}/>
  <path d="M84 176Q130 164 176 184M84 206Q130 194 176 214M84 236Q130 224 176 244M84 266Q120 256 150 268" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round" opacity="0.45"/>
  <path d="M224 184Q270 168 316 176M224 214Q270 198 316 206M224 244Q260 230 290 236" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round" opacity="0.45"/>
  <path d="M200 150V306" stroke="${INK}" stroke-width="6"/>
  <path d="M238 150Q262 104 300 84" fill="none" stroke="${INK}" stroke-width="5" stroke-dasharray="3 12" stroke-linecap="round"/>
  <path d="M296 84L370 36L338 108L322 88Z" fill="${W}" ${o()}/><path d="M322 88L370 36L312 92Z" fill="${tint(BLUE, 0.6)}" ${o('stroke-width="6"')}/>
  <path d="M322 88L330 112L338 108" fill="${tint(BLUE, 0.6)}" ${o('stroke-width="6"')}/>` })())

add('visa-05-linkedin-scraper', (() => { const c = '#0A66C2'; const cyl = (y) => `<path d="M90 ${y}V${y + 62}Q90 ${y + 86} 160 ${y + 86}Q230 ${y + 86} 230 ${y + 62}V${y}" fill="${c}" ${o()}/><ellipse cx="160" cy="${y}" rx="70" ry="24" fill="${tint(c, 0.4)}" ${o()}/><path d="M90 ${y + 34}Q90 ${y + 58} 160 ${y + 58}Q230 ${y + 58} 230 ${y + 34}" fill="none" stroke="${shade(c, 0.7)}" stroke-width="6"/>`; return `
  ${cyl(196)}${cyl(110)}
  <g transform="translate(250 270)"><path d="M-44 -6A44 44 0 0 1 34 -28" fill="none" stroke="${GREEN}" stroke-width="11" stroke-linecap="round"/><path d="M20 -38L36 -28L24 -12" fill="none" stroke="${GREEN}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M44 6A44 44 0 0 1 -34 28" fill="none" stroke="${GREEN}" stroke-width="11" stroke-linecap="round"/><path d="M-20 38L-36 28L-24 12" fill="none" stroke="${GREEN}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></g>
  <g transform="rotate(6 300 150)">${rr(246, 70, 120, 150, 14)} fill="${W}" ${o()}/>
    ${rr(246, 70, 120, 34, 12)} fill="${c}"/>${rr(246, 70, 120, 150, 14)} fill="none" ${o()}/>
    <circle cx="306" cy="122" r="24" fill="#F2C9A0" ${o('stroke-width="6"')}/><path d="M282 118Q290 92 316 100Q334 106 328 124Q318 110 296 118Z" fill="${INK}"/>
    <path d="M272 170H340M272 194H322" stroke="${INK}" stroke-width="7" stroke-linecap="round" opacity="0.5"/></g>` })())

add('visa-06-yap', (() => { const notes = [['#F8C93C', 238, 92, -12], ['#F49AC1', 300, 150, 9], ['#8ED1A5', 250, 214, -6], ['#9BC1F2', 316, 262, 12]]; return `
  ${rr(70, 90, 120, 230, 22)} fill="${INK}" ${o()}/>
  ${rr(82, 112, 96, 180, 8)} fill="${tint(BLUE, 0.75)}"/>
  <circle cx="130" cy="216" r="30" fill="${RED}" ${o('stroke-width="6"')}/>${rr(122, 196, 16, 30, 8)} fill="${W}"/><path d="M114 220Q130 242 146 220M130 236V246" fill="none" stroke="${W}" stroke-width="5" stroke-linecap="round"/>
  <path d="M196 176Q206 190 196 204M212 162Q230 190 212 218M228 150Q252 190 228 230" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  ${notes.map(([c, x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})">${rr(-36, -34, 72, 68, 6)} fill="${c}" ${o('stroke-width="6"')}/><path d="M-22 -12H22M-22 6H14" stroke="${INK}" stroke-width="5" stroke-linecap="round" opacity="0.45"/></g>`).join('')}` })())

add('visa-07-greentop', (() => { const c = GREEN; return `
  <circle cx="300" cy="96" r="46" fill="#F8B93C" ${o()}/>
  <path d="M300 30V18M300 174V162M234 96H222M378 96H366M254 50L246 42M354 150L346 142M346 50L354 42" stroke="#F8B93C" stroke-width="8" stroke-linecap="round"/>
  <path d="M84 180L204 150L286 178V340H84Z" fill="${tint(RED, 0.15)}" ${o()}/>
  <path d="M204 150L286 178V340H204Z" fill="${shade(tint(RED, 0.15), 0.78)}"/>
  <path d="M84 180L204 150L286 178V340H84Z" fill="none" ${o()}/>
  <path d="M72 182L204 146L298 176L286 196L204 170L84 200Z" fill="${W}" ${o()}/>
  ${[[110, 222], [150, 222], [110, 270], [150, 270]].map(([x, y]) => `${rr(x, y, 26, 30, 3)} fill="${tint(BLUE, 0.65)}" ${o('stroke-width="5"')}/>`).join('')}
  ${[[224, 222], [254, 232], [224, 274], [254, 284]].map(([x, y]) => `${rr(x, y, 20, 28, 3)} fill="${tint(BLUE, 0.4)}" ${o('stroke-width="5"')}/>`).join('')}
  <g transform="rotate(-6 336 280)">${rr(296, 226, 82, 106, 8)} fill="${W}" ${o()}/>
    ${[250, 280, 310].map((y) => `<path d="M310 ${y}L318 ${y + 8}L332 ${y - 8}" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M340 ${y}H364" stroke="${INK}" stroke-width="5" stroke-linecap="round" opacity="0.45"/>`).join('')}</g>
  <path d="M60 340H360" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>` })())

/* ------------------------------------------------------------------ 3. stamps: rubber, one ink each, worn */
const wear = (id, box, n = 160, keepClear = []) => {
  // the rubber's wear: specks knocked out, and a few nicks off the edge, seeded so it is the same every time
  const [x0, y0, w, h] = box
  // over lines of words (keepClear), only the finest specks: a bigger one can turn an I into a !
  const specks = Array.from({ length: n }, () => { const x = x0 + rnd() * w, y = y0 + rnd() * h; let r = 0.7 + rnd() * rnd() * 2.6; if (keepClear.some(([a, b, c, d]) => x > a && x < c && y > b && y < d)) r = Math.min(r, 0.8); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#000"/>` }).join('')
  const streaks = Array.from({ length: 3 }, () => { const x = x0 + rnd() * w, y = y0 + rnd() * h; return `<path d="M${x.toFixed(1)} ${y.toFixed(1)}l${(rnd() * 30 - 15).toFixed(1)} ${(rnd() * 8 - 4).toFixed(1)}" stroke="#000" stroke-width="${(1.2 + rnd() * 1.4).toFixed(1)}" stroke-linecap="round"/>` }).join('')
  return `<mask id="${id}" maskUnits="userSpaceOnUse" x="${x0 - 40}" y="${y0 - 40}" width="${w + 80}" height="${h + 80}"><rect x="${x0 - 40}" y="${y0 - 40}" width="${w + 80}" height="${h + 80}" fill="#fff"/>${specks}${streaks}</mask>`
}
const T = (txt, x, y, size, len, { weight = 700, anchor = 'middle', ls = 0 } = {}) => `<text x="${x}" y="${y}" font-family="${FONT}" font-weight="${weight}" font-size="${size}" text-anchor="${anchor}" letter-spacing="${ls}" textLength="${len}" lengthAdjust="spacingAndGlyphs">${txt}</text>`
const arc = (id, cx, cy, r, top = true) => `<path id="${id}" d="${top ? `M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}` : `M${cx - r} ${cy}A${r} ${r} 0 0 0 ${cx + r} ${cy}`}" fill="none"/>`
const onArc = (id, txt, size, len) => `<text font-family="${FONT}" font-weight="700" font-size="${size}"><textPath href="#${id}" startOffset="50%" text-anchor="middle" textLength="${len}" lengthAdjust="spacingAndGlyphs">${txt}</textPath></text>`
const stamp = (name, ink, body, box, n = 160, keepClear = []) => add(name, `<defs>${wear(`w-${name}`, box, n, keepClear)}</defs><g mask="url(#w-${name})" fill="${ink}" stroke="${ink}" opacity="0.92">${body}</g>`)
const ring = (cx, cy, r, w = 7) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke-width="${w}"/>`

stamp('stamp-01-waves-of-action', BLUE, `
  ${ring(200, 200, 150, 8)}${ring(200, 200, 136, 4)}${ring(200, 200, 88, 4)}
  <defs>${arc('a1t', 200, 202, 110)}${arc('a1b', 200, 198, 122, false)}</defs>
  <g stroke="none">${onArc('a1t', 'WAVES OF ACTION', 30, 300)}${onArc('a1b', 'FELLOW · FRANCE', 28, 250)}</g>
  <path d="M196 140V240M196 144L240 222H196Z" fill="none" stroke-width="6" stroke-linejoin="round"/><path d="M190 152L160 222H190Z" stroke-width="5" stroke-linejoin="round"/>
  <path d="M146 236H254L240 252H160Z" stroke-width="5" stroke-linejoin="round"/>
  <path d="M136 266Q152 256 168 266T200 266T232 266T264 266" fill="none" stroke-width="6" stroke-linecap="round"/>
  <circle cx="72" cy="200" r="5" stroke="none"/><circle cx="328" cy="200" r="5" stroke="none"/>`, [40, 40, 320, 320])

stamp('stamp-02-jugend-debattiert', RED, `
  ${rr(46, 96, 308, 208, 6)} fill="none" stroke-width="8"/>${rr(60, 110, 280, 180, 4)} fill="none" stroke-width="4"/>
  <path d="M86 140Q86 128 98 128H170Q182 128 182 140V178Q182 190 170 190H124L104 208L108 190H98Q86 190 86 178Z" fill="none" stroke-width="6" stroke-linejoin="round"/>
  <path d="M106 150H162M106 168H148" stroke-width="5" stroke-linecap="round"/>
  <g stroke="none">${T('JUGEND', 264, 158, 34, 128)}${T('DEBATTIERT', 264, 194, 26, 128)}${T('STATE FINALIST', 200, 262, 30, 236)}</g>
  <path d="M86 226H314" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/>`, [40, 90, 320, 220])

stamp('stamp-03-faculty-honors', GREEN, `
  <ellipse cx="200" cy="200" rx="166" ry="118" fill="none" stroke-width="8"/><ellipse cx="200" cy="200" rx="150" ry="102" fill="none" stroke-width="4"/>
  <g stroke="none">${T('FACULTY HONORS', 200, 154, 24, 172)}${T('4.0', 200, 236, 92, 140)}${T('GPA', 200, 280, 28, 64)}</g>
  <path d="M104 150L116 158M296 150L284 158" stroke-width="5" stroke-linecap="round"/>`, [30, 78, 340, 244])

stamp('stamp-04-rise-fellow', WINE, `
  <path d="${poly([[200, 40], [342, 120], [342, 280], [200, 360], [58, 280], [58, 120]])}" fill="none" stroke-width="8" stroke-linejoin="round"/>
  <path d="${poly([[200, 56], [328, 128], [328, 272], [200, 344], [72, 272], [72, 128]])}" fill="none" stroke-width="4" stroke-linejoin="round"/>
  <g stroke="none">${T('RISE', 200, 128, 46, 112)}${T('GLOBAL FELLOW', 200, 270, 26, 196)}${T('1 OF 100', 200, 306, 24, 118)}</g>
  <path d="M136 220A64 64 0 0 1 264 220Z" stroke-width="5"/><path d="M118 232H282" stroke-width="6" stroke-linecap="round"/>
  <path d="M200 140V152M150 160L158 168M250 160L242 168M118 194L130 198M282 194L270 198" stroke-width="6" stroke-linecap="round"/>`, [50, 34, 300, 332])

stamp('stamp-05-rise-summit', BLUE, `
  ${rr(48, 80, 304, 240, 36)} fill="none" stroke-width="8"/>${rr(62, 94, 276, 212, 26)} fill="none" stroke-width="4"/>
  <g stroke="none">${T('RISE SUMMIT', 200, 136, 30, 196)}${T('OXFORD', 200, 292, 30, 128)}</g>
  <path d="M112 252V196L124 170L136 196V252M150 252V180L166 140L182 180V252M200 252V190L212 162L224 190V252M240 252V176L256 142L272 176V252M286 252V202L296 182L306 202V252" fill="none" stroke-width="6" stroke-linejoin="round"/>
  <path d="M96 252H304" stroke-width="7" stroke-linecap="round"/>`, [40, 74, 320, 252])

stamp('stamp-06-georgia-tech', GOLD2, `
  ${ring(200, 200, 154, 8)}${ring(200, 200, 140, 4)}
  <defs>${arc('a6t', 200, 204, 116)}${arc('a6b', 200, 196, 126, false)}</defs>
  <g stroke="none">${onArc('a6t', 'GEORGIA TECH · CS HONORS', 25, 330)}${onArc('a6b', 'ATLANTA', 28, 140)}</g>
  <path d="M176 262V176L200 140L224 176V262" fill="none" stroke-width="6" stroke-linejoin="round"/><path d="M200 140V118M192 124H208" stroke-width="5" stroke-linecap="round"/>
  ${rr(190, 184, 20, 24, 2)} fill="none" stroke-width="4"/>${rr(160, 216, 80, 46, 2)} fill="none" stroke-width="5"/>
  <path d="M174 238H226" stroke-width="4" stroke-dasharray="6 6"/>
  <path d="M86 200L92 210M314 200L308 210" stroke-width="5" stroke-linecap="round"/>`, [40, 40, 320, 320])

stamp('stamp-07-start-scholar', RED, `
  <path d="${Array.from({ length: 36 }, (_, i) => { const a = (i / 36) * Math.PI * 2, r = i % 2 ? 150 : 160; return `${i ? 'L' : 'M'}${(200 + r * Math.cos(a)).toFixed(1)} ${(200 + r * 0.82 * Math.sin(a)).toFixed(1)}` }).join('')}Z" fill="none" stroke-width="7" stroke-linejoin="round"/>
  <ellipse cx="200" cy="200" rx="128" ry="102" fill="none" stroke-width="4"/>
  <g stroke="none">${T('START', 200, 140, 32, 112)}${T('SCHOLAR', 200, 262, 30, 148)}${T('DEUTSCHLAND', 200, 286, 17, 118)}</g>
  <path d="M200 152L210 180L240 181L216 199L225 228L200 210L175 228L184 199L160 181L190 180Z" stroke-width="4" stroke-linejoin="round"/>`, [36, 64, 328, 272])

stamp('stamp-08-state-representative', GREEN, `
  <path d="M86 70H314L346 102V298L314 330H86L54 298V102Z" fill="none" stroke-width="8" stroke-linejoin="round"/>
  <path d="M92 84H308L332 108V292L308 316H92L68 292V108Z" fill="none" stroke-width="4" stroke-linejoin="round"/>
  <g stroke="none">${T('STATE', 200, 120, 26, 92)}${T('REPRESENTATIVE', 200, 150, 22, 200)}${T('SCHLESWIG-HOLSTEIN', 200, 290, 18, 200)}</g>
  <path d="M186 256L192 186H208L214 256Z" fill="none" stroke-width="5" stroke-linejoin="round"/><path d="M189 220H211M187 240H213" stroke-width="5"/>
  <path d="M184 186H216L208 172H192Z" stroke-width="4" stroke-linejoin="round"/><circle cx="200" cy="166" r="7" stroke="none"/>
  <path d="M214 172L262 158M214 180L262 196M186 172L138 158M186 180L138 196" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
  <path d="M120 262Q140 254 160 262T200 262T240 262T280 262" fill="none" stroke-width="5" stroke-linecap="round"/>`, [48, 64, 304, 272])

/* ------------------------------------------------------------------ 4. the doodle kit: ink navy, one colour */
const d = (w = 6) => `fill="none" stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`
add('doodle-arrow', `<path d="M40 150C80 60 150 50 170 100C186 140 130 160 120 120C110 80 200 60 260 92" ${d()}/><path d="M236 70L262 93L232 110" ${d()}/>`)
add('doodle-star', `<path d="M100 30L117 78L166 80L127 109L141 156L100 128L59 156L73 109L34 80L83 78Z" ${d()}/><path d="M152 40L160 32M170 60L182 58" ${d(5)}/>`)
add('doodle-underline', `<path d="M10 30C40 14 60 44 90 28S140 14 170 30S220 44 250 26S300 14 330 30S380 42 410 24" ${d(6)}/>`)
add('doodle-circle', `<path d="M60 92C40 50 120 26 200 30C290 34 352 62 342 104C332 146 240 162 160 156C86 150 40 124 52 90C62 62 120 46 168 44" ${d(6)}/>`)
add('doodle-plane', `<path d="M30 160C70 150 90 110 70 96C52 84 40 120 80 126C120 132 150 100 180 84" fill="none" stroke="${INK}" stroke-width="5" stroke-dasharray="2 12" stroke-linecap="round"/><path d="M190 80L290 36L246 132L228 104Z" ${d()}/><path d="M228 104L290 36L216 94Z" ${d(5)}/><path d="M228 104L236 128L246 132" ${d(5)}/>`)
add('doodle-tape', `<path d="M20 30L34 22L48 30L62 22L76 30L90 22L104 30L118 22L132 30L146 22L160 30L174 22L188 30L202 22L216 30L230 22L244 30V86L230 94L216 86L202 94L188 86L174 94L160 86L146 94L132 86L118 94L104 86L90 94L76 86L62 94L48 86L34 94L20 86Z" fill="${GOLD}" fill-opacity="0.55" stroke="${shade(GOLD, 0.8)}" stroke-width="3" stroke-opacity="0.6" stroke-linejoin="round"/><path d="M40 46L80 46M100 70L170 70M190 48L224 48" stroke="${W}" stroke-width="4" stroke-linecap="round" opacity="0.5"/>`)
add('doodle-paperclip', `<path d="M70 210V70Q70 34 104 34Q138 34 138 70V196Q138 220 116 220Q94 220 94 196V84" ${d(7)}/>`)

/* ------------------------------------------------------------------ 5. the contact postcard */
{
  // the paper's edge, perforated: bites along each side
  const perfEdge = (x, y, w, h, n = 9, r = 8) => {
    const side = (ax, ay, bx, by) => { let d = ''; for (let k = 0; k < n; k++) { const t0 = (k + 0.5 - 0.32) / n, t1 = (k + 0.5 + 0.32) / n; d += `L${(ax + (bx - ax) * t0).toFixed(1)} ${(ay + (by - ay) * t0).toFixed(1)}A${r} ${r} 0 0 0 ${(ax + (bx - ax) * t1).toFixed(1)} ${(ay + (by - ay) * t1).toFixed(1)}` } return d + `L${bx} ${by}` }
    return `M${x} ${y}` + side(x, y, x + w, y) + side(x + w, y, x + w, y + h) + side(x + w, y + h, x, y + h) + side(x, y + h, x, y) + 'Z'
  }
  add('postage-stamp', `
  <path d="${perfEdge(40, 40, 288, 288)}" fill="${W}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <rect x="62" y="62" width="244" height="244" fill="#F6A26B"/>
  <rect x="62" y="62" width="244" height="80" fill="#E8758C"/><rect x="62" y="142" width="244" height="50" fill="#F28C6E"/>
  <circle cx="200" cy="220" r="52" fill="#FFD36E"/>
  <path d="M62 306V236H84V214H100V246H118V188H132L140 170L148 188H160V250H176V206H196V158L206 132L216 158V250H232V222H252V196H270V242H288V230H306V306Z" fill="${WINE}"/>
  <path d="M196 158H216M118 188H160" stroke="${shade(WINE, 0.7)}" stroke-width="4"/>
  ${[[124, 200], [124, 218], [150, 200], [150, 218], [202, 172], [202, 192], [210, 212], [256, 206], [256, 224]].map(([x, y]) => `${rr(x, y, 6, 8, 1)} fill="#FFD36E" opacity="0.85"/>`).join('')}
  <rect x="62" y="62" width="244" height="244" fill="none" stroke="${INK}" stroke-width="5"/>`)
  const waves = Array.from({ length: 5 }, (_, i) => `<path d="M206 ${132 + i * 30}C226 ${118 + i * 30} 246 ${146 + i * 30} 266 ${132 + i * 30}S306 ${118 + i * 30} 326 ${132 + i * 30}S366 ${146 + i * 30} 386 ${132 + i * 30}" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`).join('')
  add('postmark', `<defs>${wear('w-postmark', [30, 90, 360, 220], 90)}${arc('pmt', 120, 192, 66)}${arc('pmb', 120, 188, 74, false)}</defs>
  <g mask="url(#w-postmark)" opacity="0.9">
  <circle cx="120" cy="190" r="92" fill="none" stroke="${INK}" stroke-width="6"/><circle cx="120" cy="190" r="56" fill="none" stroke="${INK}" stroke-width="3"/>
  <g fill="${INK}">${onArc('pmt', 'ATLANTA', 24, 150)}${onArc('pmb', 'GA', 24, 40)}</g>
  <path d="M120 170L126 184L141 185L129 194L133 208L120 200L107 208L111 194L99 185L114 184Z" fill="${INK}"/>
  ${waves}</g>`)
}

/* ------------------------------------------------------------------ 6. the itinerary map: loose coasts, a dashed flight */
{
  const land = (dd) => `<path d="${dd}" fill="${tint(GREEN, 0.86)}" stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>`
  const pin = ([x, y], c) => `<path d="M${x} ${y}C${x - 4} ${y - 14} ${x - 16} ${y - 22} ${x - 16} ${y - 34}A16 16 0 0 1 ${x + 16} ${y - 34}C${x + 16} ${y - 22} ${x + 4} ${y - 14} ${x} ${y}Z" fill="${c}" ${o('stroke-width="5"')}/><circle cx="${x}" cy="${y - 34}" r="6" fill="${W}"/>`
  // the places, in the order of her story: school in Schleswig-Holstein, the sea fellowship in France, Oxford, Atlanta
  const SH = [664, 150], FR = [586, 252], OX = [552, 174], ATL = [112, 254]
  const leg = (a, b, lift) => { const c1 = [a[0] + (b[0] - a[0]) * 0.3, Math.min(a[1], b[1]) - 34 - lift], c2 = [a[0] + (b[0] - a[0]) * 0.7, Math.min(a[1], b[1]) - 34 - lift]; return { d: `M${a[0]} ${a[1] - 34}C${c1.join(' ')} ${c2.join(' ')} ${b[0]} ${b[1] - 34}`, a: [a[0], a[1] - 34], c1, c2, b: [b[0], b[1] - 34] } }
  const legs = [leg(SH, FR, 20), leg(FR, OX, 20), leg(OX, ATL, 140)]
  // the plane, halfway over the Atlantic, pointing the way it flies
  const L = legs[2], bez = (t, k) => (1 - t) ** 3 * L.a[k] + 3 * (1 - t) ** 2 * t * L.c1[k] + 3 * (1 - t) * t * t * L.c2[k] + t ** 3 * L.b[k]
  const pt = [bez(0.5, 0), bez(0.5, 1)], dir = Math.atan2(bez(0.51, 1) - bez(0.49, 1), bez(0.51, 0) - bez(0.49, 0)) * 180 / Math.PI
  add('itinerary-map', `
  ${land('M30 40H140C160 50 170 62 186 64C200 66 210 80 200 92C194 104 184 108 186 122C188 136 176 144 172 156C170 168 176 178 168 190C160 202 170 214 166 228C162 242 146 250 140 264C136 278 150 294 156 316C162 336 160 356 150 362C140 366 136 344 132 330C126 312 114 300 100 298C80 296 60 304 40 300H30Z')}
  ${land('M520 104C516 90 526 78 536 84C546 90 540 102 550 112C564 126 562 146 556 158C568 166 580 178 570 186C558 194 534 194 520 188C532 178 538 168 530 156C522 146 518 132 524 122C528 116 524 110 520 104Z')}
  ${land('M490 136C496 124 512 126 512 140C512 154 500 162 490 156C482 150 484 142 490 136Z')}
  ${land('M800 160L760 156C740 150 720 162 700 156C686 152 680 140 676 120C674 104 670 96 664 100C656 106 660 124 658 140C654 156 640 168 626 176C612 184 604 196 598 206C590 214 580 210 572 220C562 230 566 240 576 244C590 250 600 262 600 278C598 296 588 304 578 306C566 310 560 326 566 344C574 360 600 366 620 360C650 352 680 356 700 340C720 326 740 340 760 330C780 322 790 330 800 326Z')}
  ${land('M700 96C690 80 700 50 720 36C740 24 770 18 800 20V110C780 100 770 120 752 116C736 112 728 96 716 100C708 104 704 104 700 96Z')}
  <path d="M300 300C320 290 340 310 360 300S400 290 420 300M330 330C350 320 370 340 390 330M420 120C440 110 460 130 480 120" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round" opacity="0.45"/>
  ${legs.map((l) => `<path d="${l.d}" fill="none" stroke="${INK}" stroke-width="5" stroke-dasharray="3 12" stroke-linecap="round"/>`).join('')}
  <g transform="translate(${pt[0].toFixed(1)} ${pt[1].toFixed(1)}) rotate(${(dir + 180).toFixed(1)})"><path d="M-22 0L22 -16L8 0L22 16Z" fill="${W}" ${o('stroke-width="5"')}/><path d="M8 0L22 -16L-22 0Z" fill="${tint(BLUE, 0.6)}" ${o('stroke-width="4"')}/></g>
  <g transform="translate(456 356)"><circle r="22" fill="none" stroke="${INK}" stroke-width="3" opacity="0.6"/><path d="M0 -30L6 0L0 30L-6 0Z" fill="${INK}" opacity="0.7"/><path d="M-30 0L0 5L30 0L0 -5Z" fill="${INK}" opacity="0.4"/></g>
  ${pin(SH, GREEN)}${pin(FR, BLUE)}${pin(OX, WINE)}${pin(ATL, GOLD)}`)
}

/* ------------------------------------------------------------------ 7. the approval stamp that lands on every visa
   (added after the rest, so the seeded wear of every earlier piece stays exactly as it was) */
stamp('stamp-granted', WINE, `
  ${rr(44, 104, 312, 192, 6)} fill="none" stroke-width="8"/>${rr(58, 118, 284, 164, 4)} fill="none" stroke-width="4"/>
  <path d="M72 168L85 181L107 153" fill="none" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  <g stroke="none">${T('ENTRY GRANTED', 228, 178, 38, 184)}${T('EINREISE GENEHMIGT', 200, 252, 24, 236)}</g>
  <path d="M82 210H178M222 210H318" stroke-width="4" stroke-dasharray="2 9" stroke-linecap="round"/>
  <path d="M200 198L203.5 206L212 207L205.5 212.5L207.5 221L200 216.5L192.5 221L194.5 212.5L188 207L196.5 206Z" stroke-width="2" stroke-linejoin="round"/>`, [40, 98, 320, 204], 90, [[120, 140, 330, 186], [80, 226, 322, 258]])

/* fit, write, preview */
const browser = await chromium.launch()
const page = await browser.newPage()
// the site's own Saans, so the previews set the stamps' words as the page will (an SVG shown in an <img> falls
// back to Helvetica or Arial; each line's set length keeps the layout the same)
const SAANS = `@font-face{font-family:Saans;src:url(data:font/otf;base64,${readFileSync(resolve(FONTS, 'saans-bold.otf')).toString('base64')});font-weight:700}`
await page.setContent(`<!doctype html><html><head><style>${SAANS}</style></head><body style="margin:0"></body></html>`)
await page.evaluate(() => document.fonts.load('700 30px Saans'))
const made = []
for (const p of PIECES) {
  const svg = await page.evaluate(({ art }) => {
    const NS = 'http://www.w3.org/2000/svg'
    const root = document.createElementNS(NS, 'svg')
    root.setAttribute('xmlns', NS)
    root.setAttribute('viewBox', '0 0 800 400')
    document.body.innerHTML = ''
    document.body.append(root)
    const g = document.createElementNS(NS, 'g')
    g.innerHTML = art
    root.append(g)
    const widest = Math.max(0, ...[...g.querySelectorAll('*')].filter((el) => !el.closest('mask,defs')).map((el) => +(el.getAttribute('stroke-width') ?? 0)))
    const bb = g.getBBox()
    const pad = widest / 2 + 4
    const vb = [bb.x - pad, bb.y - pad, bb.width + pad * 2, bb.height + pad * 2].map((v) => Math.round(v * 10) / 10)
    root.setAttribute('viewBox', vb.join(' '))
    root.setAttribute('width', String(Math.round(vb[2])))
    root.setAttribute('height', String(Math.round(vb[3])))
    return root.outerHTML
  }, { art: p.art })
  writeFileSync(resolve(OUT, `${p.name}.svg`), `<!-- ${p.name}: drawn by code for Saleena Tiwari's portfolio (assets/illustrations/source/illustrations.mjs) -->\n${svg}\n`)
  made.push({ ...p, svg })
}
const PREV = resolve(OUT, 'preview')
mkdirSync(PREV, { recursive: true })
const img = (p, w, h) => `<img src="data:image/svg+xml;base64,${Buffer.from(p.svg).toString('base64')}" style="max-width:${w}px;max-height:${h}px">`
const cell = (p, w, h, label = true) => `<div style="display:grid;justify-items:center;gap:8px"><div style="width:${w}px;height:${h}px;display:grid;place-items:center">${img(p, w, h)}</div>${label ? `<div style="font:12px system-ui;color:#7a6f60">${p.name}</div>` : ''}</div>`
const sheet = (title, items, w, h, cols) => `<h3 style="font:600 14px system-ui;color:#57101e;margin:28px 0 12px">${title}</h3><div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:22px">${items.map((p) => cell(p, w, h)).join('')}</div>`
const by = (pre) => made.filter((p) => p.name.startsWith(pre))
await page.setViewportSize({ width: 1500, height: 900 })
await page.setContent(`<!doctype html><html><body style="margin:0;padding:28px;background:${PAPER}">
  ${sheet('Visas (shown at 220–360 px)', by('visa'), 230, 230, 4)}
  ${sheet('Stamps (120–200 px)', by('stamp'), 170, 170, 4)}
  ${sheet('Doodles (40–140 px)', by('doodle'), 130, 100, 7)}
  ${sheet('Postcard', [...by('postage'), ...by('postmark')], 160, 160, 4)}
  ${sheet('Itinerary map (up to 900 px)', by('itinerary'), 900, 450, 1)}</body></html>`)
await page.screenshot({ path: resolve(PREV, 'set-on-paper.png'), fullPage: true })
await page.setContent(`<!doctype html><html><body style="margin:0;padding:40px;background:${WINE};display:flex;gap:60px;align-items:center">${cell(by('cover-crest')[0], 240, 240, false)}${cell(by('cover-crest')[0], 160, 160, false)}</body></html>`)
await page.screenshot({ path: resolve(PREV, 'crest-on-wine.png'), clip: { x: 0, y: 0, width: 640, height: 330 } })
await page.setContent(`<!doctype html><html><body style="margin:0;padding:24px;background:${PAPER};display:flex;gap:24px;flex-wrap:wrap">${by('visa').map((p) => cell(p, 80, 80, false)).join('')}</body></html>`)
await page.screenshot({ path: resolve(PREV, 'visas-at-80px.png'), clip: { x: 0, y: 0, width: 800, height: 140 } })
await browser.close()
console.log(`${made.length} pieces: ${made.map((p) => p.name).join(', ')}`)
