import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Track } from '../types';
import { api } from '../api/client';

interface SearchScreenProps {
  onSelectTrack: (track: Track) => void;
  onOpenArtist: (name: string) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onSelectTrack, onOpenArtist }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Track[]>([]);

  const handleSearch = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setResults([]);
      return;
    }
    api.search(val).then(setResults);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="relative mb-6">
        <SearchIcon size={18} className="absolute left-4 top-3.5 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Артист, трек или альбом..."
          className="w-full bg-neutral-900/80 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
        />
      </div>

      <div className="flex flex-col gap-3">
        {results.map((t) => (
          <div
            key={t.id}
            onClick={() => onSelectTrack(t)}
            className="flex items-center gap-3 p-2 rounded-xl bg-neutral-900/40 border border-white/5 active:scale-98 transition"
          >
            <img src={t.cover} className="w-12 h-12 rounded-lg object-cover bg-neutral-800 shrink-0" />
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