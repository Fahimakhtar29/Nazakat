import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, ShieldCheck, Award, Flame, Leaf } from 'lucide-react';
import { BRAND_LOGO_URL } from '../constants/brand';

export const HeritageStory: React.FC = () => {
  return (
    <section id="heritage-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] text-[#F8F6F2] relative overflow-hidden border-t border-[#D4AF37]/20">
      {/* Background Decorative Archway Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Section Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-serif uppercase tracking-[0.35em] text-[#D4AF37] block font-bold">
            The Royal Legacy of Awadh
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-[#F8F6F2] tracking-wide">
            An Essence of Nawabi Adab
          </h2>
          <p className="font-cormorant text-stone-300 text-lg sm:text-xl italic leading-relaxed">
            Where Lucknowi hospitality, Mughal architectural grandeur, and 200-year-old copper still distillation unite to create NAZAKAT.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-2xl relative group hover:border-[#D4AF37] transition-all space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#1F1B12] border border-[#D4AF37]/60 flex items-center justify-center text-[#F5D77F] font-serif font-bold text-xl">
              👑
            </div>
            <h3 className="font-cinzel text-xl font-bold text-[#F8F6F2]">
              Lucknowi Adab & Culture
            </h3>
            <p className="font-sans text-xs text-stone-300 leading-relaxed font-medium">
              In the royal courts of the Nawabs of Awadh, fragrance was not merely worn—it was a gesture of respect, warmth, and refined hospitality. NAZAKAT honors this timeless etiquette.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-2xl relative group hover:border-[#D4AF37] transition-all space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#1F1B12] border border-[#D4AF37]/60 flex items-center justify-center text-[#F5D77F] font-serif font-bold text-xl">
              🔥
            </div>
            <h3 className="font-cinzel text-xl font-bold text-[#F8F6F2]">
              Copper Deg & Bhapka Still
            </h3>
            <p className="font-sans text-xs text-stone-300 leading-relaxed font-medium">
              Hand-hammered copper cauldrons (Degs) are sealed with clay and heated over wood fire. Aromatic vapors travel down bamboo pipes into receiver pots immersed in cold water.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-2xl relative group hover:border-[#D4AF37] transition-all space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#1F1B12] border border-[#D4AF37]/60 flex items-center justify-center text-[#F5D77F] font-serif font-bold text-xl">
              🌱
            </div>
            <h3 className="font-cinzel text-xl font-bold text-[#F8F6F2]">
              100% Alcohol-Free Pure Oil
            </h3>
            <p className="font-sans text-xs text-stone-300 leading-relaxed font-medium">
              Absorbed entirely into pure Mysore Sandalwood oil base. Never diluted with synthetic solvents, phthalates, or alcohol. Safe for sensitive skin and sacred occasions.
            </p>
          </div>
        </div>

        {/* Feature Banner: Traditional Kupis & Aging Process */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#181818] via-[#12100C] to-[#181818] border border-[#D4AF37]/50 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-serif uppercase text-[#D4AF37] tracking-widest font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              Authentic Awadhi Craftsmanship
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#F8F6F2]">
              Aged in Traditional Leather Kupis
            </h3>
            <p className="font-sans text-stone-300 text-xs sm:text-sm leading-relaxed font-medium">
              After steam distillation, NAZAKAT attar is poured into handmade camel leather pouches known as <em className="text-[#F5D77F] font-serif">Kupis</em>. The leather breathes, allowing residual moisture to naturally evaporate while locking in rich essential fragrance oils for decades.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs font-serif font-semibold text-[#F5D77F]">
              <span>✓ 200+ Year Old Secret Recipes</span>
              <span>•</span>
              <span>✓ Zero Alcohol, 100% Concentrated Oil</span>
              <span>•</span>
              <span>✓ Hand-poured in Lucknow</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-8 rounded-2xl bg-[#0F0F0F] border border-[#D4AF37]/50 text-center space-y-4 shadow-2xl flex flex-col items-center">
              <img
                src={BRAND_LOGO_URL}
                onError={(e) => {
                  e.currentTarget.src = '/brand_logo.png';
                }}
                alt="NAZAKAT Royal Seal"
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.4)] bg-white p-1"
                referrerPolicy="no-referrer"
              />
              <span className="font-serif text-3xl text-[#F5D77F] font-bold block">
                عِطْرِ نَزَاکَت
              </span>
              <p className="font-cinzel text-lg text-[#D4AF37] tracking-widest uppercase font-bold">
                ESTD. 2026 • LUCKNOW
              </p>
              <p className="text-stone-400 font-sans text-xs">
                Handcrafted by Hereditary Royal Perfumers (Attars) of Awadh
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
