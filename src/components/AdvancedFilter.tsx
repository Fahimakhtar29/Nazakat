import React from 'react';
import { SlidersHorizontal, RotateCcw, X, Check } from 'lucide-react';
import { FilterState, FragranceFamily, Gender } from '../types';

interface AdvancedFilterProps {
  filterState: FilterState;
  onChangeFilter: (updated: Partial<FilterState>) => void;
  onResetFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
  totalResultsCount: number;
}

const FAMILIES: FragranceFamily[] = [
  'Mysore Sandalwood',
  'Kashmiri Saffron & Rose',
  'Assam Oud & Woods',
  'Indian Jasmine & Mogra',
  'Earthy Khus & Vetiver',
  'Royal Spices & Amber',
];

const GENDERS: Gender[] = ['For Men', 'For Women', 'For Everyone', 'Shahi Royal Collection'];

const POPULAR_NOTES = [
  'Mysore Sandalwood',
  'Kannauj Pink Rose',
  'Kashmiri Saffron',
  'Assam Oud',
  'Mogra & Jasmine',
  'Earthy Khus',
  'Green Cardamom',
  'Golden Amber',
];

const OCCASIONS = ['Daily Wear', 'Weddings', 'Puja & Festivals', 'Gifting', 'Special Evenings'];

export const AdvancedFilter: React.FC<AdvancedFilterProps> = ({
  filterState,
  onChangeFilter,
  onResetFilters,
  isOpen,
  onClose,
  totalResultsCount,
}) => {
  const toggleNote = (note: string) => {
    const exists = filterState.selectedNotes.includes(note);
    const updated = exists
      ? filterState.selectedNotes.filter((n) => n !== note)
      : [...filterState.selectedNotes, note];
    onChangeFilter({ selectedNotes: updated });
  };

  const toggleOccasion = (occ: string) => {
    const exists = filterState.selectedOccasions.includes(occ);
    const updated = exists
      ? filterState.selectedOccasions.filter((o) => o !== occ)
      : [...filterState.selectedOccasions, occ];
    onChangeFilter({ selectedOccasions: updated });
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-full sm:w-96 bg-[#0E0E0E] border-r border-[#D4AF37]/40 shadow-2xl p-6 overflow-y-auto transition-transform duration-300 ease-out font-sans ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
            Filter Perfumes
          </h3>
        </div>

        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white p-1 rounded hover:bg-zinc-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6 pt-5">
        {/* Active Count & Reset */}
        <div className="flex items-center justify-between bg-[#141414] p-3 rounded-lg border border-zinc-800 text-xs">
          <span className="text-zinc-300">
            Found <strong className="text-[#D4AF37]">{totalResultsCount}</strong> perfumes
          </span>
          <button
            onClick={onResetFilters}
            className="text-amber-400 hover:underline flex items-center gap-1 font-bold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear All
          </button>
        </div>

        {/* Suitable For */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-bold">
            Suitable For
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onChangeFilter({ gender: 'All' })}
              className={`py-2 px-3 rounded text-xs text-center border transition-all cursor-pointer ${
                filterState.gender === 'All'
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              Show All
            </button>
            {GENDERS.map((g) => (
              <button
                key={g}
                onClick={() => onChangeFilter({ gender: g })}
                className={`py-2 px-3 rounded text-xs text-center border transition-all cursor-pointer ${
                  filterState.gender === g
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Scent Categories */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-bold">
            Scent Category
          </label>
          <div className="space-y-1.5">
            <button
              onClick={() => onChangeFilter({ family: 'All' })}
              className={`w-full text-left px-3 py-2 rounded text-xs border flex items-center justify-between cursor-pointer ${
                filterState.family === 'All'
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] font-bold'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              <span>All Scent Types</span>
              {filterState.family === 'All' && <Check className="w-3.5 h-3.5" />}
            </button>

            {FAMILIES.map((fam) => (
              <button
                key={fam}
                onClick={() => onChangeFilter({ family: fam })}
                className={`w-full text-left px-3 py-2 rounded text-xs border flex items-center justify-between cursor-pointer ${
                  filterState.family === fam
                    ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] font-bold'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <span>{fam}</span>
                {filterState.family === fam && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Specific Scent Notes */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-bold">
            Contains Notes
          </label>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_NOTES.map((note) => {
              const selected = filterState.selectedNotes.includes(note);
              return (
                <button
                  key={note}
                  onClick={() => toggleNote(note)}
                  className={`px-2.5 py-1 rounded-full text-xs border transition-all cursor-pointer ${
                    selected
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  {selected ? '✓ ' : ''}{note}
                </button>
              );
            })}
          </div>
        </div>

        {/* Occasions */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-bold">
            Occasion
          </label>
          <div className="flex flex-wrap gap-1.5">
            {OCCASIONS.map((occ) => {
              const selected = filterState.selectedOccasions.includes(occ);
              return (
                <button
                  key={occ}
                  onClick={() => toggleOccasion(occ)}
                  className={`px-2.5 py-1 rounded text-xs border transition-all cursor-pointer ${
                    selected
                      ? 'bg-[#D4AF37]/30 text-[#D4AF37] border-[#D4AF37] font-bold'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {occ}
                </button>
              );
            })}
          </div>
        </div>

        {/* In Stock Only */}
        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
          <span>In Stock Only</span>
          <input
            type="checkbox"
            checked={filterState.inStockOnly}
            onChange={(e) => onChangeFilter({ inStockOnly: e.target.checked })}
            className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
          />
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-[#D4AF37]/30">
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#D4AF37] hover:bg-[#e0be42] text-black font-bold uppercase tracking-wider text-xs rounded shadow-lg cursor-pointer"
        >
          Apply Filters ({totalResultsCount})
        </button>
      </div>
    </div>
  );
};
