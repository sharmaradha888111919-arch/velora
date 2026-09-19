import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products.slice(0, 4); // show featured/first 4
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query, products]);

  const quickTags = ['NOIR', 'SILK', 'JACKETS', 'TROUSERS', 'MERINO', 'ATELIER'];

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-[110] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#070709]/85 backdrop-blur-lg"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#111116] border border-[#dfccad]/25 rounded-2xl shadow-2xl overflow-hidden p-6"
      >
        {/* Search Input */}
        <div className="relative flex items-center border-b border-[#282733] pb-4 mb-4">
          <Search className="w-5 h-5 text-[#dfccad] mr-3" />
          <input
            id="search-input-field"
            type="text"
            placeholder="Search silhouettes, materials, jackets, trousers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-[#f5f2eb] placeholder-[#666] font-sans text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#888] hover:text-[#fff] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Tag Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 text-xs">
          <span className="text-[#777] font-mono text-[10px] tracking-wider uppercase mr-1">
            TRENDING:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-[#181822] border border-[#2a2936] text-[#b3af9f] hover:text-[#dfccad] hover:border-[#dfccad]/40 transition-colors whitespace-nowrap text-[11px] font-mono"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
          <div className="text-[10px] font-mono tracking-widest text-[#777] uppercase mb-2">
            {query ? `FOUND ${filteredProducts.length} ATELIER PIECES` : 'RECOMMENDED FOR YOU'}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#777]">
              No pieces found matching "{query}". Try searching for 'Silk', 'Trouser', or 'Black'.
            </div>
          ) : (
            filteredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  onSelectProduct(prod);
                  onClose();
                }}
                className="group flex items-center gap-4 p-2.5 rounded-xl hover:bg-[#181822] border border-transparent hover:border-[#dfccad]/20 transition-all cursor-pointer"
              >
                <div className="w-12 h-14 rounded-lg overflow-hidden bg-[#1a1a24] flex-shrink-0">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-sm text-[#f5f2eb] group-hover:text-[#dfccad] transition-colors">
                    {prod.name}
                  </h4>
                  <p className="text-[11px] text-[#8c8880]">{prod.subtitle}</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-xs text-[#dfccad]">
                    {formatPrice(prod.price)}
                  </span>
                  <div className="text-[10px] text-[#666] font-mono flex items-center justify-end gap-0.5">
                    VIEW <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
