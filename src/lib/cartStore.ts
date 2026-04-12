// src/lib/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;           // Variant ID
  productId: number;    // Parent product ID
  name: string;         // Product name + variant color
  price: number;        // Price (from product.basePrice)
  quantity: number;
  image: string;        // Variant image
  sku: string;          // Variant SKU
  color: string;        // Variant color
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: () => number;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, item],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      total: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'handloomvilla-cart',
    }
  )
);