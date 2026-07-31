import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'What is Pure Ittar? The 400-Year-Old Indian Fragrance Art',
    slug: 'what-is-pure-ittar-kannauj-heritage',
    subtitle: 'Learn why 100% alcohol-free Ittar is better for your skin and lasts longer.',
    category: 'Indian Heritage & Attar Guide',
    readTime: '3 min read',
    date: 'July 24, 2026',
    author: 'Master Artisan Pandit Rameshwar',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85',
    excerpt: 'Ittar (Attar) is 100% pure botanical oil extracted from flowers, sandalwood, and roots using traditional copper stills (Deg-Bhapka) in Kannauj, UP. Zero alcohol, 100% skin safe.',
    contentHtml: `
      <p class="lead text-lg text-amber-200/90 leading-relaxed mb-6">
        Unlike modern spray perfumes which contain 80% alcohol, authentic Indian Ittar is 100% pure fragrance oil distilled directly into sandalwood oil.
      </p>
      <h3 class="text-xl font-serif text-amber-400 mb-3 mt-8">Why Choose Alcohol-Free Ittar?</h3>
      <p class="text-zinc-300 leading-relaxed mb-4">
        1. <strong>100% Skin Friendly:</strong> Does not dry or darken skin. Perfect for sensitive skin.<br/>
        2. <strong>Suitable for Puja & Prayers:</strong> Pure and sacred, ideal for daily rituals.<br/>
        3. <strong>Super Long Lasting:</strong> Pure oil bonds with your skin temperature and lasts up to 24-36 hours.
      </p>
    `,
    featuredProducts: ['shahi-mysore-chandan', 'kannauj-ruh-khus'],
  },
  {
    id: 'b2',
    title: 'How to Make Your Perfume Last All Day in Hot Indian Summer',
    slug: 'how-to-make-perfume-last-long-indian-summer',
    subtitle: 'Simple 4-step guide to smelling fresh for 24+ hours even in heat and humidity.',
    category: 'Scent Easy Tips',
    readTime: '2 min read',
    date: 'July 15, 2026',
    author: 'Shahi Sugandh Experts',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85',
    excerpt: 'Beat heat and sweat with these simple tricks! Apply oil on pulse points, wear natural fabrics, and mix sandalwood with cooling khus.',
    contentHtml: `
      <p class="lead text-lg text-amber-200/90 leading-relaxed mb-6">
        Indian summers can evaporate weak sprays quickly. Here are 4 easy steps to stay fresh all day long:
      </p>
      <h3 class="text-xl font-serif text-amber-400 mb-3 mt-8">Step 1: Apply After Shower on Damp Skin</h3>
      <p class="text-zinc-300 leading-relaxed mb-4">
        Your pores are open after a bath. Applying a few drops of Ittar on moist wrists and neck locks the scent inside.
      </p>
      <h3 class="text-xl font-serif text-amber-400 mb-3 mt-8">Step 2: Apply on Pulse Points</h3>
      <p class="text-zinc-300 leading-relaxed mb-4">
        Behind earlobes, wrists, and collarbone warm up the oil gradually, releasing a pleasant scent all day.
      </p>
    `,
    featuredProducts: ['kannauj-ruh-khus', 'mogra-chameli-sparkle'],
  },
  {
    id: 'b3',
    title: 'Spray Perfume vs Pure Ittar: Which One Should You Buy?',
    slug: 'spray-perfume-vs-pure-ittar-comparison',
    subtitle: 'A clear and simple comparison to help you choose the best fragrance for your needs.',
    category: 'Buying Guide',
    readTime: '3 min read',
    date: 'June 30, 2026',
    author: 'Dr. S. K. Awasthi',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=85',
    excerpt: 'Confused between buying an Ittar bottle or a Perfume Spray? Read our easy comparison table on lasting time, usage, and occasions.',
    contentHtml: `
      <p class="lead text-lg text-amber-200/90 leading-relaxed mb-6">
        Both Ittar and Spray Perfumes have unique advantages. Here is the simple breakdown:
      </p>
      <h3 class="text-xl font-serif text-amber-400 mb-3 mt-8">When to buy Pure Ittar Oil:</h3>
      <p class="text-zinc-300 leading-relaxed mb-4">
        If you want zero alcohol, maximum lasting power (24h+), intimate luxury, and sacred purity for daily puja or weddings.
      </p>
      <h3 class="text-xl font-serif text-amber-400 mb-3 mt-8">When to buy Spray Perfume:</h3>
      <p class="text-zinc-300 leading-relaxed mb-4">
        If you prefer a wide spray cloud for quick application on clothes before stepping out for office or parties.
      </p>
    `,
    featuredProducts: ['kashmiri-kesar-gulab', 'silk-route-amber-cardamom'],
  },
];
