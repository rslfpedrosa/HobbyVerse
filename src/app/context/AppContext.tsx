import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Comment, Contribution, MOCK_CONTRIBUTIONS, Planet, PLANETS, PlanetId } from '../data/mockData';

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

type Visibility = 'hidden' | 'public' | 'connect';

interface UserProfile {
  name: string;
  bio: string;
  avatar: string;
  avatarColor: string;
  visibility: Visibility;
}

export interface MakerCard {
  id: string;
  name: string;
  bio: string;
  avatarColor: string;
}

interface AppContextType {
  isPassportOpen: boolean;
  setIsPassportOpen: (open: boolean) => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  planets: Planet[];
  addPlanet: (planet: Planet) => void;
  stamps: Record<PlanetId, number>;
  addStamp: (planetId: PlanetId) => void;
  contributions: Contribution[];
  addContribution: (contribution: Contribution) => void;
  updateContribution: (id: string, patch: Partial<Pick<Contribution, 'title' | 'description' | 'link' | 'image' | 'visibility'>>) => void;
  likedContributions: Set<string>;
  toggleLike: (contributionId: string) => void;
  addComment: (contributionId: string, comment: Comment) => void;
  connections: string[];
  connectedMakers: MakerCard[];
  requestsReceived: MakerCard[];
  requestsSent: MakerCard[];
  addConnection: (name: string) => void;
  acceptRequest: (id: string) => void;
  declineRequest: (id: string) => void;
  cancelSentRequest: (id: string) => void;
  disconnectMaker: (id: string) => void;
  pinnedStamps: Set<string>;
  togglePinStamp: (contributionId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_PROFILE: UserProfile = {
  name: 'Traveler',
  bio: 'Maker of small worlds — I work in polymer clay, dabble in woodworking, and am slowly learning to keep plants alive.',
  avatar: 'T',
  avatarColor: 'purple',
  visibility: 'hidden',
};

const DEFAULT_STAMPS: Record<PlanetId, number> = {
  'polymer-clay': 0,
  'garden': 0,
  'knitting': 0,
  'woodworking': 0,
  'pottery': 0,
  'baking': 0,
  'painting': 0,
};

const DEFAULT_REQUESTS_RECEIVED: MakerCard[] = [
  { id: 'req-1', name: 'Jun Park', bio: 'Wheel-thrown mugs + tiny kiln experiments.', avatarColor: 'orange' },
];

const DEFAULT_REQUESTS_SENT: MakerCard[] = [
  { id: 'sent-1', name: 'Tomás Vega', bio: 'Woodblock prints and hand-bound books.', avatarColor: 'green' },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(() => load('up', DEFAULT_PROFILE));
  const [stamps, setStamps] = useState<Record<PlanetId, number>>(() => load('stamps', DEFAULT_STAMPS));
  const [planets, setPlanets] = useState<Planet[]>(() => {
    const stored = load('planets', PLANETS);
    return PLANETS.map(base => {
      const found = stored.find((p: Planet) => p.id === base.id);
      return found ? { ...found, ...base } : base;
    }).concat(stored.filter((p: Planet) => !PLANETS.some(b => b.id === p.id)));
  });
  const [contributions, setContributions] = useState<Contribution[]>(() => {
    const stored = load('contributions', MOCK_CONTRIBUTIONS);
    return MOCK_CONTRIBUTIONS.map(base => {
      const found = stored.find((c: Contribution) => c.id === base.id);
      return found ? { ...found, image: base.image } : base;
    }).concat(stored.filter((c: Contribution) => !MOCK_CONTRIBUTIONS.some(b => b.id === c.id)));
  });
  const [likedContributions, setLikedContributions] = useState<Set<string>>(
    () => new Set<string>(load<string[]>('liked', []))
  );
  const [connections, setConnections] = useState<string[]>(() => load('connections', []));
  const [connectedMakers, setConnectedMakers] = useState<MakerCard[]>(() => load('connectedMakers', []));
  const [requestsReceived, setRequestsReceived] = useState<MakerCard[]>(
    () => load('requestsReceived', DEFAULT_REQUESTS_RECEIVED)
  );
  const [requestsSent, setRequestsSent] = useState<MakerCard[]>(
    () => load('requestsSent', DEFAULT_REQUESTS_SENT)
  );
  const [pinnedStamps, setPinnedStamps] = useState<Set<string>>(
    () => new Set<string>(load<string[]>('pinnedStamps', []))
  );

  useEffect(() => { save('up', userProfile); }, [userProfile]);
  useEffect(() => { save('stamps', stamps); }, [stamps]);
  useEffect(() => { save('planets', planets); }, [planets]);
  useEffect(() => { save('contributions', contributions); }, [contributions]);
  useEffect(() => { save('liked', [...likedContributions]); }, [likedContributions]);
  useEffect(() => { save('connections', connections); }, [connections]);
  useEffect(() => { save('connectedMakers', connectedMakers); }, [connectedMakers]);
  useEffect(() => { save('requestsReceived', requestsReceived); }, [requestsReceived]);
  useEffect(() => { save('requestsSent', requestsSent); }, [requestsSent]);
  useEffect(() => { save('pinnedStamps', [...pinnedStamps]); }, [pinnedStamps]);

  const addPlanet = (planet: Planet) => {
    setPlanets((prev) => [...prev, planet]);
    setStamps((prev) => ({ ...prev, [planet.id]: 0 }));
  };

  const addStamp = (planetId: PlanetId) => {
    setStamps((prev) => ({ ...prev, [planetId]: (prev[planetId] || 0) + 1 }));
  };

  const addContribution = (contribution: Contribution) => {
    setContributions((prev) => [...prev, contribution]);
  };

  const updateContribution = (id: string, patch: Partial<Pick<Contribution, 'title' | 'description' | 'link' | 'image' | 'visibility'>>) => {
    setContributions((prev) => prev.map((c) => c.id === id ? { ...c, ...patch } : c));
  };

  const toggleLike = (contributionId: string) => {
    setLikedContributions((prev) => {
      const next = new Set(prev);
      const isLiked = next.has(contributionId);
      isLiked ? next.delete(contributionId) : next.add(contributionId);
      setContributions((prevContribs) =>
        prevContribs.map((c) =>
          c.id === contributionId ? { ...c, likes: c.likes + (isLiked ? -1 : 1) } : c
        )
      );
      return next;
    });
  };

  const addComment = (contributionId: string, comment: Comment) => {
    setContributions((prev) =>
      prev.map((c) =>
        c.id === contributionId ? { ...c, comments: [...c.comments, comment] } : c
      )
    );
  };

  const addConnection = (name: string) => {
    if (!connections.includes(name)) {
      setConnections((prev) => [...prev, name]);
      setConnectedMakers((prev) => {
        if (prev.some((m) => m.name === name)) return prev;
        return [...prev, { id: `conn-${Date.now()}`, name, bio: '', avatarColor: 'blue' }];
      });
    }
  };

  const acceptRequest = (id: string) => {
    const maker = requestsReceived.find((r) => r.id === id);
    if (!maker) return;
    setRequestsReceived((prev) => prev.filter((r) => r.id !== id));
    setConnections((prev) => prev.includes(maker.name) ? prev : [...prev, maker.name]);
    setConnectedMakers((prev) => prev.some((m) => m.id === id) ? prev : [...prev, maker]);
  };

  const declineRequest = (id: string) => {
    setRequestsReceived((prev) => prev.filter((r) => r.id !== id));
  };

  const cancelSentRequest = (id: string) => {
    setRequestsSent((prev) => prev.filter((r) => r.id !== id));
  };

  const disconnectMaker = (id: string) => {
    const maker = connectedMakers.find((m) => m.id === id);
    if (!maker) return;
    setConnectedMakers((prev) => prev.filter((m) => m.id !== id));
    setConnections((prev) => prev.filter((n) => n !== maker.name));
  };

  const togglePinStamp = (contributionId: string) => {
    setPinnedStamps((prev) => {
      const next = new Set(prev);
      next.has(contributionId) ? next.delete(contributionId) : next.add(contributionId);
      return next;
    });
  };

  return (
    <AppContext.Provider
      value={{
        isPassportOpen,
        setIsPassportOpen,
        userProfile,
        setUserProfile,
        planets,
        addPlanet,
        stamps,
        addStamp,
        contributions,
        addContribution,
        updateContribution,
        likedContributions,
        toggleLike,
        addComment,
        connections,
        connectedMakers,
        requestsReceived,
        requestsSent,
        addConnection,
        acceptRequest,
        declineRequest,
        cancelSentRequest,
        disconnectMaker,
        pinnedStamps,
        togglePinStamp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
