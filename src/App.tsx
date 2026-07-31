import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Shop } from './components/Shop';
import { AdvancedFilter } from './components/AdvancedFilter';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ScentQuizModal } from './components/ScentQuizModal';
import { AIScentAdvisorModal } from './components/AIScentAdvisorModal';
import { LayeringToolModal } from './components/LayeringToolModal';
import { CartDrawer } from './components/CartDrawer';
import { AccountModal } from './components/AccountModal';
import { CompareModal } from './components/CompareModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { BlogDrawer } from './components/BlogDrawer';
import { Footer } from './components/Footer';

// New NAZAKAT Specific Luxury Components
import { LoadingScreen } from './components/LoadingScreen';
import { InteractiveAudioToggle } from './components/InteractiveAudioToggle';
import { Interactive3DBottleViewerModal } from './components/Interactive3DBottleViewerModal';
import { InteractiveFragrancePyramid } from './components/InteractiveFragrancePyramid';
import { InteractiveGiftExperience } from './components/InteractiveGiftExperience';
import { HeritageStory } from './components/HeritageStory';
import { NawabiConciergeChat } from './components/NawabiConciergeChat';

import { LUXURY_PERFUMES } from './data/perfumes';
import { BLOG_POSTS } from './data/blogPosts';
import { Product, Currency, CartItem, FilterState } from './types';
import { MessageSquare, RotateCw, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  // State
  const [products, setProducts] = useState<Product[]>(LUXURY_PERFUMES);
  const [activeCurrency, setActiveCurrency] = useState<Currency>('USD');
  const [activeLanguage, setActiveLanguage] = useState<string>('EN');
  const [ambientAudioActive, setAmbientAudioActive] = useState<boolean>(false);
  const [goldCursorActive, setGoldCursorActive] = useState<boolean>(false);

  // Modals for NAZAKAT Experience
  const [is3DBottleModalOpen, setIs3DBottleModalOpen] = useState(false);
  const [isConciergeChatOpen, setIsConciergeChatOpen] = useState(false);

  // Cart & Persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('maison_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist & Compare
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('maison_wishlist');
      return saved ? JSON.parse(saved) : ['p1', 'p3'];
    } catch {
      return ['p1', 'p3'];
    }
  });

  const [comparedIds, setComparedIds] = useState<string[]>([]);

  // Modals & Drawers
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAIAdvisorOpen, setIsAIAdvisorOpen] = useState(false);
  const [isLayeringOpen, setIsLayeringOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter State
  const [filterState, setFilterState] = useState<FilterState>({
    family: 'All',
    gender: 'All',
    maxPriceUSD: 600,
    minLongevity: 10,
    selectedNotes: [],
    selectedOccasions: [],
    inStockOnly: false,
    sortBy: 'featured',
  });

  // Save Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('maison_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save Wishlist
  useEffect(() => {
    localStorage.setItem('maison_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Toggle Wishlist
  const handleToggleWishlist = (p: Product) => {
    if (wishlistIds.includes(p.id)) {
      setWishlistIds(wishlistIds.filter((id) => id !== p.id));
    } else {
      setWishlistIds([...wishlistIds, p.id]);
    }
  };

  // Category and Family Filter Handlers
  const handleSelectCategory = (cat: string) => {
    if (cat === 'All') {
      setFilterState((prev) => ({ ...prev, family: 'All', gender: 'All' }));
      setSearchQuery('');
    } else if (cat === 'Men' || cat === 'Women' || cat === 'Unisex') {
      setFilterState((prev) => ({ ...prev, gender: cat }));
    } else {
      setFilterState((prev) => ({ ...prev, family: cat }));
    }
  };

  const handleSelectFamily = (fam: string) => {
    setFilterState((prev) => ({ ...prev, family: fam }));
  };

  // Toggle Compare
  const handleToggleCompare = (p: Product) => {
    if (comparedIds.includes(p.id)) {
      setComparedIds(comparedIds.filter((id) => id !== p.id));
    } else {
      if (comparedIds.length < 4) {
        setComparedIds([...comparedIds, p.id]);
      }
    }
  };

  // Add To Cart Handler
  const handleAddToCart = (product: Product, volumeMl: number, engravingText?: string) => {
    // Volume price multiplier
    const volumeMultiplier = volumeMl === 50 ? 0.65 : volumeMl === 250 ? 2.2 : 1.0;
    const basePriceUSD = Math.round(product.priceUSD * volumeMultiplier + (engravingText ? 15 : 0));

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.volumeMl === volumeMl
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            volumeMl,
            quantity: 1,
            engravingText,
            calculatedPriceUSD: basePriceUSD,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  // Add Layering Bundle To Cart
  const handleAddBundleToCart = (base: Product, accent: Product) => {
    const bundlePrice = Math.round((base.priceUSD + accent.priceUSD) * 0.85);
    handleAddToCart(base, 100);
    handleAddToCart(accent, 100);
  };

  // Cart quantity controls
  const handleUpdateCartQuantity = (productId: string, volumeMl: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.volumeMl === volumeMl) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string, volumeMl: number) => {
    setCartItems((prev) => prev.filter((i) => !(i.product.id === productId && i.volumeMl === volumeMl)));
  };

  // Admin Stock Update
  const handleUpdateStock = (id: string, newStock: number) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stockCount: newStock } : p)));
  };

  // Filtered Products Computation
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query match
        if (
          searchQuery &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.family.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Family
        if (filterState.family !== 'All' && p.family !== filterState.family) return false;

        // Gender
        if (filterState.gender !== 'All' && p.gender !== filterState.gender) return false;

        // Price
        if (p.priceUSD > filterState.maxPriceUSD) return false;

        // Longevity
        if (p.longevityHours < filterState.minLongevity) return false;

        // Stock
        if (filterState.inStockOnly && p.stockCount === 0) return false;

        // Notes
        if (
          filterState.selectedNotes.length > 0 &&
          !filterState.selectedNotes.some(
            (note) =>
              p.notes.top.includes(note) || p.notes.heart.includes(note) || p.notes.base.includes(note)
          )
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filterState.sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
        if (filterState.sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
        if (filterState.sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [products, filterState, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8F4EE] text-[#1C1917] selection:bg-[#D4AF37] selection:text-black font-sans antialiased">
      {/* Header */}
      <Header
        activeCurrency={activeCurrency}
        onChangeCurrency={setActiveCurrency}
        activeLanguage={activeLanguage}
        onChangeLanguage={setActiveLanguage}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        comparedCount={comparedIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          // Filter to wishlist items in search
          setSearchQuery('Wishlist');
        }}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenLayeringTool={() => setIsLayeringOpen(true)}
        onOpenAdminPanel={() => setIsAdminOpen(true)}
        onOpenBlog={() => setIsBlogOpen(true)}
        onSelectCategory={handleSelectCategory}
        onSelectFamily={handleSelectFamily}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        ambientAudioActive={ambientAudioActive}
        onToggleAmbientAudio={() => setAmbientAudioActive(!ambientAudioActive)}
        goldCursorActive={goldCursorActive}
        onToggleGoldCursor={() => setGoldCursorActive(!goldCursorActive)}
      />

      {/* Royal Loading Splash */}
      <LoadingScreen />

      {/* Royal Sitar Ambient Audio Player */}
      <InteractiveAudioToggle />

      {/* Floating 360° Studio Quick Trigger Bar */}
      <div className="bg-[#121212] border-y border-[#D4AF37]/30 py-2.5 px-4 text-center text-xs text-[#D4AF37] font-serif font-bold uppercase tracking-widest flex items-center justify-center gap-4 flex-wrap">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#F5D77F]" /> Flagship NAZAKAT Octagonal Bottle Studio
        </span>
        <button
          onClick={() => setIs3DBottleModalOpen(true)}
          className="px-3 py-1 rounded-full bg-[#1F1C14] border border-[#D4AF37] text-[#F5D77F] hover:bg-[#D4AF37] hover:text-[#0B0B0B] transition-all cursor-pointer flex items-center gap-1 shadow"
        >
          <RotateCw className="w-3 h-3" /> View 360° Bottle Studio & Gold Engraving
        </button>
      </div>

      {/* Hero Section */}
      <Hero
        onExploreClick={() => {
          document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAIScentAdvisor={() => setIsAIAdvisorOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenLayeringTool={() => setIsLayeringOpen(true)}
        activeCurrency={activeCurrency}
      />

      {/* Royal Heritage Story Section */}
      <HeritageStory />

      {/* Interactive Scent Pyramid Section */}
      <InteractiveFragrancePyramid />

      {/* Custom Gift Experience Builder */}
      <InteractiveGiftExperience
        activeCurrency={activeCurrency}
        onAddToCart={(giftDetails) => {
          const flagshipProd = products[0];
          setCartItems((prev) => [
            ...prev,
            {
              product: {
                ...flagshipProd,
                name: `${giftDetails.name} [Royal Gift Box]`,
              },
              quantity: 1,
              volumeMl: 12,
              engravingText: giftDetails.engraving,
              priceUSD: giftDetails.price,
            },
          ]);
          setIsCartOpen(true);
        }}
      />

      {/* Features Pillars */}
      <Features />

      {/* Main Shop Vault */}
      <Shop
        products={filteredProducts}
        activeCurrency={activeCurrency}
        wishlistIds={wishlistIds}
        comparedIds={comparedIds}
        onToggleWishlist={handleToggleWishlist}
        onToggleCompare={handleToggleCompare}
        onQuickView={setSelectedQuickViewProduct}
        onAddToCart={handleAddToCart}
        filterState={filterState}
        onOpenFilterDrawer={() => setIsFilterDrawerOpen(true)}
        onChangeSort={(sortBy) => setFilterState({ ...filterState, sortBy })}
        searchQuery={searchQuery}
      />

      {/* Floating Nawabi Concierge Chat Button */}
      <button
        onClick={() => setIsConciergeChatOpen(true)}
        className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full btn-gold shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-widest cursor-pointer hover:scale-105 transition-all"
        title="Nawabi Fragrance Concierge Chat"
      >
        <MessageSquare className="w-4 h-4 text-[#0B0B0B]" />
        <span className="hidden sm:inline">Nawabi Concierge</span>
      </button>

      {/* Modals */}
      <Interactive3DBottleViewerModal
        isOpen={is3DBottleModalOpen}
        onClose={() => setIs3DBottleModalOpen(false)}
        activeCurrency={activeCurrency}
        onAddToCart={(engravingText) => {
          handleAddToCart(products[0], 12, engravingText);
        }}
      />

      <NawabiConciergeChat
        isOpen={isConciergeChatOpen}
        onClose={() => setIsConciergeChatOpen(false)}
        onOpenScentAdvisor={() => {
          setIsConciergeChatOpen(false);
          setIsAIAdvisorOpen(true);
        }}
      />

      {/* Advanced Filter Drawer */}
      <AdvancedFilter
        filterState={filterState}
        onChangeFilter={(updated) => setFilterState({ ...filterState, ...updated })}
        onResetFilters={() =>
          setFilterState({
            family: 'All',
            gender: 'All',
            maxPriceUSD: 600,
            minLongevity: 10,
            selectedNotes: [],
            selectedOccasions: [],
            inStockOnly: false,
            sortBy: 'featured',
          })
        }
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        totalResultsCount={filteredProducts.length}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedQuickViewProduct}
        activeCurrency={activeCurrency}
        isWishlisted={selectedQuickViewProduct ? wishlistIds.includes(selectedQuickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onClose={() => setSelectedQuickViewProduct(null)}
        allProducts={products}
        onOpenLayeringTool={() => {
          setSelectedQuickViewProduct(null);
          setIsLayeringOpen(true);
        }}
      />

      {/* Scent Quiz Modal */}
      <ScentQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        products={products}
        activeCurrency={activeCurrency}
        onSelectProduct={setSelectedQuickViewProduct}
        onAddToCart={handleAddToCart}
      />

      {/* AI Olfactory Advisor Modal */}
      <AIScentAdvisorModal
        isOpen={isAIAdvisorOpen}
        onClose={() => setIsAIAdvisorOpen(false)}
        products={products}
        activeCurrency={activeCurrency}
        onSelectProduct={setSelectedQuickViewProduct}
      />

      {/* Scent Layering Tool Modal */}
      <LayeringToolModal
        isOpen={isLayeringOpen}
        onClose={() => setIsLayeringOpen(false)}
        products={products}
        activeCurrency={activeCurrency}
        onAddBundleToCart={handleAddBundleToCart}
      />

      {/* Cart Drawer & Checkout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        activeCurrency={activeCurrency}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        onCheckoutSuccess={() => {}}
      />

      {/* Account Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        activeCurrency={activeCurrency}
      />

      {/* Compare Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedProducts={products.filter((p) => comparedIds.includes(p.id))}
        activeCurrency={activeCurrency}
        onRemoveCompare={(id) => setComparedIds(comparedIds.filter((c) => c !== id))}
        onAddToCart={handleAddToCart}
      />

      {/* Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        activeCurrency={activeCurrency}
        onUpdateStock={handleUpdateStock}
      />

      {/* Blog Drawer */}
      <BlogDrawer
        isOpen={isBlogOpen}
        onClose={() => setIsBlogOpen(false)}
        blogPosts={BLOG_POSTS}
        products={products}
        activeCurrency={activeCurrency}
        onSelectProduct={setSelectedQuickViewProduct}
      />

      {/* Footer */}
      <Footer
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
        onOpenLayeringTool={() => setIsLayeringOpen(true)}
        onOpenBlog={() => setIsBlogOpen(true)}
      />
    </div>
  );
};

export default App;
