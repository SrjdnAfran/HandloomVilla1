import Link from 'next/link';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f1f4b] text-[#f5f8ff]">
      {/* Main Footer */}
      <div className="mx-auto max-w-screen-2xl px-6 py-14 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div>
            <h2 className="mb-4 font-serif text-2xl font-bold text-white">Handloom Villa</h2>
            <p className="text-sm leading-relaxed text-blue-100/80">
              Manufacturer & Supplier of premium handloom products in Sri Lanka. We specialize in
              Cotton Sarees, Silk Sarees, Sarongs, Lungis, and authentic heritage textiles crafted
              with tradition and care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-widest text-white uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-blue-100/80">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="transition-colors hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/cart" className="transition-colors hover:text-white">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-widest text-white uppercase">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-blue-100/80">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-blue-200" />
                <span>
                  6A, Nooraniya Road,
                  <br />
                  Maruthamunai, Sri Lanka
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-200" />
                <a href="tel:+94764634990" className="transition-colors hover:text-white">
                  +94 76 463 4990
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-200" />
                <a
                  href="mailto:hello@handloomvilla.lk"
                  className="transition-colors hover:text-white"
                >
                  hello@handloomvilla.lk
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-widest text-white uppercase">
              Follow Us
            </h3>
            <p className="mb-4 text-sm text-blue-100/80">
              Stay connected for new arrivals and exclusive offers.
            </p>

            <div className="flex gap-4">
              <a
                href="https://facebook.com/handloomvillamaru"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2 transition hover:bg-white hover:text-[#0f1f4b]"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com/handloomvillamaru"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2 transition hover:bg-white hover:text-[#0f1f4b]"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="mb-2 text-sm text-blue-100/80">Subscribe to our newsletter</p>
              <form className="flex overflow-hidden rounded-md">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 text-sm text-gray-800 outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#1e3a7a] px-4 text-sm font-semibold text-white transition hover:bg-[#162d5c]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-6 text-xs text-blue-100/70 md:flex-row">
          <p>© {new Date().getFullYear()} Handloom Villa. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
