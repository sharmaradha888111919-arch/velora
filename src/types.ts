export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'SHIRTS' | 'JACKETS' | 'TROUSERS' | 'ESSENTIALS';
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  images: string[];
  description: string;
  material: string;
  details: string[];
  care: string[];
  shipping: string;
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL')[];
  colors: {
    name: string;
    hex: string;
  }[];
  sku: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: 'XS' | 'S' | 'M' | 'L' | 'XL';
  selectedColor: string;
  quantity: number;
}

export interface Hotspot {
  id: string;
  title: string;
  collectionKey: string;
  subtitle: string;
  description: string;
  position: [number, number, number];
  featuredProduct: string;
  image: string;
}

export type PageType = 'home' | 'collection' | 'showroom';
