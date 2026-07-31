import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCw, Sparkles, Check, Gift, Layers, ShieldCheck } from 'lucide-react';
import { Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface Interactive3DBottleViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCurrency: Currency;
  onAddToCart: (engravingText?: string) => void;
}

export const Interactive3DBottleViewerModal: React.FC<Interactive3DBottleViewerModalProps> = ({
  isOpen,
  onClose,
  activeCurrency,
  onAddToCart,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [engravingText, setEngravingText] = useState('');
  const [activeTab, setActiveTab] = useState<'3d' | 'box' | 'engrave'>('3d');
  const [liquidLevel, setLiquidLevel] = useState(90);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    // Simple rotation shift based on movement
    setRotationAngle((prev) => (prev + 15) % 360);
  };

  const handleAddToCartWithEngraving = () => {
    setIsAdded(true);
    onAddToCart(engravingText || undefined);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="relative w-full max-w-4xl bg-[#121212] border border-[#D4AF37]/50 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden text-[#F8F6F2] grid grid-cols-1 lg:grid-cols-12 max-h-[92vh] overflow-y-auto"
        >
          {/* Header Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#1A1A1A] text-stone-400 hover:text-[#D4AF37] border border-stone-800 hover:border-[#D4AF37] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: 360° Interactive Canvas */}
          <div
            onMouseDown={handleDrag}
            className="lg:col-span-7 bg-radial from-[#1E1B15] via-[#0E0E0E] to-[#0B0B0B] p-6 sm:p-10 flex flex-col items-center justify-between relative min-h-[380px] lg:min-h-[520px] select-none border-b lg:border-b-0 lg:border-r border-[#D4AF37]/20"
          >
            {/* Top Indicator */}
            <div className="w-full flex items-center justify-between text-xs font-serif uppercase tracking-widest text-[#D4AF37]">
              <span className="flex items-center gap-1.5 bg-[#1C1A14] px-3 py-1 rounded-full border border-[#D4AF37]/40 shadow-inner">
                <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                <span>360° Interactive Studio Shot</span>
              </span>
              <span className="text-stone-400 font-sans font-semibold">Lucknow Flagship</span>
            </div>

            {/* Central Bottle Render with Rotation */}
            <div className="relative my-auto flex items-center justify-center py-6 w-full cursor-grab active:cursor-grabbing">
              {/* Backlight Ambient Glow */}
              <div className="absolute w-64 h-64 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

              {/* Gold Wall Emblem in Background */}
              <div className="absolute opacity-20 w-56 h-56 rounded-full border-2 border-[#D4AF37] flex items-center justify-center pointer-events-none animate-pulse">
                <div className="text-center font-serif text-xs text-[#D4AF37] tracking-widest">
                  <div>عِطْرِ نَزَاکَت</div>
                  <div className="text-[9px] uppercase font-cinzel">ESTD. 2026</div>
                  <div className="text-[8px] uppercase">Lucknow • India</div>
                </div>
              </div>

              {/* Bottle Representation Container */}
              <motion.div
                animate={{ rotateY: rotationAngle }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="relative z-10 flex flex-col items-center justify-center p-4"
              >
                {/* Matte Brushed-Gold Cap */}
                <div className="w-14 h-10 rounded-t-lg bg-gradient-to-r from-[#A8821F] via-[#F5D77F] to-[#8C6D31] border-b-2 border-[#8C6D31] shadow-[0_4px_15px_rgba(212,175,55,0.4)] flex items-center justify-center relative">
                  <div className="w-8 h-1 bg-white/40 rounded-full" />
                </div>

                {/* Octagonal Clear Glass Perfume Bottle */}
                <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-b-xl border-2 border-[#D4AF37]/80 bg-gradient-to-b from-white/10 via-amber-500/10 to-amber-900/30 backdrop-blur-md p-3 flex flex-col justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.2)] overflow-hidden">
                  {/* Liquid Amber Level */}
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#8C5200] via-[#D4AF37] to-[#F5D77F]/60 transition-all duration-500"
                    style={{ height: `${liquidLevel}%` }}
                  >
                    <div className="w-full h-2 bg-white/30 animate-pulse" />
                  </div>

                  {/* Gold Foil Label */}
                  <div className="relative z-10 w-full my-auto bg-[#0B0B0B]/90 border border-[#D4AF37] p-2.5 rounded text-center shadow-xl backdrop-blur-sm">
                    <span className="font-serif text-lg text-[#F5D77F] block font-bold tracking-widest drop-shadow">
                      عِطْرِ نَزَاکَت
                    </span>
                    <span className="font-cinzel text-xs font-bold text-[#D4AF37] tracking-[0.2em] block uppercase mt-0.5">
                      NAZAKAT
                    </span>
                    <span className="text-[9px] text-stone-300 font-cormorant italic block">
                      An Essence of Nawabi Adab
                    </span>

                    {/* Custom Engraving Gold Text Display */}
                    {engravingText && (
                      <div className="mt-1.5 pt-1 border-t border-[#D4AF37]/40 text-[10px] font-serif text-[#F5D77F] tracking-wider uppercase font-bold truncate">
                        ✨ {engravingText}
                      </div>
                    )}

                    <span className="text-[8px] text-[#D4AF37] font-sans font-semibold block tracking-widest uppercase mt-1">
                      Lucknow • India
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Drag helper hint */}
            <div className="w-full flex items-center justify-between text-xs text-stone-400 font-sans">
              <span>Click / Drag to rotate bottle (360°)</span>
              <button
                onClick={() => setRotationAngle((prev) => prev + 45)}
                className="text-[#D4AF37] hover:underline cursor-pointer flex items-center gap-1 font-semibold"
              >
                <RotateCw className="w-3 h-3" /> Rotate +45°
              </button>
            </div>
          </div>

          {/* Right Column: Customization & Ordering */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#121212]">
            <div>
              {/* Brand Title */}
              <div className="space-y-1">
                <span className="text-xs text-[#D4AF37] uppercase font-serif tracking-[0.25em] block">
                  عِطْرِ نَزَاکَت • Flagship Royal Edition
                </span>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F8F6F2]">
                  NAZAKAT
                </h2>
                <p className="font-cormorant text-[#D4AF37] italic text-base">
                  An Essence of Nawabi Adab
                </p>
              </div>

              {/* Price & Volume */}
              <div className="mt-4 flex items-center justify-between border-y border-stone-800 py-3">
                <div>
                  <span className="text-xs text-stone-400 block font-sans">Special Price (12ml Tola)</span>
                  <span className="font-serif text-2xl font-bold text-[#F5D77F]">
                    {formatPrice(58, activeCurrency)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-400 font-medium block">In Stock • Ships Free</span>
                  <span className="text-[11px] text-stone-400 font-sans">Alcohol-Free Pure Oil</span>
                </div>
              </div>

              {/* Tab Navigation for Studio Details */}
              <div className="flex border-b border-stone-800 mt-5 text-xs font-serif font-bold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('3d')}
                  className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
                    activeTab === '3d'
                      ? 'border-[#D4AF37] text-[#D4AF37]'
                      : 'border-transparent text-stone-500 hover:text-stone-300'
                  }`}
                >
                  Bottle Specs
                </button>
                <button
                  onClick={() => setActiveTab('engrave')}
                  className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
                    activeTab === 'engrave'
                      ? 'border-[#D4AF37] text-[#D4AF37]'
                      : 'border-transparent text-stone-500 hover:text-stone-300'
                  }`}
                >
                  Free Gold Engraving
                </button>
                <button
                  onClick={() => setActiveTab('box')}
                  className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
                    activeTab === 'box'
                      ? 'border-[#D4AF37] text-[#D4AF37]'
                      : 'border-transparent text-stone-500 hover:text-stone-300'
                  }`}
                >
                  Gift Box
                </button>
              </div>

              {/* Tab Content */}
              <div className="py-4 text-xs space-y-3">
                {activeTab === '3d' && (
                  <div className="space-y-2.5 text-stone-300 leading-relaxed font-sans font-medium">
                    <p>
                      <strong>Octagonal Crystal Glass:</strong> Bespoke heavy octagonal glass cut to capture and reflect golden daylight.
                    </p>
                    <p>
                      <strong>Matte Brushed-Gold Cap:</strong> Solid metallic cap engraved with the Royal Lucknow minaret seal.
                    </p>
                    <p>
                      <strong>Gold Foil Calligraphy:</strong> Stamped with Urdu calligraphy <em className="text-[#D4AF37] font-serif font-bold">عِطْرِ نَزَاکَت</em>.
                    </p>
                  </div>
                )}

                {activeTab === 'engrave' && (
                  <div className="space-y-3">
                    <p className="text-stone-300 font-sans">
                      Add a custom name or initials engraved in gold foil directly on the bottle label:
                    </p>
                    <div>
                      <label className="block text-[11px] text-[#D4AF37] uppercase font-serif tracking-wider mb-1">
                        Name / Initials (Max 18 chars)
                      </label>
                      <input
                        type="text"
                        maxLength={18}
                        value={engravingText}
                        onChange={(e) => setEngravingText(e.target.value)}
                        placeholder="e.g. Nawab Zafar Ali"
                        className="w-full bg-[#181818] border border-[#D4AF37]/50 rounded-lg px-3 py-2 text-sm text-[#F5D77F] focus:outline-none focus:border-[#D4AF37] font-serif tracking-wider"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'box' && (
                  <div className="p-3 rounded-lg bg-[#181818] border border-[#D4AF37]/30 space-y-2">
                    <div className="flex items-center gap-2 text-[#D4AF37] font-serif font-bold">
                      <Gift className="w-4 h-4 text-[#D4AF37]" />
                      <span>Matte-Black Rigid Presentation Gift Box</span>
                    </div>
                    <p className="text-stone-300 text-[11px] leading-relaxed">
                      Accompanied by a luxury matte-black rigid presentation box embossed with gold foil royal crown crest, <strong className="text-[#D4AF37]">NAZAKAT</strong> logo, Nawabi Musk 12ml badge, and velvet lining.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2 border-t border-stone-800">
              <button
                onClick={handleAddToCartWithEngraving}
                disabled={isAdded}
                className="w-full py-3.5 btn-gold rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest cursor-pointer shadow-lg"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-[#0B0B0B]" />
                    <span>Added to Royal Cart!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#0B0B0B]" />
                    <span>Add NAZAKAT To Cart ({formatPrice(58, activeCurrency)})</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-stone-500 font-sans flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                100% Pure Alcohol-Free Oil • Handcrafted in Lucknow
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
