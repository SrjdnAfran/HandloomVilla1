import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#3f2a1e] text-[#f5e8d3] py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4">HandloomVilla</h2>
            <p className="text-sm opacity-80">
              Authentic handwoven sarees, kurtis &amp; dupattas from Singapore.<br />
              Crafted with love by skilled artisans.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-white">Shop</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-sm opacity-80">
              Singapore<br />
              Email: hello@handloomvilla.com<br />
              WhatsApp: +65 1234 5678
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <p className="text-sm opacity-80">Instagram • Facebook</p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-xs opacity-70">
          © {new Date().getFullYear()} HandloomVilla. All rights reserved. Made for my brother ❤️
        </div>
      </div>
    </footer>
  );
}