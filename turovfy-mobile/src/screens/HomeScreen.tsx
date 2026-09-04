import React from 'react';
import { Track } from '../types';

interface HomeScreenProps {
  tracks: Track[];
  onPlayTrack: (index: number) => void;
  onOpenArtist: (name: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  tracks,
  onPlayTrack,
  onOpenArtist
}) => {
  return (
    <main className="p-4 max-w-md mx-auto pb-40">
      <header className="py-6 flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tight">
          TUROV<span className="text-neutral-500">FY</span>
        </h1>
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
      </header>

      <div className="grid grid-cols-2 gap-3">
        {tracks.map((track, idx) => (
          <div
            key={track.id}
            onClick={() => onPlayTrack(idx)}
            className="bg-neutral-900/60 border border-white/5 p-3 rounded-2xl active:scale-95 transition"
          >
            <img
              src={track.cover}
              alt={track.title}
              className="w-full aspect-square object-cover rounded-xl mb-2 bg-neutral-800"
            />
            <h3 className="text-sm font-semibold truncate text-white">{track.title}</h3>
            <p
              onClick={(e) => {
                e.stopPropagation();
                onOpenArtist(track.artist);
              }}
              className="text-xs text-neutral-400 truncate hover:underline"
            >
              {track.artist}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};