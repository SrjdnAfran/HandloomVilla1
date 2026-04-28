'use client';

import Link from 'next/link';
import {
  FileText,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Truck,
  RefreshCw,
  Scale,
} from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2">
            <FileText className="h-4 w-4 text-[#8B4513]" />
            <span className="text-sm font-medium text-[#8B4513]">Effective: April 2024</span>
          </div>
          <h1 className="mb-4 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
            Terms & Conditions
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600">
            Please read these terms carefully before using our website or making a purchase.
          </p>
        </div>

        <div className="space-y-8">
          {/* Agreement */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <CheckCircle className="h-5 w-5 text-[#8B4513]" />
              Agreement to Terms
            </h2>
            <p className="leading-relaxed text-gray-600">
              By accessing or using HandloomVilla&apos;s website, you agree to be bound by these
              Terms & Conditions. If you disagree with any part of these terms, you may not access
              the website or purchase our products.
            </p>
          </section>

          {/* Products */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 text-xl font-bold text-gray-900">Products & Pricing</h2>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-600">
              <li>
                All product descriptions, images, and prices are subject to change without notice
              </li>
              <li>We make every effort to display accurate colors, but screen displays may vary</li>
              <li>Prices are in USD and do not include applicable taxes and shipping fees</li>
              <li>We reserve the right to limit quantities or discontinue any product</li>
              <li>In case of pricing errors, we reserve the right to cancel orders</li>
            </ul>
          </section>

          {/* Orders */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <CreditCard className="h-5 w-5 text-[#8B4513]" />
              Orders & Payment
            </h2>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-600">
              <li>We reserve the right to refuse or cancel any order for any reason</li>
              <li>Payment must be received in full before order processing</li>
              <li>We accept major credit cards, PayPal, and Cash on Delivery (where available)</li>
              <li>Order confirmation emails are sent after successful payment</li>
              <li>Please review your order carefully before submitting</li>
            </ul>
          </section>

          {/* Shipping */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Truck className="h-5 w-5 text-[#8B4513]" />
              Shipping & Delivery
            </h2>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-600">
              <li>Shipping times are estimates and not guaranteed</li>
              <li>We are not responsible for delays caused by customs or carriers</li>
              <li>Risk of loss passes to you upon delivery</li>
              <li>International customers are responsible for customs duties and taxes</li>
              <li>
                Please ensure shipping addresses are accurate — additional fees may apply for
                redelivery
              </li>
            </ul>
          </section>

          {/* Returns */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <RefreshCw className="h-5 w-5 text-[#8B4513]" />
              Returns & Refunds
            </h2>
            <p className="mb-3 leading-relaxed text-gray-600">
              Please refer to our{' '}
              <Link href="/returns" className="text-[#8B4513] hover:underline">
                Return Policy
              </Link>{' '}
              for detailed information.
            </p>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-600">
              <li>Returns accepted within 30 days of delivery</li>
              <li>Items must be unworn, unwashed, with original tags</li>
              <li>Refunds issued to original payment method</li>
              <li>Customer pays return shipping unless item is defective</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 text-xl font-bold text-gray-900">Intellectual Property</h2>
            <p className="leading-relaxed text-gray-600">
              All content on this website, including text, images, logos, and product designs, is
              the property of HandloomVilla and protected by copyright laws. You may not reproduce,
              distribute, or create derivative works without our written permission.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <AlertCircle className="h-5 w-5 text-[#8B4513]" />
              Limitation of Liability
            </h2>
            <p className="leading-relaxed text-gray-600">
              To the fullest extent permitted by law, HandloomVilla shall not be liable for any
              indirect, incidental, or consequential damages arising from your use of our products
              or website. Our total liability shall not exceed the amount you paid for the product.
            </p>
          </section>

          {/* Contact */}
          <section className="rounded-2xl bg-amber-50 p-6">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Scale className="h-5 w-5 text-[#8B4513]" />
              Contact Us
            </h2>
            <p className="mb-3 text-gray-600">
              If you have any questions about these Terms & Conditions, please contact us:
            </p>
            <div className="space-y-2 text-gray-600">
              <p>📧 Email: legal@handloomvilla.com</p>
              <p>📞 Phone: +94 76 463 4990</p>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          These terms were last updated on April 27, 2024
        </div>
      </div>
    </div>
  );
}
