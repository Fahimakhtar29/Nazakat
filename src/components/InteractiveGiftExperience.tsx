import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Sparkles, Check, Heart, Send, Scroll, ShieldCheck } from 'lucide-react';
import { Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface InteractiveGiftExperienceProps {
  activeCurrency: Currency;
  onAddToCart: (giftDetails: { name: string; boxType: string; engraving: string; cardMsg: string; price: number }) => void;
}

export const InteractiveGiftExperience: React.FC<InteractiveGiftExperienceProps> = ({
  activeCurrency,
  onAddToCart,
}) => {
  const [selectedAttar, setSelectedAttar] = useState({
    id: 'nazakat-12ml',
    name: 'NAZAKAT - Nawabi Musk (12ml Tola)',
    priceUSD: 58,
  });

  const [selectedBox, setSelectedBox] = useState<'black-gold' | 'emerald-velvet' | 'royal-ivory'>('black-gold');
  const [engravingName, setEngravingName] = useState('Nawab Zafar');
  const [giftCardMessage, setGiftCardMessage] = useState('With profound Nawabi Adab and warm wishes.');
  const [isAdded, setIsAdded] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  const calculateTotalPrice = () => {
    let base = selectedAttar.priceUSD;
    if (selectedBox === 'emerald-velvet') base += 12;
    if (selectedBox === 'royal-ivory') base += 8;
    return base;
  };

  const handleAddGiftToCart = () => {
    setIsAdded(true);
    onAddToCart({
      name: selectedAttar.name,
      boxType: selectedBox,
      engraving: engravingName,
      cardMsg: giftCardMessage,
      price: calculateTotalPrice(),
    });

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0E0E0E] text-[#F8F6F2] relative overflow-hidden border-t border-[#D4AF37]/20">
      {/* Background Gold Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#D4AF37] block font-bold">
            Bespoke Luxury Gifting
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-[#F8F6F2]">
            Custom Royal Gift Experience
          </h2>
          <p className="font-cormorant text-stone-300 text-lg italic leading-relaxed">
            Personalize your attar box with custom gold foil engraving, rigid presentation boxes, and calligraphic gift notes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Live Customization Preview */}
          <div className="lg:col-span-6 bg-gradient-to-b from-[#181818] via-[#121212] to-[#0A0A0A] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-10 flex flex-col justify-between items-center relative shadow-2xl overflow-hidden min-h-[420px]">
            <div className="w-full flex items-center justify-between text-xs text-[#D4AF37] font-serif uppercase tracking-widest">
              <span>Real-Time Gift Box Preview</span>
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>

            {/* Presentation Box Graphic Representation */}
            <div className="my-auto py-8 text-center relative w-full max-w-sm">
              <div
                className={`p-8 rounded-2xl border-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 space-y-4 ${
                  selectedBox === 'black-gold'
                    ? 'bg-[#0F0F0F] border-[#D4AF37]'
                    : selectedBox === 'emerald-velvet'
                    ? 'bg-[#0B2E24] border-[#D4AF37]'
                    : 'bg-[#F2ECE0] border-[#B8860B] text-stone-900'
                }`}
              >
                {/* Crown Crest */}
                <div className="w-12 h-12 mx-auto rounded-full border border-[#D4AF37]/60 flex items-center justify-center bg-[#0B0B0B]/40">
                  <span className="text-xl">👑</span>
                </div>

                <div className="space-y-1">
                  <span className="font-serif text-2xl font-bold tracking-widest block text-[#F5D77F]">
                    عِطْرِ نَزَاکَت
                  </span>
                  <h3 className="font-cinzel text-xl font-bold tracking-[0.2em] uppercase text-[#D4AF37]">
                    NAZAKAT
                  </h3>
                  <p className="font-cormorant text-xs italic text-stone-300">
                    An Essence of Nawabi Adab • Lucknow
                  </p>
                </div>

                {/* Custom Name Engraving Preview */}
                {engravingName && (
                  <div className="pt-3 border-t border-[#D4AF37]/40">
                    <span className="text-[10px] text-stone-400 font-sans uppercase block tracking-wider">
                      Gold Engraved For:
                    </span>
                    <span className="font-serif text-lg font-bold text-[#F5D77F] tracking-wider block">
                      ✨ {engravingName} ✨
                    </span>
                  </div>
                )}
              </div>

              {/* Gift Card Card Overlay */}
              {giftCardMessage && (
                <div className="mt-4 p-4 rounded-xl bg-[#1A1812] border border-[#D4AF37]/30 text-left font-cormorant text-stone-300 text-sm italic shadow-lg">
                  <span className="text-[10px] uppercase font-sans text-[#D4AF37] not-italic block mb-1">
                    📜 Handwritten Calligraphy Note:
                  </span>
                  &ldquo;{giftCardMessage}&rdquo;
                </div>
              )}
            </div>

            {/* Total Price Footer */}
            <div className="w-full flex items-center justify-between pt-4 border-t border-stone-800 text-sm">
              <span className="text-stone-400 font-sans">Total Customized Box:</span>
              <span className="font-serif text-2xl font-bold text-[#F5D77F]">
                {formatPrice(calculateTotalPrice(), activeCurrency)}
              </span>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-6 bg-[#141414] border border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Box Style Selector */}
              <div>
                <label className="block text-xs font-serif uppercase text-[#D4AF37] tracking-wider mb-2 font-bold">
                  1. Choose Presentation Box
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setSelectedBox('black-gold')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedBox === 'black-gold'
                        ? 'bg-[#1F1F1F] border-[#D4AF37] text-[#F5D77F]'
                        : 'bg-[#181818] border-stone-800 text-stone-400'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-black border border-[#D4AF37] mx-auto mb-1.5" />
                    <span className="font-serif text-xs font-bold block">Matte Black</span>
                    <span className="text-[10px] text-stone-400 font-sans">Standard</span>
                  </button>

                  <button
                    onClick={() => setSelectedBox('emerald-velvet')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedBox === 'emerald-velvet'
                        ? 'bg-[#0D3B2E] border-[#D4AF37] text-[#F5D77F]'
                        : 'bg-[#181818] border-stone-800 text-stone-400'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0D3B2E] border border-[#D4AF37] mx-auto mb-1.5" />
                    <span className="font-serif text-xs font-bold block">Emerald Velvet</span>
                    <span className="text-[10px] text-[#D4AF37] font-sans">+ {formatPrice(12, activeCurrency)}</span>
                  </button>

                  <button
                    onClick={() => setSelectedBox('royal-ivory')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedBox === 'royal-ivory'
                        ? 'bg-[#E8DCC5] border-[#B8860B] text-stone-900'
                        : 'bg-[#181818] border-stone-800 text-stone-400'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#E8DCC5] border border-[#B8860B] mx-auto mb-1.5" />
                    <span className="font-serif text-xs font-bold block">Royal Ivory</span>
                    <span className="text-[10px] text-stone-500 font-sans">+ {formatPrice(8, activeCurrency)}</span>
                  </button>
                </div>
              </div>

              {/* Name Engraving */}
              <div>
                <label className="block text-xs font-serif uppercase text-[#D4AF37] tracking-wider mb-1.5 font-bold">
                  2. Custom Gold Foil Name Engraving
                </label>
                <input
                  type="text"
                  maxLength={22}
                  value={engravingName}
                  onChange={(e) => setEngravingName(e.target.value)}
                  placeholder="Enter recipient name / title"
                  className="w-full bg-[#1A1A1A] border border-[#D4AF37]/50 rounded-xl px-4 py-2.5 text-sm text-[#F5D77F] font-serif focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Handwritten Gift Note */}
              <div>
                <label className="block text-xs font-serif uppercase text-[#D4AF37] tracking-wider mb-1.5 font-bold">
                  3. Personal Message on Royal Card
                </label>
                <textarea
                  rows={3}
                  maxLength={120}
                  value={giftCardMessage}
                  onChange={(e) => setGiftCardMessage(e.target.value)}
                  placeholder="Write your wishes..."
                  className="w-full bg-[#1A1A1A] border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-200 font-sans focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddGiftToCart}
                disabled={isAdded}
                className="w-full py-3.5 btn-gold rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest cursor-pointer shadow-xl"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-[#0B0B0B]" />
                    <span>Gift Box Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4 text-[#0B0B0B]" />
                    <span>Add Bespoke Gift Box To Cart ({formatPrice(calculateTotalPrice(), activeCurrency)})</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setInquirySent(!inquirySent)}
                  className="text-xs text-[#D4AF37] hover:underline font-serif tracking-wider cursor-pointer"
                >
                  Need Wedding Favours or Corporate Bulk Orders? Click here.
                </button>

                {inquirySent && (
                  <div className="mt-2 p-3 rounded-lg bg-[#0D3B2E]/60 border border-[#D4AF37]/40 text-xs text-stone-200">
                    👑 For Royal Wedding Favours & Corporate Gifting, contact our Nawabi Concierge via WhatsApp at <strong className="text-[#F5D77F]">+91 98765 43210</strong>.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
