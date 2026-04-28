'use client';

import Link from 'next/link';
import { Shield, Eye, Database, Cookie, Mail, Lock, Globe } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2">
            <Shield className="h-4 w-4 text-[#8B4513]" />
            <span className="text-sm font-medium text-[#8B4513]">Last Updated: April 2024</span>
          </div>
          <h1 className="mb-4 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600">
            At HandloomVilla, we value your privacy and are committed to protecting your personal
            information.
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Eye className="h-5 w-5 text-[#8B4513]" />
              Introduction
            </h2>
            <p className="leading-relaxed text-gray-600">
              This Privacy Policy explains how HandloomVilla (&quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot;) collects, uses, and protects your personal information when you visit
              our website or make a purchase from our online store. We are committed to ensuring
              that your privacy is protected.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Database className="h-5 w-5 text-[#8B4513]" />
              Information We Collect
            </h2>
            <p className="mb-3 text-gray-600">We may collect the following information:</p>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-600">
              <li>Name and contact information (email address, phone number, shipping address)</li>
              <li>Demographic information such as postcode, preferences, and interests</li>
              <li>Payment information (processed securely through our payment partners)</li>
              <li>Order history and purchase details</li>
              <li>Website usage data and browsing behavior</li>
              <li>Communications and feedback you provide to us</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Globe className="h-5 w-5 text-[#8B4513]" />
              How We Use Your Information
            </h2>
            <p className="mb-3 text-gray-600">We use your information to:</p>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-600">
              <li>Process and fulfill your orders</li>
              <li>Improve our products and services</li>
              <li>Send periodic emails about orders, new products, or special offers</li>
              <li>Customize the website according to your interests</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Cookie className="h-5 w-5 text-[#8B4513]" />
              Cookies
            </h2>
            <p className="leading-relaxed text-gray-600">
              We use cookies to enhance your browsing experience. Cookies are small files that ask
              permission to be placed on your computer&apos;s hard drive. Once you agree, the file
              is added, and the cookie helps analyze web traffic or lets you know when you visit a
              particular site. You can choose to accept or decline cookies through your browser
              settings.
            </p>
          </section>

          {/* Security */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Lock className="h-5 w-5 text-[#8B4513]" />
              Security
            </h2>
            <p className="leading-relaxed text-gray-600">
              We are committed to ensuring that your information is secure. In order to prevent
              unauthorized access or disclosure, we have put in place suitable physical, electronic,
              and managerial procedures to safeguard and secure the information we collect online.
              All payment transactions are encrypted using SSL technology.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 text-xl font-bold text-gray-900">Third-Party Links</h2>
            <p className="leading-relaxed text-gray-600">
              Our website may contain links to other websites of interest. However, once you have
              used these links to leave our site, you should note that we do not have any control
              over that other website. Therefore, we cannot be responsible for the protection and
              privacy of any information which you provide whilst visiting such sites.
            </p>
          </section>

          {/* Your Rights */}
          <section className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 text-xl font-bold text-gray-900">Your Rights</h2>
            <p className="mb-3 text-gray-600">You have the right to:</p>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-600">
              <li>Request access to your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          {/* Contact Us */}
          <section className="rounded-2xl bg-amber-50 p-6">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Mail className="h-5 w-5 text-[#8B4513]" />
              Contact Us
            </h2>
            <p className="mb-3 text-gray-600">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-2 text-gray-600">
              <p>📧 Email: privacy@handloomvilla.com</p>
              <p>📞 Phone: +94 76 463 4990</p>
              <p>📍 Address: 6A, Nooraniya Road, Maruthamunai, Sri Lanka</p>
            </div>
          </section>
        </div>

        {/* Last Updated */}
        <div className="mt-8 text-center text-sm text-gray-400">
          This policy was last updated on April 27, 2024
        </div>
      </div>
    </div>
  );
}
