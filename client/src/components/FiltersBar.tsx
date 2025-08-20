import React, { useMemo, useState } from 'react';

interface Props {
  dateFrom?: string;
  dateTo?: string;
  setDateFrom: (v?: string) => void;
  setDateTo: (v?: string) => void;
  categories: string[];
  selectedCategories: Set<string>;
  toggleCategory: (c: string) => void;
  clearFilters: () => void;
}

const FiltersBar: React.FC<Props> = ({ dateFrom, dateTo, setDateFrom, setDateTo, categories, selectedCategories, toggleCategory, clearFilters }) => {
  const [open, setOpen] = useState(false);
  const hasActive = useMemo(() => !!dateFrom || !!dateTo || selectedCategories.size > 0, [dateFrom, dateTo, selectedCategories]);

  const chips = [
    ...(dateFrom ? [{ key: 'from', label: `From ${dateFrom}` }] as const : []),
    ...(dateTo ? [{ key: 'to', label: `To ${dateTo}` }] as const : []),
    ...Array.from(selectedCategories).map((c) => ({ key: `cat:${c}`, label: c })),
  ];

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <button onClick={() => setOpen((v) => !v)} className="h-9 rounded-full px-3 bg-white/10 hover:bg-white/15 text-sm">Filters</button>
        {hasActive && (
          <button onClick={clearFilters} className="h-9 rounded-full px-3 bg-white/10 hover:bg-white/15 text-sm">Clear</button>
        )}
      </div>
      {chips.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span key={c.key} className="text-xs bg-white/10 rounded-full px-2 py-1">{c.label}</span>
          ))}
        </div>
      )}
      {open && (
        <div className="mt-3 rounded-2xl p-3" style={{ background: '#181A1F', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.06)' }}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <div className="text-sm text-white/70 mb-1">Date range</div>
              <div className="flex items-center gap-2">
                <input type="date" className="bg-white/10 rounded px-2 py-1 text-sm" value={dateFrom || ''} onChange={(e) => setDateFrom(e.target.value || undefined)} />
                <span className="text-white/40">to</span>
                <input type="date" className="bg-white/10 rounded px-2 py-1 text-sm" value={dateTo || ''} onChange={(e) => setDateTo(e.target.value || undefined)} />
              </div>
            </div>

            <div>
              <div className="text-sm text-white/70 mb-1">Categories</div>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => {
                  const active = selectedCategories.has(c);
                  return (
                    <button key={c} onClick={() => toggleCategory(c)} className={`px-3 py-1 rounded-full text-sm ${active ? 'bg-white/20' : 'bg-white/10 hover:bg-white/15'}`}>
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersBar;

