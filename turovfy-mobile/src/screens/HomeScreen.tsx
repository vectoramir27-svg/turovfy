import React from 'react';
import { Bell, Play, Flame } from 'lucide-react';
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
    <main className="p-4 max-w-md mx-auto pb-44 select-none relative">
      <div className="wave-bg-lines" />

      {/* Верхняя панель */}
      <header className="py-4 flex items-center justify-between z-10 relative">
        <h1 className="text-3xl font-black tracking-tight text-white">Моя волна</h1>
        <button className="w-10 h-10 rounded-full bg-neutral-900/80 border border-white/10 flex items-center justify-center text-white active:scale-90">
          <Bell size={18} />
        </button>
      </header>

      {/* Интерактивный блок «Моя волна» с кнопкой Play */}
      <div className="my-6 p-6 rounded-3xl bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-white/10 flex items-center justify-between relative overflow-hidden shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-white mb-3">
            <Flame size={13} className="text-amber-400" /> Обычная
          </div>
          <h3 className="text-xl font-extxl font-bold text-white max-w-[180px] leading-tight">Бесконечный поток музыки</h3>
        </div>
        <button
          onClick={() => tracks.length && onPlayTrack(0)}
          className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 transition shrink-0"
        >
          <Play size={26} fill="black" className="ml-1" />
        </button>
      </div>

      {/* Секция «Для вас» */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Для вас</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {tracks.slice(0, 4).map((t, idx) => (
            <div
              key={t.id}
              onClick={() => onPlayTrack(idx)}
              className="w-36 shrink-0 bg-neutral-900/40 p-2.5 rounded-2xl border border-white/5 active:scale-95 transition cursor-pointer"
            >
              <img src={t.cover} className="w-full aspect-square object-cover rounded-xl mb-2 bg-neutral-800" />
              <h4 className="text-xs font-semibold truncate text-white">{t.title}</h4>
              <p className="text-[11px] text-neutral-400 truncate">{t.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Секция «Релизы» */}
      <section>
        <h2 className="text-lg font-bold text-white mb-3">Релизы</h2>
        <div className="grid grid-cols-2 gap-3">
          {tracks.map((track, idx) => (
            <div
              key={track.id}
              onClick={() => onPlayTrack(idx)}
              className="bg-neutral-900/50 border border-white/5 p-3 rounded-2xl active:scale-95 transition flex items-center gap-3"
            >
              <img src={track.cover} className="w-12 h-12 rounded-xl object-cover bg-neutral-800 shrink-0" />
              <div className="overflow-hidden">
                <h3 className="text-xs font-semibold truncate text-white">{track.title}</h3>
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenArtist(track.artist);
                  }}
                  className="text-[11px] text-neutral-400 truncate hover:underline"
                >
                  {track.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
