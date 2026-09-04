import React, { useState } from 'react';
import { Plus, Shuffle, ArrowUpDown, LayoutGrid, Heart, Music2, Trash2 } from 'lucide-react';
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

  if (activePlaylist) {
    const list = playlists[activePlaylist] || [];
    return (
      <div className="p-4 max-w-md mx-auto pb-44 select-none">
        <button
          onClick={() => setActivePlaylist(null)}
          className="text-xs font-semibold text-neutral-400 mb-4 flex items-center gap-1 active:opacity-70"
        >
          ← Назад
        </button>
        <h2 className="text-3xl font-black text-white mb-1">{activePlaylist}</h2>
        <p className="text-xs text-neutral-500 mb-6">{list.length} треков</p>

        <div className="flex flex-col gap-2">
          {list.length === 0 ? (
            <p className="text-sm text-neutral-500 text-center py-12">Плейлист пока пуст</p>
          ) : (
            list.map((track) => (
              <div
                key={track.id}
                onClick={() => onSelectTrack(track)}
                className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-900/40 border border-white/5 active:scale-98 transition"
              >
                <img src={track.cover} className="w-12 h-12 rounded-xl object-cover bg-neutral-800 shrink-0" />
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

  return (
    <div className="p-4 max-w-md mx-auto pb-44 select-none">
      <h2 className="text-3xl font-black text-white mb-6">Моя медиатека</h2>

      {/* Верхние плитки «Любимые» и «Скачанные» */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div
          onClick={() => setActivePlaylist('Любимое')}
          className="p-4 rounded-3xl bg-gradient-to-br from-[#e11d48] to-[#9f1239] cursor-pointer flex flex-col justify-between h-36 shadow-xl relative overflow-hidden active:scale-95 transition"
        >
          <Heart size={28} className="text-white fill-white" />
          <div>
            <h3 className="font-extrabold text-lg text-white">Любимые</h3>
            <p className="text-xs text-white/80">{playlists['Любимое']?.length || 0} треков</p>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-neutral-900/80 border border-white/10 cursor-pointer flex flex-col justify-between h-36 active:scale-95 transition">
          <Music2 size={28} className="text-neutral-400" />
          <div>
            <h3 className="font-extrabold text-lg text-white">Скачанные</h3>
            <p className="text-xs text-neutral-400">0 треков</p>
          </div>
        </div>
      </div>

      {/* Панель фильтров/кнопок */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white shrink-0 active:scale-90"
        >
          <Plus size={18} />
        </button>
        <button className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white shrink-0">
          <Shuffle size={16} />
        </button>
        <button className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white shrink-0">
          <ArrowUpDown size={16} />
        </button>
        <button className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-white shrink-0">
          <LayoutGrid size={16} />
        </button>
        <div className="px-4 py-2 rounded-full bg-white text-black font-bold text-xs shrink-0">
          Плейлисты
        </div>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="mb-6 flex gap-2">
          <input
            type="text"
            value={newPlName}
            onChange={(e) => setNewPlName(e.target.value)}
            placeholder="Название плейлиста..."
            className="flex-1 bg-neutral-900 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30"
            autoFocus
          />
          <button type="submit" className="bg-white text-black font-bold text-xs px-5 rounded-2xl">
            Создать
          </button>
        </form>
      )}

      {/* Список плейлистов */}
      <div className="flex flex-col gap-3">
        {Object.entries(playlists).map(([name, tracks]) => {
          if (name === 'Любимое') return null; // выведено выше в плитку
          return (
            <div
              key={name}
              onClick={() => setActivePlaylist(name)}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-900/50 border border-white/5 active:scale-98 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400">
                  <Music2 size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{name}</h4>
                  <p className="text-xs text-neutral-500">{tracks.length} треков</p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Удалить плейлист "${name}"?`)) onDeletePlaylist(name);
                }}
                className="p-2 text-neutral-500 hover:text-red-400 active:scale-90"
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
