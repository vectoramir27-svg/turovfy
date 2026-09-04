import React, { useState } from 'react';
import { Plus, Trash2, Heart, Music2 } from 'lucide-react';
import { Track } from '../types';

interface LibraryScreenProps {
  playlists: Record<string, Track[]>;
  onSelectTrack: (track: Track) => void;
  onCreatePlaylist: (name: string) => void;
  onDeletePlaylist: (name: string) => void;
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  playlists,
  onSelectTrack,
  onCreatePlaylist,
  onDeletePlaylist
}) => {
  const [activePlaylist, setActivePlaylist] = useState<string | null>(null);
  const [newPlName, setNewPlName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlName.trim()) return;
    onCreatePlaylist(newPlName.trim());
    setNewPlName('');
    setIsCreating(false);
  };

  // Если открыт конкретный плейлист
  if (activePlaylist) {
    const list = playlists[activePlaylist] || [];
    return (
      <div className="p-4 max-w-md mx-auto pb-40 select-none">
        <button
          onClick={() => setActivePlaylist(null)}
          className="text-sm font-semibold text-neutral-400 mb-4 flex items-center gap-1 active:opacity-70"
        >
          ← Назад к коллекциям
        </button>

        <h2 className="text-2xl font-black text-white mb-1">{activePlaylist}</h2>
        <p className="text-xs text-neutral-500 mb-6">{list.length} треков</p>

        <div className="flex flex-col gap-2">
          {list.length === 0 ? (
            <p className="text-sm text-neutral-500 text-center py-10">В этом плейлисте пока пусто</p>
          ) : (
            list.map((track) => (
              <div
                key={track.id}
                onClick={() => onSelectTrack(track)}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-900/40 border border-white/5 active:scale-98 transition"
              >
                <img src={track.cover} className="w-12 h-12 rounded-lg object-cover bg-neutral-800 shrink-0" />
                <div className="overflow-hidden flex-1">
                  <h4 className="text-sm font-semibold text-white truncate">{track.title}</h4>
                  <p className="text-xs text-neutral-400 truncate">{track.artist}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // Список всех коллекций
  return (
    <div className="p-4 max-w-md mx-auto pb-40 select-none">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-white">Медиатека</h2>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-90"
        >
          <Plus size={18} />
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="mb-4 flex gap-2">
          <input
            type="text"
            value={newPlName}
            onChange={(e) => setNewPlName(e.target.value)}
            placeholder="Название плейлиста..."
            className="flex-1 bg-neutral-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
            autoFocus
          />
          <button type="submit" className="bg-white text-black font-semibold text-xs px-4 rounded-xl">
            Создать
          </button>
        </form>
      )}

      <div className="flex flex-col gap-3">
        {Object.entries(playlists).map(([name, tracks]) => {
          const isFav = name === 'Любимое';
          return (
            <div
              key={name}
              onClick={() => setActivePlaylist(name)}
              className="flex items-center justify-between p-3 rounded-2xl bg-neutral-900/50 border border-white/5 active:scale-98 transition"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isFav ? 'bg-[#ff2a5f]/20 text-[#ff2a5f]' : 'bg-white/5 text-neutral-400'}`}>
                  {isFav ? <Heart size={22} fill="#ff2a5f" /> : <Music2 size={22} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{name}</h4>
                  <p className="text-xs text-neutral-500">{tracks.length} треков</p>
                </div>
              </div>

              {!isFav && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Удалить плейлист "${name}"?`)) onDeletePlaylist(name);
                  }}
                  className="p-2 text-neutral-500 hover:text-red-400 active:scale-90"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};