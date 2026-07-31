import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Check,
  RotateCw,
  Sparkles,
  Clock,
  Layers,
} from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface ProductDetailModalProps {
  product: Product | null;
  activeCurrency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product, volumeMl: number, engravingText?: string) => void;
  onClose: () => void;
  allProducts: Product[];
  onOpenLayeringTool: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  activeCurrency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onClose,
  allProducts,
  onOpenLayeringTool,
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVolume, setSelectedVolume] = useState<number>(product.selectedVolumeMl || 12);
  const [engravingText, setEngravingText] = useState('');
  const [isEngravingEnabled, setIsEngravingEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState<'pyramid' | 'story' | 'ingredients' | 'reviews'>('pyramid');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [is360Active, setIs360Active] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Volume pricing calculation
  const volumePriceMultiplier = selectedVolume === 12 ? 0.7 : selectedVolume === 50 ? 1.0 : 1.8;
  const finalPriceUSD = Math.round(product.priceUSD * volumePriceMultiplier + (isEngravingEnabled ? 3 : 0));

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handle360Drag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!is360Active) return;
    setRotationAngle((prev) => (prev + e.movementX * 2) % 360);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!is360Active || e.touches.length === 0) return;
    const currentX = e.touches[0].clientX;
    if (touchStartX !== null) {
      const deltaX = currentX - touchStartX;
      setRotationAngle((prev) => (prev + deltaX * 2) % 360);
    }
    setTouchStartX(currentX);
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedVolume, isEngravingEnabled ? engravingText : undefined);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const pairingProduct = allProducts.find((p) => p.id !== product.id && p.family !== product.family) || allProducts[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-5xl bg-[#0F0F0F] border border-[#D4AF37]/50 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-[#080808] border-b border-[#D4AF37]/30 px-6 py-4 flex items-center justify-between text-zinc-200">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D4AF37]">
            <Sparkles className="w-4 h-4" />
            <span>SHAHI SUGANDH • AUTHENTIC INDIAN HERITAGE COLLECTION</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-800 hover:bg-[#D4AF37] hover:text-black text-zinc-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Image & 360 Box */}
            <div className="lg:col-span-6 space-y-4">
              <div
                onMouseDown={() => setIs360Active(true)}
                onMouseUp={() => setIs360Active(false)}
                onMouseLeave={() => setIs360Active(false)}
                onMouseMove={handle360Drag}
                onTouchStart={(e) => {
                  setIs360Active(true);
                  if (e.touches.length > 0) setTouchStartX(e.touches[0].clientX);
                }}
                onTouchEnd={() => {
                  setIs360Active(false);
                  setTouchStartX(null);
                }}
                onTouchMove={handleTouchMove}
                className="relative aspect-[4/5] bg-[#070707] border border-[#D4AF37]/30 rounded-xl overflow-hidden p-6 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
              >
                {/* 360 Button */}
                <button
                  onClick={() => setIs360Active(!is360Active)}
                  className={`absolute top-3 left-3 z-20 px-3 py-1.5 rounded text-[11px] font-semibold tracking-wide flex items-center gap-1.5 backdrop-blur-md transition-colors ${
                    is360Active
                      ? 'bg-[#D4AF37] text-black font-bold'
                      : 'bg-black/80 text-zinc-300 border border-zinc-700 hover:border-[#D4AF37]'
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${is360Active ? 'animate-spin' : ''}`} />
                  <span>{is360Active ? 'Drag Mouse to Rotate 360°' : 'Click for 360° View'}</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`absolute top-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-md border transition-all ${
                    isWishlisted
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                      : 'bg-black/80 text-zinc-300 border-zinc-700 hover:border-[#D4AF37]'
                  }`}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>

                {/* Bottle Image */}
                <div
                  className="relative w-full h-full flex items-center justify-center transition-transform duration-100"
                  style={{
                    transform: is360Active ? `rotateY(${rotationAngle}deg)` : 'none',
                  }}
                >
                  <img
                    src={product.images[selectedImageIndex] || product.images[0]}
                    alt={product.name}
                    className="max-h-80 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Live Name Engraving Preview */}
                {isEngravingEnabled && engravingText && (
                  <div className="absolute bottom-10 inset-x-0 text-center pointer-events-none">
                    <span className="font-serif italic text-amber-200 text-xs tracking-widest bg-black/80 px-3 py-1 rounded border border-[#D4AF37]/50 shadow-xl">
                      "{engravingText}"
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImageIndex(idx);
                      setIs360Active(false);
                    }}
                    className={`w-20 h-20 rounded-lg border overflow-hidden bg-[#0A0A0A] p-2 flex items-center justify-center transition-all ${
                      selectedImageIndex === idx && !is360Active
                        ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]'
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Information & Options */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#D4AF37] font-medium">
                  <span>{product.family}</span>
                  <span>•</span>
                  <span>{product.gender}</span>
                  <span>•</span>
                  <span className="text-amber-200 font-bold">{product.concentration}</span>
                </div>

                <h1 className="font-serif text-3xl font-bold text-white mt-1">{product.name}</h1>
                <p className="text-xs text-zinc-300 font-sans mt-1">{product.subtitle}</p>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#D4AF37]" />
                    ))}
                    <span className="font-bold text-white ml-1">{product.rating}</span>
                  </div>
                  <span className="text-xs text-zinc-400">({product.reviewCount} Happy Customer Reviews)</span>
                </div>
              </div>

              {/* Price & Stock */}
              <div className="p-4 rounded-xl bg-[#141414] border border-[#D4AF37]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 block font-sans font-medium">SPECIAL PRICE</span>
                  <span className="font-serif text-2xl font-bold text-[#D4AF37]">
                    {formatPrice(finalPriceUSD, activeCurrency)}
                  </span>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    In Stock ({product.stockCount} Available)
                  </span>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Includes 2 FREE Sample Vials</p>
                </div>
              </div>

              {/* Bottle Size Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-bold">
                  Select Bottle Size
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {product.volumeMl.map((vol) => (
                    <button
                      key={vol}
                      onClick={() => setSelectedVolume(vol)}
                      className={`py-3 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                        selectedVolume === vol
                          ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-md'
                          : 'bg-[#141414] text-zinc-300 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      <div className="text-xs">{vol}ml Bottle</div>
                      <div className="text-[10px] opacity-90">
                        {vol === 12 ? 'Traditional Tola' : vol === 50 ? 'Popular Size' : 'Royal Bottle'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Name Engraving */}
              {product.isCustomEngravable && (
                <div className="p-4 rounded-xl bg-[#121212] border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase tracking-wider text-amber-200 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Free Name / Initial Engraving
                    </label>
                    <input
                      type="checkbox"
                      checked={isEngravingEnabled}
                      onChange={(e) => setIsEngravingEnabled(e.target.checked)}
                      className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                    />
                  </div>

                  {isEngravingEnabled && (
                    <div className="space-y-1">
                      <input
                        type="text"
                        maxLength={20}
                        placeholder="Enter name to engrave (e.g. Ramesh, Priya, S.K.)"
                        value={engravingText}
                        onChange={(e) => setEngravingText(e.target.value)}
                        className="w-full bg-[#080808] border border-[#D4AF37]/50 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                      />
                      <p className="text-[10px] text-zinc-400">
                        We will carve this name on the bottle in golden lettering for free.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Lasting Time Meter */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#141414] border border-zinc-800 text-xs">
                <div>
                  <span className="text-zinc-400 font-medium block mb-1">HOW LONG IT LASTS</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-bold text-white text-sm">{product.longevityHours} Hours</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-[#D4AF37] h-full rounded-full"
                      style={{ width: `${Math.min(100, (product.longevityHours / 24) * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <span className="text-zinc-400 font-medium block mb-1">SCENT STRENGTH</span>
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full ${
                          i < product.projectionLevel ? 'bg-[#D4AF37]' : 'bg-zinc-800'
                        }`}
                      />
                    ))}
                    <span className="text-white font-bold ml-1">{product.projectionLevel}/5</span>
                  </div>
                  <span className="text-[11px] text-zinc-400 block mt-2 line-clamp-1">
                    {product.sillageDescription}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-lg font-bold uppercase tracking-wider text-xs transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-[#D4AF37] via-[#f1d279] to-[#B8860B] text-black hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" /> Added To Cart Successfully!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add To Cart • {formatPrice(finalPriceUSD, activeCurrency)}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Easy Tabs (Notes, Story, Ingredients, Reviews) */}
          <div className="pt-6 border-t border-[#D4AF37]/30">
            <div className="flex border-b border-zinc-800 text-xs uppercase font-semibold tracking-wider gap-6 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab('pyramid')}
                className={`py-1 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'pyramid'
                    ? 'border-[#D4AF37] text-[#D4AF37] font-bold'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                Fragrance Notes (How It Smells)
              </button>

              <button
                onClick={() => setActiveTab('story')}
                className={`py-1 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'story'
                    ? 'border-[#D4AF37] text-[#D4AF37] font-bold'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                How It Is Made
              </button>

              <button
                onClick={() => setActiveTab('ingredients')}
                className={`py-1 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'ingredients'
                    ? 'border-[#D4AF37] text-[#D4AF37] font-bold'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                Ingredients
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-1 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-[#D4AF37] text-[#D4AF37] font-bold'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                Customer Reviews ({product.reviewCount})
              </button>
            </div>

            {/* Tab Body */}
            <div className="py-5">
              {activeTab === 'pyramid' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-4 rounded-xl bg-[#141414] border border-[#D4AF37]/30">
                    <span className="text-[11px] font-bold uppercase text-[#D4AF37] block mb-1">
                      FIRST SMELL (TOP NOTES)
                    </span>
                    <h4 className="font-serif text-base font-bold text-white mb-2">First 30 Minutes</h4>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {product.notes.top.map((n) => (
                        <li key={n} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-[#141414] border border-[#D4AF37]/30">
                    <span className="text-[11px] font-bold uppercase text-[#D4AF37] block mb-1">
                      MAIN SMELL (HEART NOTES)
                    </span>
                    <h4 className="font-serif text-base font-bold text-white mb-2">Next 2 to 6 Hours</h4>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {product.notes.heart.map((n) => (
                        <li key={n} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-[#141414] border border-[#D4AF37]/30">
                    <span className="text-[11px] font-bold uppercase text-[#D4AF37] block mb-1">
                      LONG LASTING BASE NOTES
                    </span>
                    <h4 className="font-serif text-base font-bold text-white mb-2">Stays 24+ Hours</h4>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {product.notes.base.map((n) => (
                        <li key={n} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'story' && (
                <div className="space-y-3 max-w-3xl text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">
                  <p>{product.description}</p>
                  <h4 className="text-base text-[#D4AF37] font-bold pt-2">Craftsmanship Story</h4>
                  <p>{product.craftsmanshipStory}</p>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="p-4 rounded-xl bg-[#141414] border border-zinc-800 text-xs text-zinc-300 space-y-2">
                  <p className="font-semibold text-amber-200">
                    {product.ingredients.join(', ')}.
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    100% natural essential oils and extracts, skin safe and free from harmful chemicals.
                  </p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  {product.reviewsList.length > 0 ? (
                    product.reviewsList.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-xl bg-[#141414] border border-zinc-800 space-y-1.5">
                        <div className="flex justify-between items-start text-xs">
                          <div>
                            <span className="font-bold text-white">{rev.author}</span>
                            <span className="text-zinc-400 ml-2">({rev.location})</span>
                            {rev.verifiedPurchase && (
                              <span className="ml-2 text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-zinc-500">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#D4AF37]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <h5 className="font-bold text-white text-xs">{rev.title}</h5>
                        <p className="text-xs text-zinc-300 font-sans">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-zinc-400 bg-[#141414] rounded-xl border border-zinc-800">
                      Be the first to review {product.name}.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Fragrance Layering Suggestion */}
          <div className="pt-4 border-t border-zinc-800">
            <div className="p-5 rounded-xl bg-gradient-to-r from-[#141414] via-[#1A1A1A] to-[#141414] border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-bold">
                  Mix & Match Suggestion
                </span>
                <h4 className="font-serif text-base font-bold text-white mt-0.5">
                  Try mixing {product.name} with {pairingProduct.name}!
                </h4>
                <p className="text-xs text-zinc-300 mt-0.5 max-w-xl">
                  Applying a drop of Sandalwood oil first, then spraying Rose on top creates a unique personal scent.
                </p>
              </div>

              <button
                onClick={onOpenLayeringTool}
                className="px-5 py-2.5 bg-[#121212] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold text-xs uppercase tracking-wider rounded transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
              >
                <Layers className="w-4 h-4" /> Open Mix & Match Helper
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
