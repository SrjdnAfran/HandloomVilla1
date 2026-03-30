"use client";

import { useCartStore } from "@/lib/cartStore";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      className="w-full md:w-auto bg-[var(--accent)] text-white px-10 py-4 rounded-lg font-medium text-lg hover:bg-[var(--accent-hover)] transition-colors flex items-center justify-center gap-3 shadow-md active:scale-95"
    >
      <ShoppingCart className="h-6 w-6" />
      Add to Cart
    </button>
  );
}