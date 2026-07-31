export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // multiplier relative to USD (1 USD = 85 INR)
}

export type Gender = 'For Men' | 'For Women' | 'Unisex (For Everyone)' | 'For Everyone' | 'Shahi Royal Collection';

export type Concentration =
  | '100% Pure Ittar Oil (Alcohol Free)'
  | 'Pure Royal Spray (30% Oil)'
  | 'Fresh Cologne Spray (20% Oil)';

export type FragranceFamily =
  | 'Nawabi Musk & Oud'
  | 'Mysore Sandalwood'
  | 'Kashmiri Saffron & Rose'
  | 'Assam Royal Oud'
  | 'Assam Oud & Woods'
  | 'Indian Jasmine & Mogra'
  | 'Cooling Earthy Khus'
  | 'Earthy Khus & Vetiver'
  | 'Royal Spice & Amber'
  | 'Royal Spices & Amber';

export interface FragrancePyramid {
  top: string[]; // First Smell (Top Notes)
  heart: string[]; // Main Smell (Heart Notes)
  base: string[]; // Long Lasting Smell (Base Notes)
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  priceUSD: number; // Base price in USD (approx converted to ₹ in UI)
  oldPriceUSD?: number;
  rating: number;
  reviewCount: number;
  gender: Gender;
  family: FragranceFamily;
  concentration: Concentration;
  volumeMl: number[]; // e.g. [12, 50, 100] (12ml is traditional tola)
  selectedVolumeMl: number;
  badge?: 'Best Seller' | '100% Pure Ittar' | 'Royal Special' | 'New Arrival' | 'Handmade in Kannauj' | 'Lucknow Royal Flagship';
  images: string[];
  notes: FragrancePyramid;
  longevityHours: number; // e.g. 24 hours
  projectionLevel: number; // 1 to 5 (1 = Subtle & Personal, 5 = Very Strong Scent Trail)
  sillageDescription: string;
  occasions: string[];
  seasons: string[];
  description: string;
  craftsmanshipStory: string;
  ingredients: string[];
  inStock: boolean;
  stockCount: number;
  isCustomEngravable: boolean;
  isLayerable: boolean;
  reviewsList: Review[];
}

export interface FilterState {
  searchQuery: string;
  category: string;
  gender: Gender | 'All';
  family: FragranceFamily | 'All';
  concentration: string;
  minPriceUSD: number;
  maxPriceUSD: number;
  minLongevity: number;
  selectedNotes: string[];
  selectedOccasions: string[];
  selectedSeasons: string[];
  inStockOnly: boolean;
  badgeFilter: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface CartItem {
  product: Product;
  quantity: number;
  volumeMl: number;
  engravingText?: string;
  calculatedPriceUSD: number;
}

export interface SampleVial {
  id: string;
  name: string;
  family: string;
  image: string;
}

export interface QuizAnswers {
  genderPreference?: Gender | 'All';
  scentVibe?: string;
  occasion?: string;
  preferredNotes?: string[];
  desiredLongevity?: 'Moderate (8-12 Hours)' | 'Super Long Lasting (24+ Hours)';
  budgetTier?: 'Everyday Luxury (₹1,500 - ₹3,000)' | 'Royal Collection (₹3,000 - ₹6,000)' | 'Shahi Heritage (₹6,000+)';
}

export interface LayeringMix {
  basePerfumeId: string;
  accentPerfumeId: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalUSD: number;
  status: 'Order Confirmed' | 'Handcrafted in Distillery' | 'Out for Express Delivery' | 'Delivered Safely';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface UserAccount {
  name: string;
  email: string;
  tier: 'Shahi Club Member' | 'Royal Gold Member' | 'Maharaja VIP';
  rewardPoints: number;
  orders: Order[];
  addresses: string[];
  wishlistProductIds: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  contentHtml: string;
  featuredProducts: string[];
}
