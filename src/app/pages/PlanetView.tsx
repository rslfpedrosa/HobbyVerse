import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Plus, Heart, X, Sparkles, MessageCircle, Send, ImagePlus, Link2, Globe, Users, UserX, UserPlus, UserCheck, Bookmark, Pencil } from 'lucide-react';
import { PlanetId, Contribution, Comment, Visibility } from '../data/mockData';
import { isHexLight } from '../utils/color';
import { craftImage } from '../utils/craftImage';
import { STAMP_ILLUSTRATIONS } from '../data/stampIllustrations';
import { useAppContext } from '../context/AppContext';
import { useScene } from '../context/SceneContext';

import MakerProfileOverlay from '../components/MakerProfileOverlay';

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

function makerGradient(makerId: string): string {
  const [from, to] = MAKER_GRADIENTS[hashStr(makerId) % MAKER_GRADIENTS.length];
  return `linear-gradient(135deg, ${from}, ${to})`;
}

// The 3D planet and markers are rendered by UnifiedCanvas in MainLayout.
// This component is a pure UI overlay: header, title, modals.
export default function PlanetView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contributions, addContribution, updateContribution, addStamp, userProfile, likedContributions, toggleLike, addComment, connections, addConnection, pinnedStamps, togglePinStamp, planets } = useAppContext();
  const planet = planets.find(p => p.id === id);
  const { selectedContribution, setSelectedContribution, startZoomOut } = useScene();

  const [isAdding, setIsAdding] = useState(false);
  const [showStampAnim, setShowStampAnim] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLink, setNewLink] = useState('');
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<Visibility>('public');
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [connectTarget, setConnectTarget] = useState<{ name: string; initial: string } | null>(null);
  const [connectStep, setConnectStep] = useState<'confirm' | 'sent'>('confirm');
  const [viewingMaker, setViewingMaker] = useState<{ name: string; makerId: string } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editLink, setEditLink] = useState('');
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [editVisibility, setEditVisibility] = useState<Visibility>('public');
  const editFileInputRef = useRef<HTMLInputElement>(null);

  if (!planet) return null;

  const openEdit = (c: typeof liveContribution) => {
    if (!c) return;
    setEditingId(c.id);
    setEditTitle(c.title);
    setEditDesc(c.description);
    setEditLink(c.link ?? '');
    setEditImagePreview(c.image ?? null);
    setEditVisibility(c.visibility ?? 'public');
  };

  const closeEdit = () => {
    setEditingId(null);
    setEditImagePreview(null);
    if (editFileInputRef.current) editFileInputRef.current.value = '';
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setEditImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !editTitle.trim()) return;
    updateContribution(editingId, {
      title: editTitle.trim(),
      description: editDesc.trim(),
      link: editLink.trim() || undefined,
      image: editImagePreview ?? undefined,
      visibility: editVisibility,
    });
    closeEdit();
  };

  const isLightBg = !!planet.bgColor && isHexLight(planet.bgColor);

  const liveContribution = selectedContribution
    ? contributions.find((c) => c.id === selectedContribution.id) ?? selectedContribution
    : null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !liveContribution) return;
    const comment: Comment = {
      id: `comment_${Date.now()}`,
      authorName: userProfile.name,
      text: commentText.trim(),
      timestamp: Date.now(),
    };
    addComment(liveContribution.id, comment);
    setCommentText('');
  };

  const closeDetail = () => {
    setSelectedContribution(null);
    setShowComments(true);
    setCommentText('');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setNewImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const resetAddForm = () => {
    setNewTitle('');
    setNewDesc('');
    setNewLink('');
    setNewImagePreview(null);
    setVisibility('public');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newObj: Contribution = {
      id: `new_${Date.now()}`,
      planetId: planet.id as PlanetId,
      title: newTitle,
      description: newDesc,
      makerName: visibility === 'anonymous' ? 'Anonymous' : userProfile.name,
      makerId: visibility === 'anonymous' ? 'anon' : 'me',
      likes: 0,
      comments: [],
      image: newImagePreview ?? undefined,
      link: newLink.trim() || undefined,
      visibility,
      lat: (Math.random() - 0.5) * Math.PI,
      lon: (Math.random() - 0.5) * Math.PI * 2,
    };

    addContribution(newObj);
    addStamp(planet.id as PlanetId);
    setIsAdding(false);
    resetAddForm();
    setShowStampAnim(true);
    setTimeout(() => setShowStampAnim(false), 2000);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Top nav — slides in from top on mount */}
      <motion.div
        initial={{ opacity: 0, y: -32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        className="absolute top-0 left-0 right-0 px-6 pt-6 pb-4 flex flex-col gap-4 z-30 pointer-events-none"
      >
        <button
          onClick={() => { startZoomOut(); navigate('/'); }}
          className={`pointer-events-auto self-start flex items-center gap-1.5 px-3.5 py-2 border text-sm font-sans font-medium rounded-full backdrop-blur-xl transition-all shadow-lg ${
            isLightBg
              ? 'bg-black/8 hover:bg-black/14 border-black/15 text-stone-700 hover:text-stone-950'
              : 'bg-white/8 hover:bg-white/14 border-white/12 text-white/80 hover:text-white'
          }`}
        >
          <ChevronLeft size={16} className="shrink-0" /> Back to Galaxy
        </button>

        {/* Planet name */}
        <div className="text-center pointer-events-none">
          <h1 className={`font-display text-6xl sm:text-7xl ${isLightBg ? 'text-stone-800' : 'text-white'}`}>{planet.name}</h1>
          <p className={`font-sans text-sm mt-1.5 tracking-wide ${isLightBg ? 'text-stone-600' : 'text-white/50'}`}>{planet.description}</p>
          <div className="flex items-center gap-2 mt-3 justify-center flex-wrap">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold tracking-wide border ${isLightBg ? 'bg-indigo-500/10 border-indigo-500/25 text-indigo-700' : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'}`}>
              <Sparkles size={11} />
              {contributions.filter(c => c.planetId === planet.id).length} stamps
            </div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold tracking-wide border ${isLightBg ? 'bg-violet-500/10 border-violet-500/25 text-violet-700' : 'bg-violet-500/15 border-violet-500/30 text-violet-300'}`}>
              <Users size={11} />
              {new Set(contributions.filter(c => c.planetId === planet.id).map(c => c.makerId)).size} creators
            </div>
          </div>
        </div>
      </motion.div>

      {/* "Add to this planet" CTA — slides in from bottom on mount */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        className="absolute bottom-28 left-0 right-0 flex justify-center z-30 pointer-events-none"
      >
        <button
          onClick={() => setIsAdding(true)}
          className="pointer-events-auto w-fit flex items-center gap-2.5 pl-4 pr-3.5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-base font-sans font-semibold rounded-full shadow-[0_4px_24px_rgba(99,102,241,0.4)] hover:shadow-[0_4px_32px_rgba(99,102,241,0.55)] transition-all hover:scale-105 active:scale-100"
        >
          <Plus size={20} /> New Stamp
        </button>
      </motion.div>

      {/* Contribution detail panel */}
      <AnimatePresence>
        {liveContribution && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-end p-4 sm:p-8 pointer-events-auto"
            onClick={closeDetail}
          >
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 220 }}
              className="relative w-full max-w-sm sm:max-w-md bg-[#0d0f18]/92 backdrop-blur-2xl border border-white/10 text-slate-100 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.7)] overflow-hidden h-full max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                {liveContribution.makerId === 'me' && (
                  <button
                    className="p-1.5 rounded-full text-white/40 hover:text-indigo-300 hover:bg-indigo-500/15 transition-all"
                    onClick={() => openEdit(liveContribution)}
                    title="Edit your pin"
                  >
                    <Pencil size={15} />
                  </button>
                )}
                <button
                  className="p-1.5 rounded-full text-white/40 hover:text-white/80 hover:bg-white/10 transition-all"
                  onClick={closeDetail}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="h-52 sm:h-64 w-full bg-white/5 relative shrink-0">
                <img
                  src={liveContribution.image || STAMP_ILLUSTRATIONS[liveContribution.id] || craftImage(liveContribution.id, liveContribution.planetId, liveContribution.title)}
                  alt={liveContribution.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.onerror = null;
                    img.src = STAMP_ILLUSTRATIONS[liveContribution.id] || craftImage(liveContribution.id, liveContribution.planetId, liveContribution.title);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f18]/70 to-transparent" />
              </div>
              <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">{liveContribution.title}</h3>
                  <p className="text-sm font-sans text-slate-400 leading-relaxed">{liveContribution.description}</p>
                </div>

                {/* Maker row + like + comment toggle */}
                <div className="flex flex-col gap-3 border-t border-white/8 pt-4">
                  <div className="flex items-center justify-between">
                    {liveContribution.makerId !== 'me' && liveContribution.makerId !== 'anon' ? (
                      <button
                        className="flex items-center gap-2.5 hover:opacity-75 transition-opacity"
                        onClick={() => setViewingMaker({ name: liveContribution.makerName, makerId: liveContribution.makerId })}
                      >
                        <div
                          className="w-8 h-8 rounded-full text-white flex items-center justify-center font-sans text-sm font-bold"
                          style={{ background: makerGradient(liveContribution.makerId) }}
                        >
                          {liveContribution.makerName.charAt(0)}
                        </div>
                        <div className="text-left">
                          <div className="text-[10px] font-sans font-semibold tracking-[0.12em] uppercase text-white/30">Made by</div>
                          <div className="text-sm font-sans font-semibold text-white/80 underline decoration-white/20">{liveContribution.makerName}</div>
                        </div>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-sans text-sm font-bold ring-2 ${liveContribution.makerId === 'me' ? 'bg-gradient-to-br from-indigo-400 to-violet-500 ring-indigo-400/60' : 'bg-gradient-to-br from-indigo-500 to-violet-600 ring-transparent'}`}>
                          {liveContribution.makerName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-[10px] font-sans font-semibold tracking-[0.12em] uppercase text-white/30">Made by</div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-sans font-semibold text-white/80">{liveContribution.makerName}</span>
                            {liveContribution.makerId === 'me' && (
                              <span className="px-1.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[9px] font-sans font-bold tracking-wide">YOU</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setShowComments((s) => !s)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-semibold transition-all ${showComments ? 'bg-white/15 text-white border border-white/20' : 'bg-white/6 text-white/45 hover:bg-white/12 hover:text-white/75 border border-white/8'}`}
                      >
                        <MessageCircle size={12} />
                        {liveContribution.comments.length}
                      </button>
                      <button
                        onClick={() => toggleLike(liveContribution.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-semibold transition-all ${likedContributions.has(liveContribution.id) ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-white/6 text-white/45 hover:bg-rose-500/10 hover:text-rose-400 border border-white/8'}`}
                      >
                        <Heart size={12} className={likedContributions.has(liveContribution.id) ? 'fill-current' : ''} />
                        {liveContribution.likes}
                      </button>
                      <button
                        onClick={() => togglePinStamp(liveContribution.id)}
                        title={pinnedStamps.has(liveContribution.id) ? 'Remove from passport' : 'Save to passport'}
                        className={`flex items-center justify-center gap-1.5 px-3 py-1.5 h-7 rounded-full text-xs font-sans font-semibold transition-all ${pinnedStamps.has(liveContribution.id) ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/6 text-white/45 hover:bg-amber-500/10 hover:text-amber-400 border border-white/8'}`}
                      >
                        <Bookmark size={12} className={pinnedStamps.has(liveContribution.id) ? 'fill-current' : ''} />
                      </button>
                    </div>
                  </div>
                  {liveContribution.makerId !== 'me' && liveContribution.makerId !== 'anon' && (
                    connections.includes(liveContribution.makerName) ? (
                      <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-sans font-semibold w-full justify-center">
                        <UserCheck size={13} />
                        Connected with {liveContribution.makerName}
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setConnectTarget({ name: liveContribution.makerName, initial: liveContribution.makerName.charAt(0) });
                          setConnectStep('confirm');
                        }}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 hover:border-indigo-500/50 text-indigo-300 hover:text-indigo-200 text-xs font-sans font-semibold w-full justify-center transition-all"
                      >
                        <UserPlus size={13} />
                        Connect with {liveContribution.makerName}
                      </button>
                    )
                  )}
                </div>

                {/* Comments section */}
                <AnimatePresence>
                  {showComments && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/8 pt-4 flex flex-col gap-3">
                        {liveContribution.comments.length === 0 ? (
                          <p className="text-xs font-sans text-white/30 italic text-center py-2">No comments yet. Be the first!</p>
                        ) : (
                          <ul className="flex flex-col gap-2.5 max-h-40 overflow-y-auto pr-1">
                            {liveContribution.comments.map((comment) => (
                              <li key={comment.id} className="flex gap-2">
                                <div className="w-6 h-6 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-[10px] font-sans font-bold">
                                  {comment.authorName.charAt(0)}
                                </div>
                                <div className="flex-1 bg-white/6 border border-white/8 rounded-xl px-3 py-2 text-xs font-sans">
                                  <span className="font-semibold text-white/80">{comment.authorName}</span>
                                  <p className="text-white/50 mt-0.5 leading-relaxed">{comment.text}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                        <form onSubmit={handleCommentSubmit} className="flex gap-2 mt-1">
                          <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment…"
                            className="flex-1 text-xs font-sans px-3 py-2 rounded-xl bg-white/6 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/40 transition-all"
                          />
                          <button
                            type="submit"
                            disabled={!commentText.trim()}
                            className="p-2 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-30 text-white rounded-xl transition-all"
                          >
                            <Send size={14} />
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add contribution form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xl pointer-events-auto"
            onClick={() => setIsAdding(false)}
          >
            <motion.div
              initial={{ y: 16, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 16, scale: 0.97 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              className="w-full max-w-lg bg-[#0d0f18]/95 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5">
                <h3 className="font-display text-xl font-bold text-white">Add to {planet.name}</h3>
                <p className="text-xs font-sans text-white/40 mt-0.5">Share something you've made or learned</p>
              </div>
              <form onSubmit={handleAddSubmit} className="space-y-4">

                {/* Image upload */}
                <div>
                  <label className="block text-xs font-sans font-semibold tracking-wide uppercase text-white/35 mb-1.5">Image</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-28 border border-dashed border-white/15 hover:border-indigo-500/50 rounded-xl overflow-hidden transition-all flex items-center justify-center bg-white/4 hover:bg-white/6 relative"
                  >
                    {newImagePreview ? (
                      <img src={newImagePreview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-white/25">
                        <ImagePlus size={24} />
                        <span className="text-xs font-sans font-medium">Click to add a photo</span>
                      </div>
                    )}
                  </button>
                  {newImagePreview && (
                    <button
                      type="button"
                      onClick={() => { setNewImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                      className="mt-1 text-xs font-sans text-white/30 hover:text-rose-400 transition-colors"
                    >
                      Remove image
                    </button>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-sans font-semibold tracking-wide uppercase text-white/35 mb-1.5">Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-sans rounded-xl bg-white/6 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/40 transition-all"
                    placeholder="E.g., My First Mug"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-sans font-semibold tracking-wide uppercase text-white/35 mb-1.5">Description</label>
                  <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-sans rounded-xl bg-white/6 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/40 h-20 resize-none transition-all"
                    placeholder="Share a tip or what you learned…"
                  />
                </div>

                {/* Link */}
                <div>
                  <label className="block text-xs font-sans font-semibold tracking-wide uppercase text-white/35 mb-1.5">
                    Link <span className="normal-case font-normal text-white/20">(optional)</span>
                  </label>
                  <div className="relative">
                    <Link2 size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                    <input
                      type="url"
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-sm font-sans rounded-xl bg-white/6 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/40 transition-all"
                      placeholder="https://…"
                    />
                  </div>
                </div>

                {/* Visibility */}
                <div>
                  <label className="block text-xs font-sans font-semibold tracking-wide uppercase text-white/35 mb-2">Who can see this?</label>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { value: 'public', label: 'Public', icon: Globe },
                      { value: 'connections', label: 'Connections', icon: Users },
                      { value: 'anonymous', label: 'Anonymous', icon: UserX },
                    ] as { value: Visibility; label: string; icon: React.ElementType }[]).map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setVisibility(value)}
                        className={`flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs font-sans font-semibold transition-all ${
                          visibility === value
                            ? 'border-indigo-500/60 bg-indigo-500/15 text-indigo-300'
                            : 'border-white/8 bg-white/4 text-white/40 hover:bg-white/8 hover:text-white/60'
                        }`}
                      >
                        <Icon size={15} />
                        {label}
                      </button>
                    ))}
                  </div>
                  {visibility === 'anonymous' && (
                    <p className="mt-1.5 text-xs font-sans text-white/30 italic">Your name will be hidden from this post.</p>
                  )}
                  {visibility === 'connections' && (
                    <p className="mt-1.5 text-xs font-sans text-white/30 italic">Only people you follow can see this.</p>
                  )}
                </div>

                <div className="flex gap-2.5 pt-1">
                  <button
                    type="button"
                    className="flex-1 px-4 py-2.5 text-sm font-sans font-semibold text-white/50 bg-white/6 hover:bg-white/10 border border-white/8 rounded-xl transition-all"
                    onClick={() => { setIsAdding(false); resetAddForm(); }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 text-sm font-sans font-semibold text-white bg-indigo-500 hover:bg-indigo-400 rounded-xl shadow-[0_2px_12px_rgba(99,102,241,0.4)] hover:shadow-[0_2px_20px_rgba(99,102,241,0.5)] transition-all"
                  >
                    Drop Object
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit pin modal */}
      <AnimatePresence>
        {editingId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xl pointer-events-auto"
            onClick={closeEdit}
          >
            <motion.div
              initial={{ y: 16, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 16, scale: 0.97 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              className="w-full max-w-lg bg-[#0d0f18]/95 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5">
                <h3 className="font-display text-xl font-bold text-white">Edit your pin</h3>
                <p className="text-xs font-sans text-white/40 mt-0.5">Update what you shared</p>
              </div>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                {/* Image */}
                <div>
                  <label className="block text-xs font-sans font-semibold tracking-wide uppercase text-white/35 mb-1.5">Image</label>
                  <input ref={editFileInputRef} type="file" accept="image/*" className="hidden" onChange={handleEditImageChange} />
                  <button
                    type="button"
                    onClick={() => editFileInputRef.current?.click()}
                    className="w-full h-28 border border-dashed border-white/15 hover:border-indigo-500/50 rounded-xl overflow-hidden transition-all flex items-center justify-center bg-white/4 hover:bg-white/6 relative"
                  >
                    {editImagePreview ? (
                      <img src={editImagePreview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-white/25">
                        <ImagePlus size={24} />
                        <span className="text-xs font-sans font-medium">Click to add a photo</span>
                      </div>
                    )}
                  </button>
                  {editImagePreview && (
                    <button
                      type="button"
                      onClick={() => { setEditImagePreview(null); if (editFileInputRef.current) editFileInputRef.current.value = ''; }}
                      className="mt-1 text-xs font-sans text-white/30 hover:text-rose-400 transition-colors"
                    >
                      Remove image
                    </button>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-sans font-semibold tracking-wide uppercase text-white/35 mb-1.5">Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-sans rounded-xl bg-white/6 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/40 transition-all"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-sans font-semibold tracking-wide uppercase text-white/35 mb-1.5">Description</label>
                  <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-sans rounded-xl bg-white/6 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/40 h-20 resize-none transition-all"
                  />
                </div>

                {/* Link */}
                <div>
                  <label className="block text-xs font-sans font-semibold tracking-wide uppercase text-white/35 mb-1.5">
                    Link <span className="normal-case font-normal text-white/20">(optional)</span>
                  </label>
                  <div className="relative">
                    <Link2 size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                    <input
                      type="url"
                      value={editLink}
                      onChange={(e) => setEditLink(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-sm font-sans rounded-xl bg-white/6 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/40 transition-all"
                      placeholder="https://…"
                    />
                  </div>
                </div>

                {/* Visibility */}
                <div>
                  <label className="block text-xs font-sans font-semibold tracking-wide uppercase text-white/35 mb-2">Who can see this?</label>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { value: 'public', label: 'Public', icon: Globe },
                      { value: 'connections', label: 'Connections', icon: Users },
                      { value: 'anonymous', label: 'Anonymous', icon: UserX },
                    ] as { value: Visibility; label: string; icon: React.ElementType }[]).map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setEditVisibility(value)}
                        className={`flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs font-sans font-semibold transition-all ${
                          editVisibility === value
                            ? 'border-indigo-500/60 bg-indigo-500/15 text-indigo-300'
                            : 'border-white/8 bg-white/4 text-white/40 hover:bg-white/8 hover:text-white/60'
                        }`}
                      >
                        <Icon size={15} />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2.5 pt-1">
                  <button
                    type="button"
                    className="flex-1 px-4 py-2.5 text-sm font-sans font-semibold text-white/50 bg-white/6 hover:bg-white/10 border border-white/8 rounded-xl transition-all"
                    onClick={closeEdit}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 text-sm font-sans font-semibold text-white bg-indigo-500 hover:bg-indigo-400 rounded-xl shadow-[0_2px_12px_rgba(99,102,241,0.4)] hover:shadow-[0_2px_20px_rgba(99,102,241,0.5)] transition-all"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connect request modal */}
      <AnimatePresence>
        {connectTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/65 backdrop-blur-xl pointer-events-auto"
            onClick={() => connectStep === 'confirm' && setConnectTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 12 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="w-full max-w-xs bg-[#0d0f18]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_32px_64px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              {connectStep === 'confirm' ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-display text-2xl font-bold mb-5 shadow-md">
                    {connectTarget.initial}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">Connect with {connectTarget.name}?</h3>
                  <p className="text-sm font-sans text-white/50 leading-relaxed mb-7">
                    We'll send a request. Nothing is shared until they accept — then you each pick what to hand over.
                  </p>
                  <button
                    onClick={() => {
                      addConnection(connectTarget.name);
                      setConnectStep('sent');
                    }}
                    className="w-full py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-sans font-semibold text-sm rounded-xl shadow-[0_2px_12px_rgba(99,102,241,0.4)] hover:shadow-[0_2px_20px_rgba(99,102,241,0.5)] transition-all mb-3"
                  >
                    Send connect request
                  </button>
                  <button
                    onClick={() => setConnectTarget(null)}
                    className="text-sm font-sans text-white/40 hover:text-white/70 transition-colors"
                  >
                    Not now
                  </button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-indigo-500/15 flex items-center justify-center mb-5">
                    <Send size={26} className="text-indigo-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">Request sent to {connectTarget.name}</h3>
                  <p className="text-sm font-sans text-white/50 leading-relaxed mb-7">
                    You'll find it under <strong className="text-white/80">My Connections</strong> in your passport. We'll let you know when they reply.
                  </p>
                  <button
                    onClick={() => setConnectTarget(null)}
                    className="w-full py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-sans font-semibold text-sm rounded-xl shadow-[0_2px_12px_rgba(99,102,241,0.4)] hover:shadow-[0_2px_20px_rgba(99,102,241,0.5)] transition-all"
                  >
                    Done
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Maker profile overlay */}
      <AnimatePresence>
        {viewingMaker && (
          <MakerProfileOverlay
            name={viewingMaker.name}
            makerId={viewingMaker.makerId}
            allContributions={contributions}
            isConnected={connections.includes(viewingMaker.name)}
            onClose={() => setViewingMaker(null)}
            onConnect={() => {
              setViewingMaker(null);
              setConnectTarget({ name: viewingMaker.name, initial: viewingMaker.name.charAt(0) });
              setConnectStep('confirm');
            }}
          />
        )}
      </AnimatePresence>

      {/* Stamp animation */}
      <AnimatePresence>
        {showStampAnim && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 3, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 12, stiffness: 100 }}
              className="w-44 h-44 rounded-full border-4 border-dashed border-white/70 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm shadow-[0_0_60px_rgba(255,255,255,0.12)]"
            >
              <Sparkles size={40} className="text-white drop-shadow-md" />
              <div className="font-display text-3xl mt-2 font-bold text-white tracking-widest drop-shadow-md">STAMPED!</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
