// lib/productStore.ts
import { create } from 'zustand';
import { Product, ProductVariant } from '@/types/product';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  loadProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: number, updatedProduct: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  addVariant: (productId: number, variant: ProductVariant) => Promise<void>;
  updateVariant: (productId: number, variantId: string, updatedVariant: Partial<ProductVariant>) => Promise<void>;
  deleteVariant: (productId: number, variantId: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: true,

  // Load products from database
  loadProducts: async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to load products');
      const products = await response.json();
      set({ products, isLoading: false });
    } catch (error) {
      console.error('Failed to load products:', error);
      set({ isLoading: false });
    }
  },

  // Add product to database
  addProduct: async (product) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      });
      
      if (!response.ok) throw new Error('Failed to save product');
      
      const result = await response.json();
      set(state => ({ 
        products: [...state.products, { ...product, id: result.id }] 
      }));
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  },

  // Update product
  updateProduct: async (id, updatedProduct) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      
      set(state => ({
        products: state.products.map(p => 
          p.id === id ? { ...p, ...updatedProduct } : p
        ),
      }));
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      
      set(state => ({
        products: state.products.filter(p => p.id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  },

  // Add variant
  addVariant: async (productId, variant) => {
    try {
      await fetch(`/api/products/${productId}/variants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variant }),
      });
      
      set(state => ({
        products: state.products.map(p =>
          p.id === productId 
            ? { ...p, variants: [...p.variants, variant] }
            : p
        ),
      }));
    } catch (error) {
      console.error('Failed to add variant:', error);
    }
  },

  // Update variant
  updateVariant: async (productId, variantId, updatedVariant) => {
    try {
      await fetch(`/api/products/${productId}/variants/${variantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedVariant),
      });
      
      set(state => ({
        products: state.products.map(p =>
          p.id === productId
            ? {
                ...p,
                variants: p.variants.map(v =>
                  v.id === variantId ? { ...v, ...updatedVariant } : v
                ),
              }
            : p
        ),
      }));
    } catch (error) {
      console.error('Failed to update variant:', error);
    }
  },

  // Delete variant
  deleteVariant: async (productId, variantId) => {
    try {
      await fetch(`/api/products/${productId}/variants/${variantId}`, {
        method: 'DELETE',
      });
      
      set(state => ({
        products: state.products.map(p =>
          p.id === productId
            ? {
                ...p,
                variants: p.variants.filter(v => v.id !== variantId),
              }
            : p
        ),
      }));
    } catch (error) {
      console.error('Failed to delete variant:', error);
    }
  },
}));