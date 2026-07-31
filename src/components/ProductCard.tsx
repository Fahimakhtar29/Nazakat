import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, RotateCcw, Check, Sparkles } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/currency';
import { BRAND_LOGO_URL } from '../constants/brand';

interface ProductCardProps {
  product: Product;
  activeCurrency: Currency;
  isWishlisted: boolean;
  isCompared: boolean;
  onToggleWishlist: (p: Product) => void;
  onToggleCompare: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, volumeMl: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  activeCurrency,
  isWishlisted,
  isCompared,
  onToggleWishlist,
  onToggleCompare,
  onQuickView,
  onAddToCart,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.selectedVolumeMl || 12);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white border border-[#D4AF37]/40 hover:border-[#B8860B] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(184,134,11,0.2)] flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Box */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#FAF6EE] p-5 flex items-center justify-center">
        {/* Badge Overlay & Royal Logo Stamp */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-full border border-[#D4AF37] bg-white p-0.5 shadow-md flex items-center justify-center">
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
          {product.badge && (
            <span className="text-[10px] uppercase font-sans tracking-wide font-bold bg-[#B8860B] text-white px-2 py-0.5 rounded shadow-md">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist & Compare Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            title={isWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              isWishlisted
                ? 'bg-[#B8860B] text-white border-[#B8860B]'
                : 'bg-white/80 text-stone-700 border-stone-200 hover:border-[#B8860B] hover:text-[#B8860B]'
            }`}
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(product);
            }}
            title={isCompared ? 'Comparing' : 'Compare'}
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              isCompared
                ? 'bg-[#B8860B] text-white border-[#B8860B]'
                : 'bg-white/80 text-stone-700 border-stone-200 hover:border-[#B8860B] hover:text-[#B8860B]'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Image */}
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
          referrerPolicy="no-referrer"
        />

        {/* Quick View Button */}
        <div className="absolute inset-x-3 sm:inset-x-4 bottom-3 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-1.5 sm:py-2 bg-stone-900/90 hover:bg-black border border-stone-800 text-amber-200 text-[11px] sm:text-xs font-semibold rounded-lg backdrop-blur-md flex items-center justify-center gap-1.5 transition-colors shadow-lg"
          >
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" /> Quick View & Details
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Family & Suitable For */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 font-sans">
            <span className="text-[#B8860B] font-bold">{product.family}</span>
            <span>{product.gender}</span>
          </div>

          {/* Name & Subtitle */}
          <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors mt-1">
            {product.name}
          </h3>

          <p className="text-xs text-stone-600 line-clamp-1 font-sans mt-0.5 font-medium">
            {product.subtitle}
          </p>

          {/* Scent Notes */}
          <div className="flex flex-wrap gap-1 mt-2">
            {product.notes.top.slice(0, 2).concat(product.notes.base.slice(0, 1)).map((note) => (
              <span
                key={note}
                className="text-[10px] bg-[#FAF5EE] border border-stone-200 text-stone-800 px-2 py-0.5 rounded-full font-sans font-medium"
              >
                {note}
              </span>
            ))}
          </div>

          {/* Rating & Lasting Hours */}
          <div className="flex items-center justify-between pt-2.5 text-xs text-stone-500 border-t border-stone-200 mt-2.5">
            <div className="flex items-center gap-1 text-amber-600">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-stone-900 text-xs">{product.rating}</span>
              <span className="text-[10px] text-stone-400">({product.reviewCount})</span>
            </div>

            <span className="text-[11px] font-sans text-[#B8860B] font-semibold">
              ⌛ Lasts {product.longevityHours} Hours
            </span>
          </div>
        </div>

        {/* Pricing & Add Button */}
        <div className="pt-2.5 border-t border-stone-200 flex items-center justify-between">
          <div>
            <div className="font-serif text-lg font-bold text-[#B8860B]">
              {formatPrice(product.priceUSD, activeCurrency)}
            </div>
            {product.oldPriceUSD && (
              <div className="text-xs text-stone-400 line-through font-sans">
                {formatPrice(product.oldPriceUSD, activeCurrency)}
              </div>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-[#B8860B] hover:bg-[#966d09] text-white shadow-md'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
