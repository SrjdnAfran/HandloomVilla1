import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1e3a7a] py-10 text-[#f5f8ff]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <h2 className="mb-4 font-serif text-2xl font-bold text-white">Handloom Villa</h2>
            <p className="text-sm opacity-80">
              Manufacturer & Supplier of Quality Handloom Products in Sri Lanka.
              <br />
              Cotton Sarees, Silk Sarees, Sarong, Lungi & more.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
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
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Contact</h3>
            <p className="text-sm opacity-80">
              6A, Nooraniya Road,
              <br />
              Maruthamunai, Sri Lanka
              <br />
              <br />
              WhatsApp: +94 76 463 4990
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Follow Us</h3>
            <p className="text-sm opacity-80">
              Facebook: @handloomvillamaru
              <br />
              Instagram: @handloomvillamaru
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-8 text-center text-xs opacity-70">
          © {new Date().getFullYear()} Handloom Villa - Maruthamunai, Sri Lanka. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
