import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Book, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import PassportOverlay from '../components/PassportOverlay';
import AddPlanetModal from '../components/AddPlanetModal';
import { AnimatePresence, motion } from 'motion/react';
import { SceneProvider } from '../context/SceneContext';
import UnifiedCanvas from './UnifiedCanvas';

export default function MainLayout() {
  const { setIsPassportOpen, isPassportOpen, planets } = useAppContext();
  const [isAddPlanetOpen, setIsAddPlanetOpen] = useState(false);
  const location = useLocation();

  const match = location.pathname.match(/^\/planet\/(.+)/);
  const isGalaxyView = !match;
  const planetId = match?.[1] ?? '';
  const bgColor = planets.find(p => p.id === planetId)?.bgColor ?? '#120640';

  return (
    <SceneProvider>
      <div
        className="relative w-screen h-screen overflow-hidden"
        style={{ backgroundColor: bgColor, transition: 'background-color 0.8s ease' }}
      >
        {/* Persistent 3D canvas — never remounts between routes */}
        <UnifiedCanvas />

        {/* Route UI overlays rendered on top */}
        <Outlet />

        {/* Add Planet button — galaxy view only */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center z-40"
          initial={{ opacity: 0, y: 60 }}
          animate={{
            opacity: isGalaxyView ? 1 : 0,
            y: isGalaxyView ? 0 : 60,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: isGalaxyView ? 0.3 : 0,
          }}
          style={{ pointerEvents: isGalaxyView ? 'auto' : 'none' }}
        >
          <button
            onClick={() => setIsAddPlanetOpen(true)}
            className="w-fit flex items-center gap-2.5 pl-4 pr-3.5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-base font-sans font-semibold rounded-full shadow-[0_4px_24px_rgba(99,102,241,0.4)] hover:shadow-[0_4px_32px_rgba(99,102,241,0.55)] transition-all hover:scale-105 active:scale-100 cursor-pointer"
            title="Add a new planet"
          >
            <Plus size={20} /> Add New Planet
          </button>
        </motion.div>

        <button
          onClick={() => setIsPassportOpen(true)}
          className="absolute bottom-6 right-6 z-40 flex items-center gap-2 pl-4 pr-3.5 py-2.5 bg-amber-900/70 hover:bg-amber-800/80 border border-amber-700/40 text-amber-100 rounded-full backdrop-blur-xl shadow-[0_4px_24px_rgba(120,53,15,0.3)] hover:shadow-[0_4px_32px_rgba(120,53,15,0.45)] transition-all cursor-pointer"
          title="Open Universe Passport"
        >
          <span className="text-sm font-sans font-medium text-amber-200/80">My Passport</span>
          <Book size={18} className="text-amber-300" />
        </button>

        <AnimatePresence>
          {isPassportOpen && <PassportOverlay />}
        </AnimatePresence>

        <AnimatePresence>
          {isAddPlanetOpen && <AddPlanetModal onClose={() => setIsAddPlanetOpen(false)} />}
        </AnimatePresence>
      </div>
    </SceneProvider>
  );
}
