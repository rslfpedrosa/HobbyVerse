import React, { createContext, useContext, useState, useCallback } from 'react';
import { Contribution } from '../data/mockData';

interface SceneContextValue {
  selectedContribution: Contribution | null;
  setSelectedContribution: (c: Contribution | null) => void;
  isZoomingOut: boolean;
  startZoomOut: () => void;
  endZoomOut: () => void;
  isWarping: boolean;
  startWarp: () => void;
  endWarp: () => void;
}

const SceneContext = createContext<SceneContextValue>({
  selectedContribution: null,
  setSelectedContribution: () => {},
  isZoomingOut: false,
  startZoomOut: () => {},
  endZoomOut: () => {},
  isWarping: false,
  startWarp: () => {},
  endWarp: () => {},
});

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);
  const [isZoomingOut, setIsZoomingOut] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const startZoomOut = useCallback(() => setIsZoomingOut(true), []);
  const endZoomOut = useCallback(() => { setIsZoomingOut(false); setIsWarping(false); }, []);
  const startWarp = useCallback(() => setIsWarping(true), []);
  const endWarp = useCallback(() => setIsWarping(false), []);

  return (
    <SceneContext.Provider value={{
      selectedContribution, setSelectedContribution,
      isZoomingOut, startZoomOut, endZoomOut,
      isWarping, startWarp, endWarp,
    }}>
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  return useContext(SceneContext);
}
