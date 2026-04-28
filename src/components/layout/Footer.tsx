import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

const footerLinks = {
  Shop: [
    { name: 'Silk Sarees', href: '/shop?category=silk-sarees' },
    { name: 'Cotton Kurtis', href: '/shop?category=cotton-kurtis' },
    { name: 'Dupattas', href: '/shop?category=dupattas' },
    { name: "Men's Collection", href: '/shop?category=mens' },
    { name: 'New Arrivals', href: '/shop?sort=newest' },
  ],
  Support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Shipping Info', href: '/shipping' }, // ← Add
    { name: 'Returns', href: '/returns' }, // ← Add
    { name: 'Privacy Policy', href: '/privacy' }, // ← Add
    { name: 'Terms of Service', href: '/terms' },
    ,
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', color: '#1877f2' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: '#e4405f' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: '#1da1f2' },
  { name: 'Youtube', icon: Youtube, href: 'https://youtube.com', color: '#ff0000' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-gradient-to-tr from-[#8B4513] to-[#D2691E]">
                <span className="font-serif text-lg text-white">H</span>
              </div>
              <span className="font-serif text-xl font-bold text-white">HandloomVilla</span>
            </Link>
            <p className="mb-4 text-sm leading-relaxed text-gray-400">
              Bringing you authentic handloom treasures from Sri Lanka&apos;s finest artisans. Each
              piece tells a story of tradition, craftsmanship, and timeless elegance.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-full bg-gray-800 p-2 transition-all duration-200 hover:bg-[#8B4513]"
                  style={{ color: social.color }}
                >
                  <social.icon className="h-4 w-4 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.Shop.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#D2691E]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              {footerLinks.Support.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#D2691E]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              {footerLinks.Company.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#D2691E]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-gray-800 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <a href="mailto:hello@handloomvilla.com" className="hover:text-[#D2691E]">
                  hello@handloomvilla.com
                </a>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-4 w-4" />
                <a href="tel:+1234567890" className="hover:text-[#D2691E]">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-gray-500">
              © {currentYear} HandloomVilla. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              Made with <Heart className="h-3 w-3 fill-red-500 text-red-500" /> for handloom lovers
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
