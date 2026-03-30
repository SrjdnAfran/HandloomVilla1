"use client";

import { useCartStore } from "@/lib/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, itemCount, total } = useCartStore();

  if (itemCount() === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Your Cart is Empty</h1>
        <p className="text-lg text-gray-600 mb-8">
          Looks like you haven&apos;t added any handloom treasures yet.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-[var(--accent)] text-white px-8 py-4 rounded-lg font-medium hover:bg-[var(--accent-hover)] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center md:text-left">
        Your Cart ({itemCount()})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 bg-white p-6 rounded-xl shadow-sm border"
            >
              <div className="relative w-32 h-40 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-[var(--accent)] font-bold mt-1">
                  LKR {item.price}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-lg"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-lg font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-8 rounded-xl sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span>LKR {total().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-4">
                <span>Total</span>
                <span className="text-[var(--accent)]">
                  LKR {total().toFixed(2)}
                </span>
              </div>
            </div>
            <button className="w-full bg-[var(--accent)] text-white py-4 rounded-lg font-medium text-lg hover:bg-[var(--accent-hover)] transition-colors">
              Proceed to Checkout
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              Shipping calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}