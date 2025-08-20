import React from 'react';
import { Search, X } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  hasActiveSearch: boolean;
}

const SearchBar: React.FC<Props> = ({ value, onChange, hasActiveSearch }) => {
  return (
    <div className="relative">
      <div className="h-10 rounded-full px-4 flex items-center" style={{ background: '#2A313C', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.06)' }}>
        <Search className="w-5 h-5 text-[#9AA3B2] mr-3" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search transactions..."
          className="flex-1 bg-transparent text-white placeholder-[#9AA3B2] outline-none"
        />
        {hasActiveSearch && (
          <button onClick={() => onChange('')} className="ml-2 p-1 hover:bg-white/10 rounded-full">
            <X className="w-4 h-4 text-[#9AA3B2]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

