import React, { useState } from 'react';
import { Layers, X, Check, ShoppingBag } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface LayeringToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  activeCurrency: Currency;
  onAddBundleToCart: (base: Product, accent: Product) => void;
}

export const LayeringToolModal: React.FC<LayeringToolModalProps> = ({
  isOpen,
  onClose,
  products,
  activeCurrency,
  onAddBundleToCart,
}) => {
  if (!isOpen) return null;

  const [baseId, setBaseId] = useState<string>(products[0]?.id || '');
  const [accentId, setAccentId] = useState<string>(products[1]?.id || '');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const baseProduct = products.find((p) => p.id === baseId) || products[0];
  const accentProduct = products.find((p) => p.id === accentId) || products[1];

  const combinedOriginalUSD = baseProduct.priceUSD + accentProduct.priceUSD;
  const bundlePriceUSD = Math.round(combinedOriginalUSD * 0.85);

  const handleAddBundle = () => {
    onAddBundleToCart(baseProduct, accentProduct);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-4xl bg-[#0E0E0E] border border-[#D4AF37]/50 rounded-2xl shadow-[0_25px_60px_rgba(212,175,55,0.2)] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#080808] border-b border-[#D4AF37]/30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                Fragrance Mix & Match Helper
              </h3>
              <p className="text-[11px] text-amber-200 font-sans">Combine 2 Perfumes & Save 15%</p>
            </div>
          </div>

          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Top Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Base */}
            <div className="p-5 rounded-xl bg-[#141414] border border-[#D4AF37]/30 space-y-3">
              <span className="text-[11px] font-bold uppercase text-[#D4AF37] block">
                STEP 1: PICK BASE ITTAR / OIL
              </span>

              <select
                value={baseId}
                onChange={(e) => setBaseId(e.target.value)}
                className="w-full bg-[#080808] border border-zinc-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.family}) - ₹{Math.round(p.priceUSD * 83)}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-3 pt-1">
                <img
                  src={baseProduct.images[0]}
                  alt=""
                  className="w-16 h-16 object-contain rounded bg-[#0A0A0A] p-1 border border-zinc-800"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h5 className="font-serif font-bold text-amber-100 text-sm">{baseProduct.name}</h5>
                  <p className="text-xs text-zinc-400">{baseProduct.subtitle}</p>
                  <p className="text-[11px] text-[#D4AF37] mt-0.5">{baseProduct.concentration}</p>
                </div>
              </div>
            </div>

            {/* Accent */}
            <div className="p-5 rounded-xl bg-[#141414] border border-[#D4AF37]/30 space-y-3">
              <span className="text-[11px] font-bold uppercase text-[#D4AF37] block">
                STEP 2: PICK TOP FLORAL SPRAY
              </span>

              <select
                value={accentId}
                onChange={(e) => setAccentId(e.target.value)}
                className="w-full bg-[#080808] border border-zinc-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.family}) - ₹{Math.round(p.priceUSD * 83)}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-3 pt-1">
                <img
                  src={accentProduct.images[0]}
                  alt=""
                  className="w-16 h-16 object-contain rounded bg-[#0A0A0A] p-1 border border-zinc-800"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h5 className="font-serif font-bold text-amber-100 text-sm">{accentProduct.name}</h5>
                  <p className="text-xs text-zinc-400">{accentProduct.subtitle}</p>
                  <p className="text-[11px] text-[#D4AF37] mt-0.5">{accentProduct.concentration}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Combination Preview */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181818] to-[#0A0A0A] border border-[#D4AF37]/40 space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#D4AF37]/20 pb-3 gap-2">
              <div>
                <span className="text-[11px] uppercase text-[#D4AF37] font-bold">
                  YOUR CUSTOM COMBINATION
                </span>
                <h4 className="font-serif text-xl font-bold text-white">
                  {baseProduct.name} + {accentProduct.name}
                </h4>
              </div>

              <div className="bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] px-3 py-1 rounded text-xs font-bold">
                100% Perfect Match
              </div>
            </div>

            {/* Notes Combined */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#080808] p-3 rounded-xl border border-zinc-800">
                <span className="text-zinc-400 font-bold block mb-1">FIRST SMELL (TOP NOTES)</span>
                <div className="flex flex-wrap gap-1">
                  {baseProduct.notes.top.concat(accentProduct.notes.top).slice(0, 4).map((n) => (
                    <span key={n} className="bg-zinc-900 text-amber-200 px-2 py-0.5 rounded text-[10px]">
                      ✦ {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#080808] p-3 rounded-xl border border-zinc-800">
                <span className="text-zinc-400 font-bold block mb-1">MAIN SMELL (HEART)</span>
                <div className="flex flex-wrap gap-1">
                  {baseProduct.notes.heart.concat(accentProduct.notes.heart).slice(0, 4).map((n) => (
                    <span key={n} className="bg-zinc-900 text-amber-200 px-2 py-0.5 rounded text-[10px]">
                      ✦ {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#080808] p-3 rounded-xl border border-zinc-800">
                <span className="text-zinc-400 font-bold block mb-1">LONG LASTING BASE</span>
                <div className="flex flex-wrap gap-1">
                  {baseProduct.notes.base.concat(accentProduct.notes.base).slice(0, 4).map((n) => (
                    <span key={n} className="bg-zinc-900 text-amber-200 px-2 py-0.5 rounded text-[10px]">
                      ✦ {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-zinc-400 font-bold">COMBO BUNDLE PRICE (15% OFF)</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl font-bold text-[#D4AF37]">
                    {formatPrice(bundlePriceUSD, activeCurrency)}
                  </span>
                  <span className="text-xs text-zinc-500 line-through">
                    {formatPrice(combinedOriginalUSD, activeCurrency)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddBundle}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-[#D4AF37] via-[#f1d279] to-[#B8860B] text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" /> Added Combo To Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add Both Bottles (15% Off)
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
