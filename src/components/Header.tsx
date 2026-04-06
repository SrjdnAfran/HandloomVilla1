'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';
import { useState } from 'react';

export default function Header() {
  const itemCount = useCartStore(state => state.itemCount());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold text-[var(--accent)]">HandloomVilla</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="font-medium text-gray-700 transition-colors hover:text-[var(--accent)]"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="font-medium text-gray-700 transition-colors hover:text-[var(--accent)]"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="font-medium text-gray-700 transition-colors hover:text-[var(--accent)]"
          >
            About
          </Link>
        </nav>

        {/* Cart + Mobile Menu Button */}
        <div className="flex items-center gap-6">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 text-gray-700 transition-colors hover:text-[var(--accent)]"
          >
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-[var(--accent)] md:hidden"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="flex flex-col space-y-6 px-6 py-6 text-lg">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[var(--accent)]"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[var(--accent)]"
            >
              Shop
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[var(--accent)]"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
