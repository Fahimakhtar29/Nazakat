import React, { useState } from 'react';
import { X, BookOpen, Clock, Tag, ArrowRight, Sparkles } from 'lucide-react';
import { BlogPost, Product, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface BlogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  blogPosts: BlogPost[];
  products: Product[];
  activeCurrency: Currency;
  onSelectProduct: (p: Product) => void;
}

export const BlogDrawer: React.FC<BlogDrawerProps> = ({
  isOpen,
  onClose,
  blogPosts,
  products,
  activeCurrency,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-4xl bg-[#0E0E0E] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
              L'Élixir Journal & Gazette
            </h3>
          </div>

          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-6 overflow-y-auto flex-1 space-y-6">
          {!selectedPost ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="p-5 rounded-xl bg-[#141414] border border-zinc-800 hover:border-[#D4AF37] transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-40 object-cover rounded-lg filter group-hover:brightness-110 transition-all"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#D4AF37]">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {post.title}
                    </h4>

                    <p className="text-xs text-zinc-400 line-clamp-2 font-light">{post.excerpt}</p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-[#D4AF37] font-semibold mt-4">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Selected Full Article View */
            <div className="space-y-6 max-w-3xl mx-auto">
              <button
                onClick={() => setSelectedPost(null)}
                className="text-xs text-[#D4AF37] hover:underline font-mono"
              >
                ← Back to Gazette Articles
              </button>

              <div className="space-y-3">
                <span className="text-xs font-mono uppercase text-[#D4AF37] font-bold">
                  {selectedPost.category} • {selectedPost.date}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">{selectedPost.title}</h2>
                <p className="text-xs text-zinc-400 italic">By {selectedPost.author}</p>
              </div>

              <img
                src={selectedPost.imageUrl}
                alt=""
                className="w-full h-64 object-cover rounded-xl border border-[#D4AF37]/30"
                referrerPolicy="no-referrer"
              />

              <div className="font-serif text-zinc-300 text-sm leading-relaxed space-y-4">
                <p>{selectedPost.content}</p>
              </div>

              {/* Mentioned Flacon Box */}
              {selectedPost.relatedProductId && (
                <div className="p-4 rounded-xl bg-[#141414] border border-[#D4AF37]/30 flex items-center justify-between">
                  <span className="text-xs font-serif text-amber-200">
                    Featured Flacon in this Article
                  </span>
                  <button
                    onClick={() => {
                      const p = products.find((pr) => pr.id === selectedPost.relatedProductId);
                      if (p) {
                        onClose();
                        onSelectProduct(p);
                      }
                    }}
                    className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase rounded"
                  >
                    Explore Featured Scent
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
