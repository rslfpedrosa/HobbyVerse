import React from 'react';
import { motion } from 'motion/react';
import { X, UserCheck } from 'lucide-react';
import { PLANETS, MAKERS, Contribution } from '../data/mockData';
import { PlanetMiniView } from './PlanetMiniView';

const MAKER_GRADIENTS: [string, string][] = [
  ['#c4b5fd', '#8b5cf6'],
  ['#fbcfe8', '#ec4899'],
  ['#86efac', '#22c55e'],
  ['#fda4af', '#f43f5e'],
  ['#fdba74', '#f97316'],
  ['#93c5fd', '#3b82f6'],
  ['#6ee7b7', '#10b981'],
  ['#fcd34d', '#f59e0b'],
];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

interface Props {
  name: string;
  makerId: string;
  allContributions: Contribution[];
  isConnected: boolean;
  onClose: () => void;
  onConnect: () => void;
}

export default function MakerProfileOverlay({
  name,
  makerId,
  allContributions,
  isConnected,
  onClose,
  onConnect,
}: Props) {
  const [from, to] = MAKER_GRADIENTS[hashStr(makerId) % MAKER_GRADIENTS.length];

  const makerContribs = allContributions.filter(c => c.makerId === makerId);
  const visitedPlanetIds = [...new Set(makerContribs.map(c => c.planetId))];
  const visitedPlanets = PLANETS.filter(p => visitedPlanetIds.includes(p.id));

  const bio = MAKERS.find(m => m.id === makerId)?.bio ?? null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/65 backdrop-blur-xl pointer-events-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 12 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        className="w-full max-w-sm bg-[#0d0f18]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_32px_64px_rgba(0,0,0,0.8)] relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full text-white/40 hover:text-white/80 hover:bg-white/10 transition-all"
        >
          <X size={16} />
        </button>

        <div
          className="w-20 h-20 rounded-full mb-4 shadow-md ring-4 ring-white/10 shrink-0 flex items-center justify-center font-sans text-3xl font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        >
          {name.charAt(0)}
        </div>

        <h3 className="font-display text-2xl font-bold text-white mb-1">{name}</h3>

        <div className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-indigo-400 mb-4">
          Open to Connect
        </div>

        {bio && (
          <p className="text-sm font-sans text-white/50 leading-relaxed mb-5 px-2">
            {bio}
          </p>
        )}

        {visitedPlanets.length > 0 && (
          <div className="w-full mb-6">
            <div className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">
              Worlds Stamped
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {visitedPlanets.map(planet => (
                <div key={planet.id} className="flex flex-col items-center p-3 rounded-xl border border-white/8 bg-white/[0.04] w-[108px]">
                  <h4 className="font-display text-sm font-bold text-white leading-tight mb-2">{planet.name}</h4>
                  <div className="flex items-center justify-center py-1">
                    <div className="w-16 h-16">
                      <PlanetMiniView planetId={planet.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isConnected ? (
          <div className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-sans font-semibold">
            <UserCheck size={15} />
            Connected with {name}
          </div>
        ) : (
          <>
            <button
              onClick={onConnect}
              className="w-full py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-sans font-bold text-sm shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_28px_rgba(99,102,241,0.5)] transition-all mb-3"
            >
              Connect with {name}
            </button>
            <p className="text-xs font-sans text-white/30">
              They choose what to share only after accepting.
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
