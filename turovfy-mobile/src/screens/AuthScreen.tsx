import React, { useState } from 'react';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';

interface AuthScreenProps {
  onLoginSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [step, setStep] = useState<'welcome' | 'form'>('welcome');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col justify-between p-6 select-none z-50 overflow-hidden">
      <div className="wave-bg-lines" />

      {step === 'welcome' ? (
        <>
          <div className="flex flex-col items-center pt-24 z-10">
            {/* Логотип-волна */}
            <div className="w-28 h-28 rounded-full border border-white/20 flex items-center justify-center relative mb-8 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              <div className="absolute inset-2 rounded-full border border-white/10" />
              <div className="absolute inset-5 rounded-full border border-white/5" />
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M2 12c3-5 7-5 10 0s7 5 10 0M2 17c3-5 7-5 10 0s7 5 10 0M2 7c3-5 7-5 10 0s7 5 10 0" />
              </svg>
            </div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Dotify</h1>
            <p className="text-sm text-neutral-400">Выберите, как продолжить</p>
          </div>

          <div className="flex flex-col gap-3 z-10 pb-6 w-full max-w-sm mx-auto">
            <button
              onClick={() => setStep('form')}
              className="w-full py-4 bg-white text-black font-bold rounded-2xl active:scale-98 transition text-center shadow-lg"
            >
              Войти
            </button>
            <button
              onClick={() => setStep('form')}
              className="w-full py-4 bg-neutral-900 border border-white/10 text-white font-bold rounded-2xl active:scale-98 transition text-center"
            >
              Создать аккаунт
            </button>
            <p className="text-[11px] text-neutral-500 text-center mt-2 leading-relaxed">
              Войдя в систему, вы соглашаетесь с нашими <br />Условиями использования и Политикой конфиденциальности
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="z-10 pt-4">
            <button
              onClick={() => setStep('welcome')}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white mb-6 active:scale-90"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-3xl font-black mb-1">С возвращением!</h2>
            <p className="text-sm text-neutral-400 mb-8">Рады тебя видеть снова</p>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Почта или логин"
                className="w-full bg-neutral-900/90 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Пароль"
                  className="w-full bg-neutral-900/90 border border-white/10 rounded-2xl p-4 pr-12 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-neutral-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <span className="text-xs text-neutral-400 text-right cursor-pointer hover:underline">
                Забыли пароль?
              </span>
            </div>
          </div>

          <div className="z-10 pb-6 w-full max-w-sm mx-auto flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 bg-neutral-900 border border-white/10 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 active:scale-95">
                Google
              </button>
              <button className="py-3 bg-neutral-900 border border-white/10 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 active:scale-95">
                Telegram
              </button>
            </div>
            <div className="text-center text-xs text-neutral-500 my-1">или</div>
            <button
              onClick={onLoginSuccess}
              className="w-full py-4 bg-white text-black font-bold rounded-2xl active:scale-98 transition text-center shadow-lg"
            >
              Войти
            </button>
          </div>
        </>
      )}
    </div>
  );
};
