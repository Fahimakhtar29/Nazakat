import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronDown,
  Globe,
  DollarSign,
  Menu,
  X,
  Layers,
  Compass,
  Sliders,
  ShieldCheck,
  Award,
  Phone,
} from 'lucide-react';
import { Currency } from '../types';
import { CURRENCIES, formatPrice } from '../utils/currency';
import { LUXURY_PERFUMES } from '../data/perfumes';
import { BRAND_LOGO_URL, MOBILE_NUMBER, WHATSAPP_NUMBER, WHATSAPP_LINK } from '../constants/brand';

interface HeaderProps {
  activeCurrency: Currency;
  onCurrencyChange?: (c: Currency) => void;
  onChangeCurrency?: (c: Currency) => void;
  activeLanguage?: string;
  onChangeLanguage?: (l: string) => void;
  cartCount: number;
  wishlistCount: number;
  comparedCount?: number;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
  onOpenCompare?: () => void;
  onOpenAccount?: () => void;
  onOpenSearch?: () => void;
  onOpenQuiz?: () => void;
  onOpenAIScentAdvisor?: () => void;
  onOpenAIAdvisor?: () => void;
  onOpenLayeringTool?: () => void;
  onOpenBlog?: () => void;
  onOpenAdmin?: () => void;
  onOpenAdminPanel?: () => void;
  onSelectCategory?: (cat: string) => void;
  onSelectFamily?: (fam: string) => void;
  isAudioPlaying?: boolean;
  ambientAudioActive?: boolean;
  onToggleAudio?: () => void;
  onToggleAmbientAudio?: () => void;
  isGoldCursorActive?: boolean;
  goldCursorActive?: boolean;
  onToggleGoldCursor?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCurrency,
  onCurrencyChange,
  onChangeCurrency,
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart = () => {},
  onOpenWishlist = () => {},
  onOpenAccount = () => {},
  onOpenSearch = () => {},
  onOpenQuiz = () => {},
  onOpenAIScentAdvisor,
  onOpenAIAdvisor,
  onOpenLayeringTool = () => {},
  onOpenBlog = () => {},
  onOpenAdmin,
  onOpenAdminPanel,
  onSelectCategory = (_cat: string) => {},
  onSelectFamily = (_fam: string) => {},
  isAudioPlaying,
  ambientAudioActive,
  onToggleAudio,
  onToggleAmbientAudio,
}) => {
  const handleCurrencyChange = onCurrencyChange || onChangeCurrency || (() => {});
  const handleOpenAIAdvisor = onOpenAIScentAdvisor || onOpenAIAdvisor || (() => {});
  const handleOpenAdmin = onOpenAdmin || onOpenAdminPanel || (() => {});
  const handleToggleAudio = onToggleAudio || onToggleAmbientAudio || (() => {});
  const audioActive = isAudioPlaying ?? ambientAudioActive ?? false;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickSearchInput, setQuickSearchInput] = useState('');
  const [showLiveSearchPopup, setShowLiveSearchPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const liveSearchResults = quickSearchInput.trim()
    ? LUXURY_PERFUMES.filter(
        (p) =>
          p.name.toLowerCase().includes(quickSearchInput.toLowerCase()) ||
          p.family.toLowerCase().includes(quickSearchInput.toLowerCase()) ||
          p.notes.top.some((n) => n.toLowerCase().includes(quickSearchInput.toLowerCase())) ||
          p.notes.heart.some((n) => n.toLowerCase().includes(quickSearchInput.toLowerCase())) ||
          p.notes.base.some((n) => n.toLowerCase().includes(quickSearchInput.toLowerCase()))
      ).slice(0, 4)
    : [];

  return (
    <header className="sticky top-0 z-50 transition-all duration-500 font-sans">
      {/* Top Announcement Bar in Simple Language */}
      <div className="bg-[#FAF4EC] border-b border-[#D4AF37]/40 text-stone-900 text-xs py-1 px-3 sm:px-4 flex justify-between items-center tracking-wide">
        <div className="hidden md:flex items-center gap-3 text-stone-700 text-[11px]">
          <span className="flex items-center gap-1.5 text-stone-900 font-semibold">
            <Award className="w-3.5 h-3.5 text-[#B8860B]" /> Handcrafted Indian Perfumes
          </span>
          <span className="text-stone-300">|</span>
          <a href={`tel:${MOBILE_NUMBER.replace(/\s+/g, '')}`} className="flex items-center gap-1 text-stone-950 font-bold hover:text-[#B8860B] transition-colors">
            <Phone className="w-3 h-3 text-[#B8860B]" /> Call: {MOBILE_NUMBER}
          </a>
          <span className="text-stone-300">|</span>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-emerald-800 font-bold hover:text-emerald-600 transition-colors">
            WhatsApp: {WHATSAPP_NUMBER}
          </a>
        </div>

        <div className="mx-auto md:mx-0 font-sans flex items-center gap-2 text-stone-900 text-[11px] sm:text-xs font-semibold">
          <Sparkles className="w-3 h-3 text-[#B8860B] animate-pulse" />
          <span>FREE Shipping in India + 2 FREE Sample Vials!</span>
        </div>

        <div className="hidden lg:flex items-center gap-3 text-[11px]">
          {/* Currency Switcher */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-black transition-colors cursor-pointer text-stone-800 font-semibold bg-white/80 px-2 py-0.5 rounded border border-[#D4AF37]/50 shadow-sm">
              <DollarSign className="w-3 h-3 text-[#B8860B]" />
              <span>{activeCurrency} ({CURRENCIES[activeCurrency]?.symbol})</span>
              <ChevronDown className="w-3 h-3 text-stone-500" />
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white border border-[#D4AF37]/40 rounded shadow-2xl hidden group-hover:block p-1 w-32 text-center text-stone-800 z-50">
              {(Object.keys(CURRENCIES) as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => handleCurrencyChange(curr)}
                  className={`w-full text-left px-2 py-1 hover:bg-[#D4AF37]/20 rounded text-xs transition-colors ${
                    activeCurrency === curr ? 'text-[#B8860B] font-bold bg-[#FAF4EC]' : 'text-stone-700'
                  }`}
                >
                  {curr} ({CURRENCIES[curr].symbol})
                </button>
              ))}
            </div>
          </div>

          {/* Ambient Music Player */}
          <button
            onClick={handleToggleAudio}
            title={audioActive ? 'Mute Relaxing Music' : 'Play Relaxing Indian Music'}
            className={`p-1 rounded transition-colors ${
              audioActive ? 'text-[#B8860B] bg-[#D4AF37]/20' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {audioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Indian Royal Navbar */}
      <nav
        className={`transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-[#D4AF37]/40 py-1 shadow-md'
            : 'bg-[#FAF7F2]/90 backdrop-blur-sm border-[#D4AF37]/30 py-1.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-stone-800 hover:text-[#B8860B] p-1"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Left Navigation Links in Easy Language */}
          <div className="hidden lg:flex items-center gap-5 text-xs uppercase tracking-wider font-bold text-stone-800">
            {/* Mega Menu Collections */}
            <div
              className="relative py-1 cursor-pointer group"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button
                onClick={() => onSelectCategory('All')}
                className="hover:text-[#B8860B] transition-colors flex items-center gap-1 py-1"
              >
                <span>Fragrance Types</span>
                <ChevronDown className="w-3 h-3 text-[#B8860B]" />
              </button>

              {/* Mega Menu */}
              {isMegaMenuOpen && (
                <div className="absolute left-0 top-full pt-2 w-[720px] z-50">
                  <div className="bg-white/98 border border-[#D4AF37]/40 backdrop-blur-xl p-6 rounded-xl shadow-2xl grid grid-cols-3 gap-6 text-stone-800 normal-case tracking-normal">
                    <div>
                      <h4 className="text-[#B8860B] font-serif text-sm uppercase tracking-wider mb-3 pb-1 border-b border-[#D4AF37]/20 font-bold">
                        By Main Fragrance Smells
                      </h4>
                      <ul className="space-y-2 text-xs text-stone-700">
                        {[
                          'Mysore Sandalwood',
                          'Kashmiri Saffron & Rose',
                          'Assam Royal Oud',
                          'Indian Jasmine & Mogra',
                          'Cooling Earthy Khus',
                          'Royal Spice & Amber',
                        ].map((fam) => (
                          <li key={fam}>
                            <button
                              onClick={() => {
                                onSelectFamily(fam);
                                setIsMegaMenuOpen(false);
                              }}
                              className="hover:text-[#B8860B] transition-colors flex items-center gap-2 font-medium"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                              {fam}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[#B8860B] font-serif text-sm uppercase tracking-wider mb-3 pb-1 border-b border-[#D4AF37]/20 font-bold">
                        By Category
                      </h4>
                      <ul className="space-y-2 text-xs text-stone-700">
                        <li>
                          <button
                            onClick={() => {
                              onSelectCategory('100% Pure Ittar Oil (Alcohol Free)');
                              setIsMegaMenuOpen(false);
                            }}
                            className="hover:text-[#B8860B] transition-colors font-semibold text-stone-900"
                          >
                            🌿 100% Pure Ittar Oils (Alcohol-Free)
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              onSelectCategory('Pure Royal Spray (30% Oil)');
                              setIsMegaMenuOpen(false);
                            }}
                            className="hover:text-[#B8860B] transition-colors font-medium"
                          >
                            ✨ Long Lasting Spray Perfumes
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              onSelectCategory('Shahi Royal Collection');
                              setIsMegaMenuOpen(false);
                            }}
                            className="hover:text-[#B8860B] transition-colors font-semibold text-[#B8860B]"
                          >
                            👑 Shahi Royal Heritage Reserve
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              onOpenLayeringTool();
                              setIsMegaMenuOpen(false);
                            }}
                            className="hover:text-[#B8860B] transition-colors text-[#B8860B] font-bold flex items-center gap-1 mt-2"
                          >
                            <Layers className="w-3.5 h-3.5 text-[#B8860B]" /> Mix & Match Fragrance Helper
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[#FAF5EE] p-4 rounded-lg border border-[#D4AF37]/30 text-center flex flex-col justify-between">
                      <div className="relative h-28 rounded overflow-hidden mb-2">
                        <img
                          src="https://lh3.googleusercontent.com/d/1RE9cf83Nl8s5laJK04wwB4XNxpzvbrol"
                          alt="Nazakat - Nawabi Ameer Al Shan"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className="absolute bottom-2 left-2 text-[10px] bg-[#B8860B] text-white font-bold px-2 py-0.5 rounded shadow">
                          100% Pure Ittar
                        </span>
                      </div>
                      <h5 className="font-serif text-sm text-[#B8860B] font-bold">Nazakat - Nawabi Ameer Al Shan</h5>
                      <p className="text-[11px] text-stone-600 mt-1 line-clamp-2">
                        Pure Sandalwood Oil from Mysore forest farms. Lasts 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleOpenAIAdvisor}
              className="hover:text-[#B8860B] transition-colors flex items-center gap-1 py-1 text-[#B8860B] font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Smart AI Helper</span>
            </button>

            <button
              onClick={onOpenQuiz}
              className="hover:text-[#B8860B] transition-colors flex items-center gap-1 py-1"
            >
              <Compass className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Scent Quiz</span>
            </button>

            <button
              onClick={onOpenBlog}
              className="hover:text-[#B8860B] transition-colors py-1"
            >
              Fragrance Guide
            </button>
          </div>

          {/* Center Royal Indian Stretched Brand Logo */}
          <div className="text-center cursor-pointer select-none group py-0.5 px-2" onClick={() => onSelectCategory('All')}>

{
e.currentTarget.src = BRAND_LOGO_URL;
}}
alt="NAZAKAT Nawabi Perfumes Emblem"
className="h-full w-full object-cover rounded-full"
style={{
filter: "drop-shadow(0px 0px 8px rgba(212, 175, 55, 0.8))"
}}
referrerPolicy="no-referrer"
/>
                />
                <div className="absolute -inset-1 rounded-xl border border-[#B8860B]/70 pointer-events-none animate-pulse" />
              </div>
              <div className="text-left flex flex-col justify-center">
                <div className="font-cinzel text-xl sm:text-2xl lg:text-3xl tracking-[0.25em] sm:tracking-[0.35em] lg:tracking-[0.42em] text-black font-black uppercase drop-shadow-sm leading-none whitespace-nowrap">
                  NAZAKAT
                </div>
                <div className="font-cormorant text-[10px] sm:text-xs lg:text-sm italic tracking-[0.18em] sm:tracking-[0.24em] text-stone-900 font-extrabold mt-0.5 block drop-shadow-sm whitespace-nowrap">
                  An Essence of Nawabi Adab
                </div>
              </div>
            </div>
          </div>

          {/* Right Icon Tools */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Live Search Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowLiveSearchPopup(!showLiveSearchPopup)}
                className="text-stone-800 hover:text-[#B8860B] transition-colors p-1.5"
                title="Search Perfumes & Notes"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Instant Search Popup */}
              {showLiveSearchPopup && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-[#D4AF37]/40 rounded-xl p-3 shadow-2xl z-50">
                  <div className="flex items-center gap-2 bg-[#FAF5EE] border border-stone-200 rounded-lg px-3 py-2">
                    <Search className="w-4 h-4 text-[#B8860B]" />
                    <input
                      type="text"
                      placeholder="Search (e.g. Chandan, Rose, Oud, Jasmine...)"
                      value={quickSearchInput}
                      onChange={(e) => setQuickSearchInput(e.target.value)}
                      className="w-full bg-transparent text-xs text-stone-900 placeholder-stone-500 focus:outline-none font-medium"
                      autoFocus
                    />
                    {quickSearchInput && (
                      <button onClick={() => setQuickSearchInput('')} className="text-xs text-stone-400 hover:text-stone-700">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Results list */}
                  {liveSearchResults.length > 0 ? (
                    <div className="mt-3 space-y-2 max-h-64 overflow-y-auto pr-1">
                      {liveSearchResults.map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            setShowLiveSearchPopup(false);
                            onOpenSearch();
                          }}
                          className="flex items-center gap-3 p-2 hover:bg-[#D4AF37]/15 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-[#D4AF37]/30"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-10 h-10 object-cover rounded-md border border-stone-200"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1">
                            <h6 className="text-xs font-serif font-bold text-stone-900">{prod.name}</h6>
                            <p className="text-[10px] text-stone-500">{prod.family} • {prod.badge || 'Pure Oil'}</p>
                          </div>
                          <span className="text-xs font-bold text-[#B8860B]">
                            {formatPrice(prod.priceUSD, activeCurrency)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : quickSearchInput ? (
                    <div className="p-4 text-center text-xs text-stone-500">
                      No fragrances found. Try searching for "Sandalwood", "Rose", "Oud" or "Khus".
                    </div>
                  ) : (
                    <div className="mt-3 text-[11px] text-stone-600">
                      <p className="text-stone-400 font-bold mb-2">POPULAR SEARCHES</p>
                      <div className="flex flex-wrap gap-1.5">
                        {['Mysore Chandan', 'Kashmiri Kesar', 'Kannauj Rose', 'Assam Oud', 'Pure Ittar'].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setQuickSearchInput(tag)}
                            className="bg-[#FAF5EE] hover:bg-[#D4AF37]/20 hover:text-[#B8860B] text-stone-700 px-2.5 py-1 rounded-md text-[10px] font-medium border border-stone-200 transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-3 pt-2 border-t border-stone-200 text-center">
                    <button
                      onClick={() => {
                        setShowLiveSearchPopup(false);
                        handleOpenAIAdvisor();
                      }}
                      className="text-xs text-[#B8860B] hover:underline font-serif font-bold flex items-center justify-center gap-1 mx-auto"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Ask Smart AI Helper in Simple English or Hindi
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="text-stone-800 hover:text-[#B8860B] transition-colors p-1.5 relative"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B8860B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="text-stone-800 hover:text-[#B8860B] transition-colors p-1.5 relative"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B8860B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Customer Account Button */}
            <button
              onClick={onOpenAccount}
              className="text-stone-800 hover:text-[#B8860B] transition-colors p-1.5 hidden sm:block"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Admin Panel Trigger */}
            <button
              onClick={handleOpenAdmin}
              className="text-stone-500 hover:text-[#B8860B] transition-colors p-1.5 text-xs hidden md:block"
              title="Admin Panel"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#D4AF37]/30 px-6 py-6 text-stone-800 space-y-4 shadow-xl">
          <div className="space-y-3 uppercase tracking-wider text-xs font-semibold">
            <button
              onClick={() => {
                onSelectCategory('All');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:text-[#B8860B] border-b border-stone-200"
            >
              View All Perfumes & Pure Ittars
            </button>
            <button
              onClick={() => {
                handleOpenAIAdvisor();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left py-2 text-[#B8860B] font-bold border-b border-stone-200"
            >
              <Sparkles className="w-4 h-4 text-[#B8860B]" /> Smart AI Scent Helper
            </button>
            <button
              onClick={() => {
                onOpenQuiz();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left py-2 hover:text-[#B8860B] border-b border-stone-200"
            >
              <Compass className="w-4 h-4 text-[#B8860B]" /> Take Scent Finder Quiz
            </button>
            <button
              onClick={() => {
                onOpenLayeringTool();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left py-2 hover:text-[#B8860B] border-b border-stone-200"
            >
              <Layers className="w-4 h-4 text-[#B8860B]" /> Mix & Match Scent Helper
            </button>
            <button
              onClick={() => {
                onOpenBlog();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:text-[#B8860B] border-b border-stone-200"
            >
              Fragrance Guides & Stories
            </button>
            <button
              onClick={() => {
                onOpenAccount();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:text-[#B8860B] border-b border-stone-200"
            >
              My Royal Account
            </button>

            {/* Direct Contact Buttons in Mobile Menu */}
            <div className="pt-2 space-y-2">
              <a
                href={`tel:${MOBILE_NUMBER.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 w-full py-2 bg-stone-900 text-white font-bold rounded-lg text-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> Call Helpline: {MOBILE_NUMBER}
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 bg-emerald-700 text-white font-bold rounded-lg text-xs"
              >
                WhatsApp Us: {WHATSAPP_NUMBER}
              </a>
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center text-xs text-stone-600 border-t border-stone-200">
            <div className="flex gap-2 items-center">
              <span>Currency:</span>
              {(Object.keys(CURRENCIES) as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => handleCurrencyChange(curr)}
                  className={`px-2 py-0.5 rounded text-xs ${
                    activeCurrency === curr ? 'bg-[#B8860B] text-white font-bold' : 'bg-stone-200'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
