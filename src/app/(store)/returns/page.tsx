'use client';

import Link from 'next/link';
import {
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck,
  CreditCard,
  Package,
} from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2">
            <RefreshCw className="h-4 w-4 text-[#8B4513]" />
            <span className="text-sm font-medium text-[#8B4513]">Easy Returns</span>
          </div>
          <h1 className="mb-4 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
            Return & Refund Policy
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600">
            We want you to love your HandloomVilla purchase. If you're not completely satisfied,
            we're here to help.
          </p>
        </div>

        <div className="space-y-8">
          {/* 30-Day Guarantee */}
          <section className="rounded-2xl border border-green-200 bg-green-50 p-6">
            <div className="mb-3 flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">30-Day Satisfaction Guarantee</h2>
            </div>
            <p className="text-gray-700">
              You have 30 calendar days from the date of delivery to return an item for a full
              refund or exchange. No questions asked!
            </p>
          </section>

          {/* Return Conditions */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Package className="h-5 w-5 text-[#8B4513]" />
              Return Conditions
            </h2>
            <p className="mb-3 text-gray-600">To be eligible for a return, your item must:</p>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-600">
              <li>Be unused, unworn, and in original condition</li>
              <li>Have all original tags attached</li>
              <li>Be in the original packaging</li>
              <li>Include proof of purchase (order number or receipt)</li>
              <li>Not be a final sale or custom-made item</li>
            </ul>
          </section>

          {/* Non-Returnable Items */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <AlertCircle className="h-5 w-5 text-[#8B4513]" />
              Non-Returnable Items
            </h2>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-600">
              <li>Custom or personalized orders</li>
              <li>Final sale items (marked as "Final Sale")</li>
              <li>Gift cards</li>
              <li>Items damaged due to misuse or neglect</li>
              <li>Items returned without original tags</li>
            </ul>
          </section>

          {/* Return Process */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 text-xl font-bold text-gray-900">How to Return an Item</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 font-bold text-[#8B4513]">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Contact Us</h3>
                  <p className="text-gray-600">
                    Email support@handloomvilla.com with your order number and reason for return
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 font-bold text-[#8B4513]">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Get Return Authorization</h3>
                  <p className="text-gray-600">
                    We'll send you a return authorization number and instructions
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 font-bold text-[#8B4513]">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Pack & Ship</h3>
                  <p className="text-gray-600">
                    Pack items securely and ship to our returns address
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 font-bold text-[#8B4513]">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Refund Processed</h3>
                  <p className="text-gray-600">
                    We'll inspect and process your refund within 5-7 business days
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Refunds */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <CreditCard className="h-5 w-5 text-[#8B4513]" />
              Refunds
            </h2>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-600">
              <li>Refunds are issued to the original payment method</li>
              <li>Processing time: 5-7 business days after inspection</li>
              <li>Original shipping costs are non-refundable</li>
              <li>Customer pays return shipping unless item is defective</li>
              <li>You will receive an email confirmation once refund is processed</li>
            </ul>
          </section>

          {/* Exchanges */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <RefreshCw className="h-5 w-5 text-[#8B4513]" />
              Exchanges
            </h2>
            <p className="leading-relaxed text-gray-600">
              Want a different color or size? Contact us within 14 days of delivery to initiate an
              exchange. Exchanges are subject to availability. If the desired item is not available,
              we will process a refund instead.
            </p>
          </section>

          {/* Defective Items */}
          <section className="rounded-2xl bg-amber-50 p-6">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Truck className="h-5 w-5 text-[#8B4513]" />
              Damaged or Defective Items
            </h2>
            <p className="mb-3 text-gray-700">
              We take quality seriously. If you receive a damaged or defective item, please contact
              us within 48 hours of delivery with photos of the damage.
            </p>
            <div className="rounded-xl bg-white p-4">
              <p className="text-sm text-gray-600">
                <strong>What we'll do:</strong> Replace the item at no cost and cover return
                shipping, or issue a full refund including original shipping costs.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="rounded-2xl bg-white p-6 text-center shadow-md">
            <h2 className="mb-3 text-xl font-bold text-gray-900">Need Help?</h2>
            <p className="mb-4 text-gray-600">
              Our customer service team is ready to assist you with any return or exchange
              questions.
            </p>
            <div className="space-y-2 text-gray-600">
              <p>📧 Email: returns@handloomvilla.com</p>
              <p>📞 Phone: +94 76 463 4990</p>
              <p>⏰ Hours: Monday - Friday, 9AM - 6PM (IST)</p>
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
