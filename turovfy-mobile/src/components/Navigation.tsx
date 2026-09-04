import React from 'react';
import { motion } from 'framer-motion';
import { Home, Compass, Store, User, Sparkles } from 'lucide-react';
import { TabType } from '../types';

interface NavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenLyrics: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onSelectTab, onOpenLyrics }) => {
  const tabs = [
    { id: 'drops' as TabType, icon: Home },
    { id: 'tasks' as TabType, icon: Compass },
    { id: 'market' as TabType, icon: Store },
    { id: 'profile' as TabType, icon: User },
  ];

  return (
    <div className="fixed bottom-5 inset-x-0 flex justify-center z-50 pointer-events-none px-3 select-none">
      <nav className="pointer-events-auto w-full max-w-sm h-16 bg-[#121216]/85 backdrop-blur-2xl border border-white/10 px-2 rounded-full flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
        <div className="flex-1 flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className="relative w-12 h-12 flex items-center justify-center rounded-full active:scale-90 transition-transform"
              >
                {isActive && (
                  <motion.div
                    layoutId="liquid-nav-active"
                    className="absolute inset-0 bg-white rounded-full shadow-[0_4px_16px_rgba(255,255,255,0.35)]"
                    transition={{
                      type: 'spring',
                      stiffness: 520,
                      damping: 36,
                    }}
                  />
                )}
                <Icon
                  size={21}
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive ? 'text-[#000000]' : 'text-[#8E8E93] hover:text-white'
                  }`}
                  strokeWidth={isActive ? 2.6 : 2}
                />
              </button>
            );
          })}
        </div>

        <div className="w-[1px] h-6 bg-white/10 mx-1" />

        <button
          onClick={onOpenLyrics}
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition active:scale-90 hover:bg-white/15"
        >
          <Sparkles size={19} className="text-white" />
        </button>
      </nav>
    </div>
  );
};