// types/product.ts
export interface ProductVariant {
  id: string;
  color: string;
  colorCode?: string;
  image: string;
  stock: number;
  serialNumber: string;
  sku: string; // Full SKU with prefix
  isDefault?: boolean;
  slug?: string; // For SEO-friendly URLs
}

export interface Product {
  id: number;
  name: string;
  skuPrefix: string; // User-defined 3-letter prefix
  category: string;
  subCategory?: string;
  description?: string;
  basePrice: number;
  materials?: string;
  careInstructions?: string;
  variants: ProductVariant[];
  isFeatured?: boolean;
  createdAt: Date;
}