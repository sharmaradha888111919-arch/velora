import React, { useState } from 'react';
import { Product } from '../types';
import { Heart, Eye, ArrowUpRight, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  isWishlisted = false,
  onToggleWishlist,
  index = 0,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) setActiveImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImageIndex(0);
      }}
      className="group relative flex flex-col bg-[#111115] border border-[#23222a] rounded-xl overflow-hidden transition-all duration-500 hover:border-[#cbb38d]/40 hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8),0_0_25px_-5px_rgba(203,179,141,0.12)]"
    >
      {/* Visual Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#16161b] select-none">
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'><rect width='600' height='800' fill='%23121217'/><circle cx='300' cy='380' r='90' fill='none' stroke='%23cbb38d' stroke-width='1.5' stroke-dasharray='4 4'/><text x='50%' y='49%' text-anchor='middle' font-family='serif' font-size='32' fill='%23e6d5b8' letter-spacing='6'>VELORA</text><text x='50%' y='53%' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%239c835c' letter-spacing='4'>ATELIER PIECE</text></svg>";
          }}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Dark Gradient on bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-transparent to-transparent opacity-60" />

        {/* Subtle light sweep overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#dfccad]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#dfccad] text-[#0c0c0e] text-[9px] font-mono tracking-widest uppercase font-semibold">
              NEW EDIT
            </span>
          )}
          {product.isFeatured && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#1e1e26]/80 backdrop-blur-md border border-[#cbb38d]/30 text-[#e6d5b8] text-[9px] font-mono tracking-widest uppercase">
              SHOWCASE
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleWishlist) onToggleWishlist(product);
          }}
          className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all z-10 ${
            isWishlisted
              ? 'bg-[#cbb38d] text-[#0c0c0e]'
              : 'bg-[#121217]/70 text-[#aaa] hover:text-[#fff] hover:bg-[#1a1a24]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Floating Action Bar */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={() => onQuickView(product)}
            className="w-full py-2.5 px-4 rounded-lg bg-[#f5f2eb] text-[#0c0c0e] hover:bg-[#dfccad] font-sans text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>QUICK VIEW</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-[#111115]">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8a8782] mb-1">
            <span>{product.category}</span>
            <span>{product.sku}</span>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-lg text-[#f4eee2] hover:text-[#cbb38d] transition-colors cursor-pointer tracking-wide mb-1 leading-snug"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#95918a] line-clamp-1 mb-3">
            {product.subtitle}
          </p>
        </div>

        <div>
          {/* Color swatches */}
          <div className="flex items-center gap-1.5 mb-3">
            {product.colors.map((c, i) => (
              <span
                key={i}
                title={c.name}
                className="w-3 h-3 rounded-full border border-[#444] shadow-inner"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>

          {/* Pricing & CTA */}
          <div className="pt-2.5 border-t border-[#1e1e26] flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-base text-[#e6d5b8] font-medium">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#6e6b66] line-through font-mono">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <button
              onClick={() => onQuickView(product)}
              className="text-[#95918a] hover:text-[#dfccad] transition-colors flex items-center text-xs tracking-wider"
              aria-label={`View details of ${product.name}`}
            >
              <span>DETAILS</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
