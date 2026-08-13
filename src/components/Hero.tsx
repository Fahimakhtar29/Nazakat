import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Award, Compass, Layers } from 'lucide-react';
import { Currency } from '../types';
import { formatPrice } from '../utils/currency';
import { BRAND_LOGO_URL } from '../constants/brand';

interface HeroProps {
  onExploreClick: () => void;
  onOpenAIScentAdvisor: () => void;
  onOpenQuiz: () => void;
  onOpenLayeringTool: () => void;
  activeCurrency: Currency;
}

const HERO_SLIDES = [
  {
    id: 1,
    title: 'NAZAKAT - Nawabi Musk',
    subtitle: 'AN ESSENCE OF NAWABI ADAB • LUCKNOW • INDIA',
    description: 'An octagonal crystal glass attar bottle filled with rich amber-gold liquid and crowned with a matte brushed-gold cap. Features ornate Urdu calligraphy "عِطْرِ نَزَاکَت" and arrives in a matte-black presentation gift box.',
    priceUSD: 58,
    badge: '👑 Flagship Lucknow Awadhi Attar',
    bgImage: 'https://lh3.googleusercontent.com/d/1m8VCC4Eys8GP0GDTXSsJTgyh-jRm1Jqx',
    bottleImage: 'https://lh3.googleusercontent.com/d/1m8VCC4Eys8GP0GDTXSsJTgyh-jRm1Jqx',
    notes: ['Nawabi Musk', 'Kashmiri Saffron', 'Awadhi Gulab', 'Mysore Sandalwood'],
  },
  {
    id: 2,
    title: 'Nazakat - Nawabi Ameer Al Shan',
    subtitle: '100% PURE ALCOHOL-FREE SANDALWOOD ITTAR',
    description: 'Real Mysore sandalwood distilled in traditional copper vessels in Kannauj. Calm, sweet, and comforting fragrance that lasts 24+ hours on skin and clothes.',
    priceUSD: 35,
    badge: '100% Pure Sandalwood Oil',
    bgImage: 'https://lh3.googleusercontent.com/d/1RE9cf83Nl8s5laJK04wwB4XNxpzvbrol',
    bottleImage: 'https://lh3.googleusercontent.com/d/1RE9cf83Nl8s5laJK04wwB4XNxpzvbrol',
    notes: ['Mysore Sandalwood', 'Cardamom Dew', 'White Musk'],
  },
  {
    id: 3,
    title: 'NAZAKAT- Nawabi Hurain',
    subtitle: 'PAMPOR SAFFRON & KANNAUJ PINK ROSE',
    description: 'Handpicked Kashmiri saffron filaments blended with sweet Kannauj pink rose petals. Smells like a royal Indian palace flower garden.',
    priceUSD: 42,
    badge: 'Best Selling Royal Scent',
    bgImage: 'https://lh3.googleusercontent.com/d/1P1HMwnkBa_8-lIJTGwntNjXXsh_Um3Vk',
    bottleImage: 'https://lh3.googleusercontent.com/d/1P1HMwnkBa_8-lIJTGwntNjXXsh_Um3Vk',
    notes: ['Kashmiri Saffron', 'Kannauj Rose', 'Golden Amber'],
  },
  {
    id: 4,
    title: 'NAZAKAT-Nawabi Mukhallat Al Badar',
    subtitle: '30-YEAR AGED WILD ASSAM AGARWOOD',
    description: 'Precious wild Assam agarwood aged 30 years in wooden barrels. Deep, rich, woody scent that lasts up to 36 hours on clothes.',
    priceUSD: 75,
    badge: 'Shahi Heritage Special',
    bgImage: 'https://lh3.googleusercontent.com/d/1LPtEhwoiSwFfM-se4YqeKt2uzctznBqY',
    bottleImage: 'https://lh3.googleusercontent.com/d/1LPtEhwoiSwFfM-se4YqeKt2uzctznBqY',
    notes: ['Assam Aged Oud', 'Frankincense', 'Earthy Patchouli'],
  },
];

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenAIScentAdvisor,
  onOpenQuiz,
  activeCurrency,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlideIndex];

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#FAF6EE] text-stone-900 border-b border-[#D4AF37]/30 select-none">
      {/* Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.18, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none filter saturate-125 mix-blend-multiply"
          style={{
            backgroundImage: `url('${slide.bgImage}')`,
          }}
        />
      </AnimatePresence>

      {/* Light Royal Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EE] via-[#FAF6EE]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6EE] via-transparent to-[#FAF6EE]/50 z-10 pointer-events-none" />

      {/* Glowing Gold Backdrop Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-[130px] pointer-events-none z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Typography & CTAs in Simple Language */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border-2 border-[#D4AF37] text-stone-900 text-xs sm:text-sm uppercase tracking-wider font-extrabold shadow-lg backdrop-blur-md"
            >
              <img
                src={BRAND_LOGO_URL}
                onError={(e) => {
                  e.currentTarget.src = '/brand_logo.png';
                }}
                alt="NAZAKAT Brand Logo"
                className="w-7 h-7 object-cover rounded-full border border-[#B8860B] bg-white p-0.5 shadow"
                referrerPolicy="no-referrer"
              />
              <span className="font-cinzel text-stone-950 font-black tracking-widest">NAZAKAT</span>
              <span className="text-[#8C6D31] font-cormorant italic text-xs font-bold uppercase border-l border-[#D4AF37]/50 pl-2">An Essence of Nawabi Adab</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF0DC] border border-[#D4AF37]/50 text-stone-900 text-xs font-bold shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>{slide.badge}</span>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8 }}
              className="space-y-3"
            >
              <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-wide text-stone-900 leading-tight">
                <span className="bg-gradient-to-r from-stone-900 via-[#8C6D31] to-[#B8860B] bg-clip-text text-transparent">
                  {slide.title}
                </span>
              </h1>

              <p className="font-sans text-xs sm:text-sm uppercase tracking-widest text-[#B8860B] font-bold">
                {slide.subtitle}
              </p>

              <p className="font-sans text-stone-700 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                {slide.description}
              </p>

              {/* Fragrance Notes Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {slide.notes.map((note) => (
                  <span
                    key={note}
                    className="text-xs bg-white/90 border border-[#D4AF37]/50 text-stone-800 px-3 py-1 rounded-full font-serif font-medium shadow-sm"
                  >
                    🌸 {note}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#f1d279] to-[#B8860B] text-stone-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-[0_4px_20px_rgba(184,134,11,0.3)] hover:shadow-[0_6px_30px_rgba(184,134,11,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All Perfumes</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAIScentAdvisor}
              className="px-5 py-3.5 bg-stone-900 border border-stone-800 hover:bg-black text-amber-200 font-bold uppercase tracking-wider text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Ask AI Helper</span>
            </button>

            <button
              onClick={onOpenQuiz}
              className="px-5 py-3.5 bg-white border border-[#D4AF37]/50 hover:border-[#B8860B] text-stone-800 font-bold uppercase tracking-wider text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Compass className="w-4 h-4 text-[#B8860B]" />
              <span>30-Sec Scent Quiz</span>
            </button>
          </div>

          {/* Trust Highlights in Easy Language */}
          <div className="pt-6 border-t border-stone-300/80 flex flex-wrap gap-5 text-xs text-stone-700 font-sans font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
              <span>100% Alcohol-Free Pure Ittars Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#B8860B]" />
              <span>Distilled in Kannauj & Mysore</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#B8860B]" />
              <span>Lasts 24+ Hours</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bottle Card Showcase */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm aspect-[3/4] rounded-2xl p-6 bg-white/95 border-2 border-[#D4AF37]/60 shadow-[0_20px_50px_rgba(184,134,11,0.15)] backdrop-blur-xl group overflow-hidden flex flex-col justify-between"
            >
              {/* Glass Reflection Highlight */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-full blur-2xl pointer-events-none" />

              <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] bg-white p-0.5 shadow-md flex items-center justify-center">
                    <img
                      src={BRAND_LOGO_URL}
                      onError={(e) => {
                        e.currentTarget.src = '/brand_logo.png';
                      }}
                      alt="NAZAKAT Seal"
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#B8860B] bg-[#FAF4EC] px-2.5 py-1 rounded-md border border-[#D4AF37]/40 shadow-sm">
                    Royal Special #{slide.id}
                  </span>
                </div>
                <span className="font-serif text-xl font-bold text-[#B8860B]">
                  {formatPrice(slide.priceUSD, activeCurrency)}
                </span>
              </div>

              {/* Bottle Image */}
              <div className="relative my-auto py-4 flex justify-center items-center">
                <div className="absolute w-48 h-48 bg-[#FAF0DC] rounded-full blur-2xl" />
                <img
                  src={slide.bottleImage}
                  alt={slide.title}
                  className="relative z-10 max-h-64 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="pt-3 border-t border-[#D4AF37]/30 text-center z-10">
                <h4 className="font-serif text-lg font-bold text-stone-900">{slide.title}</h4>
                <p className="text-xs text-[#B8860B] font-sans font-semibold mt-0.5">Free Name Engraving Included</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicator Controls */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 transition-all rounded-full cursor-pointer ${
                  currentSlideIndex === idx ? 'w-8 bg-[#B8860B]' : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
