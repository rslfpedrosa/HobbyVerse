// Unique SVG illustrations for each stamp, drawn to match the specific craft and planet palette.
const enc = (s: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(s)}`;

const bg = (c1: string, c2: string) =>
  `<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs><rect width="800" height="600" fill="url(#bg)"/>`;

const wrap = (c1: string, c2: string, body: string) =>
  enc(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">${bg(c1, c2)}${body}</svg>`);

// ─── POLYMER CLAY  (fuchsia / pink) ──────────────────────────────────────────

// pc1 · Strawberry Charm
const pc1 = wrap('#fce7f3', '#f0abfc', `
  <ellipse cx="400" cy="510" rx="110" ry="16" fill="rgba(180,0,60,0.12)"/>
  <rect x="393" y="155" width="11" height="55" rx="4" fill="#15803d"/>
  <ellipse cx="400" cy="186" rx="22" ry="10" fill="#22c55e" transform="rotate(-45 400 186)"/>
  <ellipse cx="400" cy="186" rx="22" ry="10" fill="#16a34a" transform="rotate(0 400 186)"/>
  <ellipse cx="400" cy="186" rx="22" ry="10" fill="#22c55e" transform="rotate(45 400 186)"/>
  <ellipse cx="400" cy="186" rx="18" ry="8" fill="#15803d" transform="rotate(-90 400 186)"/>
  <ellipse cx="400" cy="186" rx="18" ry="8" fill="#22c55e" transform="rotate(90 400 186)"/>
  <path d="M400 205 C455 215 498 268 492 338 C486 410 448 468 400 498 C352 468 314 410 308 338 C302 268 345 215 400 205Z" fill="#dc2626"/>
  <path d="M400 205 C430 212 462 248 462 300 C435 270 390 255 400 205Z" fill="#ef4444" opacity="0.6"/>
  <ellipse cx="370" cy="272" rx="5" ry="7" fill="#fef08a" opacity="0.9" transform="rotate(-15 370 272)"/>
  <ellipse cx="425" cy="262" rx="5" ry="7" fill="#fef08a" opacity="0.9" transform="rotate(18 425 262)"/>
  <ellipse cx="352" cy="328" rx="5" ry="7" fill="#fef08a" opacity="0.9"/>
  <ellipse cx="447" cy="315" rx="5" ry="7" fill="#fef08a" opacity="0.9" transform="rotate(22 447 315)"/>
  <ellipse cx="385" cy="380" rx="5" ry="7" fill="#fef08a" opacity="0.85"/>
  <ellipse cx="428" cy="368" rx="4" ry="6" fill="#fef08a" opacity="0.85"/>
  <ellipse cx="362" cy="420" rx="4" ry="6" fill="#fef08a" opacity="0.8"/>
  <ellipse cx="408" cy="445" rx="4" ry="5" fill="#fef08a" opacity="0.75"/>
  <ellipse cx="360" cy="252" rx="28" ry="50" fill="white" opacity="0.20" transform="rotate(-20 360 252)"/>
`);

// pc2 · Tiny Glazed Donut
const pc2 = wrap('#fce7f3', '#f0abfc', `
  <ellipse cx="400" cy="505" rx="135" ry="18" fill="rgba(0,0,0,0.1)"/>
  <ellipse cx="400" cy="330" rx="180" ry="120" fill="#c2410c"/>
  <ellipse cx="400" cy="330" rx="130" ry="82" fill="#fce7f3"/>
  <ellipse cx="400" cy="290" rx="175" ry="105" fill="#fda4af" opacity="0.95"/>
  <ellipse cx="400" cy="290" rx="125" ry="75" fill="#fce7f3"/>
  <path d="M240 290 C248 230 340 195 400 195 C460 195 552 230 560 290" stroke="#fb7185" stroke-width="28" fill="none" stroke-linecap="round" opacity="0.85"/>
  <path d="M255 295 C265 258 345 235 400 235 C455 235 535 258 545 295" stroke="#fecdd3" stroke-width="12" fill="none" stroke-linecap="round" opacity="0.7"/>
  <circle cx="335" cy="235" r="7" fill="#a78bfa"/>
  <circle cx="375" cy="218" r="6" fill="#fb923c"/>
  <circle cx="415" cy="215" r="6" fill="#34d399"/>
  <circle cx="455" cy="228" r="7" fill="#fbbf24"/>
  <circle cx="490" cy="252" r="6" fill="#f472b6"/>
  <circle cx="310" cy="264" r="5" fill="#60a5fa"/>
  <circle cx="500" cy="278" r="5" fill="#a78bfa"/>
  <ellipse cx="360" cy="240" rx="30" ry="12" fill="white" opacity="0.25" transform="rotate(-20 360 240)"/>
`);

// pc3 · Froggy Pal
const pc3 = wrap('#dcfce7', '#f0abfc', `
  <ellipse cx="400" cy="505" rx="120" ry="16" fill="rgba(0,100,0,0.12)"/>
  <ellipse cx="340" cy="240" rx="50" ry="38" fill="#4ade80"/>
  <ellipse cx="460" cy="240" rx="50" ry="38" fill="#4ade80"/>
  <ellipse cx="400" cy="340" rx="170" ry="155" fill="#22c55e"/>
  <ellipse cx="400" cy="355" rx="160" ry="145" fill="#4ade80"/>
  <ellipse cx="340" cy="248" rx="32" ry="28" fill="white"/>
  <ellipse cx="460" cy="248" rx="32" ry="28" fill="white"/>
  <circle cx="340" cy="252" r="20" fill="#1e3a2f"/>
  <circle cx="460" cy="252" r="20" fill="#1e3a2f"/>
  <circle cx="346" cy="246" r="8" fill="white"/>
  <circle cx="466" cy="246" r="8" fill="white"/>
  <ellipse cx="400" cy="430" rx="70" ry="25" fill="#16a34a" opacity="0.6"/>
  <path d="M340 390 Q400 430 460 390" stroke="#15803d" stroke-width="8" fill="none" stroke-linecap="round"/>
  <circle cx="380" cy="370" r="6" fill="#15803d" opacity="0.5"/>
  <circle cx="420" cy="370" r="6" fill="#15803d" opacity="0.5"/>
  <ellipse cx="370" cy="320" rx="45" ry="15" fill="#86efac" opacity="0.4" transform="rotate(-15 370 320)"/>
  <ellipse cx="460" cy="390" rx="50" ry="15" fill="#16a34a" opacity="0.5"/>
  <ellipse cx="340" cy="390" rx="50" ry="15" fill="#16a34a" opacity="0.5"/>
`);

// pc4 · Rainbow Mushroom
const pc4 = wrap('#fce7f3', '#e0e7ff', `
  <ellipse cx="400" cy="510" rx="90" ry="14" fill="rgba(0,0,0,0.1)"/>
  <rect x="363" y="360" width="74" height="140" rx="20" fill="#f5f0e8"/>
  <ellipse cx="400" cy="360" rx="38" ry="18" fill="#e5ddd0"/>
  <defs>
    <linearGradient id="cap" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="20%" stop-color="#f97316"/>
      <stop offset="40%" stop-color="#eab308"/>
      <stop offset="60%" stop-color="#22c55e"/>
      <stop offset="80%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
  </defs>
  <path d="M180 365 Q190 210 400 185 Q610 210 620 365 Z" fill="url(#cap)"/>
  <ellipse cx="280" cy="295" rx="22" ry="22" fill="white" opacity="0.55"/>
  <ellipse cx="360" cy="230" rx="18" ry="18" fill="white" opacity="0.55"/>
  <ellipse cx="450" cy="238" rx="20" ry="20" fill="white" opacity="0.55"/>
  <ellipse cx="530" cy="295" rx="18" ry="18" fill="white" opacity="0.55"/>
  <ellipse cx="400" cy="270" rx="14" ry="14" fill="white" opacity="0.55"/>
  <ellipse cx="220" cy="345" rx="35" ry="25" fill="white" opacity="0.18" transform="rotate(-20 220 345)"/>
`);

// pc5 · Cloud Earrings
const pc5 = wrap('#e0f2fe', '#f0abfc', `
  <circle cx="280" cy="250" r="90" fill="white"/>
  <circle cx="230" cy="280" r="65" fill="white"/>
  <circle cx="330" cy="280" r="65" fill="white"/>
  <ellipse cx="280" cy="310" rx="115" ry="55" fill="white"/>
  <line x1="280" y1="148" x2="280" y2="165" stroke="#c084fc" stroke-width="5" stroke-linecap="round"/>
  <path d="M275 150 Q280 138 285 150" stroke="#a855f7" stroke-width="4" fill="none"/>
  <circle cx="520" cy="250" r="90" fill="white"/>
  <circle cx="470" cy="280" r="65" fill="white"/>
  <circle cx="570" cy="280" r="65" fill="white"/>
  <ellipse cx="520" cy="310" rx="115" ry="55" fill="white"/>
  <line x1="520" y1="148" x2="520" y2="165" stroke="#c084fc" stroke-width="5" stroke-linecap="round"/>
  <path d="M515 150 Q520 138 525 150" stroke="#a855f7" stroke-width="4" fill="none"/>
  <ellipse cx="265" cy="260" rx="28" ry="18" fill="white" opacity="0.6"/>
  <ellipse cx="505" cy="260" rx="28" ry="18" fill="white" opacity="0.6"/>
`);

// pc6 · Cactus Pin
const pc6 = wrap('#f0fdf4', '#f0abfc', `
  <ellipse cx="400" cy="508" rx="85" ry="14" fill="rgba(0,80,0,0.12)"/>
  <rect x="370" y="220" width="60" height="280" rx="28" fill="#16a34a"/>
  <rect x="370" y="220" width="60" height="280" rx="28" fill="#22c55e" opacity="0.5"/>
  <rect x="265" y="290" width="40" height="130" rx="18" fill="#16a34a"/>
  <ellipse cx="265" cy="290" rx="20" ry="20" fill="#22c55e"/>
  <rect x="490" y="310" width="40" height="110" rx="18" fill="#16a34a"/>
  <ellipse cx="510" cy="310" rx="20" ry="20" fill="#22c55e"/>
  <line x1="370" y1="240" x2="348" y2="228" stroke="#fef08a" stroke-width="2.5"/>
  <line x1="370" y1="268" x2="342" y2="258" stroke="#fef08a" stroke-width="2.5"/>
  <line x1="370" y1="296" x2="344" y2="290" stroke="#fef08a" stroke-width="2.5"/>
  <line x1="430" y1="240" x2="452" y2="228" stroke="#fef08a" stroke-width="2.5"/>
  <line x1="430" y1="268" x2="458" y2="258" stroke="#fef08a" stroke-width="2.5"/>
  <line x1="430" y1="296" x2="456" y2="290" stroke="#fef08a" stroke-width="2.5"/>
  <line x1="370" y1="330" x2="338" y2="322" stroke="#fef08a" stroke-width="2.5"/>
  <line x1="430" y1="330" x2="462" y2="322" stroke="#fef08a" stroke-width="2.5"/>
  <ellipse cx="400" cy="218" rx="22" ry="14" fill="#f472b6"/>
  <ellipse cx="400" cy="218" rx="10" ry="7" fill="#fbbf24"/>
`);

// pc7 · Boba Tea Keychain
const pc7 = wrap('#fce7f3', '#f0abfc', `
  <ellipse cx="400" cy="508" rx="80" ry="12" fill="rgba(0,0,0,0.1)"/>
  <circle cx="400" cy="148" r="18" fill="#a78bfa" opacity="0.6"/>
  <circle cx="400" cy="148" r="10" fill="#7c3aed" opacity="0.8"/>
  <line x1="400" y1="162" x2="400" y2="186" stroke="#9ca3af" stroke-width="5" stroke-linecap="round"/>
  <path d="M330 195 L340 480 L460 480 L470 195 Z" fill="#fde68a" opacity="0.9"/>
  <path d="M325 194 Q400 208 475 194 L470 195 Q400 208 330 195 Z" fill="#fbbf24" opacity="0.7"/>
  <ellipse cx="400" cy="193" rx="78" ry="22" fill="#fbbf24"/>
  <ellipse cx="400" cy="185" rx="72" ry="30" fill="#fef9c3"/>
  <ellipse cx="400" cy="178" rx="68" ry="24" fill="white" opacity="0.8"/>
  <line x1="400" y1="178" x2="400" y2="148" stroke="#7c3aed" stroke-width="10" stroke-linecap="round"/>
  <circle cx="356" cy="435" r="20" fill="#1e1b4b"/>
  <circle cx="398" cy="450" r="20" fill="#1e1b4b"/>
  <circle cx="440" cy="435" r="20" fill="#1e1b4b"/>
  <circle cx="370" cy="408" r="18" fill="#312e81"/>
  <circle cx="428" cy="408" r="18" fill="#312e81"/>
  <circle cx="352" cy="465" r="16" fill="#1e1b4b"/>
  <circle cx="448" cy="465" r="16" fill="#1e1b4b"/>
  <ellipse cx="360" cy="230" rx="25" ry="10" fill="white" opacity="0.3"/>
`);

// pc8 · Star Barrette (mokume-gane pearl & navy)
const pc8 = wrap('#1e3a5f', '#f0abfc', `
  <defs>
    <linearGradient id="star" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e2e8f0"/>
      <stop offset="40%" stop-color="#1e3a8a"/>
      <stop offset="70%" stop-color="#f1f5f9"/>
      <stop offset="100%" stop-color="#1e40af"/>
    </linearGradient>
  </defs>
  <ellipse cx="400" cy="505" rx="140" ry="18" fill="rgba(255,255,255,0.08)"/>
  <polygon points="400,130 438,240 555,240 460,308 495,418 400,350 305,418 340,308 245,240 362,240" fill="url(#star)"/>
  <polygon points="400,160 428,235 508,235 445,278 468,353 400,310 332,353 355,278 292,235 372,235" fill="white" opacity="0.15"/>
  <ellipse cx="380" cy="210" rx="18" ry="8" fill="white" opacity="0.4" transform="rotate(-30 380 210)"/>
  <ellipse cx="340" cy="258" rx="12" ry="5" fill="#93c5fd" opacity="0.5" transform="rotate(15 340 258)"/>
  <ellipse cx="455" cy="248" rx="14" ry="6" fill="#93c5fd" opacity="0.4" transform="rotate(-20 455 248)"/>
  <rect x="300" y="440" width="200" height="30" rx="14" fill="#9ca3af"/>
  <rect x="310" y="446" width="180" height="18" rx="9" fill="#d1d5db"/>
  <rect x="350" y="442" width="12" height="26" rx="5" fill="#6b7280"/>
  <rect x="435" y="442" width="12" height="26" rx="5" fill="#6b7280"/>
`);

// ─── GARDEN  (emerald / lush green) ──────────────────────────────────────────

// g1 · Monstera Sprout
const g1 = wrap('#dcfce7', '#86efac', `
  <ellipse cx="400" cy="510" rx="100" ry="15" fill="rgba(0,80,0,0.12)"/>
  <rect x="388" y="340" width="24" height="160" rx="10" fill="#15803d"/>
  <path d="M400 340 C350 260 220 220 190 290 C170 340 220 390 310 370 C270 390 240 430 280 455 C320 478 380 450 400 400 C350 380 290 350 290 310 C290 275 340 255 400 340Z" fill="#16a34a"/>
  <ellipse cx="250" cy="330" rx="28" ry="22" fill="#dcfce7" opacity="0.9"/>
  <ellipse cx="232" cy="380" rx="22" ry="18" fill="#dcfce7" opacity="0.9"/>
  <ellipse cx="275" cy="410" rx="18" ry="14" fill="#dcfce7" opacity="0.85"/>
  <path d="M400 340 C450 260 580 220 610 290 C630 340 580 390 490 370 C530 390 560 430 520 455 C480 478 420 450 400 400 C450 380 510 350 510 310 C510 275 460 255 400 340Z" fill="#22c55e"/>
  <ellipse cx="550" cy="330" rx="28" ry="22" fill="#dcfce7" opacity="0.9"/>
  <ellipse cx="568" cy="380" rx="22" ry="18" fill="#dcfce7" opacity="0.9"/>
  <ellipse cx="525" cy="410" rx="18" ry="14" fill="#dcfce7" opacity="0.85"/>
  <path d="M390 340 C395 295 402 260 400 220 C398 185 390 155 400 130 C410 155 402 185 400 220 C398 260 405 295 410 340Z" fill="#15803d"/>
  <ellipse cx="400" cy="355" rx="55" ry="20" fill="#86efac" opacity="0.4" transform="rotate(-5 400 355)"/>
`);

// g2 · Raised Bed Harvest
const g2 = wrap('#f0fdf4', '#bbf7d0', `
  <rect x="150" y="400" width="500" height="100" rx="12" fill="#92400e"/>
  <rect x="165" y="412" width="470" height="80" rx="8" fill="#78350f"/>
  <rect x="150" y="390" width="500" height="22" rx="6" fill="#b45309"/>
  <ellipse cx="240" cy="310" rx="55" ry="55" fill="#dc2626"/>
  <ellipse cx="240" cy="285" rx="48" ry="45" fill="#ef4444"/>
  <ellipse cx="220" cy="268" rx="18" ry="8" fill="#fca5a5" opacity="0.5"/>
  <rect x="233" y="242" width="14" height="30" rx="5" fill="#15803d"/>
  <ellipse cx="260" cy="248" rx="22" ry="12" fill="#22c55e" transform="rotate(-30 260 248)"/>
  <ellipse cx="215" cy="250" rx="20" ry="10" fill="#16a34a" transform="rotate(20 215 250)"/>
  <ellipse cx="400" cy="335" rx="48" ry="48" fill="#dc2626"/>
  <ellipse cx="400" cy="313" rx="42" ry="40" fill="#ef4444"/>
  <ellipse cx="382" cy="296" rx="16" ry="7" fill="#fca5a5" opacity="0.5"/>
  <rect x="393" y="273" width="14" height="28" rx="5" fill="#15803d"/>
  <ellipse cx="418" cy="278" rx="20" ry="10" fill="#22c55e" transform="rotate(-25 418 278)"/>
  <ellipse cx="560" cy="320" rx="52" ry="52" fill="#b91c1c"/>
  <ellipse cx="560" cy="296" rx="45" ry="42" fill="#dc2626"/>
  <rect x="553" y="258" width="14" height="28" rx="5" fill="#15803d"/>
  <ellipse cx="575" cy="264" rx="20" ry="10" fill="#22c55e" transform="rotate(-20 575 264)"/>
  <path d="M233 395 C240 370 255 350 260 330" stroke="#15803d" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M393 395 C400 362 408 335 406 310" stroke="#15803d" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M556 395 C558 368 560 340 558 298" stroke="#15803d" stroke-width="6" fill="none" stroke-linecap="round"/>
`);

// g3 · Propagation Station
const g3 = wrap('#f0fdf4', '#bbf7d0', `
  <rect x="140" y="170" width="520" height="30" rx="8" fill="#92400e"/>
  <rect x="150" y="192" width="500" height="12" rx="4" fill="#78350f"/>
  <rect x="222" y="200" width="8" height="40" fill="#6b7280"/>
  <rect x="218" y="238" width="16" height="220" rx="28" fill="#bfdbfe" opacity="0.85"/>
  <ellipse cx="226" cy="240" rx="8" ry="5" fill="#93c5fd" opacity="0.7"/>
  <path d="M226 300 C210 270 205 240 226 250" stroke="#22c55e" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="207" cy="265" rx="16" ry="10" fill="#22c55e" transform="rotate(-30 207 265)"/>
  <rect x="394" y="200" width="8" height="40" fill="#6b7280"/>
  <rect x="390" y="238" width="16" height="240" rx="28" fill="#bfdbfe" opacity="0.85"/>
  <ellipse cx="398" cy="240" rx="8" ry="5" fill="#93c5fd" opacity="0.7"/>
  <path d="M398 310 C382 275 378 248 398 258" stroke="#16a34a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="380" cy="278" rx="16" ry="10" fill="#16a34a" transform="rotate(-25 380 278)"/>
  <path d="M398 330 C414 290 418 262 398 272" stroke="#4ade80" stroke-width="4" fill="none" stroke-linecap="round"/>
  <ellipse cx="416" cy="298" rx="14" ry="9" fill="#4ade80" transform="rotate(30 416 298)"/>
  <rect x="568" y="200" width="8" height="40" fill="#6b7280"/>
  <rect x="564" y="238" width="16" height="200" rx="28" fill="#bfdbfe" opacity="0.85"/>
  <ellipse cx="572" cy="240" rx="8" ry="5" fill="#93c5fd" opacity="0.7"/>
  <path d="M572 290 C556 262 552 240 572 252" stroke="#15803d" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="554" cy="268" rx="14" ry="9" fill="#15803d" transform="rotate(-35 554 268)"/>
  <ellipse cx="590" cy="280" rx="12" ry="8" fill="#22c55e" transform="rotate(20 590 280)"/>
`);

// g4 · Succulent Terrarium
const g4 = wrap('#f0fdf4', '#a7f3d0', `
  <ellipse cx="400" cy="490" rx="180" ry="24" fill="rgba(0,80,40,0.12)"/>
  <ellipse cx="400" cy="400" rx="185" ry="105" fill="#d1fae5" opacity="0.5"/>
  <path d="M220 390 Q230 220 400 205 Q570 220 580 390 Q570 490 400 500 Q230 490 220 390Z" fill="none" stroke="#93c5fd" stroke-width="5" opacity="0.6"/>
  <ellipse cx="400" cy="480" rx="175" ry="28" fill="#d97706" opacity="0.4"/>
  <ellipse cx="400" cy="475" rx="165" ry="22" fill="#fcd34d" opacity="0.5"/>
  <circle cx="400" cy="370" r="68" fill="#22c55e"/>
  <circle cx="400" cy="370" r="52" fill="#16a34a"/>
  <ellipse cx="400" cy="320" rx="18" ry="48" fill="#15803d" opacity="0.8"/>
  <ellipse cx="370" cy="330" rx="15" ry="44" fill="#22c55e" opacity="0.7" transform="rotate(-22 370 330)"/>
  <ellipse cx="430" cy="330" rx="15" ry="44" fill="#22c55e" opacity="0.7" transform="rotate(22 430 330)"/>
  <ellipse cx="348" cy="355" rx="13" ry="38" fill="#16a34a" opacity="0.8" transform="rotate(-42 348 355)"/>
  <ellipse cx="452" cy="355" rx="13" ry="38" fill="#16a34a" opacity="0.8" transform="rotate(42 452 355)"/>
  <circle cx="270" cy="420" r="42" fill="#4ade80"/>
  <circle cx="270" cy="420" r="30" fill="#22c55e"/>
  <ellipse cx="270" cy="395" rx="10" ry="28" fill="#16a34a" opacity="0.8"/>
  <ellipse cx="255" cy="405" rx="9" ry="25" fill="#4ade80" opacity="0.7" transform="rotate(-25 255 405)"/>
  <ellipse cx="285" cy="405" rx="9" ry="25" fill="#4ade80" opacity="0.7" transform="rotate(25 285 405)"/>
  <circle cx="530" cy="415" r="36" fill="#86efac"/>
  <circle cx="530" cy="415" r="24" fill="#4ade80"/>
  <ellipse cx="530" cy="395" rx="9" ry="22" fill="#16a34a" opacity="0.8"/>
`);

// g5 · Herb Window Box
const g5 = wrap('#f0fdf4', '#bbf7d0', `
  <rect x="150" y="360" width="500" height="130" rx="14" fill="#92400e"/>
  <rect x="165" y="372" width="470" height="110" rx="10" fill="#78350f"/>
  <rect x="150" y="350" width="500" height="24" rx="7" fill="#a16207"/>
  <ellipse cx="265" cy="275" rx="75" ry="95" fill="#16a34a"/>
  <ellipse cx="265" cy="260" rx="58" ry="78" fill="#22c55e"/>
  <ellipse cx="238" cy="230" rx="20" ry="30" fill="#4ade80" transform="rotate(-12 238 230)"/>
  <ellipse cx="270" cy="218" rx="18" ry="32" fill="#22c55e"/>
  <ellipse cx="302" cy="232" rx="20" ry="28" fill="#4ade80" transform="rotate(10 302 232)"/>
  <ellipse cx="400" cy="305" rx="62" ry="68" fill="#15803d"/>
  <path d="M370 340 L375 245 Q380 220 385 245 L388 340" stroke="#22c55e" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M388 340 L394 238 Q400 210 406 238 L412 340" stroke="#16a34a" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M412 340 L416 248 Q422 222 428 248 L432 340" stroke="#22c55e" stroke-width="7" fill="none" stroke-linecap="round"/>
  <ellipse cx="545" cy="295" rx="65" ry="80" fill="#4ade80"/>
  <ellipse cx="545" cy="280" rx="48" ry="62" fill="#86efac"/>
  <ellipse cx="520" cy="252" rx="18" ry="22" fill="#bbf7d0" transform="rotate(-18 520 252)"/>
  <ellipse cx="548" cy="240" rx="18" ry="24" fill="#bbf7d0"/>
  <ellipse cx="576" cy="254" rx="18" ry="22" fill="#bbf7d0" transform="rotate(15 576 254)"/>
`);

// g6 · Bonsai Year Two
const g6 = wrap('#fafafa', '#d1fae5', `
  <rect x="270" y="470" width="260" height="55" rx="10" fill="#78350f"/>
  <rect x="285" y="482" width="230" height="36" rx="6" fill="#92400e"/>
  <rect x="300" y="462" width="200" height="22" rx="5" fill="#a16207"/>
  <rect x="390" y="210" width="20" height="260" rx="8" fill="#78350f"/>
  <path d="M400 310 C370 290 335 260 310 220 C295 198 300 175 320 182 C340 188 355 210 380 240 C360 215 355 192 370 188 C385 184 400 210 400 310Z" fill="#6b3a0e"/>
  <path d="M400 280 C430 260 468 228 490 192 C505 172 498 150 478 158 C458 165 445 188 420 218 C442 192 448 168 432 165 C416 162 400 188 400 280Z" fill="#78350f"/>
  <ellipse cx="300" cy="195" rx="80" ry="55" fill="#16a34a"/>
  <ellipse cx="270" cy="205" rx="58" ry="42" fill="#22c55e"/>
  <ellipse cx="325" cy="175" rx="55" ry="40" fill="#15803d"/>
  <ellipse cx="480" cy="178" rx="75" ry="52" fill="#16a34a"/>
  <ellipse cx="505" cy="188" rx="55" ry="40" fill="#22c55e"/>
  <ellipse cx="460" cy="162" rx="50" ry="38" fill="#15803d"/>
  <ellipse cx="400" cy="240" rx="62" ry="45" fill="#22c55e"/>
  <ellipse cx="400" cy="230" rx="45" ry="35" fill="#4ade80" opacity="0.7"/>
  <path d="M342 458 C345 440 350 420 368 410 C348 415 335 395 345 378" stroke="#92400e" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M458 458 C455 440 450 420 432 410 C452 415 465 395 455 378" stroke="#78350f" stroke-width="8" fill="none" stroke-linecap="round"/>
`);

// g7 · Worm Composting Bin
const g7 = wrap('#fef3c7', '#d1fae5', `
  <rect x="200" y="200" width="400" height="340" rx="16" fill="#44403c"/>
  <rect x="216" y="216" width="368" height="308" rx="10" fill="#292524"/>
  <rect x="200" y="195" width="400" height="25" rx="8" fill="#57534e"/>
  <rect x="216" y="246" width="368" height="270" rx="8" fill="#3a3230"/>
  <path d="M240 320 C265 305 285 340 310 320 C335 300 355 335 380 315 C405 295 425 330 450 310" stroke="#dc2626" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M250 370 C278 358 295 388 320 368 C345 348 368 382 392 362 C416 342 440 375 465 358" stroke="#b91c1c" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M260 425 C282 410 302 440 328 420 C354 400 372 435 400 415 C428 395 448 428 470 412" stroke="#dc2626" stroke-width="8" fill="none" stroke-linecap="round"/>
  <ellipse cx="295" cy="278" rx="8" ry="5" fill="#4a2c2a" opacity="0.7"/>
  <ellipse cx="445" cy="290" rx="8" ry="5" fill="#4a2c2a" opacity="0.7"/>
  <ellipse cx="360" cy="440" rx="7" ry="4" fill="#3d2012" opacity="0.6"/>
  <rect x="215" y="460" width="370" height="55" rx="0" fill="#1c1917" opacity="0.8"/>
  <ellipse cx="400" cy="218" rx="185" ry="14" fill="#292524"/>
`);

// g8 · Kokedama Ball
const g8 = wrap('#f0fdf4', '#bbf7d0', `
  <line x1="400" y1="100" x2="400" y2="240" stroke="#92400e" stroke-width="6" stroke-dasharray="8 4"/>
  <line x1="360" y1="100" x2="390" y2="240" stroke="#a16207" stroke-width="4" stroke-dasharray="6 4"/>
  <line x1="440" y1="100" x2="410" y2="240" stroke="#a16207" stroke-width="4" stroke-dasharray="6 4"/>
  <circle cx="400" cy="360" r="155" fill="#15803d"/>
  <circle cx="400" cy="360" r="145" fill="#166534"/>
  <ellipse cx="365" cy="330" rx="30" ry="22" fill="#15803d" transform="rotate(-20 365 330)"/>
  <ellipse cx="435" cy="325" rx="28" ry="20" fill="#166534" transform="rotate(15 435 325)"/>
  <ellipse cx="390" cy="300" rx="25" ry="18" fill="#14532d" transform="rotate(-8 390 300)"/>
  <ellipse cx="418" cy="308" rx="22" ry="16" fill="#15803d" transform="rotate(22 418 308)"/>
  <ellipse cx="348" cy="368" rx="28" ry="18" fill="#14532d" transform="rotate(-30 348 368)"/>
  <ellipse cx="452" cy="358" rx="26" ry="17" fill="#15803d" transform="rotate(25 452 358)"/>
  <path d="M400 220 C370 240 340 210 320 175 C305 150 315 125 335 135 C345 140 350 158 365 175 C350 155 352 138 365 140 C378 142 390 165 400 220Z" fill="#22c55e"/>
  <path d="M400 220 C430 240 460 210 480 175 C495 150 485 125 465 135 C455 140 450 158 435 175 C450 155 448 138 435 140 C422 142 410 165 400 220Z" fill="#16a34a"/>
  <path d="M400 220 C395 195 398 165 400 140 C402 165 405 195 400 220Z" fill="#15803d"/>
  <path d="M300 350 Q340 400 380 380" stroke="#92400e" stroke-width="3" fill="none" opacity="0.7"/>
  <path d="M320 380 Q360 420 400 400" stroke="#78350f" stroke-width="3" fill="none" opacity="0.6"/>
  <path d="M440 390 Q470 370 490 340" stroke="#92400e" stroke-width="3" fill="none" opacity="0.6"/>
`);

// ─── KNITTING / TEXTILE  (lavender / indigo) ─────────────────────────────────

// t1 · Chunky Cardigan Patch
const t1 = wrap('#ede9fe', '#a5b4fc', `
  <rect x="160" y="130" width="480" height="380" rx="18" fill="#7c3aed" opacity="0.15"/>
  <rect x="175" y="145" width="450" height="350" rx="14" fill="#6d28d9" opacity="0.12"/>
  ${Array.from({length:7},(_,i)=>`
  <path d="M${175} ${165+i*52} Q${250} ${145+i*52} ${325} ${165+i*52} Q${400} ${185+i*52} ${475} ${165+i*52} Q${550} ${145+i*52} ${625} ${165+i*52}" stroke="#7c3aed" stroke-width="14" fill="none" stroke-linecap="round" opacity="${0.6+i*0.04}"/>
  <path d="M${175} ${178+i*52} Q${250} ${198+i*52} ${325} ${178+i*52} Q${400} ${158+i*52} ${475} ${178+i*52} Q${550} ${198+i*52} ${625} ${178+i*52}" stroke="#a78bfa" stroke-width="10" fill="none" stroke-linecap="round" opacity="${0.5+i*0.03}"/>
  `).join('')}
  <rect x="335" y="145" width="30" height="350" rx="0" fill="#c4b5fd" opacity="0.2"/>
  <rect x="435" y="145" width="30" height="350" rx="0" fill="#c4b5fd" opacity="0.2"/>
`);

// t2 · Indigo Shibori Tote
const t2 = wrap('#1e1b4b', '#3730a3', `
  <ellipse cx="400" cy="510" rx="145" ry="18" fill="rgba(0,0,0,0.25)"/>
  <path d="M240 220 Q230 480 260 500 L540 500 Q570 480 560 220 Z" fill="#1e40af"/>
  <path d="M240 220 Q230 480 260 500 L540 500 Q570 480 560 220 Z" fill="#1e3a8a"/>
  <path d="M255 215 Q270 205 310 210 L310 200 Q270 192 252 205Z" fill="#1e40af"/>
  <path d="M490 215 Q530 205 545 215 Q535 200 528 200 L490 210Z" fill="#1e40af"/>
  <ellipse cx="295" cy="307" rx="40" ry="40" fill="none" stroke="white" stroke-width="4" opacity="0.55"/>
  <ellipse cx="295" cy="307" rx="20" ry="20" fill="white" opacity="0.18"/>
  <ellipse cx="505" cy="285" rx="35" ry="35" fill="none" stroke="white" stroke-width="4" opacity="0.55"/>
  <ellipse cx="505" cy="285" rx="16" ry="16" fill="white" opacity="0.18"/>
  <ellipse cx="400" cy="420" rx="45" ry="45" fill="none" stroke="white" stroke-width="4" opacity="0.55"/>
  <ellipse cx="400" cy="420" rx="22" ry="22" fill="white" opacity="0.18"/>
  <path d="M350 340 Q370 310 390 340 Q410 370 430 340" stroke="white" stroke-width="3" fill="none" opacity="0.45"/>
  <rect x="280" y="210" width="30" height="8" rx="3" fill="#93c5fd" opacity="0.6"/>
  <rect x="490" y="210" width="30" height="8" rx="3" fill="#93c5fd" opacity="0.6"/>
  <path d="M280 210 Q260 150 310 130" stroke="#93c5fd" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M520 210 Q540 150 490 130" stroke="#93c5fd" stroke-width="8" fill="none" stroke-linecap="round"/>
`);

// t3 · Loom-Woven Wall Hanging
const t3 = wrap('#ede9fe', '#ddd6fe', `
  <rect x="200" y="130" width="400" height="25" rx="10" fill="#78350f"/>
  <rect x="190" y="128" width="20" height="32" rx="6" fill="#92400e"/>
  <rect x="590" y="128" width="20" height="32" rx="6" fill="#92400e"/>
  ${Array.from({length:16},(_,i)=>`<rect x="${208+i*24}" y="130" width="6" height="310" rx="2" fill="#c4b5fd" opacity="0.6"/>`).join('')}
  ${['#7c3aed','#a78bfa','#ddd6fe','#818cf8','#7c3aed','#c4b5fd','#a78bfa','#6d28d9','#ddd6fe','#818cf8'].map((c,i)=>`<rect x="208" y="${155+i*28}" width="384" height="22" rx="2" fill="${c}" opacity="0.85"/>`).join('')}
  ${Array.from({length:16},(_,i)=>`<line x1="${211+i*24}" y1="440" x2="${206+i*24}" y2="510" stroke="#c4b5fd" stroke-width="3" stroke-linecap="round"/>`).join('')}
  ${Array.from({length:16},(_,i)=>`<line x1="${217+i*24}" y1="440" x2="${222+i*24}" y2="505" stroke="#a78bfa" stroke-width="3" stroke-linecap="round"/>`).join('')}
`);

// t4 · Punch Needle Rug
const t4 = wrap('#ede9fe', '#a5b4fc', `
  <ellipse cx="400" cy="380" rx="265" ry="200" fill="#4c1d95"/>
  <ellipse cx="400" cy="375" rx="250" ry="188" fill="#5b21b6"/>
  ${Array.from({length:12},(_,row)=>
    Array.from({length:18},(_,col)=>{
      const x = 155 + col*28 + (row%2)*14;
      const y = 210 + row*28;
      const inOval = Math.pow((x-400)/248,2)+Math.pow((y-378)/185,2) < 0.88;
      if(!inOval) return '';
      const colors=['#c4b5fd','#a78bfa','#7c3aed','#ddd6fe','#818cf8'];
      const c = colors[(row*3+col*2)%5];
      return `<circle cx="${x}" cy="${y}" r="10" fill="${c}" opacity="0.85"/>`;
    }).join('')
  ).join('')}
  <ellipse cx="400" cy="378" rx="240" ry="180" fill="none" stroke="#7c3aed" stroke-width="4" opacity="0.4"/>
  <ellipse cx="295" cy="298" rx="52" ry="40" fill="white" opacity="0.06" transform="rotate(-20 295 298)"/>
`);

// t5 · Crochet Bucket Hat
const t5 = wrap('#fef3c7', '#fde68a', `
  <ellipse cx="400" cy="505" rx="190" ry="22" fill="rgba(0,0,0,0.1)"/>
  <ellipse cx="400" cy="440" rx="205" ry="75" fill="#d97706"/>
  <ellipse cx="400" cy="420" rx="190" ry="65" fill="#b45309"/>
  <ellipse cx="400" cy="410" rx="200" ry="70" fill="#fbbf24"/>
  ${Array.from({length:7},(_,i)=>`<ellipse cx="400" cy="${410+i*9}" rx="${200-i*2}" ry="7" fill="none" stroke="#d97706" stroke-width="3" opacity="0.55"/>`).join('')}
  <ellipse cx="400" cy="390" rx="165" ry="165" fill="#fbbf24"/>
  <ellipse cx="400" cy="385" rx="155" ry="155" fill="#f59e0b"/>
  ${Array.from({length:10},(_,i)=>`<ellipse cx="400" cy="390" rx="${40+i*12}" ry="${40+i*12}" fill="none" stroke="#d97706" stroke-width="3" opacity="0.45"/>`).join('')}
  <ellipse cx="400" cy="250" rx="118" ry="55" fill="#f59e0b"/>
  <ellipse cx="400" cy="248" rx="112" ry="50" fill="#fbbf24"/>
  ${Array.from({length:5},(_,i)=>`<ellipse cx="400" cy="250" rx="${118-i*18}" ry="${50-i*6}" fill="none" stroke="#d97706" stroke-width="2.5" opacity="0.45"/>`).join('')}
  <ellipse cx="330" cy="298" rx="45" ry="22" fill="white" opacity="0.18" transform="rotate(-25 330 298)"/>
`);

// t6 · Embroidered Denim Jacket
const t6 = wrap('#1e3a8a', '#1e40af', `
  <path d="M200 140 L200 520 L380 520 L380 300 L420 300 L420 520 L600 520 L600 140 L530 120 L480 200 L400 220 L320 200 L270 120 Z" fill="#1d4ed8"/>
  <path d="M200 140 L270 120 L320 200 L400 220 L480 200 L530 120 L600 140 L600 200 L530 178 L480 258 L400 278 L320 258 L270 178 L200 200 Z" fill="#2563eb" opacity="0.6"/>
  <path d="M380 300 L380 520 L420 520 L420 300 Z" fill="#1e40af" opacity="0.8"/>
  ${Array.from({length:18},(_,i)=>{
    const y = 160+i*20;
    return `<path d="M220 ${y} L240 ${y+8} L260 ${y} L280 ${y+8} L300 ${y} L320 ${y+8} L340 ${y} L360 ${y+8} L376 ${y}" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.65"/>`;
  }).join('')}
  ${Array.from({length:18},(_,i)=>{
    const y = 160+i*20;
    return `<path d="M424 ${y} L444 ${y+8} L464 ${y} L484 ${y+8} L504 ${y} L524 ${y+8} L544 ${y} L564 ${y+8} L580 ${y}" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.65"/>`;
  }).join('')}
`);

// t7 · Macramé Plant Hanger
const t7 = wrap('#fef3c7', '#fde68a', `
  <line x1="400" y1="100" x2="400" y2="145" stroke="#92400e" stroke-width="6"/>
  <rect x="330" y="142" width="140" height="12" rx="5" fill="#b45309"/>
  <line x1="355" y1="154" x2="340" y2="220" stroke="#d97706" stroke-width="6" stroke-linecap="round"/>
  <line x1="380" y1="154" x2="372" y2="220" stroke="#b45309" stroke-width="6" stroke-linecap="round"/>
  <line x1="420" y1="154" x2="428" y2="220" stroke="#d97706" stroke-width="6" stroke-linecap="round"/>
  <line x1="445" y1="154" x2="460" y2="220" stroke="#b45309" stroke-width="6" stroke-linecap="round"/>
  <ellipse cx="400" cy="235" rx="65" ry="18" fill="#92400e" opacity="0.7"/>
  <line x1="340" y1="220" x2="318" y2="295" stroke="#d97706" stroke-width="6" stroke-linecap="round"/>
  <line x1="372" y1="220" x2="365" y2="295" stroke="#b45309" stroke-width="6" stroke-linecap="round"/>
  <line x1="428" y1="220" x2="435" y2="295" stroke="#d97706" stroke-width="6" stroke-linecap="round"/>
  <line x1="460" y1="220" x2="482" y2="295" stroke="#b45309" stroke-width="6" stroke-linecap="round"/>
  ${Array.from({length:8},(_,i)=>`<path d="M${318+i*23} 250 Q${329+i*23} 270 ${341+i*23} 250" stroke="#a16207" stroke-width="3" fill="none" opacity="0.7"/>`).join('')}
  <ellipse cx="400" cy="305" rx="75" ry="15" fill="#92400e" opacity="0.6"/>
  <line x1="318" y1="295" x2="305" y2="380" stroke="#d97706" stroke-width="5" stroke-linecap="round"/>
  <line x1="365" y1="295" x2="360" y2="380" stroke="#b45309" stroke-width="5" stroke-linecap="round"/>
  <line x1="435" y1="295" x2="440" y2="380" stroke="#d97706" stroke-width="5" stroke-linecap="round"/>
  <line x1="482" y1="295" x2="495" y2="380" stroke="#b45309" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="400" cy="390" rx="100" ry="75" fill="#b45309"/>
  <ellipse cx="400" cy="380" rx="90" ry="65" fill="#92400e"/>
  <ellipse cx="400" cy="375" rx="80" ry="58" fill="#78350f"/>
  <ellipse cx="400" cy="330" rx="20" ry="55" fill="#4ade80"/>
  <ellipse cx="375" cy="345" rx="16" ry="45" fill="#22c55e" transform="rotate(-18 375 345)"/>
  <ellipse cx="425" cy="345" rx="16" ry="45" fill="#22c55e" transform="rotate(18 425 345)"/>
  <line x1="305" y1="380" x2="295" y2="500" stroke="#d97706" stroke-width="5" stroke-linecap="round"/>
  <line x1="360" y1="380" x2="355" y2="500" stroke="#b45309" stroke-width="5" stroke-linecap="round"/>
  <line x1="440" y1="380" x2="445" y2="500" stroke="#d97706" stroke-width="5" stroke-linecap="round"/>
  <line x1="495" y1="380" x2="505" y2="500" stroke="#b45309" stroke-width="5" stroke-linecap="round"/>
`);

// ─── POTTERY  (terracotta / earthy orange) ────────────────────────────────────

// p1 · Terracotta Vase
const p1 = wrap('#ffedd5', '#fed7aa', `
  <ellipse cx="400" cy="510" rx="145" ry="18" fill="rgba(120,53,15,0.15)"/>
  <ellipse cx="400" cy="490" rx="220" ry="28" fill="#92400e" opacity="0.4"/>
  <path d="M280 490 C270 400 285 300 310 240 C330 190 365 170 400 168 C435 170 470 190 490 240 C515 300 530 400 520 490 Z" fill="#c2410c"/>
  <path d="M290 490 C282 410 296 312 318 254 C336 202 368 184 400 182 C432 184 464 202 482 254 C504 312 518 410 510 490 Z" fill="#dc2626" opacity="0.7"/>
  <ellipse cx="400" cy="168" rx="60" ry="18" fill="#9a3412"/>
  <ellipse cx="400" cy="162" rx="55" ry="14" fill="#c2410c"/>
  <ellipse cx="400" cy="158" rx="45" ry="10" fill="#dc2626" opacity="0.7"/>
  ${Array.from({length:12},(_,i)=>`<path d="M${282+i*6} 490 Q${290+i*6} ${400-i*12} ${298+i*6} 168" stroke="#991b1b" stroke-width="1.5" fill="none" opacity="${0.1+i*0.025}"/>`).join('')}
  <ellipse cx="355" cy="260" rx="45" ry="22" fill="white" opacity="0.15" transform="rotate(-15 355 260)"/>
  <ellipse cx="345" cy="248" rx="20" ry="10" fill="white" opacity="0.22" transform="rotate(-12 345 248)"/>
`);

// p2 · Speckled Cereal Bowl
const p2 = wrap('#ffedd5', '#fef3c7', `
  <ellipse cx="400" cy="505" rx="165" ry="20" fill="rgba(120,53,15,0.14)"/>
  <ellipse cx="400" cy="460" rx="235" ry="55" fill="#78350f"/>
  <path d="M175 360 Q185 490 400 498 Q615 490 625 360 Q580 215 400 210 Q220 215 175 360Z" fill="#e7e5e4"/>
  <path d="M190 365 Q200 485 400 492 Q600 485 610 365 Q568 228 400 224 Q232 228 190 365Z" fill="#f5f5f4"/>
  <path d="M250 280 Q330 450 400 460 Q470 450 550 280 Q510 220 400 218 Q290 220 250 280Z" fill="#9a3412" opacity="0.15"/>
  ${Array.from({length:60},(_,i)=>{
    const x = 200+Math.sin(i*2.8)*160+(i%8)*30;
    const y = 260+Math.cos(i*1.9)*120+(i%6)*25;
    const r = 3+Math.sin(i*1.3)*2;
    const colors=['#78350f','#92400e','#57534e','#a16207','#6b3a0e'];
    return `<circle cx="${Math.round(x)}" cy="${Math.round(y)}" r="${Math.round(r)}" fill="${colors[i%5]}" opacity="0.45"/>`;
  }).join('')}
  <ellipse cx="350" cy="268" rx="38" ry="18" fill="white" opacity="0.25" transform="rotate(-18 350 268)"/>
`);

// p3 · Raku Fire Bowl
const p3 = wrap('#1c1917', '#44403c', `
  <defs>
    <radialGradient id="glow" cx="50%" cy="60%" r="55%">
      <stop offset="0%" stop-color="#f97316" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#1c1917" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="400" cy="480" rx="185" ry="22" fill="url(#glow)" opacity="0.8"/>
  <path d="M200 380 Q210 495 400 500 Q590 495 600 380 Q560 240 400 235 Q240 240 200 380Z" fill="#292524"/>
  <path d="M215 382 Q224 490 400 494 Q576 490 585 382 Q548 252 400 248 Q252 252 215 382Z" fill="#1c1917"/>
  ${Array.from({length:30},(_,i)=>{
    const x1 = 230+Math.sin(i*0.7)*150+i*8;
    const y1 = 270+Math.cos(i*1.1)*80+i*5;
    const x2 = x1+(-20+i*3);
    const y2 = y1+(40+i*2);
    const colors=['#f97316','#ea580c','#fbbf24','#c2410c','#fed7aa'];
    return `<line x1="${Math.round(x1%580+220)}" y1="${Math.round(y1%200+250)}" x2="${Math.round(x2%580+220)}" y2="${Math.round(y2%200+280)}" stroke="${colors[i%5]}" stroke-width="${1+i%3}" opacity="${0.15+((i%4)*0.08)}"/>`;
  }).join('')}
  <path d="M340 395 Q365 350 400 340 Q435 350 460 395" stroke="#f97316" stroke-width="3" fill="none" opacity="0.5"/>
  <path d="M310 420 Q355 375 400 365 Q445 375 490 420" stroke="#fb923c" stroke-width="2.5" fill="none" opacity="0.4"/>
  <ellipse cx="360" cy="288" rx="32" ry="15" fill="#f97316" opacity="0.12" transform="rotate(-15 360 288)"/>
`);

// p4 · Pinch Pot Espresso Cup
const p4 = wrap('#ffedd5', '#fef3c7', `
  <ellipse cx="400" cy="505" rx="88" ry="12" fill="rgba(120,53,15,0.15)"/>
  <path d="M330 275 C325 340 330 430 345 485 C360 505 440 505 455 485 C470 430 475 340 470 275 C465 255 445 240 400 238 C355 240 335 255 330 275 Z" fill="#c2410c"/>
  <path d="M338 278 C333 340 337 428 350 482 C362 500 438 500 450 482 C463 428 467 340 462 278 C458 260 440 248 400 246 C360 248 342 260 338 278 Z" fill="#ea580c"/>
  <path d="M338 278 C342 262 368 252 400 252 C432 252 458 262 462 278 C448 268 428 262 400 262 C372 262 352 268 338 278Z" fill="#f97316" opacity="0.6"/>
  <ellipse cx="400" cy="248" rx="65" ry="16" fill="#9a3412"/>
  <ellipse cx="400" cy="244" rx="58" ry="12" fill="#c2410c"/>
  <path d="M470 340 Q510 338 515 375 Q512 410 470 408" stroke="#9a3412" stroke-width="10" fill="none" stroke-linecap="round"/>
  ${Array.from({length:8},(_,i)=>`<path d="M340 ${295+i*24} Q400 ${290+i*24} 460 ${295+i*24}" stroke="#991b1b" stroke-width="1.8" fill="none" opacity="0.3"/>`).join('')}
  <ellipse cx="365" cy="295" rx="28" ry="12" fill="white" opacity="0.18" transform="rotate(-10 365 295)"/>
`);

// p5 · Slab-Built Planter
const p5 = wrap('#ecfdf5', '#d1fae5', `
  <ellipse cx="400" cy="508" rx="155" ry="18" fill="rgba(120,53,15,0.12)"/>
  <path d="M245 240 L260 490 L540 490 L555 240 Z" fill="#6d9e75"/>
  <path d="M260 240 L273 480 L527 480 L540 240 Z" fill="#5a8a62"/>
  <path d="M245 230 L555 230 L555 255 L245 255 Z" rx="6" fill="#4d7a54"/>
  <path d="M257 255 L265 480 L270 480 L262 255Z" fill="#4d7a54" opacity="0.5"/>
  <path d="M543 255 L535 480 L530 480 L538 255Z" fill="#4d7a54" opacity="0.5"/>
  ${Array.from({length:10},(_,i)=>
    Array.from({length:7},(_,j)=>`<circle cx="${275+i*28}" cy="${268+j*30}" r="5" fill="none" stroke="#3d6b45" stroke-width="1.5" opacity="0.5"/>`)
    .join('')
  ).join('')}
  <ellipse cx="400" cy="230" rx="155" ry="18" fill="#4d7a54"/>
  <ellipse cx="380" cy="175" rx="22" ry="55" fill="#22c55e"/>
  <ellipse cx="360" cy="188" rx="18" ry="45" fill="#16a34a" transform="rotate(-18 360 188)"/>
  <ellipse cx="400" cy="168" rx="18" ry="48" fill="#4ade80" transform="rotate(8 400 168)"/>
  <ellipse cx="422" cy="182" rx="16" ry="40" fill="#22c55e" transform="rotate(22 422 182)"/>
`);

// p6 · Yunomi Tea Cup
const p6 = wrap('#f5f5f4', '#e7e5e4', `
  <ellipse cx="400" cy="505" rx="110" ry="15" fill="rgba(80,40,10,0.12)"/>
  <path d="M308 200 L320 490 L480 490 L492 200 Z" fill="#78716c"/>
  <path d="M320 200 L330 480 L470 480 L480 200 Z" fill="#a8a29e"/>
  <path d="M308 195 L492 195 L492 218 L308 218 Z" fill="#57534e"/>
  <path d="M480 195 L492 195 L492 218 L480 218 Z" fill="#44403c"/>
  <path d="M320 480 L330 480 L330 488 L320 488 Z" fill="#44403c"/>
  <path d="M462 200 Q498 290 495 380 Q492 450 480 490" stroke="#6b7280" stroke-width="18" fill="none" stroke-linecap="round" opacity="0.35"/>
  <path d="M458 200 Q492 285 490 372 Q487 445 476 488" stroke="#f5f0e8" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.2"/>
  ${Array.from({length:6},(_,i)=>`<path d="M322 ${222+i*42} Q400 ${216+i*42} 478 ${222+i*42}" stroke="#57534e" stroke-width="1.5" fill="none" opacity="0.35"/>`).join('')}
  <ellipse cx="362" cy="240" rx="30" ry="14" fill="white" opacity="0.2" transform="rotate(-8 362 240)"/>
`);

// ─── WOODWORKING  (amber / warm wood) ────────────────────────────────────────

// w1 · Carved Bear
const w1 = wrap('#fef3c7', '#fcd34d', `
  <defs>
    <linearGradient id="wood" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>
  <ellipse cx="400" cy="508" rx="130" ry="16" fill="rgba(120,60,0,0.14)"/>
  <ellipse cx="340" cy="215" rx="52" ry="52" fill="url(#wood)"/>
  <ellipse cx="460" cy="215" rx="52" ry="52" fill="url(#wood)"/>
  <ellipse cx="400" cy="290" rx="140" ry="130" fill="#f59e0b"/>
  <ellipse cx="400" cy="300" rx="128" ry="118" fill="url(#wood)"/>
  <ellipse cx="400" cy="420" rx="110" ry="90" fill="#d97706"/>
  <ellipse cx="400" cy="425" rx="98" ry="80" fill="#b45309"/>
  <ellipse cx="350" cy="460" rx="45" ry="52" fill="#d97706"/>
  <ellipse cx="450" cy="460" rx="45" ry="52" fill="#d97706"/>
  <ellipse cx="350" cy="460" rx="35" ry="42" fill="#b45309"/>
  <ellipse cx="450" cy="460" rx="35" ry="42" fill="#b45309"/>
  <ellipse cx="370" cy="270" rx="22" ry="22" fill="#78350f"/>
  <ellipse cx="430" cy="270" rx="22" ry="22" fill="#78350f"/>
  <circle cx="370" cy="270" r="10" fill="#1c1917"/>
  <circle cx="430" cy="270" r="10" fill="#1c1917"/>
  <circle cx="374" cy="267" r="4" fill="white"/>
  <circle cx="434" cy="267" r="4" fill="white"/>
  <ellipse cx="400" cy="315" rx="35" ry="25" fill="#92400e"/>
  <ellipse cx="400" cy="318" rx="25" ry="16" fill="#78350f"/>
  <circle cx="400" cy="306" r="12" fill="#44403c"/>
  ${Array.from({length:12},(_,i)=>`<path d="M${268+i*12} 360 Q${272+i*12} ${390+Math.sin(i)*15} ${268+i*12} 420" stroke="#b45309" stroke-width="1.5" fill="none" opacity="0.25"/>`).join('')}
`);

// w2 · Live-Edge Serving Board
const w2 = wrap('#fef3c7', '#fde68a', `
  <defs>
    <linearGradient id="walnut" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#44403c"/>
      <stop offset="40%" stop-color="#292524"/>
      <stop offset="100%" stop-color="#1c1917"/>
    </linearGradient>
  </defs>
  <ellipse cx="400" cy="510" rx="220" ry="18" fill="rgba(0,0,0,0.15)"/>
  <path d="M155 180 C148 195 138 255 145 320 C152 385 158 440 168 480 C178 520 592 520 608 480 C622 440 648 385 655 320 C662 255 652 195 645 180 C635 168 625 162 615 168 C605 175 598 198 590 215 C582 232 575 238 568 230 C560 220 555 205 548 192 C540 178 530 168 520 168 C510 168 502 178 495 190 C488 200 482 212 476 215 C470 218 462 212 455 202 C448 192 440 178 430 172 C420 165 408 165 400 165 L155 180Z" fill="url(#walnut)"/>
  <path d="M168 480 L600 480 L600 508 Q400 515 168 508 Z" fill="#1c1917"/>
  ${Array.from({length:18},(_,i)=>`<path d="M168 ${200+i*16} Q400 ${196+i*16} 620 ${200+i*16}" stroke="#57534e" stroke-width="1.5" fill="none" opacity="0.3"/>`).join('')}
  <rect x="270" y="310" width="12" height="80" rx="3" fill="#d97706" transform="rotate(-5 270 310)"/>
  <rect x="285" y="308" width="12" height="80" rx="3" fill="#fbbf24" transform="rotate(3 285 308)"/>
  <ellipse cx="380" cy="245" rx="42" ry="18" fill="#44403c" opacity="0.3" transform="rotate(12 380 245)"/>
`);

// w3 · Spoon Set
const w3 = wrap('#fef3c7', '#fde68a', `
  <ellipse cx="400" cy="510" rx="220" ry="16" fill="rgba(0,0,0,0.1)"/>
  <path d="M250 460 L260 225 Q265 148 290 135 Q318 125 328 148 Q338 172 330 225 L320 460 Z" fill="#d97706"/>
  <ellipse cx="289" cy="150" rx="52" ry="42" fill="#fbbf24"/>
  <ellipse cx="285" cy="145" rx="42" ry="32" fill="#f59e0b"/>
  <ellipse cx="278" cy="138" rx="18" ry="12" fill="white" opacity="0.2" transform="rotate(-15 278 138)"/>
  <path d="M370 470 L375 290 Q378 218 400 205 Q422 195 428 218 Q435 290 430 470 Z" fill="#b45309"/>
  <ellipse cx="401" cy="210" rx="42" ry="32" fill="#d97706"/>
  <ellipse cx="400" cy="206" rx="33" ry="24" fill="#fbbf24"/>
  <ellipse cx="393" cy="200" rx="14" ry="9" fill="white" opacity="0.2" transform="rotate(-10 393 200)"/>
  <path d="M482 455 L488 340 Q490 280 508 268 Q528 258 536 278 Q548 305 540 362 L528 455 Z" fill="#92400e"/>
  <ellipse cx="512" cy="272" rx="36" ry="26" fill="#b45309"/>
  <ellipse cx="511" cy="268" rx="27" ry="19" fill="#d97706"/>
  <ellipse cx="506" cy="263" rx="12" ry="8" fill="white" opacity="0.2" transform="rotate(-8 506 263)"/>
  ${Array.from({length:8},(_,i)=>`<path d="M${256+i*2} ${280+i*22} Q${289} ${278+i*22} ${322-i*2} ${280+i*22}" stroke="#78350f" stroke-width="1.5" fill="none" opacity="0.3"/>`).join('')}
`);

// w4 · Floating Shelf Trio
const w4 = wrap('#fefce8', '#fef3c7', `
  <rect x="120" y="148" width="560" height="32" rx="6" fill="#d97706"/>
  <rect x="120" y="148" width="560" height="24" rx="5" fill="#f59e0b"/>
  <rect x="120" y="302" width="420" height="32" rx="6" fill="#b45309"/>
  <rect x="120" y="302" width="420" height="24" rx="5" fill="#d97706"/>
  <rect x="220" y="456" width="320" height="32" rx="6" fill="#92400e"/>
  <rect x="220" y="456" width="320" height="24" rx="5" fill="#b45309"/>
  <circle cx="192" cy="212" r="22" fill="#4ade80"/>
  <rect x="182" y="148" width="8" height="28" rx="3" fill="#15803d"/>
  <rect x="240" y="148" width="80" height="28" rx="4" fill="#92400e"/>
  <rect x="248" y="148" width="70" height="24" rx="3" fill="#78350f"/>
  <rect x="340" y="148" width="65" height="28" rx="4" fill="#b45309"/>
  <rect x="348" y="148" width="55" height="24" rx="3" fill="#92400e"/>
  <rect x="450" y="148" width="180" height="28" rx="4" fill="#78350f" opacity="0.7"/>
  <ellipse cx="192" cy="362" r="20" fill="#f97316"/>
  <rect x="182" y="302" width="8" height="28" rx="3" fill="#b45309"/>
  <rect x="240" y="302" width="75" height="28" rx="4" fill="#92400e"/>
  <rect x="348" y="302" width="55" height="28" rx="4" fill="#b45309"/>
  <ellipse cx="305" cy="512" r="18" fill="#a78bfa"/>
  <rect x="295" y="456" width="8" height="26" rx="3" fill="#7c3aed"/>
  <rect x="345" y="456" width="60" height="26" rx="4" fill="#92400e"/>
  <rect x="435" y="456" width="60" height="26" rx="4" fill="#78350f"/>
`);

// w5 · Bandsaw Box
const w5 = wrap('#fef3c7', '#fde68a', `
  <ellipse cx="400" cy="510" rx="175" ry="18" fill="rgba(0,0,0,0.12)"/>
  <path d="M200 460 Q205 240 260 185 Q320 148 400 148 Q480 148 540 185 Q595 240 600 460 Z" fill="#b45309"/>
  <path d="M215 458 Q220 248 270 196 Q328 160 400 160 Q472 160 530 196 Q580 248 585 458 Z" fill="#d97706"/>
  <path d="M230 455 Q235 258 282 208 Q336 175 400 175 Q464 175 518 208 Q565 258 570 455 Z" fill="#f59e0b"/>
  <path d="M215 338 Q220 318 400 315 Q580 318 585 338 L585 368 Q580 388 400 390 Q220 388 215 368 Z" fill="#b45309"/>
  <path d="M225 340 Q230 322 400 320 Q570 322 575 340 L575 365 Q570 383 400 385 Q230 383 225 365 Z" fill="#92400e"/>
  ${Array.from({length:14},(_,i)=>`<path d="M${232+i*24} 178 Q${236+i*24} 320 ${236+i*24} 458" stroke="#d97706" stroke-width="1.5" fill="none" opacity="0.25"/>`).join('')}
  <ellipse cx="353" cy="352" rx="18" ry="10" fill="#78350f"/>
  <ellipse cx="400" cy="232" rx="45" ry="18" fill="white" opacity="0.12" transform="rotate(-5 400 232)"/>
`);

// w6 · Hand-Cut Dovetails
const w6 = wrap('#fef3c7', '#fde68a', `
  <rect x="155" y="155" width="215" height="330" rx="6" fill="#fbbf24"/>
  <rect x="165" y="165" width="195" height="310" rx="4" fill="#f59e0b"/>
  ${Array.from({length:10},(_,i)=>`<path d="M165 ${175+i*30} Q262 ${172+i*30} 360 ${175+i*30}" stroke="#d97706" stroke-width="1.5" fill="none" opacity="0.35"/>`).join('')}
  <polygon points="370,180 430,155 430,205 370,230" fill="#b45309"/>
  <polygon points="370,240 430,215 430,265 370,290" fill="#92400e"/>
  <polygon points="370,300 430,275 430,325 370,350" fill="#b45309"/>
  <polygon points="370,360 430,335 430,385 370,410" fill="#92400e"/>
  <polygon points="370,420 430,395 430,445 370,470" fill="#b45309"/>
  <rect x="430" y="155" width="215" height="330" rx="6" fill="#d97706"/>
  <rect x="440" y="165" width="195" height="310" rx="4" fill="#fbbf24"/>
  ${Array.from({length:10},(_,i)=>`<path d="M440 ${175+i*30} Q537 ${172+i*30} 635 ${175+i*30}" stroke="#b45309" stroke-width="1.5" fill="none" opacity="0.35"/>`).join('')}
  <ellipse cx="248" cy="198" rx="35" ry="14" fill="white" opacity="0.15" transform="rotate(-8 248 198)"/>
`);

// w7 · Mallet From Scrap Oak
const w7 = wrap('#fef3c7', '#fde68a', `
  <ellipse cx="400" cy="508" rx="105" ry="15" fill="rgba(0,0,0,0.12)"/>
  <rect x="280" y="145" width="240" height="188" rx="22" fill="#b45309"/>
  <rect x="295" y="158" width="210" height="162" rx="16" fill="#d97706"/>
  <rect x="295" y="158" width="210" height="162" rx="16" fill="#f59e0b" opacity="0.5"/>
  ${Array.from({length:10},(_,i)=>`<path d="M297 ${168+i*15} Q400 ${164+i*15} 503 ${168+i*15}" stroke="#b45309" stroke-width="1.5" fill="none" opacity="0.3"/>`).join('')}
  <rect x="380" y="333" width="40" height="168" rx="12" fill="#92400e"/>
  <rect x="387" y="340" width="26" height="155" rx="8" fill="#b45309"/>
  ${Array.from({length:8},(_,i)=>`<path d="M387 ${348+i*18} Q400 ${346+i*18} 413 ${348+i*18}" stroke="#78350f" stroke-width="1.5" fill="none" opacity="0.4"/>`).join('')}
  <rect x="380" y="498" width="40" height="14" rx="6" fill="#78350f"/>
  <ellipse cx="368" cy="178" rx="30" ry="12" fill="white" opacity="0.15" transform="rotate(-8 368 178)"/>
`);

// ─── BAKING  (warm golden cream) ─────────────────────────────────────────────

// bk1 · Chocolate Layer Cake
const bk1 = wrap('#fefce8', '#fef3c7', `
  <ellipse cx="400" cy="510" rx="165" ry="18" fill="rgba(60,20,0,0.15)"/>
  <ellipse cx="400" cy="495" rx="160" ry="22" fill="#78350f"/>
  <rect x="242" y="200" width="316" height="300" rx="6" fill="#422006"/>
  <rect x="250" y="268" width="300" height="2" fill="#7c2d12" opacity="0.8"/>
  <rect x="250" y="336" width="300" height="2" fill="#7c2d12" opacity="0.8"/>
  <rect x="250" y="404" width="300" height="2" fill="#7c2d12" opacity="0.8"/>
  <rect x="250" y="270" width="300" height="66" fill="#fef3c7" opacity="0.12"/>
  <rect x="250" y="338" width="300" height="66" fill="#fef3c7" opacity="0.12"/>
  <rect x="250" y="406" width="300" height="64" fill="#fef3c7" opacity="0.12"/>
  <ellipse cx="400" cy="202" rx="160" ry="28" fill="#78350f"/>
  <ellipse cx="400" cy="196" rx="155" ry="24" fill="#422006"/>
  <path d="M280 170 Q310 148 350 155 Q370 140 400 138 Q430 140 450 155 Q490 148 520 170 Q480 188 400 192 Q320 188 280 170Z" fill="#292524"/>
  <path d="M305 164 Q320 148 345 152 C360 140 400 136 400 136 C400 136 440 140 455 152 Q480 148 495 164 Q480 175 400 178 Q320 175 305 164Z" fill="#1c1917"/>
  ${['#422006','#3c1a06','#3c1a06','#422006'].map((c,i)=>`<path d="M${268+i*18} 196 Q${268+i*18} 210 ${264+i*16} 225" stroke="${c}" stroke-width="22" fill="none" stroke-linecap="round"/>`).join('')}
  <ellipse cx="355" cy="175" rx="30" ry="12" fill="white" opacity="0.08" transform="rotate(-12 355 175)"/>
`);

// bk2 · French Macarons
const bk2 = wrap('#fce7f3', '#fef3c7', `
  <ellipse cx="400" cy="510" rx="140" ry="16" fill="rgba(0,0,0,0.08)"/>
  ${[
    {y:450,c1:'#fda4af',c2:'#fb7185',f:'#fecdd3',cy:430},
    {y:368,c1:'#d8b4fe',c2:'#a855f7',f:'#ede9fe',cy:348},
    {y:286,c1:'#fde68a',c2:'#f59e0b',f:'#fef3c7',cy:266},
    {y:204,c1:'#a7f3d0',c2:'#10b981',f:'#d1fae5',cy:184},
    {y:122,c1:'#bfdbfe',c2:'#3b82f6',f:'#dbeafe',cy:102},
  ].map(m=>`
    <ellipse cx="400" cy="${m.y}" rx="118" ry="28" fill="${m.c2}" opacity="0.9"/>
    <ellipse cx="400" cy="${m.y-10}" rx="110" ry="22" fill="${m.c1}"/>
    <ellipse cx="400" cy="${m.y-22}" rx="108" ry="10" fill="${m.f}" opacity="0.6"/>
    <ellipse cx="400" cy="${m.y+5}" rx="108" ry="10" fill="${m.f}" opacity="0.5"/>
    <ellipse cx="400" cy="${m.cy}" rx="115" ry="32" fill="${m.f}" opacity="0.88"/>
    <ellipse cx="368" cy="${m.cy-8}" rx="28" ry="12" fill="white" opacity="0.25" transform="rotate(-12 368 ${m.cy-8})"/>
  `).join('')}
`);

// bk3 · Earl Grey Chiffon Cake
const bk3 = wrap('#fefce8', '#ede9fe', `
  <ellipse cx="400" cy="508" rx="160" ry="18" fill="rgba(0,0,0,0.08)"/>
  <ellipse cx="400" cy="490" rx="158" ry="22" fill="#d97706" opacity="0.4"/>
  <rect x="243" y="240" width="314" height="252" rx="6" fill="#fef9c3"/>
  <rect x="250" y="248" width="300" height="238" rx="4" fill="#fefce8"/>
  <rect x="250" y="316" width="300" height="3" fill="#d97706" opacity="0.35"/>
  <rect x="250" y="384" width="300" height="3" fill="#d97706" opacity="0.35"/>
  <rect x="250" y="318" width="300" height="66" fill="#a78bfa" opacity="0.08"/>
  <rect x="250" y="386" width="300" height="66" fill="#c4b5fd" opacity="0.1"/>
  <ellipse cx="400" cy="242" rx="158" ry="26" fill="#fef3c7"/>
  <ellipse cx="400" cy="238" rx="152" ry="22" fill="#fefce8"/>
  <path d="M345 218 Q370 205 400 202 Q430 205 455 218 Q445 228 400 230 Q355 228 345 218Z" fill="#e9d5ff"/>
  ${Array.from({length:6},(_,i)=>`<path d="M345 ${222+i*6} Q400 ${220+i*6} 455 ${222+i*6}" stroke="#c4b5fd" stroke-width="2" fill="none" opacity="0.55"/>`).join('')}
  <path d="M362 340 Q368 320 380 316 Q390 312 400 316 Q410 312 420 316 Q432 320 438 340" stroke="#c4b5fd" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6"/>
  <ellipse cx="358" cy="268" rx="28" ry="12" fill="white" opacity="0.35" transform="rotate(-8 358 268)"/>
`);

// bk4 · Cinnamon Roll Buns
const bk4 = wrap('#fef3c7', '#fde68a', `
  <ellipse cx="400" cy="510" rx="210" ry="18" fill="rgba(0,0,0,0.1)"/>
  <rect x="165" y="330" width="470" height="158" rx="18" fill="#92400e"/>
  <rect x="178" y="342" width="444" height="140" rx="12" fill="#b45309"/>
  ${[
    {cx:245,cy:390},{cx:395,cy:380},{cx:548,cy:390},
    {cx:318,cy:430},{cx:470,cy:435},
  ].map(({cx,cy})=>`
    <circle cx="${cx}" cy="${cy}" r="62" fill="#d97706"/>
    <path d="M${cx} ${cy-54} Q${cx+54} ${cy} ${cx} ${cy+54} Q${cx-54} ${cy} ${cx} ${cy-54}" stroke="#92400e" stroke-width="10" fill="none" opacity="0.5"/>
    <path d="M${cx} ${cy-38} Q${cx+38} ${cy} ${cx} ${cy+38} Q${cx-38} ${cy} ${cx} ${cy-38}" stroke="#78350f" stroke-width="8" fill="none" opacity="0.5"/>
    <path d="M${cx} ${cy-20} Q${cx+20} ${cy} ${cx} ${cy+20} Q${cx-20} ${cy} ${cx} ${cy-20}" stroke="#92400e" stroke-width="6" fill="none" opacity="0.6"/>
    <circle cx="${cx}" cy="${cy}" r="10" fill="#b45309"/>
    <ellipse cx="${cx-18}" cy="${cy-22}" rx="16" ry="7" fill="white" opacity="0.18" transform="rotate(-20 ${cx-18} ${cy-22})"/>
  `).join('')}
  ${Array.from({length:8},(_,i)=>`<path d="M${195+i*42} 342 Q${216+i*42} 330 ${237+i*42} 342" stroke="white" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.35"/>`).join('')}
`);

// bk5 · Tarte Tatin
const bk5 = wrap('#fef3c7', '#fbbf24', `
  <ellipse cx="400" cy="508" rx="190" ry="20" fill="rgba(80,30,0,0.15)"/>
  <ellipse cx="400" cy="488" rx="188" ry="25" fill="#92400e"/>
  <ellipse cx="400" cy="390" rx="188" ry="108" fill="#78350f"/>
  <ellipse cx="400" cy="380" rx="182" ry="102" fill="#92400e"/>
  <ellipse cx="400" cy="375" rx="175" ry="96" fill="#c2410c"/>
  ${Array.from({length:8},(_,i)=>{
    const angle = i*(Math.PI*2/8);
    const r = 118;
    const cx = 400+Math.cos(angle)*r;
    const cy = 375+Math.sin(angle)*r*0.55;
    return `<ellipse cx="${Math.round(cx)}" cy="${Math.round(cy)}" rx="55" ry="38" fill="#b45309" transform="rotate(${Math.round(i*45)} ${Math.round(cx)} ${Math.round(cy)})"/>`;
  }).join('')}
  ${Array.from({length:8},(_,i)=>{
    const angle = i*(Math.PI*2/8)+0.39;
    const r = 62;
    const cx = 400+Math.cos(angle)*r;
    const cy = 375+Math.sin(angle)*r*0.55;
    return `<ellipse cx="${Math.round(cx)}" cy="${Math.round(cy)}" rx="52" ry="36" fill="#d97706" transform="rotate(${Math.round(i*45)} ${Math.round(cx)} ${Math.round(cy)})"/>`;
  }).join('')}
  <ellipse cx="400" cy="372" rx="45" ry="32" fill="#fbbf24" opacity="0.5"/>
  <ellipse cx="362" cy="330" rx="42" ry="18" fill="white" opacity="0.08" transform="rotate(-12 362 330)"/>
`);

// bk6 · Crème Brûlée
const bk6 = wrap('#fefce8', '#fef3c7', `
  <ellipse cx="400" cy="510" rx="178" ry="18" fill="rgba(0,0,0,0.1)"/>
  <ellipse cx="400" cy="478" rx="175" ry="38" fill="#92400e" opacity="0.35"/>
  <path d="M225 350 Q230 478 400 485 Q570 478 575 350 Q560 282 400 278 Q240 282 225 350Z" fill="#fde68a"/>
  <path d="M235 352 Q240 472 400 479 Q560 472 565 352 Q552 292 400 288 Q248 292 235 352Z" fill="#fef3c7"/>
  <defs>
    <radialGradient id="brulee" cx="48%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="45%" stop-color="#fbbf24"/>
      <stop offset="78%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#92400e"/>
    </radialGradient>
  </defs>
  <ellipse cx="400" cy="300" rx="160" ry="36" fill="url(#brulee)"/>
  <path d="M295 298 Q340 282 400 280 Q460 282 505 298" stroke="#b45309" stroke-width="3" fill="none" opacity="0.5"/>
  <path d="M318 295 Q360 284 400 282 Q440 284 482 295" stroke="#fef08a" stroke-width="2" fill="none" opacity="0.6"/>
  <ellipse cx="360" cy="286" rx="28" ry="10" fill="white" opacity="0.22" transform="rotate(-8 360 286)"/>
  <ellipse cx="400" cy="290" rx="8" ry="5" fill="#fef08a" opacity="0.9"/>
`);

// ─── PAINTING  (indigo / violet) ─────────────────────────────────────────────

// pt1 · Misty Forest in Oils
const pt1 = wrap('#c7d2fe', '#4f46e5', `
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#312e81"/>
      <stop offset="60%" stop-color="#4338ca"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#sky)"/>
  <rect x="0" y="420" width="800" height="180" fill="#1e1b4b"/>
  ${Array.from({length:22},(_,i)=>{
    const x = i*38+10;
    const h = 200+Math.sin(i*0.7)*80;
    const w = 22+Math.sin(i*1.3)*10;
    const shade = i%3===0?'#1e1b4b':i%3===1?'#312e81':'#2e1065';
    return `<rect x="${x}" y="${430-h}" width="${w}" height="${h+180}" rx="4" fill="${shade}" opacity="${0.6+i%4*0.1}"/>`;
  }).join('')}
  ${Array.from({length:14},(_,i)=>{
    const x = i*58+20;
    const h = 140+Math.cos(i*0.9)*60;
    const shade = i%2===0?'#312e81':'#3730a3';
    return `<rect x="${x}" y="${435-h}" width="16" height="${h+175}" rx="3" fill="${shade}" opacity="0.75"/>`;
  }).join('')}
  <rect x="0" y="450" width="800" height="20" fill="#4338ca" opacity="0.22"/>
  <rect x="0" y="465" width="800" height="15" fill="#6366f1" opacity="0.15"/>
  <rect x="0" y="478" width="800" height="12" fill="#818cf8" opacity="0.1"/>
`);

// pt2 · Loose Watercolour Botanicals
const pt2 = wrap('#f8fafc', '#eef2ff', `
  <ellipse cx="320" cy="280" rx="85" ry="85" fill="#fda4af" opacity="0.55"/>
  <ellipse cx="340" cy="260" rx="70" ry="70" fill="#fb7185" opacity="0.45"/>
  <ellipse cx="310" cy="295" rx="55" ry="55" fill="#f43f5e" opacity="0.35"/>
  <ellipse cx="500" cy="230" rx="72" ry="72" fill="#c4b5fd" opacity="0.55"/>
  <ellipse cx="518" cy="214" rx="58" ry="58" fill="#a78bfa" opacity="0.45"/>
  <ellipse cx="490" cy="248" rx="48" ry="48" fill="#8b5cf6" opacity="0.35"/>
  <ellipse cx="420" cy="380" rx="65" ry="65" fill="#6ee7b7" opacity="0.5"/>
  <ellipse cx="438" cy="362" rx="52" ry="52" fill="#34d399" opacity="0.4"/>
  <ellipse cx="240" cy="400" rx="50" ry="50" fill="#fde68a" opacity="0.55"/>
  <ellipse cx="255" cy="388" rx="38" ry="38" fill="#fbbf24" opacity="0.45"/>
  <ellipse cx="560" cy="380" rx="55" ry="55" fill="#bfdbfe" opacity="0.5"/>
  <path d="M280 330 Q350 280 400 300 Q450 320 380 380" stroke="#15803d" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.6"/>
  <path d="M360 200 Q400 170 430 195" stroke="#166534" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.5"/>
  <path d="M460 320 Q510 300 520 350" stroke="#15803d" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.5"/>
  <path d="M295 360 Q260 380 245 420" stroke="#166534" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.5"/>
  ${Array.from({length:30},(_,i)=>`<circle cx="${160+i*17}" cy="${145+Math.sin(i)*30}" r="2" fill="#94a3b8" opacity="0.35"/>`).join('')}
`);

// pt3 · Abstract Acrylic Pour
const pt3 = wrap('#0f172a', '#1e1b4b', `
  <defs>
    <linearGradient id="pour1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
    <linearGradient id="pour2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#818cf8"/>
      <stop offset="50%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <path d="M0 200 Q100 180 200 220 Q300 260 400 200 Q500 140 600 180 Q700 220 800 190 L800 400 Q700 380 600 420 Q500 460 400 400 Q300 340 200 400 Q100 460 0 420 Z" fill="#1e3a8a"/>
  <path d="M50 250 Q180 220 310 270 Q440 320 570 260 Q680 210 800 240 L800 340 Q680 310 570 360 Q440 410 310 360 Q180 310 50 340 Z" fill="url(#pour2)" opacity="0.85"/>
  <path d="M100 280 Q220 310 350 275 Q480 240 600 290 Q700 330 800 300 L800 380 Q700 410 600 370 Q480 330 350 365 Q220 400 100 370 Z" fill="url(#pour1)" opacity="0.78"/>
  <ellipse cx="320" cy="295" rx="38" ry="28" fill="white" opacity="0.55"/>
  <ellipse cx="325" cy="298" rx="22" ry="16" fill="white" opacity="0.65"/>
  <ellipse cx="328" cy="300" rx="10" ry="8" fill="white" opacity="0.8"/>
  <ellipse cx="520" cy="320" rx="30" ry="22" fill="white" opacity="0.5"/>
  <ellipse cx="524" cy="323" rx="18" ry="13" fill="white" opacity="0.6"/>
  <ellipse cx="200" cy="340" rx="20" ry="14" fill="white" opacity="0.45"/>
  <ellipse cx="648" cy="278" rx="22" ry="16" fill="white" opacity="0.48"/>
  <path d="M0 150 Q200 120 400 150 Q600 180 800 150" stroke="#4f46e5" stroke-width="28" fill="none" opacity="0.7"/>
  <path d="M0 450 Q200 480 400 450 Q600 420 800 450" stroke="#312e81" stroke-width="25" fill="none" opacity="0.8"/>
`);

// pt4 · Gouache City Skyline
const pt4 = wrap('#1e3a8a', '#312e81', `
  <defs>
    <linearGradient id="dusk" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#312e81"/>
      <stop offset="55%" stop-color="#6d28d9"/>
      <stop offset="100%" stop-color="#be123c"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#dusk)"/>
  <ellipse cx="400" cy="580" rx="380" ry="40" fill="#be123c" opacity="0.3"/>
  <rect x="80" y="280" width="80" height="280" fill="#1e1b4b"/>
  <rect x="92" y="260" width="56" height="22" fill="#1e1b4b"/>
  <rect x="185" y="220" width="100" height="340" fill="#0f172a"/>
  <rect x="200" y="200" width="70" height="22" fill="#0f172a"/>
  <rect x="310" y="150" width="120" height="410" fill="#1e1b4b"/>
  <rect x="328" y="128" width="84" height="24" fill="#1e1b4b"/>
  <rect x="336" y="106" width="14" height="24" fill="#312e81"/>
  <rect x="450" y="185" width="110" height="375" fill="#0f172a"/>
  <rect x="466" y="165" width="78" height="22" fill="#0f172a"/>
  <rect x="580" y="240" width="90" height="320" fill="#1e1b4b"/>
  <rect x="595" y="220" width="60" height="22" fill="#1e1b4b"/>
  <rect x="695" y="295" width="70" height="265" fill="#0f172a"/>
  ${[[100,310],[102,340],[104,370],[106,400],[108,430],[190,250],[192,280],[194,310],[196,340],[198,370],[320,175],[322,205],[324,235],[326,265],[328,295],[330,325],[332,355],[460,215],[462,245],[464,275],[466,305],[468,335],[590,268],[592,298],[592,328],[702,322],[704,352]].map(([x,y])=>`<rect x="${x}" y="${y}" width="12" height="10" fill="#fbbf24" opacity="0.7"/>`).join('')}
`);

// pt5 · Impasto Portrait
const pt5 = wrap('#eef2ff', '#c7d2fe', `
  <defs>
    <linearGradient id="imp" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde68a"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
  </defs>
  <rect x="185" y="120" width="430" height="400" rx="8" fill="#f8fafc"/>
  <ellipse cx="400" cy="335" rx="148" ry="188" fill="url(#imp)"/>
  <ellipse cx="400" cy="285" rx="115" ry="115" fill="#fbbf24"/>
  <path d="M285 340 Q400 480 515 340" fill="#fbbf24"/>
  <path d="M295 345 Q400 468 505 345 Q500 490 400 498 Q300 490 295 345Z" fill="#fde68a"/>
  ${Array.from({length:25},(_,i)=>{
    const x = 200+(i*24);
    const y = 160+(i%5)*42;
    const w = 14+i%8*3;
    const ang = -30+i*5;
    const cols = ['#f97316','#fb923c','#fed7aa','#fbbf24','#fde68a','#a78bfa','#818cf8'];
    return `<rect x="${x}" y="${y}" width="${w}" height="8" rx="3" fill="${cols[i%7]}" opacity="0.7" transform="rotate(${ang} ${x} ${y})"/>`;
  }).join('')}
  <ellipse cx="372" cy="270" rx="15" ry="18" fill="#1c1917"/>
  <ellipse cx="428" cy="270" rx="15" ry="18" fill="#1c1917"/>
  <ellipse cx="375" cy="268" rx="6" ry="7" fill="white"/>
  <ellipse cx="431" cy="268" rx="6" ry="7" fill="white"/>
  <path d="M370 335 Q400 355 430 335" stroke="#78350f" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M350 252 Q380 240 410 248" stroke="#78350f" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M390 252 Q420 240 450 248" stroke="#78350f" stroke-width="4" fill="none" stroke-linecap="round"/>
`);

// pt6 · En Plein Air Coastal Study
const pt6 = wrap('#e0f2fe', '#bfdbfe', `
  <defs>
    <linearGradient id="sea" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7dd3fc"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="cliffL" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#78350f"/>
      <stop offset="100%" stop-color="#92400e"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="800" height="320" fill="#bfdbfe"/>
  <ellipse cx="620" cy="185" rx="68" ry="68" fill="#fef9c3" opacity="0.85"/>
  <ellipse cx="620" cy="185" rx="52" ry="52" fill="#fef3c7" opacity="0.9"/>
  <rect x="0" y="280" width="800" height="320" fill="url(#sea)"/>
  <path d="M0 310 Q80 290 160 320 Q240 350 320 310 Q400 270 480 310 Q560 350 640 310 Q720 270 800 310 L800 360 Q720 340 640 360 Q560 380 480 360 Q400 340 320 360 Q240 380 160 360 Q80 340 0 360 Z" fill="#93c5fd" opacity="0.65"/>
  <path d="M0 360 Q100 338 200 368 Q300 398 400 358 Q500 318 600 358 Q700 398 800 360 L800 420 Q700 438 600 408 Q500 378 400 408 Q300 438 200 408 Q100 378 0 420 Z" fill="#60a5fa" opacity="0.7"/>
  <path d="M0 420 Q120 400 240 430 Q360 460 480 420 Q600 380 720 420 L800 430 L800 500 Q700 510 600 500 Q500 490 400 505 Q300 520 200 505 Q100 490 0 500 Z" fill="#3b82f6" opacity="0.75"/>
  <path d="M0 340 L0 560 L220 560 Q240 400 240 320 Q120 280 0 340Z" fill="url(#cliffL)"/>
  <path d="M0 340 L0 400 Q80 360 160 370 Q200 340 240 320 Q120 280 0 340Z" fill="#b45309" opacity="0.5"/>
  <path d="M800 355 L800 560 L560 560 Q545 410 548 330 Q680 295 800 355Z" fill="#92400e"/>
  <path d="M800 355 L800 415 Q720 375 648 382 Q608 352 548 330 Q680 295 800 355Z" fill="#b45309" opacity="0.5"/>
`);

export const STAMP_ILLUSTRATIONS: Record<string, string> = {
  pc1, pc2, pc3, pc4, pc5, pc6, pc7, pc8,
  g1, g2, g3, g4, g5, g6, g7, g8,
  t1, t2, t3, t4, t5, t6, t7,
  p1, p2, p3, p4, p5, p6,
  w1, w2, w3, w4, w5, w6, w7,
  bk1, bk2, bk3, bk4, bk5, bk6,
  pt1, pt2, pt3, pt4, pt5, pt6,
};
