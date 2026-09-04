import React from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { Track } from '../types';

interface MiniPlayerProps {
  track: Track | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenFull: () => void;
  progress: number;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  track,
  isPlaying,
  onTogglePlay,
  onOpenFull,
  progress
}) => {
  if (!track) return null;

  return (
    <div className="fixed bottom-24 inset-x-0 flex justify-center z-40 px-3 pointer-events-none">
      <div 
        onClick={onOpenFull}
        className="pointer-events-auto w-full max-w-sm h-14 bg-[#18181f]/95 border border-white/10 rounded-2xl px-3 flex items-center justify-between shadow-2xl backdrop-blur-xl cursor-pointer relative overflow-hidden"
      >
        {/* Полоска прогресса снизу */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-150"
          style={{ width: `${progress}%` }}
        />

        <div className="flex items-center gap-3 overflow-hidden">
          <img 
            src={track.cover} 
            alt={track.title} 
            className="w-10 h-10 rounded-xl object-cover bg-neutral-900 shrink-0" 
          />
          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold text-white truncate">{track.title}</h4>
            <p className="text-xs text-neutral-400 truncate">{track.artist}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={(e) => { e.stopPropagation(); onTogglePlay(); }}
            className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center active:scale-90 transition"
          >
            {isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" className="ml-0.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};