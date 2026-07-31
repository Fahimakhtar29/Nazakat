import React, { useState } from 'react';
import { X, Compass, ArrowRight, RotateCcw } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface ScentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  activeCurrency: Currency;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, volumeMl: number) => void;
}

export const ScentQuizModal: React.FC<ScentQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  activeCurrency,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    gender: 'For Myself',
    occasion: 'Daily Wear',
    family: 'Mysore Sandalwood',
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const resetQuiz = () => setStep(1);

  // Match logic
  const matchedPerfumes = products
    .map((p) => {
      let matchScore = 80;
      if (p.family === answers.family) matchScore += 15;
      return { product: p, score: Math.min(99, matchScore) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-2xl bg-[#0F0F0F] border border-[#D4AF37]/50 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
              30-Second Scent Quiz
            </h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {step <= 3 && (
          <div className="my-4">
            <div className="flex justify-between text-xs text-zinc-400 mb-1">
              <span>Question {step} of 3</span>
              <span>{Math.round((step / 3) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#D4AF37] h-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Who is this for? */}
        {step === 1 && (
          <div className="py-4 space-y-4">
            <h4 className="font-serif text-xl font-bold text-amber-100">1. Who are you buying this fragrance for?</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'For Myself', desc: 'Daily wear & personal fragrance' },
                { label: 'Gift for Family / Friend', desc: 'Birthdays, anniversaries & gifting' },
                { label: 'Wedding & Festivals', desc: 'Diwali, Eid, weddings & parties' },
                { label: 'Puja & Meditation', desc: 'Sacred alcohol-free pure oils' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setAnswers({ ...answers, gender: item.label });
                    nextStep();
                  }}
                  className="p-4 rounded-xl border bg-[#141414] border-zinc-800 hover:border-[#D4AF37] text-left transition-all cursor-pointer"
                >
                  <div className="font-serif text-sm font-bold text-white">{item.label}</div>
                  <div className="text-xs text-zinc-400 mt-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Main Smell Choice */}
        {step === 2 && (
          <div className="py-4 space-y-4">
            <h4 className="font-serif text-xl font-bold text-amber-100">2. Which smell do you enjoy the most?</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Mysore Sandalwood', desc: 'Sweet, soothing, and calming sandalwood' },
                { name: 'Kashmiri Saffron & Rose', desc: 'Royal, sweet floral scent' },
                { name: 'Assam Royal Oud', desc: 'Deep, rich, prestigious wood' },
                { name: 'Indian Jasmine & Mogra', desc: 'Fresh, uplifting flower garland scent' },
                { name: 'Cooling Earthy Khus', desc: 'Refreshing green vetiver root' },
                { name: 'Royal Spice & Amber', desc: 'Warm cardamom, cinnamon & amber' },
              ].map((fam) => (
                <button
                  key={fam.name}
                  onClick={() => {
                    setAnswers({ ...answers, family: fam.name });
                    nextStep();
                  }}
                  className="p-3.5 rounded-xl border border-zinc-800 bg-[#141414] hover:border-[#D4AF37] text-left transition-all cursor-pointer"
                >
                  <div className="font-serif text-sm font-bold text-amber-200">{fam.name}</div>
                  <div className="text-xs text-zinc-400 mt-0.5">{fam.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Preferred Duration / Type */}
        {step === 3 && (
          <div className="py-4 space-y-4">
            <h4 className="font-serif text-xl font-bold text-amber-100">3. Which format do you prefer?</h4>
            <div className="space-y-3">
              {[
                { label: '🌿 100% Pure Alcohol-Free Ittar Oil', detail: 'Zero alcohol, lasts 24+ hours on skin and clothes' },
                { label: '✨ Royal Spray Perfume (30% Concentrated Oil)', detail: 'Convenient spray for clothes, weddings, and parties' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    nextStep();
                  }}
                  className="w-full p-4 rounded-xl border border-zinc-800 bg-[#141414] hover:border-[#D4AF37] text-left transition-all cursor-pointer"
                >
                  <div className="font-serif text-sm font-bold text-white">{item.label}</div>
                  <div className="text-xs text-zinc-400 mt-1">{item.detail}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {step === 4 && (
          <div className="py-4 space-y-5">
            <div className="text-center space-y-1">
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold">
                Your Recommended Matches
              </span>
              <h4 className="font-serif text-2xl font-bold text-white">Best Fragrances For You</h4>
            </div>

            <div className="space-y-3">
              {matchedPerfumes.map(({ product, score }) => (
                <div
                  key={product.id}
                  className="p-4 rounded-xl bg-[#141414] border border-[#D4AF37]/30 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-14 object-contain rounded bg-[#0A0A0A] p-1"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-[#D4AF37] text-black font-bold px-2 py-0.5 rounded">
                          {score}% Match
                        </span>
                        <span className="text-xs text-zinc-400">{product.family}</span>
                      </div>
                      <h5 className="font-serif font-bold text-white text-base mt-0.5">{product.name}</h5>
                      <p className="text-xs text-zinc-400 line-clamp-1">{product.subtitle}</p>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="font-serif font-bold text-[#D4AF37] text-sm">
                      {formatPrice(product.priceUSD, activeCurrency)}
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="px-3.5 py-1.5 bg-[#D4AF37] text-black text-xs font-bold uppercase rounded hover:bg-[#e0be42] cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={resetQuiz}
                className="text-xs text-zinc-400 hover:text-[#D4AF37] font-sans flex items-center justify-center gap-1 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
