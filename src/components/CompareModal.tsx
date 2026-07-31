import React from 'react';
import { X, Star, Trash2, ShoppingBag } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: Product[];
  activeCurrency: Currency;
  onRemoveCompare: (id: string) => void;
  onAddToCart: (p: Product, volumeMl: number) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  activeCurrency,
  onRemoveCompare,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-5xl bg-[#0E0E0E] border border-[#D4AF37]/40 rounded-2xl p-6 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
          <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
            Compare Flacons ({comparedProducts.length})
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {comparedProducts.length > 0 ? (
          <div className="py-6 overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="p-3 font-mono uppercase text-[#D4AF37] w-32">Attribute</th>
                  {comparedProducts.map((p) => (
                    <th key={p.id} className="p-3 text-center w-60">
                      <div className="relative group p-2 rounded bg-[#141414] border border-zinc-800">
                        <button
                          onClick={() => onRemoveCompare(p.id)}
                          className="absolute top-1 right-1 text-zinc-500 hover:text-red-400"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <img src={p.images[0]} alt="" className="w-16 h-16 object-contain mx-auto" referrerPolicy="no-referrer" />
                        <h5 className="font-serif font-bold text-white text-xs mt-1">{p.name}</h5>
                        <p className="text-[10px] text-zinc-400">{p.family}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                <tr>
                  <td className="p-3 font-mono text-zinc-400">Price</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center font-serif font-bold text-[#D4AF37]">
                      {formatPrice(p.priceUSD, activeCurrency)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-mono text-zinc-400">Concentration</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center text-[11px]">{p.concentration}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-mono text-zinc-400">Longevity</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center font-bold text-amber-200">{p.longevityHours} Hours</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-mono text-zinc-400">Top Notes</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center text-[11px]">{p.notes.top.join(', ')}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-mono text-zinc-400">Heart Notes</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center text-[11px]">{p.notes.heart.join(', ')}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-mono text-zinc-400">Base Notes</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center text-[11px]">{p.notes.base.join(', ')}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-mono text-zinc-400">Action</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center">
                      <button
                        onClick={() => onAddToCart(p, 100)}
                        className="px-3 py-1.5 bg-[#D4AF37] text-black text-xs font-bold uppercase rounded hover:bg-[#e0be42]"
                      >
                        Add
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-zinc-400">
            No products selected for comparison. Click the compare icon on product cards to compare up to 4 flacons.
          </div>
        )}
      </div>
    </div>
  );
};
