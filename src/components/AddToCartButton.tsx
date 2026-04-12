// src/components/AddToCartButton.tsx
'use client';

import { useCartStore } from '@/lib/cartStore';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  variantId: string;
  productId: number;
  name: string;
  price: number;
  image: string;
  sku: string;
  color: string;
}

export default function AddToCartButton({
  variantId,
  productId,
  name,
  price,
  image,
  sku,
  color,
}: AddToCartButtonProps) {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: variantId,
      productId: productId,
      name: name,
      price: price,
      quantity: 1,
      image: image,
      sku: sku,
      color: color,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex w-full items-center justify-center gap-3 rounded-lg bg-[var(--accent)] px-10 py-4 text-lg font-medium text-white shadow-md transition-colors hover:bg-[var(--accent-hover)] active:scale-95 md:w-auto"
    >
      <ShoppingCart className="h-6 w-6" />
      Add to Cart
    </button>
  );
}
