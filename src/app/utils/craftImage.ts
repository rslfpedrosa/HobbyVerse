type PlanetId = 'knitting' | 'woodworking' | 'garden' | 'pottery' | 'polymer-clay' | 'baking' | 'painting';

function hash(s: string): number {
  let h = 0;
  for (const c of s) h = (Math.imul(31, h) + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}

function xmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

type ShapeFn = (h: number) => string;

const SHAPES: Record<PlanetId, ShapeFn> = {
  'polymer-clay': (h) => {
    const colors = ['#fb7185', '#f472b6', '#e879f9', '#a78bfa', '#38bdf8', '#34d399'];
    return Array.from({ length: 6 }, (_, i) => {
      const x = ((h * (i + 1) * 137) % 680) + 60;
      const y = ((h * (i + 1) * 89) % 480) + 60;
      const rx = ((h * (i + 1) * 53) % 70) + 35;
      const ry = ((h * (i + 2) * 41) % 70) + 35;
      const rot = ((h * (i + 1) * 23) % 180);
      const col = colors[(h * (i + 3)) % colors.length];
      return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${col}" opacity="0.6" transform="rotate(${rot},${x},${y})"/>`;
    }).join('');
  },

  'garden': (h) => {
    const colors = ['#86efac', '#4ade80', '#22c55e', '#bbf7d0', '#166534'];
    return Array.from({ length: 8 }, (_, i) => {
      const x = ((h * (i + 1) * 137) % 700) + 50;
      const y = ((h * (i + 1) * 89) % 500) + 50;
      const size = ((h * (i + 1) * 53) % 70) + 25;
      const rot = ((h * (i + 1) * 41) % 360);
      const col = colors[(h * (i + 2)) % colors.length];
      return `<ellipse cx="${x}" cy="${y}" rx="${Math.round(size * 0.38)}" ry="${size}" fill="${col}" opacity="0.65" transform="rotate(${rot},${x},${y})"/>`;
    }).join('');
  },

  'knitting': (h) => {
    const colors = ['#a5b4fc', '#818cf8', '#c7d2fe', '#ddd6fe', '#7c3aed'];
    const yStep = 45 + (h % 15);
    return Array.from({ length: 11 }, (_, i) => {
      const y = 25 + i * yStep;
      const amp = 8 + (h * (i + 1)) % 14;
      const pts = Array.from({ length: 41 }, (_, j) => {
        const x = j * 20;
        const wy = Math.round(Math.sin((x * 0.05) + i * 1.3 + (h % 10) * 0.3) * amp);
        return `${x},${y + wy}`;
      });
      const col = colors[i % colors.length];
      return `<polyline points="${pts.join(' ')}" stroke="${col}" stroke-width="3" fill="none" opacity="0.55"/>`;
    }).join('');
  },

  'pottery': (h) => {
    const cx = 300 + (h % 200);
    const cy = 250 + ((h >> 4) % 80);
    const shades = ['#fed7aa', '#fb923c', '#f97316', '#ea580c', '#c2410c'];
    const rings = Array.from({ length: 5 }, (_, i) => {
      const rx = (5 - i) * 65 + 20;
      const ry = (5 - i) * 85 + 25;
      return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${shades[i]}" stroke-width="5" opacity="0.45"/>`;
    }).join('');
    const shadow = `<ellipse cx="${cx}" cy="${cy + ry(h)}" rx="160" ry="22" fill="#9a3412" opacity="0.2"/>`;
    return rings + shadow;

    function ry(hv: number) { return 110 + (hv % 30); }
  },

  'woodworking': (h) => {
    const shades = ['#d97706', '#b45309', '#92400e', '#fbbf24', '#78350f', '#f59e0b'];
    return Array.from({ length: 18 }, (_, i) => {
      const x1 = ((h * (i + 1) * 37) % 800);
      const curl = ((h * (i + 1) * 53) % 80) - 40;
      const col = shades[i % shades.length];
      const w = 1 + (i % 3);
      return `<path d="M${x1} 0 Q${x1 + curl} 300 ${x1 + curl * 0.6} 600" stroke="${col}" stroke-width="${w}" fill="none" opacity="0.32"/>`;
    }).join('');
  },

  'baking': (h) => {
    const cx = 350 + (h % 100);
    const cy = 260 + ((h >> 4) % 60);
    const loaf = [
      `<ellipse cx="${cx}" cy="${cy + 115}" rx="168" ry="24" fill="#d97706" opacity="0.28"/>`,
      `<path d="M${cx - 155} ${cy + 115} Q${cx - 125} ${cy - 70} ${cx} ${cy - 95} Q${cx + 125} ${cy - 70} ${cx + 155} ${cy + 115} Z" fill="#fbbf24" opacity="0.42"/>`,
      `<path d="M${cx - 90} ${cy - 10} Q${cx - 55} ${cy - 105} ${cx} ${cy - 115} Q${cx + 55} ${cy - 105} ${cx + 90} ${cy - 10}" stroke="#f59e0b" stroke-width="4" fill="none" opacity="0.65"/>`,
    ];
    const dots = Array.from({ length: 9 }, (_, i) => {
      const sx = cx - 110 + ((h * (i + 1) * 37) % 220);
      const sy = cy - 60 + ((h * (i + 1) * 53) % 100);
      return `<circle cx="${sx}" cy="${sy}" r="4" fill="#fde68a" opacity="0.55"/>`;
    });
    return [...loaf, ...dots].join('');
  },

  'painting': (h) => {
    const colors = ['#818cf8', '#6366f1', '#a78bfa', '#7c3aed', '#c4b5fd', '#4f46e5', '#e879f9'];
    return Array.from({ length: 9 }, (_, i) => {
      const x1 = ((h * (i + 1) * 137) % 700) + 50;
      const y1 = ((h * (i + 1) * 89) % 500) + 50;
      const x2 = x1 + ((h * (i + 2) * 53) % 300) - 150;
      const y2 = y1 + ((h * (i + 2) * 41) % 300) - 150;
      const cpx = (x1 + x2) / 2 + ((h * (i + 3) * 29) % 120) - 60;
      const cpy = (y1 + y2) / 2 + ((h * (i + 3) * 23) % 120) - 60;
      const w = 10 + (h * (i + 1)) % 28;
      const col = colors[(h * (i + 2)) % colors.length];
      return `<path d="M${Math.round(x1)} ${Math.round(y1)} Q${Math.round(cpx)} ${Math.round(cpy)} ${Math.round(x2)} ${Math.round(y2)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" fill="none" opacity="0.62"/>`;
    }).join('');
  },
};

const GRADIENTS: Record<PlanetId, [string, string]> = {
  'polymer-clay': ['#fce7f3', '#7e22ce'],
  'garden':       ['#dcfce7', '#14532d'],
  'knitting':     ['#e0e7ff', '#4c1d95'],
  'pottery':      ['#ffedd5', '#9a3412'],
  'woodworking':  ['#fef3c7', '#78350f'],
  'baking':       ['#fefce8', '#b45309'],
  'painting':     ['#eef2ff', '#312e81'],
};

export function craftImage(id: string, planetId: string, title: string): string {
  const h = hash(id + title);
  const pid = planetId as PlanetId;
  const [from, to] = GRADIENTS[pid] ?? ['#e0e7ff', '#312e81'];
  const shapeFn = SHAPES[pid];
  const shapesSVG = shapeFn ? shapeFn(h) : '';
  const label = xmlEscape(title.length > 28 ? title.slice(0, 25) + '…' : title);
  const gId = `g${(h % 99999).toString(16)}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
<defs>
  <linearGradient id="${gId}" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="${from}"/>
    <stop offset="100%" stop-color="${to}"/>
  </linearGradient>
</defs>
<rect width="800" height="600" fill="url(#${gId})"/>
${shapesSVG}
<rect x="0" y="510" width="800" height="90" fill="rgba(0,0,0,0.45)"/>
<text x="36" y="564" font-family="Georgia,serif" font-size="30" fill="white" opacity="0.95">${label}</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
