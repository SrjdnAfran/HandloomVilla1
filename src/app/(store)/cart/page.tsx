'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowRight,
  CreditCard,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  AlertCircle,
  Heart,
} from 'lucide-react';
import { useCart, CartItem } from '@/context/CartContext';

// Quantity Selector Component
function QuantitySelector({
  quantity,
  onQuantityChange,
  productId,
  inStock,
}: {
  quantity: number;
  onQuantityChange: (qty: number) => void;
  productId: number;
  inStock: boolean;
}) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (newQuantity: number) => {
    if (newQuantity < 1 || !inStock) return;
    setIsUpdating(true);
    onQuantityChange(newQuantity);
    setTimeout(() => setIsUpdating(false), 300);
  };

  return (
    <div className="flex items-center rounded-lg border border-gray-300">
      <button
        onClick={() => handleChange(quantity - 1)}
        disabled={quantity <= 1 || isUpdating}
        className="p-2 transition-colors hover:bg-gray-50 disabled:opacity-50"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className={`w-12 text-center font-semibold ${isUpdating ? 'opacity-50' : ''}`}>
        {quantity}
      </span>
      <button
        onClick={() => handleChange(quantity + 1)}
        disabled={isUpdating}
        className="p-2 transition-colors hover:bg-gray-50"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

// Cart Item Component
function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4 border-b border-gray-100 py-6 last:border-0 sm:flex-row sm:items-center">
      {/* Product Image */}
      <Link href={`/products/${item.id}`} className="flex-shrink-0">
        <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 to-amber-50">
          {!imageError ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-amber-300" />
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="min-w-0 flex-1">
        <Link href={`/products/${item.id}`}>
          <h3 className="line-clamp-2 font-bold text-gray-900 transition-colors hover:text-[#8B4513]">
            {item.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-gray-500">SKU: HL-{item.id.toString().padStart(6, '0')}</p>
        <div className="mt-1 flex items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-xs ${item.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            {item.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="min-w-[100px] flex-shrink-0 text-center sm:text-left">
        <span className="text-lg font-bold text-[#8B4513]">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <p className="text-xs text-gray-400">${item.price.toFixed(2)} each</p>
      </div>

      {/* Quantity */}
      <div className="flex-shrink-0">
        <QuantitySelector
          quantity={item.quantity}
          onQuantityChange={qty => onUpdateQuantity(item.id, qty)}
          productId={item.id}
          inStock={item.inStock}
        />
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="flex-shrink-0 p-2 text-gray-400 transition-colors hover:text-red-500"
        aria-label="Remove item"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}

// Empty Cart Component
function EmptyCart() {
  const router = useRouter();

  return (
    <div className="py-16 text-center md:py-20">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-amber-100">
        <ShoppingCart className="h-12 w-12 text-[#8B4513]" />
      </div>
      <h2 className="mb-2 font-serif text-2xl font-bold text-gray-900">Your cart is empty</h2>
      <p className="mx-auto mb-8 max-w-md text-gray-600">
        Looks like you haven't added any items to your cart yet. Explore our collection of authentic
        handloom products.
      </p>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#8B4513] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#5C2E0B] hover:shadow-lg"
        >
          Continue Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/collection"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50"
        >
          Browse Collections
        </Link>
      </div>

      {/* Featured Categories */}
      <div className="mt-16 border-t border-gray-100 pt-8">
        <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-500 uppercase">
          Shop by Category
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {['Silk Sarees', 'Cotton Kurtis', 'Dupattas', "Men's Collection"].map(cat => (
            <Link
              key={cat}
              href={`/shop?category=${encodeURIComponent(cat)}`}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-[#8B4513] hover:text-white"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Order Summary Component
function OrderSummary({ subtotal, onCheckout }: { subtotal: number; onCheckout: () => void }) {
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-bold text-gray-900">Order Summary</h3>

      <div className="space-y-3 border-b border-gray-200 pb-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <div className="flex items-center gap-2">
            <span>Shipping</span>
            {subtotal > 50 && <span className="text-xs text-green-600">(Free)</span>}
          </div>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="mb-6 flex justify-between pt-4">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-[#8B4513]">${total.toFixed(2)}</span>
      </div>

      {/* Free Shipping Progress */}
      {subtotal < 50 && (
        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm text-gray-600">
            <span>Add ${(50 - subtotal).toFixed(2)} more for free shipping</span>
            <span>{Math.round((subtotal / 50) * 100)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#8B4513] transition-all duration-300"
              style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5C2E0B] to-[#8B4513] py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg"
      >
        <CreditCard className="h-5 w-5" />
        Proceed to Checkout
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>

      {/* Trust Badges */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center gap-1">
            <Truck className="h-3 w-3" />
            <span>Free Shipping $50+</span>
          </div>
          <div className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3" />
            <span>30-Day Returns</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-4 border-t border-gray-100 pt-4">
        <p className="mb-2 text-center text-xs text-gray-400">We Accept</p>
        <div className="flex justify-center gap-2">
          <div className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
            Visa
          </div>
          <div className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
            Mastercard
          </div>
          <div className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
            PayPal
          </div>
        </div>
      </div>
    </div>
  );
}

// Cart Actions Component
function CartActions({
  onClearCart,
  onContinueShopping,
}: {
  onClearCart: () => void;
  onContinueShopping: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6">
      <button
        onClick={onClearCart}
        className="flex items-center gap-1 text-sm font-semibold text-red-500 transition-colors hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" />
        Clear Cart
      </button>
      <Link
        href="/shop"
        className="flex items-center gap-1 text-sm font-semibold text-[#8B4513] transition-colors hover:text-[#5C2E0B]"
      >
        <ChevronLeft className="h-4 w-4" />
        Continue Shopping
      </Link>
    </div>
  );
}

// Main Cart Page Component
export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartCount } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Ensure component is hydrated before showing cart (prevous hydration issues)
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const subtotal = getCartTotal();
  const itemCount = getCartCount();

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      router.push('/checkout');
    }
  };

  // Loading state
  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#8B4513] border-t-transparent" />
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {itemCount === 0
              ? 'Your cart is empty'
              : `You have ${itemCount} item${itemCount !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {/* Clear Cart Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center">
              <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
              <h3 className="mb-2 text-xl font-bold text-gray-900">Clear Cart?</h3>
              <p className="mb-6 text-gray-600">
                Are you sure you want to remove all items from your cart?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleClearCart}
                  className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
                >
                  Yes, Clear Cart
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                {/* Table Header - Desktop only */}
                <div className="mb-2 hidden grid-cols-12 gap-4 border-b border-gray-200 pb-4 text-sm font-semibold text-gray-500 sm:grid">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-gray-100">
                  {cart.map(item => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>

                {/* Cart Actions */}
                <CartActions
                  onClearCart={() => setShowClearConfirm(true)}
                  onContinueShopping={() => router.push('/shop')}
                />
              </div>

              {/* Continue Shopping Link - Mobile */}
              <div className="mt-4 text-center md:hidden">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#8B4513] hover:text-[#5C2E0B]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary subtotal={subtotal} onCheckout={handleCheckout} />
            </div>
          </div>
        )}

        {/* Recommended Products Section - Optional */}
        {cart.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-8">
            <h2 className="mb-6 text-center font-serif text-xl font-bold text-gray-900">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map(i => (
                <Link
                  key={i}
                  href={`/products/${i + 10}`}
                  className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
                >
                  <div className="relative h-32 bg-gradient-to-br from-amber-100 to-amber-50">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl text-amber-300">
                      🧵
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#8B4513]">
                      Handloom Product
                    </h3>
                    <p className="mt-1 text-sm font-bold text-[#8B4513]">$49.99</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
