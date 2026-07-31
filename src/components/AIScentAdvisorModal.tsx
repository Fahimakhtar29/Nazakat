import React, { useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { Product, Currency } from '../types';

interface AIScentAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  activeCurrency: Currency;
  onSelectProduct: (p: Product) => void;
}

export const AIScentAdvisorModal: React.FC<AIScentAdvisorModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [promptInput, setPromptInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const samplePrompts = [
    'Pure long-lasting Mysore Sandalwood ittar for wedding kurta',
    'Fresh Mogra and Rose perfume for daily office wear in summer',
    'Rich Assam Oud perfume for evening party & family function',
    'Alcohol-free pure saffron oil for puja and daily prayers',
  ];

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptInput.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/ai/scent-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptInput,
          context: 'Indian Fragrance Consultation',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to get recommendation');
      }

      setAiResponse(data.advice);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Consultation temporarily unavailable. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const recommendedFlacons = aiResponse?.suggestedProducts
    ? products.filter((p) =>
        aiResponse.suggestedProducts.some((s: string) =>
          p.name.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(p.name.toLowerCase())
        )
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-3xl bg-[#0E0E0E] border border-[#D4AF37]/50 rounded-2xl shadow-[0_25px_60px_rgba(212,175,55,0.2)] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#080808] border-b border-[#D4AF37]/30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/brand_logo.png"
              alt="Shahi Sugandh Brand Logo"
              className="w-9 h-9 object-cover rounded-full border-2 border-[#D4AF37] bg-black/80 p-0.5"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                Shahi AI Perfume Advisor
              </h3>
              <p className="text-[11px] text-amber-200 font-sans">Ask anything in simple language (Hindi/English)</p>
            </div>
          </div>

          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Intro */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#141414] via-[#1A1A1A] to-[#141414] border border-[#D4AF37]/30 text-xs text-zinc-200 space-y-1">
            <p className="font-serif italic text-amber-100 text-sm">
              "Type what kind of scent you need or where you want to wear it. Our AI helper will suggest the best matching Indian perfume or ittar for you!"
            </p>
          </div>

          {/* Quick Click Prompts */}
          <div>
            <span className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-2 font-bold">
              CLICK TO ASK QUICK EXAMPLES
            </span>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((sp) => (
                <button
                  key={sp}
                  onClick={() => {
                    setPromptInput(sp);
                  }}
                  className="bg-[#141414] hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] border border-zinc-800 text-zinc-300 text-xs px-3 py-1.5 rounded-full transition-colors text-left cursor-pointer"
                >
                  ✦ {sp}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-1 font-bold">
                Your Question or Wish
              </label>
              <textarea
                rows={3}
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="e.g. I need a sweet sandalwood and rose perfume for my sister's wedding in Delhi..."
                className="w-full bg-[#080808] border border-[#D4AF37]/40 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-[10px] text-zinc-400">Instant AI Recommendation</span>
              <button
                type="submit"
                disabled={isLoading || !promptInput.trim()}
                className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] via-[#f1d279] to-[#B8860B] text-black font-bold uppercase tracking-wider text-xs rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-black" /> Thinking...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Ask AI Advisor
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs">
              {errorMsg}
            </div>
          )}

          {/* AI Response */}
          {aiResponse && (
            <div className="p-6 rounded-2xl bg-[#141414] border border-[#D4AF37]/40 space-y-5 animate-fadeIn">
              <div className="border-b border-[#D4AF37]/20 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                  RECOMMENDED FOR YOU
                </span>
                <h4 className="font-serif text-xl font-bold text-amber-100 mt-1">
                  {aiResponse.recommendationTitle}
                </h4>
                <p className="text-xs text-zinc-300 font-sans mt-2 leading-relaxed">
                  "{aiResponse.poeticAnalysis}"
                </p>
              </div>

              {/* Key Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#0A0A0A] p-3.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400 font-bold block mb-1">KEY SCENT NOTES</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {aiResponse.recommendedNotes?.map((n: string) => (
                      <span key={n} className="bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded text-[11px]">
                        ✦ {n}
                      </span>
                    ))}
                  </div>
                </div>

                {aiResponse.layeringSuggestion && (
                  <div className="bg-[#0A0A0A] p-3.5 rounded-xl border border-zinc-800">
                    <span className="text-zinc-400 font-bold block mb-1">MIX & MATCH SUGGESTION</span>
                    <p className="text-zinc-300 text-xs">
                      Base: <strong>{aiResponse.layeringSuggestion.base}</strong> + Top: <strong>{aiResponse.layeringSuggestion.accent}</strong>
                    </p>
                  </div>
                )}
              </div>

              {/* Recommended Items */}
              {recommendedFlacons.length > 0 && (
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold block mb-3">
                    RECOMMENDED PRODUCTS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {recommendedFlacons.map((p) => (
                      <div
                        key={p.id}
                        className="p-3 bg-[#0A0A0A] rounded-xl border border-zinc-800 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt="" className="w-12 h-12 object-contain rounded bg-black p-1" referrerPolicy="no-referrer" />
                          <div>
                            <h5 className="font-serif font-bold text-white text-xs">{p.name}</h5>
                            <span className="text-[10px] text-zinc-400">{p.family}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            onClose();
                            onSelectProduct(p);
                          }}
                          className="px-3 py-1 bg-[#D4AF37] text-black text-xs font-bold uppercase rounded hover:bg-[#e0be42] cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expert Tip */}
              {aiResponse.masterTip && (
                <div className="p-3 bg-[#0A0A0A] rounded-xl border border-[#D4AF37]/30 text-xs text-amber-200">
                  <strong>Perfumer's Tip:</strong> {aiResponse.masterTip}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
