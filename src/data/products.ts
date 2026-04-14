
export interface ProductVariant {
  id: string;
  color: string;
  colorCode?: string;
  image: string;
  stock: number;
  serialNumber: string;
  sku?: string;
  slug?: string;
  isDefault?: boolean;
}

export interface Product {
  id: number;
  name: string;
  skuPrefix: string;
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