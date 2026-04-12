// src/app/cart/page.tsx
'use client';

import { useProductStore } from '@/lib/productStore';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const cart = useProductStore(state => state.cart);
  const updateCartQuantity = useProductStore(state => state.updateCartQuantity);
  const removeFromCart = useProductStore(state => state.removeFromCart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!cart || cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="mb-6 text-3xl font-bold">Your Cart is Empty</h1>
        <p className="mb-8 text-gray-600">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-xl bg-[#002361] px-8 py-3 text-white transition-colors hover:bg-[#001a4a]"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                {/* Product Image */}
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                  <p className="text-sm text-gray-500">Color: {item.color}</p>
                  <p className="mt-1 font-bold text-[#002361]">LKR {item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="rounded-lg border p-1 hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="rounded-lg border p-1 hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 transition-colors hover:text-red-700"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-xl border bg-gray-50 p-6">
          <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

          <div className="mb-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">LKR {total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">Calculated at checkout</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-[#002361]">LKR {total}</span>
              </div>
            </div>
          </div>

          <button className="w-full rounded-xl bg-[#002361] py-3 font-medium text-white transition-colors hover:bg-[#001a4a]">
            Proceed to Checkout
          </button>

          <Link
            href="/shop"
            className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 transition-colors hover:text-[#002361]"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
