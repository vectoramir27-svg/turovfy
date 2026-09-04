import React, { useEffect, useState } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { Track, ArtistData } from '../types';
import { api } from '../api/client';

interface ArtistScreenProps {
  artistName: string;
  onBack: () => void;
  onPlayTrack: (track: Track) => void;
  onPlayAll: (tracks: Track[]) => void;
}

export const ArtistScreen: React.FC<ArtistScreenProps> = ({
  artistName,
  onBack,
  onPlayTrack,
  onPlayAll
}) => {
  const [data, setData] = useState<ArtistData | null>(null);

  useEffect(() => {
    api.getArtist(artistName).then(setData);
  }, [artistName]);

  if (!data) {
    return <div className="p-8 text-center text-neutral-500">Загрузка данных исполнителя...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-32 select-none">
      <button onClick={onBack} className="p-2 rounded-full bg-white/5 text-neutral-400 mb-4 active:scale-90">
        <ArrowLeft size={20} />
      </button>

      <div className="flex flex-col items-center text-center my-6">
        <img
          src={data.avatar}
          alt={data.name}
          className="w-32 h-32 rounded-full object-cover shadow-2xl mb-4 border border-white/10"
        />
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-2xl font-black text-white">{data.name}</h1>
          {/* Синяя розетка верификации */}
          <svg viewBox="0 0 100 100" width="20" height="20" fill="none">
            <path
              d="M50 0 C53 6, 59 7, 65 5 C70 3, 75 7, 76 13 C78 18, 83 22, 89 22 C95 23, 98 29, 96 35 C94 40, 97 46, 100 50 C97 54, 94 60, 96 65 C98 71, 95 77, 89 78 C83 78, 78 82, 76 87 C75 93, 70 97, 65 95 C59 93, 53 94, 50 100 C47 94, 41 93, 35 95 C30 97, 25 93, 24 87 C22 82, 17 78, 11 78 C5 77, 2 71, 4 65 C6 60, 3 54, 0 50 C3 46, 6 40, 4 35 C2 29, 5 23, 11 22 C17 22, 22 18, 24 13 C25 7, 30 3, 35 5 C41 7, 47 6, 50 0 Z"
              fill="#007AFF"
            />
            <path d="M30 50 L43 63 L70 36" stroke="#ffffff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>

        <button
          onClick={() => onPlayAll(data.tracks)}
          className="flex items-center gap-2 bg-white text-black font-bold px-6 py-2.5 rounded-full active:scale-95 transition"
        >
          <Play size={16} fill="black" /> Слушать всё
        </button>
      </div>

      <h3 className="text-base font-bold text-white mb-3">Популярные треки</h3>
      <div className="flex flex-col gap-2">
        {data.tracks.map((t) => (
          <div
            key={t.id}
            onClick={() => onPlayTrack(t)}
            className="flex items-center gap-3 p-2 rounded-xl bg-neutral-900/30 border border-white/5 active:scale-98 transition"
          >
            <img src={t.cover} className="w-11 h-11 rounded-lg object-cover" />
            <div className="overflow-hidden flex-1">
              <h4 className="text-sm font-semibold text-white truncate">{t.title}</h4>
              <p className="text-xs text-neutral-400 truncate">{t.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};