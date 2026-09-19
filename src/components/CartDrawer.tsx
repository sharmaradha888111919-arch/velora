import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onNavigateToCollection: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateToCollection,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 1200);
  };

  const handleResetAfterOrder = () => {
    setOrderComplete(false);
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#070709]/75 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#101015] border-l border-[#dfccad]/20 h-full flex flex-col z-10 shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#22222b] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#dfccad]" />
                <h2 className="font-serif text-xl tracking-wider text-[#f5f2eb]">
                  YOUR ATELIER BAG ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                </h2>
              </div>
              <button
                id="cart-drawer-close"
                onClick={onClose}
                className="p-2 rounded-full text-[#888] hover:text-[#fff] hover:bg-[#1a1a24] transition-colors"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {orderComplete ? (
              /* Order Confirmation View */
              <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#dfccad]/10 border border-[#dfccad] flex items-center justify-center text-[#dfccad] mb-6">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <span className="text-xs font-mono tracking-widest text-[#dfccad] uppercase mb-2">
                  ORDER CONFIRMED
                </span>
                <h3 className="font-serif text-3xl text-[#f5f2eb] mb-3">
                  WEAR THE MOMENT.
                </h3>
                <p className="text-xs text-[#a09c94] leading-relaxed mb-6 max-w-xs">
                  Your private atelier order has been placed with VELORA Flagship. Our concierge will dispatch your archival parcel within 24 hours.
                </p>
                <div className="p-4 rounded-xl bg-[#16161f] border border-[#262633] text-left w-full mb-6 text-xs font-mono text-[#8a8880]">
                  <div className="flex justify-between py-1 border-b border-[#222]">
                    <span>ORDER ID</span>
                    <span className="text-[#f5f2eb]">#VEL-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>DELIVERY LOCATION</span>
                    <span className="text-[#dfccad]">C-Scheme, Jaipur / Domestic Express</span>
                  </div>
                </div>
                <button
                  onClick={handleResetAfterOrder}
                  className="w-full py-3 rounded-xl bg-[#dfccad] text-[#0c0c0e] font-medium text-xs tracking-widest uppercase hover:bg-[#ebdcc4] transition-colors"
                >
                  RETURN TO SHOWROOM
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              /* Empty Bag View */
              <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#181822] flex items-center justify-center text-[#555] mb-4">
                  <ShoppingBag className="w-7 h-7 text-[#777]" />
                </div>
                <h3 className="font-serif text-2xl text-[#f5f2eb] mb-2">Your Bag is Empty</h3>
                <p className="text-xs text-[#8c8880] mb-6 max-w-xs">
                  Discover our new edit of sculpted shirts, architectural trousers, and evening velvet form jackets.
                </p>
                <button
                  id="empty-bag-explore-btn"
                  onClick={() => {
                    onClose();
                    onNavigateToCollection();
                  }}
                  className="py-3 px-6 rounded-xl bg-[#dfccad] text-[#0c0c0e] text-xs font-medium tracking-widest uppercase hover:bg-[#e4d4bb] transition-colors flex items-center gap-2"
                >
                  <span>EXPLORE COLLECTION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Bag Items List */
              <>
                <div className="p-4 bg-[#14141c] border-b border-[#22222b] text-[11px] font-mono text-[#cbb38d] flex items-center justify-between">
                  <span>COMPLIMENTARY WHITE-GLOVE COURIER APPLIED</span>
                  <span className="text-emerald-400">FREE</span>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#1e1e28]">
                  {cartItems.map((item) => (
                    <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                      <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#181822] border border-[#292833] flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120'><rect width='100' height='120' fill='%23121217'/><text x='50%' y='55%' text-anchor='middle' fill='%23dfccad' font-size='12'>VELORA</text></svg>";
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="font-serif text-base text-[#f5f2eb] line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-[#666] hover:text-rose-400 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[11px] font-mono text-[#8c8880] mt-0.5">
                            SIZE: <span className="text-[#e6d5b8]">{item.selectedSize}</span> • COLOR: <span className="text-[#e6d5b8]">{item.selectedColor}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-[#2a2935] rounded-md bg-[#181822]">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-xs text-[#888] hover:text-[#fff]"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-mono text-[#f5f2eb]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs text-[#888] hover:text-[#fff]"
                            >
                              +
                            </button>
                          </div>

                          <span className="font-serif text-sm text-[#dfccad]">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Subtotal & Checkout */}
                <div className="p-6 border-t border-[#22222c] bg-[#14141a]">
                  <div className="space-y-2 mb-4 text-xs font-mono">
                    <div className="flex justify-between text-[#8c8880]">
                      <span>SUBTOTAL</span>
                      <span className="text-[#f5f2eb]">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#8c8880]">
                      <span>PACKAGING & ARCHIVAL BOX</span>
                      <span className="text-[#dfccad]">COMPLIMENTARY</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium pt-2 border-t border-[#262633] text-[#f5f2eb]">
                      <span>TOTAL DUE</span>
                      <span className="font-serif text-lg text-[#dfccad]">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                  </div>

                  <button
                    id="cart-checkout-button"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-4 rounded-xl bg-[#dfccad] text-[#0c0c0e] font-medium text-xs tracking-widest uppercase hover:bg-[#ede0cb] transition-all flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(223,204,173,0.25)] cursor-pointer"
                  >
                    {isCheckingOut ? (
                      <span className="animate-pulse">CONNECTING PRIVATE ATELIER...</span>
                    ) : (
                      <>
                        <span>PROCEED TO PRIVATE CHECKOUT</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-[#6e6b66] mt-3 flex items-center justify-center gap-1.5 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#dfccad]" />
                    SECURE 256-BIT ENCRYPTED ATELIER COMMERCE
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
