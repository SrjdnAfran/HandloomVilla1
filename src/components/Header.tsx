"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { useState } from "react";

export default function Header() {
  const itemCount = useCartStore((state) => state.itemCount());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold text-[var(--accent)]">
            HandloomVilla
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className="text-gray-700 hover:text-[var(--accent)] transition-colors font-medium"
          >
            Home
          </Link>
          <Link 
            href="/shop" 
            className="text-gray-700 hover:text-[var(--accent)] transition-colors font-medium"
          >
            Shop
          </Link>
          <Link 
            href="/about" 
            className="text-gray-700 hover:text-[var(--accent)] transition-colors font-medium"
          >
            About
          </Link>
        </nav>

        {/* Cart + Mobile Menu Button */}
        <div className="flex items-center gap-6">
          <Link
            href="/cart"
            className="flex items-center gap-2 text-gray-700 hover:text-[var(--accent)] transition-colors relative"
          >
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-[var(--accent)]"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col px-6 py-6 space-y-6 text-lg">
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