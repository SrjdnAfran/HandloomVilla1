// components/Header.tsx
'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';
import { useState } from 'react';

export default function Header() {
  const itemCount = useCartStore(state => state.itemCount());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full shadow-sm backdrop-blur-md"
      style={{
        background:
          'linear-gradient(to right, rgba(0, 13, 51, 0.91) 0%, rgba(101, 101, 101, 0.91) 100%)',
      }}
    >
      <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="font-serif text-2xl font-bold tracking-tight text-white">
            Handloomvilla
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          <Link
            href="/"
            className="relative font-medium text-white/90 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all hover:text-white hover:after:w-full"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="relative font-medium text-white/90 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all hover:text-white hover:after:w-full"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="relative font-medium text-white/90 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all hover:text-white hover:after:w-full"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="relative font-medium text-white/90 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all hover:text-white hover:after:w-full"
          >
            Contact
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm lg:flex">
            <Search className="h-4 w-4 text-white/70" />
            <input
              type="text"
              placeholder="Search products..."
              className="ml-2 w-40 bg-transparent text-sm text-white outline-none placeholder:text-white/50"
              onChange={e => {
                // You can implement search functionality here
                console.log('Search:', e.target.value);
              }}
            />
          </div>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 text-white/90 transition-colors hover:text-white"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-md p-2 text-white/90 transition hover:bg-white/10 md:hidden"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isMenuOpen ? 'max-h-96 border-t border-white/20' : 'max-h-0'
        }`}
        style={{
          background:
            'linear-gradient(to right, rgba(0, 13, 51, 0.95) 0%, rgba(101, 101, 101, 0.95) 100%)',
        }}
      >
        <div className="space-y-5 px-6 py-6 text-lg shadow-sm">
          {/* Mobile Search */}
          <div className="flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <Search className="h-4 w-4 text-white/70" />
            <input
              type="text"
              placeholder="Search products..."
              className="ml-2 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50"
              onChange={e => {
                console.log('Mobile Search:', e.target.value);
              }}
            />
          </div>

          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="block font-medium text-white/90 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/shop"
            onClick={() => setIsMenuOpen(false)}
            className="block font-medium text-white/90 hover:text-white"
          >
            Shop
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className="block font-medium text-white/90 hover:text-white"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="block font-medium text-white/90 hover:text-white"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
