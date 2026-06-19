import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Planet } from '../data/mockData';
import { isHexLight } from '../utils/color';

const COLOR_OPTIONS = [
  { color: '#0ea5e9', label: 'Sky' },
  { color: '#f43f5e', label: 'Rose' },
  { color: '#22c55e', label: 'Emerald' },
  { color: '#f97316', label: 'Orange' },
  { color: '#a855f7', label: 'Purple' },
  { color: '#eab308', label: 'Gold' },
  { color: '#ec4899', label: 'Pink' },
  { color: '#14b8a6', label: 'Teal' },
];

// null = dark (no bgColor set on planet)
const BG_OPTIONS: { color: string | null; label: string; textDark: boolean }[] = [
  { color: null,      label: 'Dark',   textDark: false },
  { color: '#E0F2FE', label: 'Sky',    textDark: true },
  { color: '#FEF3C7', label: 'Cream',  textDark: true },
  { color: '#DCFCE7', label: 'Mint',   textDark: true },
  { color: '#FCE7F3', label: 'Blush',  textDark: true },
  { color: '#EDE9FE', label: 'Lilac',  textDark: true },
  { color: '#FFF7ED', label: 'Peach',  textDark: true },
  { color: '#CCFBF1', label: 'Teal',   textDark: true },
];

const BUILT_IN_IDS = new Set([
  'knitting', 'woodworking', 'garden', 'pottery', 'polymer-clay', 'baking', 'painting',
]);

const SPAWN_POSITIONS: [number, number, number][] = [
  [10, 1, -6], [-9, -3, -5], [3, -8, -9],
  [-2, 9, -7], [8, -6, -4], [-10, 4, -9],
  [11, 5, -8], [-8, -7, -6], [4, 8, -10],
  [-11, 2, -5], [2, -10, -7], [-4, -8, -11],
];

interface Props {
  onClose: () => void;
}

export default function AddPlanetModal({ onClose }: Props) {
  const { addPlanet, planets } = useAppContext();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(COLOR_OPTIONS[0].color);
  const [bgColor, setBgColor] = useState<string | null>(null);

  const bgColorInputRef = useRef<HTMLInputElement>(null);

  const customCount = planets.filter(p => !BUILT_IN_IDS.has(p.id)).length;
  const isLightBg = bgColor !== null && isHexLight(bgColor);
  const isCustomBg = bgColor !== null && !BG_OPTIONS.some(o => o.color === bgColor);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    const pos = SPAWN_POSITIONS[customCount % SPAWN_POSITIONS.length];
    const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const id = `${slug}-${Date.now()}`;

    const planet: Planet = {
      id,
      name: name.trim(),
      description: description.trim() || `A new world of ${name.trim().toLowerCase()}.`,
      palette: { base: 'bg-gray-800', color },
      size: 1.8 + (customCount % 5) * 0.15,
      position: pos,
      stampIcon: 'star',
      textureConfig: { roughness: 0.65, bumpScale: 0.12 },
      ...(bgColor ? { bgColor } : {}),
    };

    addPlanet(planet);
    onClose();
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-md bg-[#0d0f18]/95 border border-white/10 rounded-2xl p-6 shadow-[0_24px_64px_rgba(0,0,0,0.8)] backdrop-blur-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.93, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.93, y: 16 }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl text-white">New Planet</h2>
            <p className="text-xs font-sans text-white/40 mt-0.5">Add a new world to the galaxy</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-white/40 hover:text-white/80 hover:bg-white/10 transition-all">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-white/35 mb-1.5">
              Planet Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Embroidery"
              maxLength={40}
              className="w-full bg-white/6 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/40 transition-all text-sm font-sans"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-white/35 mb-1.5">
              Description <span className="normal-case font-normal text-white/20">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What kind of making happens here?"
              maxLength={120}
              rows={2}
              className="w-full bg-white/6 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/40 transition-all resize-none text-sm font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-white/35 mb-2">
              Planet Color
            </label>
            <div className="flex gap-2.5 flex-wrap">
              {COLOR_OPTIONS.map(opt => (
                <button
                  key={opt.color}
                  type="button"
                  onClick={() => setColor(opt.color)}
                  title={opt.label}
                  className="w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none"
                  style={{
                    backgroundColor: opt.color,
                    outline: color === opt.color ? '2px solid white' : '2px solid transparent',
                    outlineOffset: 2,
                    boxShadow: color === opt.color ? `0 0 10px ${opt.color}80` : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-white/35 mb-2">
              Page Background
            </label>
            <div className="flex gap-2 flex-wrap items-center">
              {BG_OPTIONS.map(opt => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setBgColor(opt.color)}
                  title={opt.label}
                  className="w-8 h-8 rounded-lg transition-transform hover:scale-110 focus:outline-none border"
                  style={{
                    backgroundColor: opt.color ?? '#120640',
                    borderColor: bgColor === opt.color ? 'white' : 'rgba(255,255,255,0.15)',
                    boxShadow: bgColor === opt.color ? '0 0 0 2px rgba(255,255,255,0.4)' : 'none',
                  }}
                />
              ))}

              {/* Color wheel trigger */}
              <button
                type="button"
                title="Custom color"
                onClick={() => bgColorInputRef.current?.click()}
                className="w-8 h-8 rounded-lg transition-transform hover:scale-110 focus:outline-none border flex items-center justify-center overflow-hidden"
                style={{
                  background: isCustomBg
                    ? bgColor!
                    : 'conic-gradient(from 0deg, #f43f5e, #f97316, #eab308, #22c55e, #0ea5e9, #a855f7, #ec4899, #f43f5e)',
                  borderColor: isCustomBg ? 'white' : 'rgba(255,255,255,0.15)',
                  boxShadow: isCustomBg ? '0 0 0 2px rgba(255,255,255,0.4)' : 'none',
                }}
              />
              <input
                ref={bgColorInputRef}
                type="color"
                className="sr-only"
                value={isCustomBg ? bgColor! : '#ffffff'}
                onChange={e => setBgColor(e.target.value)}
              />
            </div>
            <p className="mt-1.5 text-[11px] font-sans text-white/25">
              {bgColor === null ? 'Dark background — default galaxy look.' : isLightBg ? 'Light background — planet name will appear in dark text.' : 'Dark background — planet name will appear in light text.'}
            </p>
          </div>

          {/* Preview */}
          <div
            className="rounded-xl overflow-hidden border border-white/10"
            style={{ backgroundColor: bgColor ?? '#120640', transition: 'background-color 0.3s ease' }}
          >
            <div className="px-4 pt-4 pb-3 flex items-center gap-3.5">
              <div
                className="w-10 h-10 rounded-full flex-shrink-0"
                style={{ backgroundColor: color, boxShadow: `0 0 16px ${color}60` }}
              />
              <div className="min-w-0">
                <div
                  className="font-display text-lg leading-tight truncate"
                  style={{ color: isLightBg ? '#1c1917' : 'white' }}
                >
                  {name || 'Your Planet'}
                </div>
                <div
                  className="text-xs font-sans truncate"
                  style={{ color: isLightBg ? '#78716c' : 'rgba(255,255,255,0.4)' }}
                >
                  {description || 'A new world to explore'}
                </div>
              </div>
            </div>
            <div
              className="mx-4 mb-3 h-px"
              style={{ backgroundColor: isLightBg ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }}
            />
            <p
              className="px-4 pb-3 text-[11px] font-sans"
              style={{ color: isLightBg ? '#a8a29e' : 'rgba(255,255,255,0.25)' }}
            >
              Preview of the planet page background
            </p>
          </div>

          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-sm font-sans font-semibold text-white/50 bg-white/6 hover:bg-white/10 border border-white/8 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 py-2.5 text-sm font-sans font-semibold text-white bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl shadow-[0_2px_12px_rgba(99,102,241,0.4)] hover:shadow-[0_2px_20px_rgba(99,102,241,0.5)] transition-all"
            >
              Launch Planet
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
