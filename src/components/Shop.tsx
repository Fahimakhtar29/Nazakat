import React from 'react';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import { Product, Currency, FilterState } from '../types';
import { ProductCard } from './ProductCard';

interface ShopProps {
  products: Product[];
  activeCurrency: Currency;
  wishlistIds: string[];
  comparedIds: string[];
  onToggleWishlist: (p: Product) => void;
  onToggleCompare: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, volumeMl: number) => void;
  filterState: FilterState;
  onOpenFilterDrawer: () => void;
  onChangeSort: (sort: FilterState['sortBy']) => void;
  searchQuery: string;
}

export const Shop: React.FC<ShopProps> = ({
  products,
  activeCurrency,
  wishlistIds,
  comparedIds,
  onToggleWishlist,
  onToggleCompare,
  onQuickView,
  onAddToCart,
  filterState,
  onOpenFilterDrawer,
  onChangeSort,
  searchQuery,
}) => {
  return (
    <section id="shop-section" className="py-16 bg-[#0B0B0B] relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D4AF37]/30 pb-6 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold font-sans flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Royal Fragrance Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mt-1">
              Shahi Perfumes & 100% Pure Ittars
            </h2>
            <p className="text-xs text-zinc-300 max-w-xl mt-1 font-sans">
              Discover pure Mysore Sandalwood, Kannauj Rose, Kashmiri Saffron, and Assam Oud extracted using traditional copper stills.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenFilterDrawer}
              className="px-4 py-2.5 bg-[#141414] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-amber-100 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" /> Filter Perfumes
            </button>

            {/* Sort Dropdown */}
            <select
              value={filterState.sortBy}
              onChange={(e) => onChangeSort(e.target.value as FilterState['sortBy'])}
              className="px-3 py-2.5 bg-[#141414] border border-zinc-800 text-amber-100 text-xs font-semibold rounded-lg focus:outline-none focus:border-[#D4AF37] cursor-pointer"
            >
              <option value="featured">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
              <option value="newest">New Additions</option>
            </select>
          </div>
        </div>

        {/* Search Banner */}
        {searchQuery && (
          <div className="p-3 bg-[#141414] border border-[#D4AF37]/30 rounded-lg text-xs text-zinc-300 flex items-center justify-between">
            <span>
              Searching for: "<strong className="text-[#D4AF37]">{searchQuery}</strong>" ({products.length} perfumes found)
            </span>
          </div>
        )}

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                activeCurrency={activeCurrency}
                isWishlisted={wishlistIds.includes(product.id)}
                isCompared={comparedIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onToggleCompare={onToggleCompare}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-3 bg-[#141414] rounded-2xl border border-zinc-800">
            <h3 className="font-serif text-xl font-bold text-white">No Perfumes Found Matching Your Filter</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Please try clearing your filters or changing search keywords.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
