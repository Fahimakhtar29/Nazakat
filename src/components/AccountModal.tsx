import React, { useState } from 'react';
import { User, X, Award, Package, MapPin, Calendar, Check, Clock, ChevronRight, ShieldCheck, Phone } from 'lucide-react';
import { Currency } from '../types';
import { MOBILE_NUMBER, WHATSAPP_NUMBER, WHATSAPP_LINK } from '../constants/brand';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCurrency: Currency;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, activeCurrency }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'orders' | 'rewards' | 'addresses' | 'consultation'>('orders');
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  const mockOrders = [
    {
      id: 'MLE-2026-9842',
      date: 'July 28, 2026',
      items: "L'Oud Impérial (100ml) + Amber Solaris (100ml)",
      total: '$870',
      status: 'Shipped via Express',
      tracking: 'DHL-EXPRESS-99841',
      estDelivery: 'August 02, 2026',
    },
    {
      id: 'MLE-2026-4412',
      date: 'May 14, 2026',
      items: 'Velvet Rose Nocturne (100ml)',
      total: '$450',
      status: 'Delivered',
      tracking: 'DHL-EXPRESS-77120',
      estDelivery: 'May 17, 2026',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-3xl bg-[#0E0E0E] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-3">
            <img
              src="/brand_logo.png"
              alt="Shahi Sugandh Brand Logo"
              className="w-10 h-10 object-cover rounded-full border-2 border-[#D4AF37] bg-black/80 p-0.5"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                Rajesh Sharma <span className="text-[10px] bg-[#D4AF37] text-black px-2 py-0.5 rounded font-sans font-bold">Shahi VIP</span>
              </h3>
              <p className="text-xs text-[#D4AF37] font-mono flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Imperial Diamond VIP Member
              </p>
            </div>
          </div>

          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reward Points Banner */}
        <div className="my-6 p-4 rounded-xl bg-gradient-to-r from-[#181818] via-[#1A1A1A] to-[#181818] border border-[#D4AF37]/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-zinc-400 block">ROYAL REWARD POINTS BALANCE</span>
            <span className="font-serif text-2xl font-bold text-[#D4AF37]">2,850 Gold Points</span>
          </div>

          <span className="text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full font-mono border border-[#D4AF37]/40">
            Platinum Status Tier
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-zinc-800 text-xs font-mono uppercase tracking-widest gap-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'border-[#D4AF37] text-[#D4AF37] font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Orders & Tracking
          </button>

          <button
            onClick={() => setActiveTab('consultation')}
            className={`py-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'consultation' ? 'border-[#D4AF37] text-[#D4AF37] font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Bespoke Consultation
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'addresses' ? 'border-[#D4AF37] text-[#D4AF37] font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Saved Residences
          </button>
        </div>

        {/* Tab Body */}
        <div className="py-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'orders' && (
            <div className="space-y-3">
              {mockOrders.map((ord) => (
                <div key={ord.id} className="p-4 rounded-xl bg-[#141414] border border-zinc-800 space-y-3">
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <span className="font-serif font-bold text-white text-sm">{ord.id}</span>
                      <span className="text-zinc-500 block text-[11px]">{ord.date}</span>
                    </div>
                    <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded border border-[#D4AF37]/30">
                      {ord.status}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 font-serif">{ord.items}</p>

                  <div className="flex justify-between items-center text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                    <span>Tracking: <strong className="text-amber-200">{ord.tracking}</strong></span>
                    <span>Total: <strong className="text-[#D4AF37]">{ord.total}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'consultation' && (
            <div className="p-6 rounded-xl bg-[#141414] border border-[#D4AF37]/30 text-center space-y-4">
              {!appointmentBooked ? (
                <>
                  <Calendar className="w-10 h-10 text-[#D4AF37] mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-white">
                    Schedule Private Olfactory Session
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto">
                    Book a 1-on-1 virtual or in-person consultation with our Master Perfumers in Lucknow or Kannauj.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={`tel:${MOBILE_NUMBER.replace(/\s+/g, '')}`}
                      className="px-5 py-2.5 bg-stone-900 border border-[#D4AF37] text-white font-bold text-xs uppercase rounded flex items-center justify-center gap-2 hover:bg-stone-800"
                    >
                      <Phone className="w-4 h-4 text-[#D4AF37]" /> Call: {MOBILE_NUMBER}
                    </a>
                    <a
                      href={`${WHATSAPP_LINK}?text=Adab!%20I%20would%20like%20to%20book%20a%20private%20perfume%20consultation.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-emerald-800 text-white font-bold text-xs uppercase rounded flex items-center justify-center gap-2 hover:bg-emerald-700"
                    >
                      WhatsApp: {WHATSAPP_NUMBER}
                    </a>
                  </div>
                </>
              ) : (
                <div className="space-y-2 text-emerald-400 text-xs">
                  <Check className="w-8 h-8 mx-auto" />
                  <p className="font-serif text-sm font-bold">Private Session Confirmed</p>
                  <p className="text-zinc-400">Our concierge team will reach out via WhatsApp at {WHATSAPP_NUMBER}.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="p-4 rounded-xl bg-[#141414] border border-zinc-800 flex justify-between items-center">
                <div>
                  <span className="font-serif font-bold text-white block">Paris Residence</span>
                  <p className="text-zinc-400">12 Avenue Montaigne, 75008 Paris, France</p>
                </div>
                <span className="text-[10px] text-[#D4AF37] border border-[#D4AF37] px-2 py-0.5 rounded">Default</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
