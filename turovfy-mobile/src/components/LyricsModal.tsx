import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Track } from '../types';
import { api } from '../api/client';

interface LyricsModalProps {
  isOpen: boolean;
  track: Track | null;
  currentTime: number;
  onClose: () => void;
}

interface LyricLine {
  time: number;
  text: string;
}

export const LyricsModal: React.FC<LyricsModalProps> = ({
  isOpen,
  track,
  currentTime,
  onClose
}) => {
  const [lines, setLines] = useState<LyricLine[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!track || !isOpen) return;

    api.getLyrics(track.title, track.artist).then((data) => {
      if (data.type === 'synced') {
        const raw = data.lyrics.split('\n');
        const reg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
        const parsed: LyricLine[] = [];

        raw.forEach((l: string) => {
          const m = reg.exec(l);
          if (m) {
            const time = parseInt(m[1]) * 60 + parseInt(m[2]) + parseInt(m[3].padEnd(3, '0')) / 1000;
            const text = l.replace(reg, '').trim();
            if (text) parsed.push({ time, text });
          }
        });
        setLines(parsed);
      } else {
        const plain = data.lyrics.split('\n').map((t: string, i: number) => ({
          time: i * 4,
          text: t.trim()
        })).filter((x: LyricLine) => x.text);
        setLines(plain);
      }
    });
  }, [track, isOpen]);

  // Вычисление активной строки
  let activeIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (currentTime >= lines[i].time) activeIndex = i;
    else break;
  }

  // Плавный автоскролл
  useEffect(() => {
    if (!containerRef.current) return;
    const activeEl = containerRef.current.children[activeIndex] as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed inset-0 bg-[#161410] z-[60] flex flex-col p-6 select-none"
        >
          <div className="flex items-center justify-between pb-6 pt-2">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 active:scale-90"
            >
              <ChevronDown size={24} />
            </button>
            <div className="text-center overflow-hidden max-w-[200px]">
              <h4 className="text-sm font-bold text-white truncate">{track?.title}</h4>
              <p className="text-xs text-neutral-400 truncate">{track?.artist}</p>
            </div>
            <div className="w-10" />
          </div>

          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto flex flex-col gap-6 py-12 scroll-smooth no-scrollbar"
          >
            {lines.length === 0 ? (
              <p className="text-center text-neutral-500 mt-20">Загрузка текста песни...</p>
            ) : (
              lines.map((l, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <p
                    key={idx}
                    className={`text-2xl font-black leading-snug transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-white/20'
                    }`}
                  >
                    {l.text}
                  </p>
                );
              })
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};