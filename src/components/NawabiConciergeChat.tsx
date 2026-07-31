import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BRAND_LOGO_URL, MOBILE_NUMBER, WHATSAPP_NUMBER, WHATSAPP_LINK } from '../constants/brand';

interface NawabiConciergeChatProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenScentAdvisor: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'concierge' | 'user';
  text: string;
  time: string;
  options?: { label: string; action: () => void }[];
}

export const NawabiConciergeChat: React.FC<NawabiConciergeChatProps> = ({
  isOpen,
  onClose,
  onOpenScentAdvisor,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'concierge',
      text: 'Adab! Welcome to NAZAKAT Nawabi Royal Concierge. I am Mirza, your personal Awadhi fragrance specialist. How may I assist your royal senses today?',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: input,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = input;
    setInput('');

    // Generate Nawabi response
    setTimeout(() => {
      let replyText = 'It is my absolute honor to serve you. For our flagship NAZAKAT Nawabi Musk attar, distilled in traditional copper degs over pure sandalwood base, we provide 100% alcohol-free oil lasting up to 36 hours.';
      
      if (query.toLowerCase().includes('whatsapp') || query.toLowerCase().includes('order') || query.toLowerCase().includes('buy') || query.toLowerCase().includes('call') || query.toLowerCase().includes('contact')) {
        replyText = `You can instantly order or speak with our Nawabi Concierge team on Mobile at ${MOBILE_NUMBER} or via WhatsApp at ${WHATSAPP_NUMBER}!`;
      } else if (query.toLowerCase().includes('gift') || query.toLowerCase().includes('engrav')) {
        replyText = 'We offer complimentary gold foil custom name engraving on every NAZAKAT 12ml, 30ml, and 50ml octagonal crystal bottle and presentation box!';
      }

      const botReply: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'concierge',
        text: replyText,
        time: 'Just now',
      };
      setMessages((prev) => [...prev, botReply]);
    }, 700);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="relative w-full max-w-lg bg-[#121212] border border-[#D4AF37]/50 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden text-[#F8F6F2] flex flex-col h-[580px]"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#181818] via-[#1C1810] to-[#181818] border-b border-[#D4AF37]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={BRAND_LOGO_URL}
                  onError={(e) => {
                    e.currentTarget.src = '/brand_logo.png';
                  }}
                  alt="Nawabi Concierge"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#D4AF37] object-cover bg-white p-0.5 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#121212]" />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-extrabold text-[#F5D77F] tracking-wide">
                  NAZAKAT Nawabi Concierge
                </h3>
                <p className="font-cormorant text-xs italic text-[#D4AF37] font-semibold">
                  An Essence of Nawabi Adab • Lucknow
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-400 hover:text-[#D4AF37] hover:bg-[#1E1E1E] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs bg-[#0E0E0E]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-stone-950 font-semibold rounded-br-none shadow-md'
                      : 'bg-[#1A1A1A] border border-[#D4AF37]/30 text-stone-200 rounded-bl-none leading-relaxed'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-stone-500 mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Quick Action Chips */}
          <div className="px-4 py-2 bg-[#141414] border-t border-stone-800 flex gap-2 overflow-x-auto text-[11px] no-scrollbar">
            <button
              onClick={onOpenScentAdvisor}
              className="px-3 py-1 rounded-full bg-[#201D14] border border-[#D4AF37]/40 text-[#F5D77F] whitespace-nowrap hover:bg-[#2A2518] transition-all cursor-pointer flex items-center gap-1 font-serif"
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37]" /> AI Scent Helper
            </button>
            <a
              href={`${WHATSAPP_LINK}?text=Adab!%20I%20would%20like%20to%20order%20NAZAKAT%20Nawabi%20Perfume.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-600/50 text-emerald-300 whitespace-nowrap hover:bg-emerald-900 transition-all cursor-pointer flex items-center gap-1 font-serif"
            >
              <Phone className="w-3 h-3 text-emerald-400" /> WhatsApp Order ({WHATSAPP_NUMBER})
            </a>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#181818] border-t border-stone-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about NAZAKAT notes, delivery, or custom gifts..."
              className="flex-1 bg-[#0F0F0F] border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              onClick={handleSend}
              className="p-2.5 btn-gold rounded-xl text-stone-950 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
