import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { BRAND_LOGO_URL } from '../constants/brand';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        return prev + 12;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.03 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] bg-[#0B0B0B] text-[#F8F6F2] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
      >
        {/* Background Ambient Gold Radial Glow */}
        <div className="absolute inset-0 bg-radial from-[#D4AF37]/15 via-[#0B0B0B]/80 to-[#0B0B0B] pointer-events-none" />

        {/* Floating Gold Particles Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#D4AF37] blur-[1px] animate-pulse"
              style={{
                top: `${(i * 17) % 100}%`,
                left: `${(i * 23) % 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + (i % 4)}s`,
              }}
            />
          ))}
        </div>

        {/* Royal Crest / Logo Container */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border-3 border-[#D4AF37] p-1.5 bg-[#141414] shadow-[0_0_70px_rgba(212,175,55,0.5)] flex items-center justify-center">
              <img
                src={BRAND_LOGO_URL}
                onError={(e) => {
                  e.currentTarget.src = '/brand_logo.png';
                }}
                alt="NAZAKAT Royal Emblem"
                className="w-full h-full object-cover rounded-full bg-white p-1"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -inset-2 rounded-full border border-[#D4AF37]/30 animate-spin-slow pointer-events-none" />
          </motion.div>

          {/* Urdu Calligraphy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-1"
          >
            <span className="font-serif text-3xl sm:text-4xl text-[#F5D77F] font-bold tracking-widest block drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
              عِطْرِ نَزَاکَت
            </span>
            <h1 className="font-cinzel text-3xl sm:text-5xl font-black tracking-[0.25em] text-[#F8F6F2] uppercase drop-shadow-[0_2px_15px_rgba(212,175,55,0.5)]">
              NAZAKAT
            </h1>
            <p className="font-cormorant text-base sm:text-xl text-[#F5D77F] italic font-bold tracking-[0.2em] mt-1">
              An Essence of Nawabi Adab
            </p>
          </motion.div>

          <p className="text-xs text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold">
            Lucknow • India
          </p>

          {/* Progress Bar */}
          <div className="w-48 sm:w-64 h-1 bg-stone-900 rounded-full overflow-hidden border border-[#D4AF37]/30 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#8C6D31] via-[#D4AF37] to-[#F5D77F] shadow-[0_0_15px_#D4AF37]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#D4AF37] font-serif tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span>Entering Royal Awadhi Court</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
