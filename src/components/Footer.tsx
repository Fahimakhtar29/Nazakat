import React, { useState } from 'react';
import { Sparkles, Send, Check, ShieldCheck, Award, MapPin, Phone } from 'lucide-react';
import { BRAND_LOGO_URL, MOBILE_NUMBER, WHATSAPP_NUMBER, WHATSAPP_LINK } from '../constants/brand';

interface FooterProps {
  onOpenQuiz: () => void;
  onOpenAIAdvisor: () => void;
  onOpenLayeringTool: () => void;
  onOpenBlog: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQuiz,
  onOpenAIAdvisor,
  onOpenLayeringTool,
  onOpenBlog,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#FAF5EE] border-t border-[#D4AF37]/40 text-stone-700 font-sans pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Newsletter Offer Box */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#D4AF37]/50 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 max-w-xl text-center lg:text-left">
            <span className="text-xs uppercase tracking-wider text-[#B8860B] font-bold flex items-center justify-center lg:justify-start gap-2">
              <Sparkles className="w-4 h-4" /> Get 10% Extra Off On First Order
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-bold">
              Join Our VIP Customer Family
            </h3>
            <p className="text-xs text-stone-600 font-sans font-medium">
              Enter your email or phone number to receive instant 10% discount coupon code and early access to pure Ittar drops.
            </p>
          </div>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                required
                placeholder="Enter email or mobile number..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-[#FAF5EE] border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 placeholder-stone-500 focus:outline-none focus:border-[#B8860B] min-w-[260px] font-medium"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#B8860B] hover:bg-[#966d09] text-white font-bold uppercase tracking-wider text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Get 10% Discount
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-[#FAF0DC] border border-[#B8860B] text-[#B8860B] text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" /> Thank you! Use coupon code <strong className="text-stone-900">SHAHI10</strong> at checkout for 10% off.
            </div>
          )}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6 border-t border-stone-300">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative">
                <img
                  src={BRAND_LOGO_URL}
                  onError={(e) => {
                    e.currentTarget.src = '/brand_logo.png';
                  }}
                  alt="NAZAKAT Brand Logo"
                  className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-full border-3 border-black shadow-[0_0_20px_rgba(0,0,0,0.15)] bg-white p-1 ring-2 ring-[#D4AF37]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -inset-1 rounded-full border-2 border-[#D4AF37]/60 pointer-events-none" />
              </div>
              <div>
                <span className="font-cinzel text-3xl sm:text-4xl font-black text-black tracking-[0.15em] block leading-tight">
                  NAZAKAT
                </span>
                <span className="font-cormorant text-base sm:text-lg italic text-black font-extrabold tracking-[0.15em] block mt-1">
                  An Essence of Nawabi Adab
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-sans font-medium">
              100% Pure & Alcohol-Free Royal Awadhi Nawabi Perfumes and Ittars handcrafted in Lucknow, Kannauj, and Mysore.
            </p>
            <div className="text-xs text-[#B8860B] space-y-1 font-sans font-semibold">
              <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#B8860B]" /> Distillation Unit: Kannauj, Uttar Pradesh</p>
              <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#B8860B]" /> Sandalwood Estate: Mysore, Karnataka</p>
            </div>
          </div>

          {/* Perfume Tools */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">
              Quick Features
            </h4>
            <ul className="space-y-2 text-xs text-stone-700 font-sans font-medium">
              <li>
                <button onClick={onOpenAIAdvisor} className="hover:text-[#B8860B] transition-colors cursor-pointer">
                  🤖 AI Perfume Advisor
                </button>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-[#B8860B] transition-colors cursor-pointer">
                  🧭 30-Second Scent Quiz
                </button>
              </li>
              <li>
                <button onClick={onOpenLayeringTool} className="hover:text-[#B8860B] transition-colors cursor-pointer">
                  ✨ Perfume Mix & Match Helper
                </button>
              </li>
              <li>
                <button onClick={onOpenBlog} className="hover:text-[#B8860B] transition-colors cursor-pointer">
                  📖 Perfume Knowledge Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Guarantees */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">
              Our Commitments
            </h4>
            <ul className="space-y-2 text-xs text-stone-700 font-sans font-medium">
              <li className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-[#B8860B]" /> 100% Alcohol-Free Pure Ittars
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" /> 24+ Hours Long Lasting Guarantee
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" /> 2 FREE Samples With Every Order
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">
              Customer Support
            </h4>
            <p className="text-xs text-stone-700 font-medium">
              Email: <strong>support@nazakat.com</strong>
            </p>
            <div className="space-y-1.5 text-xs text-stone-900 font-medium pt-1">
              <a
                href={`tel:${MOBILE_NUMBER.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 hover:text-[#B8860B] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Mobile / Helpline: <strong className="text-black">{MOBILE_NUMBER}</strong></span>
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-800 font-bold hover:text-emerald-600 transition-colors"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-black">WA</span>
                <span>WhatsApp Order & Inquiry: <strong className="text-emerald-900">{WHATSAPP_NUMBER}</strong></span>
              </a>
            </div>
            <p className="text-[11px] text-stone-500 pt-1">
              Mon - Sat (9:00 AM to 8:00 PM IST)
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-300 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 font-sans font-medium gap-3">
          <p>© 2026 NAZAKAT • An Essence of Nawabi Adab. All rights reserved. Lucknow • Kannauj • Mysore.</p>
          <div className="flex items-center gap-3 text-stone-600">
            <span>Free Shipping Across India</span>
            <span>•</span>
            <span>Cash on Delivery Available</span>
            <span>•</span>
            <span>Easy 7-Day Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
