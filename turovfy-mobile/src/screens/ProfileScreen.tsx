import React from 'react';
import { User, ShieldCheck, HardDrive, Sliders, LogOut } from 'lucide-react';

interface ProfileScreenProps {
  serverIp: string;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ serverIp }) => {
  return (
    <main className="p-4 max-w-md mx-auto pb-40 select-none">
      {/* Шапка профиля */}
      <div className="flex flex-col items-center text-center my-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-700 border border-white/10 flex items-center justify-center shadow-xl mb-3">
          <User size={40} className="text-neutral-300" />
        </div>
        <h2 className="text-xl font-bold text-white">Alexander</h2>
        <div className="flex items-center gap-1.5 mt-1 text-emerald-400 text-xs font-medium bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <ShieldCheck size={14} />
          <span>TurovFy Core Connected</span>
        </div>
      </div>

      {/* Настройки стриминга и сервера */}
      <div className="flex flex-col gap-3 mt-4">
        <div className="p-3.5 bg-neutral-900/50 border border-white/5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-neutral-400">
              <HardDrive size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Сервер трансляции</p>
              <p className="text-xs text-neutral-500 font-mono">{serverIp}</p>
            </div>
          </div>
          <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md">Online</span>
        </div>

        <div className="p-3.5 bg-neutral-900/50 border border-white/5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-neutral-400">
              <Sliders size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Качество звука</p>
              <p className="text-xs text-neutral-500">Прямой поток M4A / Lossless Pipeline</p>
            </div>
          </div>
          <span className="text-xs text-neutral-400 font-semibold">Auto</span>
        </div>

        <button 
          onClick={() => alert('Сброс состояния')}
          className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 active:scale-98 transition mt-4"
        >
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <LogOut size={20} />
          </div>
          <span className="text-sm font-semibold">Очистить кэш и сессию</span>
        </button>
      </div>
    </main>
  );
};