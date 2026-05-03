'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CartItem = {
  id: string;
  productId: number;
  name: string;
  price: number; // This should be a number
  quantity: number;
  image: string;
  sku: string;
  color: string;
  inStock: boolean;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
  isInCart: (id: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('handloomCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Ensure price is a number for all items
        const normalizedCart = parsedCart.map((item: any) => ({
          ...item,
          price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
        }));
        setCart(normalizedCart);
      } catch (e) {
        console.error('Failed to parse cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('handloomCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    const normalizedItem = {
      ...item,
      price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
    };

    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === normalizedItem.id);
      if (existingItem) {
        return prevCart.map(i =>
          i.id === normalizedItem.id ? { ...i, quantity: i.quantity + normalizedItem.quantity } : i
        );
      }
      return [...prevCart, normalizedItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart => prevCart.map(i => (i.id === id ? { ...i, quantity } : i)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const isInCart = (id: string) => {
    return cart.some(i => i.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
