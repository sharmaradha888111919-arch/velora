import { CartItem } from '../types';

/**
 * Storage key constants
 */
const STORAGE_KEYS = {
  CART: 'velora_atelier_cart_v1',
  WISHLIST: 'velora_atelier_wishlist_v1',
};

// In-memory fallback if localStorage is disabled, throws SecurityError, or is blocked in private browsing
const memoryStore: Record<string, string> = {};

function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    const testKey = '__velora_test_storage__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

const hasStorage = isLocalStorageAvailable();

function getItem(key: string): string | null {
  try {
    if (hasStorage) {
      return window.localStorage.getItem(key);
    }
    return memoryStore[key] || null;
  } catch {
    return memoryStore[key] || null;
  }
}

function setItem(key: string, value: string): void {
  try {
    if (hasStorage) {
      window.localStorage.setItem(key, value);
    } else {
      memoryStore[key] = value;
    }
  } catch {
    memoryStore[key] = value;
  }
}

/**
 * Safe Cart Persistence
 */
export function getSavedCart(): CartItem[] {
  try {
    const raw = getItem(STORAGE_KEYS.CART);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Validate shape of each item
    return parsed.filter((item): item is CartItem => {
      return (
        item &&
        typeof item.id === 'string' &&
        item.product &&
        typeof item.product.id === 'string' &&
        typeof item.product.price === 'number' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0
      );
    });
  } catch (err) {
    console.warn('Recovered gracefully from corrupted cart storage:', err);
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  try {
    setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  } catch (err) {
    console.warn('Failed to save cart to storage:', err);
  }
}

/**
 * Safe Wishlist Persistence
 */
export function getSavedWishlist(): string[] {
  try {
    const raw = getItem(STORAGE_KEYS.WISHLIST);
    if (!raw) return ['prod-01', 'prod-04'];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return ['prod-01', 'prod-04'];
    return parsed.filter((id): id is string => typeof id === 'string');
  } catch (err) {
    console.warn('Recovered gracefully from corrupted wishlist storage:', err);
    return ['prod-01', 'prod-04'];
  }
}

export function saveWishlist(wishlistIds: string[]): void {
  try {
    setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlistIds));
  } catch (err) {
    console.warn('Failed to save wishlist to storage:', err);
  }
}
