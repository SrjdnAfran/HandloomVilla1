// lib/productStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductVariant } from '@/types/product';

export interface CartItem {
  id: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
  color: string;
}

interface ProductState {
  products: Product[];
  cart: CartItem[];
  
  // Product Actions
  addProduct: (product: Product) => void;
  updateProduct: (id: number, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  
  // Variant Actions
  addVariant: (productId: number, variant: ProductVariant) => void;
  updateVariant: (productId: number, variantId: string, updatedVariant: Partial<ProductVariant>) => void;
  deleteVariant: (productId: number, variantId: string) => void;
  
  // Cart Actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      cart: [],

      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),

      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updatedProduct } : p
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      addVariant: (productId, variant) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId
              ? { ...p, variants: [...p.variants, variant] }
              : p
          ),
        })),

      updateVariant: (productId, variantId, updatedVariant) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId
              ? {
                  ...p,
                  variants: p.variants.map((v) =>
                    v.id === variantId ? { ...v, ...updatedVariant } : v
                  ),
                }
              : p
          ),
        })),

      deleteVariant: (productId, variantId) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId
              ? {
                  ...p,
                  variants: p.variants.filter((v) => v.id !== variantId),
                }
              : p
          ),
        })),

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== id),
        })),

      updateCartQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'handloom-products',
    }
  )
);