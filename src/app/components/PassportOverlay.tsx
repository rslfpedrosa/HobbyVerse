import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Stamp, Users, Fingerprint, Leaf, Scissors, Hammer, Command, ChefHat, Paintbrush, Bookmark, Check, MoreHorizontal } from 'lucide-react';
import { useAppContext, MakerCard } from '../context/AppContext';
import { PLANETS, PlanetId } from '../data/mockData';
import { PlanetMiniView } from './PlanetMiniView';

const AVATAR_COLORS: { id: string; from: string; to: string }[] = [
  { id: 'purple', from: '#c4b5fd', to: '#8b5cf6' },
  { id: 'pink',   from: '#fbcfe8', to: '#ec4899' },
  { id: 'green',  from: '#86efac', to: '#22c55e' },
  { id: 'coral',  from: '#fda4af', to: '#f43f5e' },
  { id: 'orange', from: '#fdba74', to: '#f97316' },
  { id: 'blue',   from: '#93c5fd', to: '#3b82f6' },
];

function getAvatarStyle(colorId: string): React.CSSProperties {
  const c = AVATAR_COLORS.find(x => x.id === colorId) ?? AVATAR_COLORS[0];
  return { background: `linear-gradient(135deg, ${c.from}, ${c.to})` };
}

function MakerAvatar({ maker, size = 10 }: { maker: MakerCard; size?: number }) {
  const sizeClass = size === 10 ? 'w-10 h-10 text-base' : 'w-9 h-9 text-sm';
  return (
    <div
      className={`${sizeClass} rounded-full shrink-0 flex items-center justify-center font-sans font-bold text-white shadow-md`}
      style={getAvatarStyle(maker.avatarColor)}
    >
      {maker.name.charAt(0).toUpperCase()}
    </div>
  );
}

function StampIcon({ id, color, size = 28 }: { id: PlanetId; color: string; size?: number }) {
  const cls = 'opacity-40';
  const style = { color, width: size, height: size };
  switch (id) {
    case 'polymer-clay':  return <Fingerprint style={style} className={cls} />;
    case 'garden':        return <Leaf style={style} className={cls} />;
    case 'knitting':      return <Scissors style={style} className={cls} />;
    case 'woodworking':   return <Hammer style={style} className={cls} />;
    case 'pottery':       return <Command style={style} className={cls} />;
    case 'baking':        return <ChefHat style={style} className={cls} />;
    case 'painting':      return <Paintbrush style={style} className={cls} />;
    default:              return <Fingerprint style={style} className={cls} />;
  }
}

export default function PassportOverlay() {
  const {
    setIsPassportOpen, userProfile, setUserProfile, stamps,
    connectedMakers, requestsReceived, requestsSent,
    acceptRequest, declineRequest, cancelSentRequest, disconnectMaker,
    pinnedStamps, togglePinStamp, contributions,
  } = useAppContext();
  const [activeTab, setActiveTab] = useState<'identity' | 'planets' | 'connections' | 'pinned'>('identity');
  const [isEditingName, setIsEditingName] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingName) nameInputRef.current?.focus();
  }, [isEditingName]);

  const handleVisibilityChange = (vis: 'hidden' | 'public' | 'connect') => {
    setUserProfile({ ...userProfile, visibility: vis });
  };

  const pinnedContributions = contributions.filter((c) => pinnedStamps.has(c.id));

  const totalRequests = requestsReceived.length;

  const tabs = [
    { id: 'identity' as const, label: 'Identity', icon: User },
    { id: 'planets' as const, label: 'Stamp pages', icon: Stamp },
    { id: 'connections' as const, label: 'Companions', icon: Users, badge: totalRequests > 0 ? totalRequests : undefined },
    { id: 'pinned' as const, label: 'Pinned', icon: Bookmark },
  ];

  const visibilityOptions = [
    { id: 'hidden', label: 'Hidden', desc: 'Appears as "a fellow maker". No profile card.' },
    { id: 'public', label: 'Public', desc: 'Others can view your passport and stamps.' },
    { id: 'connect', label: 'Open to Connect', desc: 'Allows others to send connection requests.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/65 backdrop-blur-sm"
      onClick={() => setOpenMenu(null)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-3xl h-[85vh] sm:h-[620px] passport-paper rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.6)]"
        onClick={e => e.stopPropagation()}
      >

        {/* Close Button (top-right, small) */}
        <button
          onClick={() => setIsPassportOpen(false)}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all"
        >
          <X size={18} />
        </button>

        {/* Sidebar */}
        <div className="md:w-52 border-b md:border-b-0 md:border-r border-white/8 flex md:flex-col p-3 gap-1 bg-white/[0.03]">
          {/* Passport branding */}
          <div className="hidden md:flex flex-col items-start px-3 pt-3 pb-4 mb-2 border-b border-white/8">
            <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-white/30">Universe</span>
            <span className="font-display text-xl font-bold text-white leading-tight">Passport</span>
            <span className="text-[10px] font-sans tracking-[0.12em] uppercase text-white/25 mt-1">
              {Object.values(stamps).every(n => n === 0) ? 'No stamps yet' : `${Object.values(stamps).reduce((a, b) => a + b, 0)} stamps`}
            </span>
          </div>

          {tabs.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-sm transition-all font-sans font-medium ${
                activeTab === id
                  ? 'bg-indigo-500/15 text-white shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]'
                  : 'text-white/45 hover:text-white/80 hover:bg-white/6'
              }`}
            >
              <Icon size={16} className={activeTab === id ? 'text-indigo-400' : 'text-white/30'} />
              <span className="hidden md:inline">{label}</span>
              {badge !== undefined && (
                <span className="hidden md:flex ml-auto items-center justify-center w-4 h-4 rounded-full bg-indigo-500 text-white text-[9px] font-bold leading-none">
                  {badge}
                </span>
              )}
              {badge === undefined && activeTab === id && (
                <span className="hidden md:block ml-auto w-1 h-1 rounded-full bg-indigo-400" />
              )}
            </button>
          ))}

          {/* Close passport — sidebar bottom */}
          <div className="hidden md:flex flex-col justify-end flex-1 pt-2 mt-2 border-t border-white/8">
            <button
              onClick={() => setIsPassportOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-sans text-white/30 hover:text-white/60 transition-colors"
            >
              <X size={12} />
              <span>Close passport</span>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative">

          {activeTab === 'identity' && (
            <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">

              {/* Bearer */}
              <div>
                <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-white/30">Bearer</span>

                {/* Avatar + Name */}
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="w-16 h-16 rounded-full shrink-0 shadow-md ring-4 ring-white/10 hover:ring-white/25 transition-all flex items-center justify-center font-sans text-2xl font-bold text-white"
                    style={getAvatarStyle(userProfile.avatarColor)}
                    aria-label="Edit profile"
                  >
                    {userProfile.avatar || 'T'}
                  </button>
                  <div className="flex-1 min-w-0">
                    {isEditingName ? (
                      <input
                        ref={nameInputRef}
                        className="font-display text-2xl text-white font-bold w-full bg-transparent border-b-2 border-white/20 focus:border-indigo-400 outline-none pb-0.5 leading-tight"
                        value={userProfile.name}
                        onChange={e => setUserProfile({ ...userProfile, name: e.target.value, avatar: e.target.value.trim().charAt(0).toUpperCase() || userProfile.avatar })}
                        onBlur={() => setIsEditingName(false)}
                        onKeyDown={e => e.key === 'Enter' && setIsEditingName(false)}
                        maxLength={32}
                      />
                    ) : (
                      <button
                        className="font-display text-2xl text-white font-bold text-left w-full border-b border-dashed border-white/15 pb-0.5 leading-tight hover:border-white/30 transition-colors"
                        onClick={() => setIsEditingName(true)}
                      >
                        {userProfile.name || 'Traveler'}
                      </button>
                    )}
                    <p className="text-xs font-sans text-white/30 mt-1">Tap your name or emblem to edit</p>
                  </div>
                </div>

                {/* Color picker */}
                <div className="flex gap-2.5 mt-4">
                  {AVATAR_COLORS.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setUserProfile({ ...userProfile, avatarColor: c.id })}
                      className="w-10 h-10 rounded-full transition-all hover:scale-110 flex items-center justify-center font-sans text-sm font-bold text-white"
                      style={{
                        background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                        boxShadow: userProfile.avatarColor === c.id
                          ? '0 0 0 2px #0d0f18, 0 0 0 4px rgba(129,140,248,0.9)'
                          : undefined,
                      }}
                      aria-label={`Color ${c.id}`}
                    >
                      {userProfile.avatar || 'T'}
                    </button>
                  ))}
                </div>
              </div>

              {/* About Me */}
              <div>
                <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-white/30">About Me</span>
                <textarea
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-sans text-white placeholder:text-white/25 focus:outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10 transition-all min-h-[80px]"
                  placeholder="Tell others a bit about yourself..."
                  value={userProfile.bio}
                  onChange={e => setUserProfile({ ...userProfile, bio: e.target.value })}
                  maxLength={200}
                />
              </div>

              {/* Visibility */}
              <div className="border border-white/8 rounded-xl p-4 bg-white/[0.02]">
                <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-white/30">Who Can See This Passport</span>
                <div className="flex rounded-lg bg-white/[0.05] p-1 mt-3 gap-1">
                  {visibilityOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => handleVisibilityChange(opt.id as 'hidden' | 'public' | 'connect')}
                      className={`flex-1 py-2 text-xs font-sans font-semibold rounded-md transition-all ${
                        userProfile.visibility === opt.id
                          ? 'bg-indigo-500 text-white shadow-sm'
                          : 'text-white/45 hover:text-white/75'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs font-sans text-white/45 leading-relaxed">
                  {visibilityOptions.find(o => o.id === userProfile.visibility)?.desc}
                </p>
              </div>

            </div>
          )}

          {activeTab === 'planets' && (() => {
            const unstampedCount = PLANETS.filter(p => !(stamps[p.id] > 0)).length;
            return (
              <div className="p-6 sm:p-8 animate-in fade-in duration-200">
                {/* Header */}
                <div className="flex items-baseline justify-between mb-6">
                  <h2 className="font-display text-2xl font-bold text-white">Stamp pages</h2>
                  {unstampedCount > 0 && (
                    <span className="text-xs font-sans text-white/30">
                      {unstampedCount} {unstampedCount === 1 ? 'world' : 'worlds'} left to stamp
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PLANETS.map(planet => {
                    const stampCount = stamps[planet.id] || 0;
                    const hasStamp = stampCount > 0;
                    return (
                      <div
                        key={planet.id}
                        className="flex flex-col p-4 rounded-2xl border border-white/8 bg-white/[0.04]"
                      >
                        {/* Planet name */}
                        <h3 className="font-display text-lg font-bold text-white leading-tight mb-4">
                          {planet.name}
                        </h3>

                        {/* Stamp circle */}
                        <div className="flex items-center justify-center flex-1 py-2">
                          <div className="w-24 h-24 sm:w-28 sm:h-28">
                            {hasStamp ? (
                              <motion.div
                                className="w-full h-full"
                                initial={{ scale: 0.6, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                              >
                                <PlanetMiniView planetId={planet.id} />
                              </motion.div>
                            ) : (
                              <div
                                className="w-full h-full rounded-full border-2 border-dashed flex items-center justify-center"
                                style={{ borderColor: `${planet.palette.color}55` }}
                              >
                                <StampIcon id={planet.id} color={planet.palette.color} size={30} />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Label */}
                        <p className="mt-3 text-center text-[10px] font-sans text-white/30 leading-tight">
                          {planet.stampIcon}&nbsp;·&nbsp;
                          {hasStamp ? `${stampCount} ${stampCount === 1 ? 'stamp' : 'stamps'}` : 'unstamped'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {activeTab === 'connections' && (
            <div className="p-6 sm:p-8 animate-in fade-in duration-200 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">Travel companions</h2>
                <p className="text-xs font-sans text-white/30 mt-0.5">Makers you've crossed orbits with.</p>
              </div>

              {/* Wants to connect — incoming requests */}
              {requestsReceived.length > 0 && (
                <div>
                  <span className="text-[10px] font-sans font-semibold tracking-[0.18em] uppercase text-white/30">
                    Wants to connect
                  </span>
                  <ul className="mt-2 space-y-2">
                    <AnimatePresence initial={false}>
                      {requestsReceived.map((maker) => (
                        <motion.li
                          key={maker.id}
                          initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                          animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                          exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-3 p-3 border border-white/8 rounded-xl bg-white/[0.04]"
                        >
                          <MakerAvatar maker={maker} />
                          <div className="flex-1 min-w-0">
                            <p className="font-sans font-semibold text-white/90 text-sm leading-tight truncate">{maker.name}</p>
                            {maker.bio && (
                              <p className="text-xs font-sans text-white/40 mt-0.5 truncate">{maker.bio}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => acceptRequest(maker.id)}
                              className="px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-sans font-semibold transition-colors flex items-center gap-1"
                            >
                              <Check size={11} />
                              Accept
                            </button>
                            <button
                              onClick={() => declineRequest(maker.id)}
                              className="px-3 py-1.5 rounded-lg bg-white/6 hover:bg-white/12 text-white/50 hover:text-white/80 text-xs font-sans font-semibold transition-colors"
                            >
                              Decline
                            </button>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
              )}

              {/* Awaiting reply — sent requests */}
              {requestsSent.length > 0 && (
                <div>
                  <span className="text-[10px] font-sans font-semibold tracking-[0.18em] uppercase text-white/30">
                    Awaiting reply
                  </span>
                  <ul className="mt-2 space-y-2">
                    <AnimatePresence initial={false}>
                      {requestsSent.map((maker) => (
                        <motion.li
                          key={maker.id}
                          initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                          animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                          exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-3 p-3 border border-white/8 border-dashed rounded-xl bg-white/[0.02]"
                        >
                          <MakerAvatar maker={maker} />
                          <div className="flex-1 min-w-0">
                            <p className="font-sans font-semibold text-white/70 text-sm leading-tight truncate">{maker.name}</p>
                            <p className="text-xs font-sans text-white/30 mt-0.5">Request sent · pending</p>
                          </div>
                          <div className="relative shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenu(openMenu === maker.id ? null : maker.id);
                              }}
                              className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/8 transition-colors"
                            >
                              <MoreHorizontal size={15} />
                            </button>
                            <AnimatePresence>
                              {openMenu === maker.id && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.92, y: -4 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.92, y: -4 }}
                                  transition={{ duration: 0.12 }}
                                  className="absolute right-0 top-8 z-20 w-36 rounded-xl border border-white/10 bg-[#1a1b2e] shadow-xl py-1"
                                >
                                  <button
                                    onClick={() => { cancelSentRequest(maker.id); setOpenMenu(null); }}
                                    className="w-full px-3 py-2 text-left text-xs font-sans text-red-400 hover:bg-white/6 transition-colors rounded-xl"
                                  >
                                    Cancel request
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
              )}

              {/* Connected */}
              <div>
                <span className="text-[10px] font-sans font-semibold tracking-[0.18em] uppercase text-white/30">
                  Connected
                </span>
                {connectedMakers.length === 0 ? (
                  <div className="mt-2 p-4 border border-white/6 rounded-xl bg-white/[0.02]">
                    <p className="text-xs font-sans text-white/30 leading-relaxed">
                      No companions yet. Open a maker's profile from any creation and send a connect request.
                    </p>
                  </div>
                ) : (
                  <ul className="mt-2 space-y-2">
                    <AnimatePresence initial={false}>
                      {connectedMakers.map((maker) => (
                        <motion.li
                          key={maker.id}
                          initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                          animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                          exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-3 p-3 border border-white/8 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                        >
                          <MakerAvatar maker={maker} />
                          <div className="flex-1 min-w-0">
                            <p className="font-sans font-semibold text-white/90 text-sm leading-tight truncate">{maker.name}</p>
                            {maker.bio && (
                              <p className="text-xs font-sans text-white/40 mt-0.5 truncate">{maker.bio}</p>
                            )}
                          </div>
                          <div className="relative shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenu(openMenu === maker.id ? null : maker.id);
                              }}
                              className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/8 transition-colors"
                            >
                              <MoreHorizontal size={15} />
                            </button>
                            <AnimatePresence>
                              {openMenu === maker.id && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.92, y: -4 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.92, y: -4 }}
                                  transition={{ duration: 0.12 }}
                                  className="absolute right-0 top-8 z-20 w-36 rounded-xl border border-white/10 bg-[#1a1b2e] shadow-xl py-1"
                                >
                                  <button
                                    onClick={() => { disconnectMaker(maker.id); setOpenMenu(null); }}
                                    className="w-full px-3 py-2 text-left text-xs font-sans text-red-400 hover:bg-white/6 transition-colors rounded-xl"
                                  >
                                    Disconnect
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

            </div>
          )}

          {activeTab === 'pinned' && (
            <div className="p-6 sm:p-8 animate-in fade-in duration-200">
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-white">Pinned Stamps</h2>
                <p className="text-xs font-sans text-white/30 mt-0.5">Contributions you've saved from your travels</p>
              </div>
              {pinnedContributions.length === 0 ? (
                <div className="text-center mt-12 space-y-2">
                  <Bookmark size={24} className="mx-auto text-white/20" />
                  <p className="text-sm font-sans text-white/40 italic">Nothing pinned yet.</p>
                  <p className="text-xs font-sans text-white/30">Tap the bookmark on any contribution to save it here.</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {pinnedContributions.map((c) => {
                    const planet = PLANETS.find((p) => p.id === c.planetId);
                    return (
                      <li key={c.id} className="flex gap-3 p-3 border border-white/8 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-white/5">
                          <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-sans font-semibold text-white/90 truncate">{c.title}</div>
                          <div className="text-xs font-sans text-white/40 mt-0.5 truncate">{c.makerName}</div>
                          {planet && (
                            <span className="mt-1.5 inline-block text-[10px] font-sans font-medium px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300">
                              {planet.name}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => togglePinStamp(c.id)}
                          title="Unpin"
                          className="self-start p-1.5 rounded-full text-amber-400/50 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
                        >
                          <Bookmark size={14} className="fill-current" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}

        </div>
      </motion.div>
    </motion.div>
  );
}
