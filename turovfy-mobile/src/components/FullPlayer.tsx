import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, Pause, SkipBack, SkipForward, Heart, Mic2 } from 'lucide-react';
import { Track } from '../types';

interface FullPlayerProps {
  isOpen: boolean;
  track: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onClose: () => void;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
  onOpenLyrics: () => void;
  isLiked: boolean;
  onToggleLike: () => void;
}

export const FullPlayer: React.FC<FullPlayerProps> = ({
  isOpen,
  track,
  isPlaying,
  currentTime,
  duration,
  onClose,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
  onOpenLyrics,
  isLiked,
  onToggleLike
}) => {
  if (!track) return null;

  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60) || 0;
    const sec = Math.floor(secs % 60) || 0;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const progressPct = duration ? (currentTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 32, stiffness: 350 }}
          className="fixed inset-0 bg-[#09090c] z-50 flex flex-col justify-between p-6 select-none"
        >
          {/* Верхняя панель */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 active:scale-90"
            >
              <ChevronDown size={24} />
            </button>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">TurovFy Engine</span>
            <button
              onClick={onOpenLyrics}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 active:scale-90"
            >
              <Mic2 size={20} />
            </button>
          </div>

          {/* Обложка альбома */}
          <div className="w-full aspect-square max-w-sm mx-auto my-auto rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/5">
            <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
          </div>

          {/* Инфо и контроллеры */}
          <div className="w-full max-w-sm mx-auto pb-4">
            <div className="flex items-center justify-between mb-6">
              <div className="overflow-hidden pr-4">
                <h2 className="text-xl font-bold text-white truncate">{track.title}</h2>
                <p className="text-sm text-neutral-400 truncate">{track.artist}</p>
              </div>
              <button
                onClick={onToggleLike}
                className={`p-2 active:scale-90 transition ${isLiked ? 'text-[#ff2a5f]' : 'text-neutral-400'}`}
              >
                <Heart size={24} fill={isLiked ? '#ff2a5f' : 'none'} />
              </button>
            </div>

            {/* Прогресс-бар */}
            <div className="mb-6">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={(e) => onSeek(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-xs text-neutral-500 mt-2 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Кнопки управления */}
            <div className="flex items-center justify-between px-6">
              <button onClick={onPrev} className="text-neutral-400 active:scale-90 transition hover:text-white">
                <SkipBack size={28} />
              </button>
              <button
                onClick={onTogglePlay}
                className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center active:scale-95 shadow-lg transition"
              >
                {isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" className="ml-1" />}
              </button>
              <button onClick={onNext} className="text-neutral-400 active:scale-90 transition hover:text-white">
                <SkipForward size={28} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};