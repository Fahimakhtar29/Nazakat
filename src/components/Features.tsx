import React from 'react';
import { Award, ShieldCheck, Truck, Sparkles, Droplets, Clock, RefreshCw, Gift } from 'lucide-react';
import { BRAND_LOGO_URL } from '../constants/brand';

export const Features: React.FC = () => {
  const pillars = [
    {
      icon: Droplets,
      title: '100% Pure & Alcohol-Free Ittars',
      description: 'Made using authentic copper stills in Kannauj and Mysore. 100% pure natural oil, completely safe for skin and daily puja.',
    },
    {
      icon: Clock,
      title: '24+ Hours Super Long Lasting',
      description: 'Pure oil formulations that bond with your skin and clothes, staying fresh and fragrant all day and night.',
    },
    {
      icon: Sparkles,
      title: 'Pure Mysore & Kannauj Ingredients',
      description: 'Authentic Mysore Sandalwood, Pampore Kashmiri Saffron, Kannauj Pink Rose, and Assam Oud extracted directly from source.',
    },
    {
      icon: Truck,
      title: 'FREE Express Shipping in India',
      description: 'Fast, secure delivery across India within 2-3 days in protective luxury gift packaging.',
    },
    {
      icon: Gift,
      title: '2 FREE Sample Vials With Every Order',
      description: 'Get 2 free sample bottles with every purchase so you can discover new royal scents easily.',
    },
    {
      icon: RefreshCw,
      title: 'Easy 7-Day Replacement Guarantee',
      description: 'If you face any issue with your order, enjoy quick and friendly 7-day replacements.',
    },
  ];

  return (
    <section className="py-16 bg-[#0B0B0B] border-b border-[#D4AF37]/30 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.12)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3 flex flex-col items-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4AF37] text-[#F5D77F] text-xs font-bold uppercase tracking-widest shadow-md backdrop-blur-md">
            <img
              src={BRAND_LOGO_URL}
              onError={(e) => {
                e.currentTarget.src = '/brand_logo.png';
              }}
              alt="NAZAKAT Emblem"
              className="w-6 h-6 object-cover rounded-full border border-[#D4AF37] bg-white p-0.5"
              referrerPolicy="no-referrer"
            />
            <span>Our Nawabi Royal Commitments</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl text-white font-extrabold tracking-wide drop-shadow-md">
            Why Choose <span className="text-[#F5D77F]">NAZAKAT</span> Perfumes?
          </h2>

          <p className="font-cormorant text-base sm:text-lg text-amber-100/90 italic font-medium">
            An Essence of Nawabi Adab — Pure Indian heritage perfumes made simple, authentic, and affordable for everyone.
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#181818] via-[#121212] to-[#0E0E0E] border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all duration-300 group hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between relative overflow-hidden"
              >
                {/* Decorative Subtle Corner Glow */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#D4AF37]/25 transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/60 flex items-center justify-center text-[#F5D77F] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Prominent NAZAKAT Brand Logo Badge on Feature Card */}
                    <div className="flex items-center gap-2 bg-white/95 px-2.5 py-1 rounded-full border border-[#D4AF37] shadow-sm">
                      <img
                        src={BRAND_LOGO_URL}
                        onError={(e) => {
                          e.currentTarget.src = '/brand_logo.png';
                        }}
                        alt="NAZAKAT Logo"
                        className="w-5 h-5 object-cover rounded-full border border-[#B8860B] bg-white p-0.5"
                        referrerPolicy="no-referrer"
                      />
                      <span className="font-cinzel text-[10px] font-black tracking-wider text-black">
                        NAZAKAT
                      </span>
                    </div>
                  </div>

                  <h3 className="font-cinzel text-lg text-amber-100 font-extrabold mb-2 group-hover:text-[#F5D77F] transition-colors tracking-wide">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-sans font-bold tracking-wider text-[#D4AF37]">
                  <span>NAZAKAT Guarantee #0{idx + 1}</span>
                  <span className="font-cormorant italic text-xs text-amber-200/80">Pure & Authentic</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
