'use client';

import { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Send,
  CheckCircle,
  MessageCircle,
  Truck,
  RefreshCw,
  Shield,
  X,
  ChevronRight,
  Star,
  Headphones,
  Sparkles,
  Globe,
  CreditCard,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* --- ENHANCED POPUP MODAL --- 
      {showPopup && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md duration-300">
          <div className="animate-in zoom-in-95 relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl duration-300">
            <div className="absolute top-0 right-0 left-0 h-32 bg-gradient-to-br from-[#000D33] to-[#004080] opacity-90" />
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/20 p-1.5 text-white transition-all hover:scale-110 hover:bg-white/30"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative pt-16 pb-6 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Custom Design Service</h2>
              <p className="mt-2 px-6 text-gray-600">
                Get a unique handloom piece tailored to your preferences
              </p>
            </div>
            <div className="border-t border-gray-100 bg-gray-50 p-6">
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Free consultation with master artisans</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Personalized design & color options</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Direct communication with weavers</span>
                </div>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#000D33] to-[#004080] py-3.5 font-semibold text-white transition-all hover:shadow-lg"
              >
                <span className="relative z-10">Start Free Consultation</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </button>
              <p className="mt-3 text-center text-xs text-gray-500">✨ Available 9AM - 6PM (IST)</p>
            </div>
          </div>
        </div>
      )}
*/}
      {/* --- ENHANCED HERO SECTION --- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#001a4a] via-[#000D33] to-[#003070] py-28 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-6 text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <Headphones className="h-4 w-4" />
              <span className="text-sm font-medium">24/7 Customer Support</span>
            </div>
            <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight lg:text-7xl">
              Let's Create Something
              <span className="block text-amber-400">Beautiful Together</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-blue-100/90">
              Experience the timeless heritage of Maruthamunai handloom. Our dedicated team is here
              to bring your vision to life.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-gray-300 to-gray-400"
                  />
                ))}
              </div>
              <span className="text-sm text-blue-200">Trusted by 5000+ happy customers</span>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-slate-50/10 to-transparent" />
      </section>

      <div className="container mx-auto -mt-12 px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* --- ENHANCED CONTACT INFO SIDEBAR --- */}
          <div className="space-y-6 pt-16 lg:col-span-1">
            <div className="rounded-2xl bg-gradient-to-br from-[#000D33] to-[#003887] p-8 text-white shadow-xl">
              <h3 className="mb-4 text-2xl font-bold">Get in Touch</h3>
              <p className="mb-6 text-blue-100">We'd love to hear from you. Reach out anytime!</p>
              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    title: 'Visit Us',
                    content: '6A, Nooraniya Road, Maruthamunai, Sri Lanka',
                  },
                  {
                    icon: Phone,
                    title: 'Call Us',
                    content: '+94 76 463 4990',
                    action: 'tel:+94764634990',
                  },
                  {
                    icon: Mail,
                    title: 'Email Us',
                    content: 'support@handloomvilla.com',
                    action: 'mailto:support@handloomvilla.com',
                  },
                  { icon: Clock, title: 'Business Hours', content: 'Mon - Sat: 9AM - 6PM' },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.action}
                    className="group flex items-start gap-4 rounded-xl p-3 transition-all hover:bg-white/10"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-blue-100">{item.content}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <div className="mb-3 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 italic">
                "Absolutely stunning craftsmanship! The team was incredibly helpful throughout the
                process."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600" />
                <div>
                  <p className="font-semibold text-gray-900">Priya Sharma</p>
                  <p className="text-xs text-gray-500">Verified Customer</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- ENHANCED FORM CARD --- */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 bg-white/95 p-8 shadow-xl backdrop-blur-sm lg:p-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
                <p className="mt-2 text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              {isSubmitted && (
                <div className="animate-in slide-in-from-top-2 mb-8 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">
                    Message sent successfully! Our team will reach out shortly.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full rounded-xl border px-4 py-3 transition-all outline-none focus:ring-4 ${
                        focusedField === 'name'
                          ? 'border-[#000D33] bg-white ring-4 ring-blue-100'
                          : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full rounded-xl border px-4 py-3 transition-all outline-none focus:ring-4 ${
                        focusedField === 'email'
                          ? 'border-[#000D33] bg-white ring-4 ring-blue-100'
                          : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 transition-all outline-none focus:border-[#000D33] focus:bg-white focus:ring-4 focus:ring-blue-100"
                      placeholder="+94 XX XXX XXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 transition-all outline-none focus:border-[#000D33] focus:bg-white focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">Select a reason</option>
                      <option value="Product">📦 Product Inquiry</option>
                      <option value="Wholesale">� wholesale Partnership</option>
                      <option value="Custom">🎨 Custom Design Request</option>
                      <option value="Support">🛟 Customer Support</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 transition-all outline-none focus:border-[#000D33] focus:bg-white focus:ring-4 focus:ring-blue-100"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#000D33] to-[#004080] px-8 py-4 font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                </button>

                <p className="text-center text-xs text-gray-500">
                  By submitting, you agree to our{' '}
                  <a href="#" className="text-[#000D33] underline">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* --- ENHANCED MAP SECTION --- */}
        <div className="group relative mt-20 overflow-hidden rounded-2xl shadow-2xl">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63254.43725796213!2d81.80164665!3d7.42065875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae51578331165df%3A0xc002f2323f46f903!2sMaruthamunai!5e0!3m2!1sen!2slk!4v1700000000000"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute right-4 bottom-4 z-20 rounded-lg bg-white/90 px-3 py-1.5 text-sm font-medium shadow-lg backdrop-blur">
            📍 Maruthamunai, Sri Lanka
          </div>
        </div>

        {/* --- ENHANCED FAQ SECTION --- */}
        <div className="mt-24">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2">
              <MessageCircle className="h-4 w-4 text-[#000D33]" />
              <span className="text-sm font-medium text-[#000D33]">FAQ</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#000D33] md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-gray-600">
              Everything you need to know about our products and services
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                q: 'How long does shipping take?',
                a: 'Domestic orders typically arrive within 3-5 business days. International shipping takes 7-14 business days. Express shipping options are available at checkout.',
              },
              {
                q: 'Do you offer returns?',
                a: 'Yes, we offer 30-day hassle-free returns on all unworn items with original tags attached. Free returns for domestic orders.',
              },
              {
                q: 'Do you ship internationally?',
                a: 'Yes! We ship worldwide to over 50 countries. Shipping costs and delivery times vary by destination.',
              },
              {
                q: 'Can I track my order?',
                a: "Absolutely! Once your order ships, you'll receive a tracking number via email and SMS. You can track your package in real-time.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-[#000D33]">{faq.q}</h3>
                  <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-[#000D33]" />
                </div>
                <p className="mt-3 leading-relaxed text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- ENHANCED SOCIAL SECTION --- */}
        <div className="mt-24 overflow-hidden rounded-2xl bg-gradient-to-br from-[#000D33] to-[#003887] p-12 text-center text-white shadow-2xl">
          <div className="relative z-10">
            <h2 className="mb-4 font-serif text-3xl font-bold">Follow Our Journey</h2>
            <p className="mb-8 text-blue-100">Join our community of 50,000+ handloom enthusiasts</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                {
                  icon: Facebook,
                  href: 'https://facebook.com/handloomvilla',
                  label: 'Facebook',
                  color: 'hover:bg-[#1877f2]',
                },
                {
                  icon: Instagram,
                  href: 'https://instagram.com/handloomvilla',
                  label: 'Instagram',
                  color:
                    'hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]',
                },
                {
                  icon: Twitter,
                  href: 'https://twitter.com/handloomvilla',
                  label: 'Twitter',
                  color: 'hover:bg-[#1da1f2]',
                },
                {
                  icon: MessageCircle,
                  href: 'https://wa.me/94764634990',
                  label: 'WhatsApp',
                  color: 'hover:bg-[#25d366]',
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 rounded-xl bg-white/10 px-6 py-3 font-medium transition-all hover:scale-105 hover:shadow-xl ${social.color}`}
                >
                  <social.icon className="h-5 w-5" />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* --- ENHANCED TRUST BADGES --- */}
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              icon: Globe,
              title: 'Global Shipping',
              desc: 'Crafts delivered to 50+ countries',
              color: 'from-blue-500 to-blue-600',
            },
            {
              icon: RefreshCw,
              title: 'Easy Returns',
              desc: '30-day hassle-free returns',
              color: 'from-green-500 to-green-600',
            },
            {
              icon: CreditCard,
              title: 'Secure Payment',
              desc: '256-bit SSL encryption',
              color: 'from-purple-500 to-purple-600',
            },
          ].map((badge, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-0 transition-opacity group-hover:opacity-5`}
              />
              <div className="relative">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 text-[#000D33] transition-all group-hover:scale-110 group-hover:from-[#000D33] group-hover:to-[#004080] group-hover:text-white">
                  <badge.icon className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">{badge.title}</h4>
                <p className="mt-2 text-sm text-gray-500">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
