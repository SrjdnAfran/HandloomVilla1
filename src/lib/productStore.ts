import { create } from 'zustand';
import { Product, ProductVariant } from '@/data/products';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  loadProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, updatedProduct: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  addVariant: (productId: number, variant: ProductVariant) => Promise<void>;
  updateVariant: (productId: number, variantId: string, updatedVariant: Partial<ProductVariant>) => Promise<void>;
  deleteVariant: (productId: number, variantId: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: true,

  loadProducts: async () => {
    try {
      set({ isLoading: true });
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to load products');
      const data = await response.json();

      // Map DB shape (snake_case) to frontend shape (camelCase)
      const products: Product[] = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        skuPrefix: p.sku_prefix,
        category: p.category,
        subCategory: p.sub_category,
        description: p.description,
        basePrice: parseFloat(p.base_price),
        materials: p.materials,
        careInstructions: p.care_instructions,
        isFeatured: p.is_featured,
        createdAt: new Date(p.created_at),
        variants: (p.variants || []).filter(Boolean).map((v: any) => ({
          id: v.id,
          color: v.color,
          colorCode: v.colorCode || v.color_code,
          image: v.image || v.image_url,
          stock: v.stock,
          serialNumber: v.serialNumber || v.serial_number,
          sku: v.sku,
          slug: v.slug,
          isDefault: v.isDefault ?? v.is_default,
        })),
      }));

      set({ products, isLoading: false });
    } catch (error) {
      console.error('Failed to load products:', error);
      set({ isLoading: false });
    }
  },

  addProduct: async (product) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      });
      if (!response.ok) throw new Error('Failed to save product');
      // Reload from DB to get the real ID assigned by Postgres
      await get().loadProducts();
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  },

  updateProduct: async (id, updatedProduct) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      await get().loadProducts();
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  },

  deleteProduct: async (id) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      await get().loadProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  },

  addVariant: async (productId, variant) => {
    try {
      await fetch(`/api/products/${productId}/variants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variant }),
      });
      await get().loadProducts();
    } catch (error) {
      console.error('Failed to add variant:', error);
    }
  },

  updateVariant: async (productId, variantId, updatedVariant) => {
    try {
      await fetch(`/api/products/${productId}/variants/${variantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedVariant),
      });
      await get().loadProducts();
    } catch (error) {
      console.error('Failed to update variant:', error);
    }
  },

  deleteVariant: async (productId, variantId) => {
    try {
      await fetch(`/api/products/${productId}/variants/${variantId}`, {
        method: 'DELETE',
      });
      await get().loadProducts();
    } catch (error) {
      console.error('Failed to delete variant:', error);
    }
  },
}));