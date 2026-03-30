import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1e3a7a] text-[#f5f8ff] py-10 ">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4 text-white">Handloom Villa</h2>
            <p className="text-sm opacity-80">
              Manufacturer & Supplier of Quality Handloom Products in Sri Lanka.<br />
              Cotton Sarees, Silk Sarees, Sarong, Lungi & more.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Contact</h3>
            <p className="text-sm opacity-80">
              6A, Nooraniya Road,<br />
              Maruthamunai, Sri Lanka<br /><br />
              WhatsApp: +94 76 463 4990
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Follow Us</h3>
            <p className="text-sm opacity-80">
              Facebook: @handloomvillamaru<br />
              Instagram: @handloomvillamaru
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-xs opacity-70">
          © {new Date().getFullYear()} Handloom Villa - Maruthamunai, Sri Lanka. All rights reserved.
        </div>
      </div>
    </footer>
  );
}