import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Layers, ShieldCheck, Clock, Compass, Info } from 'lucide-react';

interface NoteDetail {
  name: string;
  arabicName?: string;
  origin: string;
  description: string;
  icon: string;
  intensity: number;
}

interface PyramidSection {
  id: 'top' | 'heart' | 'base';
  title: string;
  subtitle: string;
  evaporationTime: string;
  notes: NoteDetail[];
}

const PYRAMID_DATA: PyramidSection[] = [
  {
    id: 'top',
    title: 'Top Notes (Head)',
    subtitle: 'First impression upon application (0 - 30 minutes)',
    evaporationTime: 'Immediate Awadhi Impression',
    notes: [
      {
        name: 'Awadhi Dew Drops',
        origin: 'Lucknow Royal Courtyards',
        description: 'Crisp, refreshing morning atmospheric air captured over silver brass dew catchers.',
        icon: '💧',
        intensity: 85,
      },
      {
        name: 'Kashmiri Royal Saffron',
        origin: 'Pampore, Kashmir Valley',
        description: 'Handpicked crocus filaments offering warm golden spice notes and honeyed undertones.',
        icon: '🌸',
        intensity: 90,
      },
      {
        name: 'Green Cardamom Infusion',
        origin: 'Western Ghats, Malabar',
        description: 'Subtle aromatic spice adding clean energetic top sparkle.',
        icon: '🌿',
        intensity: 75,
      },
    ],
  },
  {
    id: 'heart',
    title: 'Heart Notes (Heart)',
    subtitle: 'The true personality of the attar (30 mins - 6 hours)',
    evaporationTime: 'Core Fragrance Story',
    notes: [
      {
        name: 'Nawabi Black Musk',
        origin: 'Awadhi Court Secret Recipe',
        description: 'Velvety, rich, warm royal musk extract blending sweet floral undertones.',
        icon: '👑',
        intensity: 95,
      },
      {
        name: 'Lucknowi Gulab (Rose Petals)',
        origin: 'Kannauj Copper Still Distillation',
        description: 'Pure Damask rose petals cooked over slow firewood in copper deg stills.',
        icon: '🌹',
        intensity: 88,
      },
      {
        name: 'Royal Jasmine Sambac',
        origin: 'Madurai Royal Gardens',
        description: 'Night-blooming white jasmine flowers offering narcotic sweet florals.',
        icon: '✨',
        intensity: 80,
      },
    ],
  },
  {
    id: 'base',
    title: 'Base Notes (Soul)',
    subtitle: 'Deep memorable foundation that lasts on skin & fabric (6 - 36+ hours)',
    evaporationTime: '36+ Hours Unrivalled Longevity',
    notes: [
      {
        name: 'Golden Amber Resin',
        origin: 'Ancient Fossilized Tree Resin',
        description: 'Warm, balsamic, rich golden amber that binds the attar to skin.',
        icon: '🌕',
        intensity: 98,
      },
      {
        name: 'Mysore Sandalwood Oil',
        origin: 'Mysore, Karnataka',
        description: '100% Pure Santalum Album oil acting as the natural alcohol-free carrier.',
        icon: '🪵',
        intensity: 92,
      },
      {
        name: '30-Year Aged Assam Oud',
        origin: 'Wild Assam Agarwood Forests',
        description: 'Deep, smoky, aristocratic resinous agarwood distilled in copper.',
        icon: '🔥',
        intensity: 96,
      },
    ],
  },
];

export const InteractiveFragrancePyramid: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'top' | 'heart' | 'base'>('heart');
  const [hoveredNote, setHoveredNote] = useState<NoteDetail | null>(PYRAMID_DATA[1].notes[0]);

  const currentSection = PYRAMID_DATA.find((s) => s.id === activeSection) || PYRAMID_DATA[1];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] text-[#F8F6F2] relative overflow-hidden border-t border-[#D4AF37]/20">
      {/* Background Radial Emerald Glow */}
      <div className="absolute inset-0 bg-emerald-radial pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#D4AF37] block font-bold">
            Interactive Fragrance Architecture
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-[#F8F6F2] tracking-wide">
            The Scent Pyramid of NAZAKAT
          </h2>
          <p className="font-cormorant text-stone-300 text-lg italic leading-relaxed">
            Unfold the three layers of Nawabi Adab distilled into every pure drop of our flagship attar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Interactive Visual Pyramid */}
          <div className="lg:col-span-6 space-y-4 flex flex-col items-center">
            {PYRAMID_DATA.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <motion.button
                  key={sec.id}
                  onClick={() => {
                    setActiveSection(sec.id);
                    setHoveredNote(sec.notes[0]);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full max-w-md p-5 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#181818] via-[#1C1810] to-[#181818] border-[#D4AF37] shadow-[0_10px_30px_rgba(212,175,55,0.25)] ring-1 ring-[#D4AF37]/60'
                      : 'bg-[#121212]/80 border-stone-800 hover:border-[#D4AF37]/40 text-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-xs font-serif tracking-widest uppercase block ${isActive ? 'text-[#F5D77F]' : 'text-stone-400'}`}>
                        {sec.evaporationTime}
                      </span>
                      <h3 className={`font-cinzel text-xl font-bold mt-0.5 ${isActive ? 'text-[#F8F6F2]' : 'text-stone-300'}`}>
                        {sec.title}
                      </h3>
                    </div>
                    <span className="text-2xl">{sec.notes[0].icon}</span>
                  </div>

                  {/* Notes summary badges */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-stone-800/60">
                    {sec.notes.map((n) => (
                      <span
                        key={n.name}
                        className={`text-[11px] px-2.5 py-0.5 rounded-full font-serif ${
                          isActive
                            ? 'bg-[#2A2416] text-[#F5D77F] border border-[#D4AF37]/40'
                            : 'bg-stone-900 text-stone-400 border border-stone-800'
                        }`}
                      >
                        {n.icon} {n.name}
                      </span>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right Column: Note Inspector & Ingredient Cards */}
          <div className="lg:col-span-6 bg-[#141414] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <span className="text-xs text-[#D4AF37] font-serif uppercase tracking-widest block font-semibold">
                  Layer: {currentSection.title}
                </span>
                <p className="text-xs text-stone-400 font-sans mt-0.5">{currentSection.subtitle}</p>
              </div>
              <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
            </div>

            {/* Note Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {currentSection.notes.map((note) => {
                const isSelected = hoveredNote?.name === note.name;
                return (
                  <button
                    key={note.name}
                    onClick={() => setHoveredNote(note)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#221D12] border-[#D4AF37] text-[#F5D77F] shadow-md'
                        : 'bg-[#181818] border-stone-800 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <div className="text-xl mb-1">{note.icon}</div>
                    <div className="font-serif text-sm font-bold truncate">{note.name}</div>
                    <div className="text-[10px] text-stone-400 truncate">{note.origin}</div>
                  </button>
                );
              })}
            </div>

            {/* Note Details Display */}
            <AnimatePresence mode="wait">
              {hoveredNote && (
                <motion.div
                  key={hoveredNote.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 rounded-xl bg-[#0F0F0F] border border-[#D4AF37]/30 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-lg bg-[#1C1810] border border-[#D4AF37]/40">
                      {hoveredNote.icon}
                    </span>
                    <div>
                      <h4 className="font-cinzel text-lg font-bold text-[#F8F6F2]">
                        {hoveredNote.name}
                      </h4>
                      <p className="text-xs text-[#D4AF37] font-serif">
                        Sourced From: {hoveredNote.origin}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed font-sans font-medium">
                    {hoveredNote.description}
                  </p>

                  {/* Intensity Bar */}
                  <div className="pt-2">
                    <div className="flex justify-between text-[11px] text-stone-400 font-sans mb-1">
                      <span>Fragrance Concentration</span>
                      <span className="text-[#D4AF37] font-bold">{hoveredNote.intensity}% Pure Extract</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden border border-stone-800">
                      <div
                        className="h-full bg-gradient-to-r from-[#A8821F] to-[#F5D77F] rounded-full"
                        style={{ width: `${hoveredNote.intensity}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Performance Gauges */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-stone-800 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#181818] border border-stone-800">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <div>
                  <span className="text-stone-400 block text-[10px] font-sans">Longevity</span>
                  <span className="font-serif text-[#F5D77F] font-bold">36+ Hours on Fabric</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#181818] border border-stone-800">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <div>
                  <span className="text-stone-400 block text-[10px] font-sans">Sillage / Projection</span>
                  <span className="font-serif text-[#F5D77F] font-bold">5/5 Royal Aura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
