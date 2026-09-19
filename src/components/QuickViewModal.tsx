import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { X, Check, ShieldCheck, Truck, RefreshCw, ShoppingBag, Heart } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL', color: string, quantity: number) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL'>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Noir');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'material' | 'shipping' | 'care'>('details');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div
      id="quick-view-overlay"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#070709]/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#111116] border border-[#dfccad]/25 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          id="quick-view-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#1c1c24]/80 text-[#a39f97] hover:text-[#fff] hover:bg-[#252532] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Visual Gallery Column */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-between bg-[#15151c] border-b md:border-b-0 md:border-r border-[#22222c]">
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#0e0e13] border border-[#262633] mb-4">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'><rect width='600' height='800' fill='%23121217'/><circle cx='300' cy='380' r='90' fill='none' stroke='%23cbb38d' stroke-width='1.5' stroke-dasharray='4 4'/><text x='50%' y='49%' text-anchor='middle' font-family='serif' font-size='32' fill='%23e6d5b8' letter-spacing='6'>VELORA</text><text x='50%' y='53%' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%239c835c' letter-spacing='4'>ATELIER PIECE</text></svg>";
              }}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
            {/* Ambient lighting badge */}
            <div className="absolute bottom-3 left-3 bg-[#0c0c0e]/80 backdrop-blur-md px-3 py-1 rounded-md border border-[#dfccad]/20 text-[10px] font-mono text-[#dfccad]">
              ATELIER ARCHIVE • {product.sku}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === i
                      ? 'border-[#dfccad] ring-1 ring-[#dfccad]'
                      : 'border-[#292833] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120'><rect width='100' height='120' fill='%23121217'/><text x='50%' y='55%' text-anchor='middle' fill='%23dfccad' font-size='12'>VELORA</text></svg>";
                    }}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Purchase & Specification Column */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-none">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#8c8880] mb-2">
              <span className="tracking-widest uppercase">{product.category}</span>
              {product.isNew && (
                <span className="text-[#dfccad] tracking-wider uppercase bg-[#dfccad]/10 px-2 py-0.5 rounded">
                  NEW SEASON
                </span>
              )}
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f2eb] tracking-wide mb-1 leading-tight">
              {product.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#a39f97] mb-4">{product.subtitle}</p>

            <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-[#24232c]">
              <span className="font-serif text-2xl text-[#dfccad] font-medium">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#666] line-through font-mono">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-[11px] font-mono text-[#777] ml-auto">
                TAXES INCLUDED • COMPLIMENTARY SHIPPING
              </span>
            </div>

            {/* Color Swatch Selector */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-[#8c8880] tracking-wider uppercase">COLORWAY</span>
                <span className="text-[#f5f2eb] font-medium">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                      selectedColor === color.name
                        ? 'border-[#dfccad] bg-[#dfccad]/10 text-[#f5f2eb]'
                        : 'border-[#2a2935] text-[#888] hover:border-[#444]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-[#444]"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-[#8c8880] tracking-wider uppercase">SELECT SIZE</span>
                <span className="text-[11px] text-[#cbb38d] hover:underline cursor-pointer">
                  SIZE GUIDE
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 rounded-lg text-xs font-mono font-medium tracking-wider transition-all ${
                      selectedSize === size
                        ? 'bg-[#dfccad] text-[#0c0c0e] shadow-[0_0_15px_rgba(223,204,173,0.3)]'
                        : 'bg-[#181822] text-[#ccc] border border-[#2a2935] hover:border-[#cbb38d]/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs text-[#8c8880] tracking-wider uppercase">QTY</span>
              <div className="flex items-center border border-[#2a2935] rounded-lg overflow-hidden bg-[#181822]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm text-[#aaa] hover:text-[#fff] hover:bg-[#252535] transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-1 text-xs font-mono text-[#f5f2eb]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="px-3 py-1.5 text-sm text-[#aaa] hover:text-[#fff] hover:bg-[#252535] transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="text-[11px] text-[#6d6a64] font-mono">
                Only a few pieces reserved in showroom inventory
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                id="modal-add-to-bag-btn"
                onClick={handleAdd}
                disabled={isAddedSuccess}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#dfccad] text-[#0c0c0e] hover:bg-[#eddcc0] font-sans text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(223,204,173,0.25)] cursor-pointer"
              >
                {isAddedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-800" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG • {formatPrice(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist && onToggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition-all ${
                  isWishlisted
                    ? 'bg-[#cbb38d]/20 border-[#cbb38d] text-[#dfccad]'
                    : 'bg-[#181822] border-[#2a2935] text-[#888] hover:text-[#fff] hover:border-[#444]'
                }`}
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Specification Tabs */}
            <div className="border-t border-[#22222c] pt-4">
              <div className="flex border-b border-[#22222c] mb-3 text-xs font-mono">
                {(['details', 'material', 'shipping', 'care'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 px-3 border-b-2 capitalize transition-colors ${
                      activeTab === tab
                        ? 'border-[#dfccad] text-[#dfccad]'
                        : 'border-transparent text-[#777] hover:text-[#aaa]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="text-xs text-[#a09c94] leading-relaxed min-h-[70px]">
                {activeTab === 'details' && (
                  <div>
                    <p className="mb-2">{product.description}</p>
                    <ul className="list-disc pl-4 space-y-1 text-[#8c8880]">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'material' && <p>{product.material}</p>}
                {activeTab === 'shipping' && <p>{product.shipping}</p>}
                {activeTab === 'care' && (
                  <ul className="list-disc pl-4 space-y-1 text-[#8c8880]">
                    {product.care.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Atelier Trust badges */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#22222c] text-[10px] font-mono text-[#77746e]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#dfccad]" />
              <span>AUTHENTIC ATELIER</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#dfccad]" />
              <span>WHITE-GLOVE DISPATCH</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-[#dfccad]" />
              <span>BESPOKE ALTERATIONS</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
