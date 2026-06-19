import React from 'react';
import { motion } from 'motion/react';
import { useScene } from '../context/SceneContext';
import titleSvg from '@/assets/title.svg';

// The 3D scene is rendered by the persistent UnifiedCanvas in MainLayout.
// This component only adds the nebula gradient overlays.
export default function Home() {
  const { isWarping } = useScene();

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/10 blur-[100px]" />

      <motion.div
        className="absolute inset-x-0 top-16 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: isWarping ? 0 : 1, y: isWarping ? -20 : 0 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: isWarping ? 0 : 0.15,
        }}
      >
        <img src={titleSvg} alt="Hobbyverse" className="h-20 sm:h-24 drop-shadow-[0_0_40px_rgba(167,139,250,0.35)]" />
        <p className="font-sans text-xs font-semibold text-white/40 tracking-[0.22em] uppercase">
          Choose a world to explore
        </p>
      </motion.div>
    </div>
  );
}
