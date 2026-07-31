import React, { useState } from 'react';
import { X, Sliders, TrendingUp, Package, Users, CheckCircle, AlertTriangle, Edit3, Save } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  activeCurrency: Currency;
  onUpdateStock: (id: string, newStock: number) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  products,
  activeCurrency,
  onUpdateStock,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'analytics' | 'inventory' | 'orders'>('analytics');
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [tempStockValue, setTempStockValue] = useState<number>(0);

  const totalInventoryCount = products.reduce((acc, p) => acc + p.stockCount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-4xl bg-[#0E0E0E] border border-[#D4AF37]/40 rounded-2xl p-6 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
              Maison Admin Portal & Operations
            </h3>
          </div>

          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-zinc-800 text-xs font-mono uppercase tracking-widest gap-6 pt-4 pb-2">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'analytics' ? 'border-[#D4AF37] text-[#D4AF37] font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Analytics & Sales
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'inventory' ? 'border-[#D4AF37] text-[#D4AF37] font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Inventory Vault ({totalInventoryCount})
          </button>
        </div>

        {/* Body Content */}
        <div className="py-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#141414] border border-[#D4AF37]/30">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">MONTHLY HAUTE REVENUE</span>
                  <div className="font-serif text-2xl font-bold text-[#D4AF37] mt-1">$284,500</div>
                  <span className="text-[10px] text-emerald-400 font-mono">+18.4% vs last month</span>
                </div>

                <div className="p-4 rounded-xl bg-[#141414] border border-[#D4AF37]/30">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">FLACONS DISPATCHED</span>
                  <div className="font-serif text-2xl font-bold text-white mt-1">612 Flacons</div>
                  <span className="text-[10px] text-emerald-400 font-mono">100% Express On-Time</span>
                </div>

                <div className="p-4 rounded-xl bg-[#141414] border border-[#D4AF37]/30">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">AVERAGE BASKET VALUE</span>
                  <div className="font-serif text-2xl font-bold text-amber-200 mt-1">$465.00</div>
                  <span className="text-[10px] text-zinc-500 font-mono">High-Sillage Extrait Demand</span>
                </div>
              </div>

              {/* Sales Chart Preview SVG */}
              <div className="p-6 rounded-xl bg-[#141414] border border-zinc-800 space-y-3">
                <h4 className="font-serif text-sm font-bold text-white">Monthly Revenue Trajectory</h4>
                <div className="h-40 flex items-end justify-between gap-2 pt-6 px-2">
                  {[40, 55, 48, 70, 65, 85, 95, 80, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-gradient-to-t from-[#B8860B] to-[#D4AF37] rounded-t transition-all hover:opacity-80"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[9px] text-zinc-500 font-mono">M0{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-3">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-400 font-mono uppercase">
                      <th className="p-2">Flacon</th>
                      <th className="p-2">Family</th>
                      <th className="p-2">Price</th>
                      <th className="p-2 text-center">Stock Count</th>
                      <th className="p-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 text-zinc-300">
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td className="p-2 flex items-center gap-2">
                          <img src={p.images[0]} alt="" className="w-8 h-8 object-contain rounded bg-black" referrerPolicy="no-referrer" />
                          <span className="font-serif font-bold text-white">{p.name}</span>
                        </td>
                        <td className="p-2 text-zinc-400">{p.family}</td>
                        <td className="p-2 font-serif text-[#D4AF37]">${p.priceUSD}</td>
                        <td className="p-2 text-center font-mono font-bold">
                          {editingStockId === p.id ? (
                            <input
                              type="number"
                              value={tempStockValue}
                              onChange={(e) => setTempStockValue(Number(e.target.value))}
                              className="w-16 bg-black border border-[#D4AF37] rounded p-1 text-center text-xs text-white"
                            />
                          ) : (
                            <span className={p.stockCount < 10 ? 'text-amber-400' : 'text-emerald-400'}>
                              {p.stockCount}
                            </span>
                          )}
                        </td>
                        <td className="p-2 text-right">
                          {editingStockId === p.id ? (
                            <button
                              onClick={() => {
                                onUpdateStock(p.id, tempStockValue);
                                setEditingStockId(null);
                              }}
                              className="p-1 bg-[#D4AF37] text-black rounded"
                            >
                              <Save className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingStockId(p.id);
                                setTempStockValue(p.stockCount);
                              }}
                              className="p-1 text-zinc-400 hover:text-white"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
