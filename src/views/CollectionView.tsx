import React, { useState, useMemo } from 'react';
import { Product, PageType } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface CollectionViewProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onNavigate: (page: PageType) => void;
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  products,
  onQuickView,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [onlyWishlist, setOnlyWishlist] = useState(false);

  const categories = ['ALL', 'NEW', 'SHIRTS', 'JACKETS', 'TROUSERS', 'ESSENTIALS'];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory === 'NEW') {
      list = list.filter((p) => p.isNew);
    } else if (selectedCategory !== 'ALL') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Wishlist toggle
    if (onlyWishlist) {
      list = list.filter((p) => wishlistIds.includes(p.id));
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return list;
  }, [products, selectedCategory, sortBy, onlyWishlist, wishlistIds]);

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#e8e6e3] pt-28 pb-24 px-5 sm:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15151e] border border-[#dfccad]/20 text-[10px] font-mono tracking-[0.3em] text-[#dfccad] uppercase mb-4"
        >
          <Sparkles className="w-3 h-3 text-[#dfccad]" />
          <span>SPRING / SUMMER 2026 CATALOGUE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#f5f2eb] tracking-wide uppercase mb-3 leading-none"
        >
          THE COLLECTION
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif italic text-[#cbb38d] text-base sm:text-lg tracking-wide mb-2"
        >
          "Designed in silhouettes that move with you."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs text-[#959189] font-sans font-light max-w-md mx-auto leading-relaxed"
        >
          Fine count handwoven textiles, ethical super-130s merino wools, and sculptural micro-velvets tailored with surgical precision.
        </motion.p>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 mb-10 border-b border-[#22222d]">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#dfccad] text-[#0c0c0e] font-semibold shadow-[0_0_15px_rgba(223,204,173,0.3)]'
                    : 'bg-[#15151c] text-[#a09c94] border border-[#242330] hover:text-[#f5f2eb] hover:border-[#dfccad]/30'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Right Controls: Wishlist Filter & Sorting */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Only Wishlisted Toggle */}
          <button
            id="wishlist-filter-toggle"
            onClick={() => setOnlyWishlist(!onlyWishlist)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono tracking-wider flex items-center gap-1.5 transition-colors ${
              onlyWishlist
                ? 'bg-[#cbb38d]/20 border-[#dfccad] text-[#dfccad]'
                : 'bg-[#15151c] border-[#242330] text-[#888] hover:text-[#eee]'
            }`}
          >
            <span>WISHLIST ({wishlistIds.length})</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-[#15151c] border border-[#242330] rounded-lg px-3 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#dfccad]" />
            <select
              id="collection-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-mono text-[#dfccad] focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-[#15151c] text-[#eee]">SORT: FEATURED</option>
              <option value="newest" className="bg-[#15151c] text-[#eee]">SORT: NEWEST</option>
              <option value="price-asc" className="bg-[#15151c] text-[#eee]">PRICE: LOW TO HIGH</option>
              <option value="price-desc" className="bg-[#15151c] text-[#eee]">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>
      </div>

      {/* Showing count indicator */}
      <div className="flex items-center justify-between text-xs font-mono text-[#777] mb-6">
        <span>SHOWING {filteredProducts.length} ATELIER SILHOUETTES</span>
        <span>CATEGORY: {selectedCategory}</span>
      </div>

      {/* Product Grid (At least 8-12 products) */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif text-2xl text-[#888] mb-2">No pieces match your selected filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setOnlyWishlist(false);
            }}
            className="text-xs font-mono text-[#dfccad] underline uppercase"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onQuickView={onQuickView}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};
