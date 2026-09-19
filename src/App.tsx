import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { AppointmentModal } from './components/AppointmentModal';

import { HomeView } from './views/HomeView';
import { CollectionView } from './views/CollectionView';
import { ShowroomView } from './views/ShowroomView';

import { PRODUCTS } from './data/products';
import { Product, CartItem, PageType } from './types';
import { Check } from 'lucide-react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { getSavedCart, saveCart, getSavedWishlist, saveWishlist } from './utils/storage';

const getInitialPage = (): PageType => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
  if (path === '/collection') return 'collection';
  if (path === '/showroom') return 'showroom';
  return 'home';
};

const getPathForPage = (page: PageType): string => {
  if (page === 'collection') return '/collection';
  if (page === 'showroom') return '/showroom';
  return '/';
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageType>(getInitialPage);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Cart & Wishlist State with safe local storage recovery
  const [cartItems, setCartItems] = useState<CartItem[]>(() => getSavedCart());
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => getSavedWishlist());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  // Persist cart changes
  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  // Persist wishlist changes
  useEffect(() => {
    saveWishlist(wishlistIds);
  }, [wishlistIds]);

  // Sync browser title with page
  useEffect(() => {
    if (currentPage === 'home') {
      document.title = 'VELORA | Luxury Fashion Showroom';
    } else if (currentPage === 'collection') {
      document.title = 'VELORA | The Atelier Collection';
    } else if (currentPage === 'showroom') {
      document.title = 'VELORA | Digital 3D Showroom';
    }
  }, [currentPage]);

  // Browser Back/Forward navigation listener
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Page Transition handler (< 600ms) with History API push
  const handleNavigate = (newPage: PageType, pushToHistory: boolean = true) => {
    if (newPage === currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (pushToHistory && typeof window !== 'undefined') {
      const targetPath = getPathForPage(newPage);
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ page: newPage }, '', targetPath);
      }
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0 });
      setTimeout(() => {
        setIsTransitioning(false);
      }, 250);
    }, 300);
  };

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    size: 'XS' | 'S' | 'M' | 'L' | 'XL',
    color: string,
    quantity: number
  ) => {
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor === color
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${size}-${color}-${Date.now()}`,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity,
      };
      setCartItems((prev) => [newItem, ...prev]);
    }

    showToast(`Added ${quantity}x "${product.name}" to Atelier Bag`);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from Atelier Bag');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Handler
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed from Wishlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Added "${product.name}" to Wishlist`);
        return [...prev, product.id];
      }
    });
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickViewProduct(null);
        setIsCartOpen(false);
        setIsSearchOpen(false);
        setIsAppointmentOpen(false);
      }
      if (e.key === '/' && !isSearchOpen && !quickViewProduct) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, quickViewProduct]);

  return (
    <div className="relative min-h-screen bg-[#0c0c0e] text-[#e8e6e3] selection:bg-[#cbb38d] selection:text-[#0c0c0e]">
      {/* Desktop Custom Magnet Cursor */}
      <CustomCursor />

      {/* Cinematic Initial Preloader */}
      {isLoading && <Preloader onLoaded={() => setIsLoading(false)} />}

      {/* Sticky Luxury Navigation */}
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative min-h-screen">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ErrorBoundary moduleName="VELORA Atelier Home">
                <HomeView
                  products={PRODUCTS}
                  onNavigate={handleNavigate}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  wishlistIds={wishlistIds}
                  onToggleWishlist={handleToggleWishlist}
                  onOpenAppointment={() => setIsAppointmentOpen(true)}
                />
              </ErrorBoundary>
            </motion.div>
          )}

          {currentPage === 'collection' && (
            <motion.div
              key="collection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ErrorBoundary moduleName="VELORA Collection">
                <CollectionView
                  products={PRODUCTS}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  wishlistIds={wishlistIds}
                  onToggleWishlist={handleToggleWishlist}
                  onNavigate={handleNavigate}
                />
              </ErrorBoundary>
            </motion.div>
          )}

          {currentPage === 'showroom' && (
            <motion.div
              key="showroom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ErrorBoundary moduleName="VELORA 3D Showroom">
                <ShowroomView
                  products={PRODUCTS}
                  onNavigate={handleNavigate}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onOpenAppointment={() => setIsAppointmentOpen(true)}
                />
              </ErrorBoundary>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Page Transition Shutter Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-[#09090c] pointer-events-none flex items-center justify-center"
          >
            <div className="font-serif text-2xl tracking-[0.25em] text-[#dfccad]">
              VELORA
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer across all pages */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />

      {/* Global Modals & Drawers */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onNavigateToCollection={() => handleNavigate('collection')}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />

      {/* Interactive Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-[160] px-4 py-3 bg-[#16161f] border border-[#dfccad]/40 text-[#f5f2eb] rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-5 h-5 rounded-full bg-[#dfccad] flex items-center justify-center text-[#0c0c0e]">
              <Check className="w-3 h-3 text-[#0c0c0e]" />
            </div>
            <span className="text-xs font-mono tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
