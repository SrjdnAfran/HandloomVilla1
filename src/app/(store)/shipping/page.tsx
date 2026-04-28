'use client';

import Link from 'next/link';
import { Truck, Clock, Globe, Package, MapPin, CreditCard, CheckCircle } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2">
            <Truck className="h-4 w-4 text-[#8B4513]" />
            <span className="text-sm font-medium text-[#8B4513]">Shipping Information</span>
          </div>
          <h1 className="mb-4 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
            Shipping Policy
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600">
            Fast, reliable shipping to bring our handloom treasures to your doorstep.
          </p>
        </div>

        <div className="space-y-8">
          {/* Processing Time */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Clock className="h-5 w-5 text-[#8B4513]" />
              Order Processing Time
            </h2>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-600">
              <li>Orders are processed within 1-3 business days</li>
              <li>You will receive a confirmation email once your order ships</li>
              <li>Processing times may increase during holidays or peak seasons</li>
              <li>Custom orders may require additional processing time</li>
            </ul>
          </section>

          {/* Domestic Shipping */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <MapPin className="h-5 w-5 text-[#8B4513]" />
              Domestic Shipping (Sri Lanka)
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-gray-100 py-2">
                <span className="font-semibold">Standard Shipping</span>
                <span>3-5 business days</span>
                <span className="text-green-600">$5.99 or Free over $50</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 py-2">
                <span className="font-semibold">Express Shipping</span>
                <span>1-2 business days</span>
                <span>$9.99</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold">Same-Day Delivery (Colombo)</span>
                <span>Order by 12 PM</span>
                <span>$4.99</span>
              </div>
            </div>
          </section>

          {/* International Shipping */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Globe className="h-5 w-5 text-[#8B4513]" />
              International Shipping
            </h2>
            <p className="mb-3 text-gray-600">We ship to over 50 countries worldwide!</p>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-gray-100 py-2">
                <span>Asia Pacific</span>
                <span>5-10 business days</span>
                <span>$9.99</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 py-2">
                <span>North America & Europe</span>
                <span>7-14 business days</span>
                <span>$14.99</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Rest of World</span>
                <span>10-21 business days</span>
                <span>$19.99</span>
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-amber-50 p-4">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> International customers are responsible for customs duties
                and taxes. Delivery times are estimates and may vary by location.
              </p>
            </div>
          </section>

          {/* Free Shipping */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Package className="h-5 w-5 text-[#8B4513]" />
              Free Shipping Offer
            </h2>
            <p className="leading-relaxed text-gray-600">
              Enjoy FREE standard shipping on all domestic orders over $50 USD. The discount is
              automatically applied at checkout. Please note that the free shipping threshold
              applies after any discounts and before taxes.
            </p>
          </section>

          {/* Tracking */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 text-xl font-bold text-gray-900">Order Tracking</h2>
            <p className="leading-relaxed text-gray-600">
              Once your order ships, you will receive a confirmation email with a tracking number.
              You can track your package using the link provided or through our
              <Link href="/track-order" className="mx-1 text-[#8B4513] hover:underline">
                Order Tracking
              </Link>{' '}
              page.
            </p>
          </section>

          {/* Delivery Issues */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 text-xl font-bold text-gray-900">Delivery Issues</h2>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-600">
              <li>Please ensure your shipping address is correct before submitting your order</li>
              <li>
                If your package is lost or damaged, please contact us within 7 days of delivery
              </li>
              <li>
                We are not responsible for packages confirmed delivered to the correct address
              </li>
              <li>For address changes, please contact us within 2 hours of placing your order</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="rounded-2xl bg-amber-50 p-6">
            <h2 className="mb-3 text-xl font-bold text-gray-900">Shipping Questions?</h2>
            <p className="mb-3 text-gray-600">
              Have specific shipping questions? Our customer service team is here to help!
            </p>
            <div className="space-y-2 text-gray-600">
              <p>📧 Email: shipping@handloomvilla.com</p>
              <p>📞 Phone: +94 76 463 4990</p>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          Policy last updated: April 27, 2024
        </div>
      </div>
    </div>
  );
}
