'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  Heart,
  User,
  LogIn,
  UserCircle,
  Package,
  Settings,
  LogOut,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const cartCount = getCartCount();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close account dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.account-dropdown')) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setAccountDropdownOpen(false);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-white/98 py-3 shadow-lg backdrop-blur-md'
          : 'bg-white/95 py-4 backdrop-blur-sm'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-gradient-to-tr from-[#5C2E0B] to-[#D2691E] transition-transform group-hover:scale-110">
              <span className="font-serif text-lg text-white">H</span>
            </div>
            <span className="bg-gradient-to-r from-[#5C2E0B] to-[#8B4513] bg-clip-text font-serif text-xl font-bold text-transparent">
              HandloomVilla
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex lg:gap-2">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-amber-50 hover:text-[#8B4513]"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden items-center gap-2 md:flex">
            {/* Search Button */}
            <button
              className="rounded-full p-2 text-gray-600 transition-colors hover:bg-amber-50 hover:text-[#8B4513]"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="rounded-full p-2 text-gray-600 transition-colors hover:bg-amber-50 hover:text-[#8B4513]"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative rounded-full p-2 text-gray-600 transition-colors hover:bg-amber-50 hover:text-[#8B4513]"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-[#8B4513] text-xs text-white">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Account Dropdown */}
            <div className="account-dropdown relative">
              {user ? (
                <>
                  <button
                    onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                    className="rounded-full p-2 text-gray-600 transition-colors hover:bg-amber-50 hover:text-[#8B4513]"
                    aria-label="Account"
                  >
                    <User className="h-5 w-5" />
                  </button>

                  {/* Dropdown Menu */}
                  {accountDropdownOpen && (
                    <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 z-50 mt-2 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-lg duration-200">
                      <div className="border-b border-gray-100 px-4 py-3">
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        href="/account"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-amber-50"
                      >
                        <UserCircle className="h-4 w-4" />
                        My Account
                      </Link>
                      <Link
                        href="/account?tab=orders"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-amber-50"
                      >
                        <Package className="h-4 w-4" />
                        My Orders
                      </Link>
                      <Link
                        href="/account?tab=settings"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-amber-50"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                      <div className="my-1 border-t border-gray-100"></div>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors duration-200 hover:bg-amber-50 hover:text-[#8B4513]"
                  aria-label="Login"
                >
                  <LogIn className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-amber-50 hover:text-[#8B4513] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mt-4 border-t border-gray-100 pt-4 pb-6">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-2">
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-amber-50 hover:text-[#8B4513]"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-100"></div>

            {/* Mobile Action Buttons */}
            <div className="space-y-2">
              <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-amber-50 hover:text-[#8B4513]">
                <Search className="h-5 w-5" />
                <span>Search</span>
              </button>
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-amber-50 hover:text-[#8B4513]"
              >
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="relative flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-amber-50 hover:text-[#8B4513]"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#8B4513] text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-100"></div>

            {/* Mobile Account Section */}
            {user ? (
              <div className="space-y-2">
                <div className="px-4 py-2">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-amber-50 hover:text-[#8B4513]"
                >
                  <UserCircle className="h-5 w-5" />
                  <span>My Account</span>
                </Link>
                <Link
                  href="/account?tab=orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-amber-50 hover:text-[#8B4513]"
                >
                  <Package className="h-5 w-5" />
                  <span>My Orders</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition-colors hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-amber-50 hover:text-[#8B4513]"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
