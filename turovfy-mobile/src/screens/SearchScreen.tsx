import React, { useState } from 'react';
import { Search as SearchIcon, Cloud } from 'lucide-react';
import { Track } from '../types';
import { api } from '../api/client';

interface SearchScreenProps {
  onSelectTrack: (track: Track) => void;
  onOpenArtist: (name: string) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onSelectTrack, onOpenArtist }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Track[]>([]);
  const [filter, setFilter] = useState<'all' | 'tracks' | 'playlists'>('all');

  const handleSearch = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setResults([]);
      return;
    }
    api.search(val).then(setResults);
  };

  return (
    <div className="p-4 max-w-md mx-auto pb-44 select-none">
      {/* Поисковая строка с иконкой облака */}
      <div className="relative mb-4 flex items-center bg-neutral-900/90 border border-white/10 rounded-2xl px-4 py-3">
        <SearchIcon size={18} className="text-neutral-400 mr-3 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Поиск музыки, подкастов..."
          className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
        />
        <Cloud size={18} className="text-neutral-400 ml-2 shrink-0" />
      </div>

      {/* Фильтры */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition ${filter === 'all' ? 'bg-white text-black' : 'bg-neutral-900 text-neutral-400 border border-white/10'}`}
        >
          Все
        </button>
        <button
          onClick={() => setFilter('tracks')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition ${filter === 'tracks' ? 'bg-white text-black' : 'bg-neutral-900 text-neutral-400 border border-white/10'}`}
        >
          Треки
        </button>
        <button
          onClick={() => setFilter('playlists')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition ${filter === 'playlists' ? 'bg-white text-black' : 'bg-neutral-900 text-neutral-400 border border-white/10'}`}
        >
          Плейлисты
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {results.map((t) => (
          <div
            key={t.id}
            onClick={() => onSelectTrack(t)}
            className="flex items-center gap-3 p-2.5 rounded-2xl bg-neutral-900/40 border border-white/5 active:scale-98 transition"
          >
            <img src={t.cover} className="w-12 h-12 rounded-xl object-cover bg-neutral-800 shrink-0" />
            <div className="overflow-hidden flex-1">
              <h4 className="text-sm font-semibold text-white truncate">{t.title}</h4>
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenArtist(t.artist);
                }}
                className="text-xs text-neutral-400 truncate hover:underline"
              >
                {t.artist}
              </p>
            </div>
            {t.duration && <span className="text-xs text-neutral-500 font-mono pr-2">{t.duration}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
