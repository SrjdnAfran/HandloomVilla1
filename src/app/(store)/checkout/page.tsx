'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  Truck,
  Shield,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  User,
  CheckCircle,
  Lock,
  ArrowRight,
  AlertCircle,
  ShoppingCart, // ← This was missing
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

// Order Summary Component
function OrderSummary({ items, subtotal }: { items: any[]; subtotal: number }) {
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Order Summary</h2>

      {/* Cart Items Preview */}
      <div className="mb-4 max-h-64 space-y-3 overflow-y-auto">
        {items.map(item => (
          <div key={item.id} className="flex gap-3 border-b border-gray-100 pb-3">
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-amber-50">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-[#8B4513]">
              Rs. {(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 border-t border-gray-200 pt-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `Rs. ${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Estimated Tax</span>
          <span className="font-medium">Rs. {tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-3 text-lg font-bold">
          <span>Total</span>
          <span className="text-[#8B4513]">Rs. {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Free Shipping Progress */}
      {subtotal < 50 && (
        <div className="mt-4 rounded-xl bg-amber-50 p-3">
          <div className="mb-1 flex justify-between text-xs text-gray-600">
            <span>Add Rs. ${(50 - subtotal).toFixed(2)} more for free shipping</span>
            <span>{Math.round((subtotal / 50) * 100)}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#8B4513] transition-all duration-300"
              style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Trust Badges */}
      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-1">
            <Truck className="h-3 w-3" />
            <span>Free Shipping</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Shipping Form Component
function ShippingForm({
  formData,
  setFormData,
  errors,
  onNext,
}: {
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
  onNext: () => void;
}) {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onFocus={() => setFocusedField('fullName')}
              onBlur={() => setFocusedField(null)}
              className={`w-full rounded-xl border py-3 pr-4 pl-10 transition-all outline-none focus:ring-4 ${
                focusedField === 'fullName'
                  ? 'border-[#8B4513] bg-white ring-4 ring-amber-100'
                  : errors.fullName
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
              }`}
              placeholder="John Doe"
            />
          </div>
          {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className={`w-full rounded-xl border py-3 pr-4 pl-10 transition-all outline-none focus:ring-4 ${
                focusedField === 'email'
                  ? 'border-[#8B4513] bg-white ring-4 ring-amber-100'
                  : errors.email
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
              }`}
              placeholder="john@example.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField(null)}
            className={`w-full rounded-xl border py-3 pr-4 pl-10 transition-all outline-none focus:ring-4 ${
              focusedField === 'phone'
                ? 'border-[#8B4513] bg-white ring-4 ring-amber-100'
                : errors.phone
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
            }`}
            placeholder="+94 XX XXX XXXX"
          />
        </div>
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Address Line 1 <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <MapPin className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onFocus={() => setFocusedField('address')}
            onBlur={() => setFocusedField(null)}
            className={`w-full rounded-xl border py-3 pr-4 pl-10 transition-all outline-none focus:ring-4 ${
              focusedField === 'address'
                ? 'border-[#8B4513] bg-white ring-4 ring-amber-100'
                : errors.address
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
            }`}
            placeholder="Street address"
          />
        </div>
        {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Address Line 2 (Optional)
        </label>
        <input
          type="text"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 transition-all outline-none focus:border-[#8B4513] focus:bg-white focus:ring-4 focus:ring-amber-100"
          placeholder="Apartment, suite, etc."
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full rounded-xl border px-4 py-3 transition-all outline-none focus:ring-4 ${
              errors.city
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 bg-gray-50/50 focus:border-[#8B4513] focus:bg-white focus:ring-4 focus:ring-amber-100'
            }`}
            placeholder="City"
          />
          {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            State <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`w-full rounded-xl border px-4 py-3 transition-all outline-none focus:ring-4 ${
              errors.state
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 bg-gray-50/50 focus:border-[#8B4513] focus:bg-white focus:ring-4 focus:ring-amber-100'
            }`}
            placeholder="State / Province"
          />
          {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Postal Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className={`w-full rounded-xl border px-4 py-3 transition-all outline-none focus:ring-4 ${
              errors.postalCode
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 bg-gray-50/50 focus:border-[#8B4513] focus:bg-white focus:ring-4 focus:ring-amber-100'
            }`}
            placeholder="Postal Code"
          />
          {errors.postalCode && <p className="mt-1 text-xs text-red-500">{errors.postalCode}</p>}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Country <span className="text-red-500">*</span>
        </label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={`w-full rounded-xl border px-4 py-3 transition-all outline-none focus:ring-4 ${
            errors.country
              ? 'border-red-500 bg-red-50'
              : 'border-gray-200 bg-gray-50/50 focus:border-[#8B4513] focus:bg-white focus:ring-4 focus:ring-amber-100'
          }`}
        >
          <option value="">Select Country</option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="India">India</option>
          <option value="Singapore">Singapore</option>
          <option value="Malaysia">Malaysia</option>
        </select>
        {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country}</p>}
      </div>

      <button
        onClick={onNext}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8B4513] px-8 py-3 font-semibold text-white transition-all hover:bg-[#5C2E0B] md:w-auto"
      >
        Continue to Payment
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// Payment Method Component
function PaymentMethod({
  selectedMethod,
  onSelect,
  onNext,
  onBack,
}: {
  selectedMethod: string;
  onSelect: (method: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const methods = [
    {
      id: 'credit-card',
      name: 'Credit / Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, Amex',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: () => <span className="text-xl">P</span>,
      description: 'Pay with your PayPal account',
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: () => <span className="text-xl">📦</span>,
      description: 'Pay when you receive',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {methods.map(method => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <label
              key={method.id}
              className={`flex cursor-pointer items-start gap-4 rounded-xl border-2 p-4 transition-all ${
                isSelected
                  ? 'border-[#8B4513] bg-amber-50/30'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={isSelected}
                onChange={() => onSelect(method.id)}
                className="mt-1 h-4 w-4 text-[#8B4513] focus:ring-[#8B4513]"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      isSelected ? 'bg-[#8B4513] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p
                      className={`font-semibold ${isSelected ? 'text-[#8B4513]' : 'text-gray-900'}`}
                    >
                      {method.name}
                    </p>
                    <p className="text-xs text-gray-500">{method.description}</p>
                  </div>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Secure Payment Notice */}
      <div className="flex items-start gap-3 rounded-xl bg-green-50 p-4">
        <Lock className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
        <div>
          <p className="text-sm font-semibold text-green-800">Secure Payment</p>
          <p className="text-xs text-green-600">Your payment information is encrypted and secure</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#8B4513] px-6 py-3 font-semibold text-white transition-all hover:bg-[#5C2E0B]"
        >
          Continue to Review
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Review Order Component
function ReviewOrder({
  formData,
  paymentMethod,
  items,
  subtotal,
  onBack,
  onPlaceOrder,
  isProcessing,
}: {
  formData: any;
  paymentMethod: string;
  items: any[];
  subtotal: number;
  onBack: () => void;
  onPlaceOrder: () => void;
  isProcessing: boolean;
}) {
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const getPaymentMethodName = () => {
    switch (paymentMethod) {
      case 'credit-card':
        return 'Credit / Debit Card';
      case 'paypal':
        return 'PayPal';
      case 'cod':
        return 'Cash on Delivery';
      default:
        return paymentMethod;
    }
  };

  return (
    <div className="space-y-6">
      {/* Shipping Information Review */}
      <div className="rounded-xl border border-gray-200 p-5">
        <h3 className="mb-3 flex items-center gap-2 font-bold text-gray-900">
          <Truck className="h-5 w-5 text-[#8B4513]" />
          Shipping Information
        </h3>
        <div className="space-y-1 text-sm">
          <p>
            <span className="text-gray-500">Name:</span> {formData.fullName}
          </p>
          <p>
            <span className="text-gray-500">Email:</span> {formData.email}
          </p>
          <p>
            <span className="text-gray-500">Phone:</span> {formData.phone}
          </p>
          <p>
            <span className="text-gray-500">Address:</span> {formData.address}
          </p>
          {formData.address2 && <p>{formData.address2}</p>}
          <p>
            {formData.city}, {formData.state} {formData.postalCode}
          </p>
          <p>{formData.country}</p>
        </div>
      </div>

      {/* Payment Method Review */}
      <div className="rounded-xl border border-gray-200 p-5">
        <h3 className="mb-3 flex items-center gap-2 font-bold text-gray-900">
          <CreditCard className="h-5 w-5 text-[#8B4513]" />
          Payment Method
        </h3>
        <p className="text-sm">{getPaymentMethodName()}</p>
      </div>

      {/* Order Items Review */}
      <div className="rounded-xl border border-gray-200 p-5">
        <h3 className="mb-3 flex items-center gap-2 font-bold text-gray-900">
          <ShoppingCart className="h-5 w-5 text-[#8B4513]" />
          Order Items
        </h3>
        <div className="max-h-48 space-y-2 overflow-y-auto">
          {items.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span className="font-medium">Rs. {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-1 border-t border-gray-100 pt-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span>Rs. {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shipping</span>
            <span>{shipping === 0 ? 'Free' : `Rs. ${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tax</span>
            <span>Rs. {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-2 font-bold">
            <span>Total</span>
            <span className="text-[#8B4513]">Rs. {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={onPlaceOrder}
          disabled={isProcessing}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#8B4513] px-6 py-3 font-semibold text-white transition-all hover:bg-[#5C2E0B] disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Processing...
            </>
          ) : (
            <>
              Place Order
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Main Checkout Page Component
export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = getCartTotal();

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !orderPlaced) {
      router.push('/shop');
    }
  }, [cart, router, orderPlaced]);

  const validateShippingForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!formData.country) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateShippingForm()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate random order number
    const newOrderNumber =
      'HL' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 1000);
    setOrderNumber(newOrderNumber);

    // Clear cart
    clearCart();

    setIsProcessing(false);
    setOrderPlaced(true);
  };

  if (cart.length === 0 && !orderPlaced) {
    return null; // Will redirect to shop
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="mb-3 font-serif text-3xl font-bold text-gray-900">Order Confirmed!</h1>
            <p className="mb-2 text-gray-600">Thank you for shopping with HandloomVilla</p>
            <p className="mb-6 text-sm text-gray-500">
              Order Number: <span className="font-mono font-semibold">{orderNumber}</span>
            </p>
            <div className="mb-6 rounded-xl bg-amber-50 p-4 text-left">
              <p className="mb-2 text-sm text-gray-700">
                📧 A confirmation email has been sent to:
              </p>
              <p className="font-medium text-gray-900">{formData.email}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#8B4513] px-6 py-3 font-semibold text-white transition-all hover:bg-[#5C2E0B]"
              >
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="mb-4 inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-[#8B4513]"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Cart
          </Link>
          <h1 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">Checkout</h1>
          <p className="mt-1 text-gray-600">Complete your order securely</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-[#8B4513]' : 'text-gray-400'}`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep >= 1 ? 'bg-[#8B4513] text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                1
              </div>
              <span className="hidden text-sm font-medium sm:inline">Shipping</span>
            </div>
            <div className={`h-0.5 w-12 ${currentStep >= 2 ? 'bg-[#8B4513]' : 'bg-gray-200'}`} />
            <div
              className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-[#8B4513]' : 'text-gray-400'}`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep >= 2 ? 'bg-[#8B4513] text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                2
              </div>
              <span className="hidden text-sm font-medium sm:inline">Payment</span>
            </div>
            <div className={`h-0.5 w-12 ${currentStep >= 3 ? 'bg-[#8B4513]' : 'bg-gray-200'}`} />
            <div
              className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-[#8B4513]' : 'text-gray-400'}`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep >= 3 ? 'bg-[#8B4513] text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                3
              </div>
              <span className="hidden text-sm font-medium sm:inline">Confirm</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Forms */}
          <div className="space-y-6 lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-left-4 rounded-2xl bg-white p-6 shadow-lg duration-300 md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                    <Truck className="h-5 w-5 text-[#8B4513]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Shipping Information</h2>
                    <p className="text-sm text-gray-500">Enter your delivery details</p>
                  </div>
                </div>
                <ShippingForm
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  onNext={handleNext}
                />
              </div>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 rounded-2xl bg-white p-6 shadow-lg duration-300 md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                    <CreditCard className="h-5 w-5 text-[#8B4513]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                    <p className="text-sm text-gray-500">Select how you want to pay</p>
                  </div>
                </div>
                <PaymentMethod
                  selectedMethod={paymentMethod}
                  onSelect={setPaymentMethod}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              </div>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <div className="animate-in fade-in zoom-in-95 rounded-2xl bg-white p-6 shadow-lg duration-300 md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                    <CheckCircle className="h-5 w-5 text-[#8B4513]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Review Your Order</h2>
                    <p className="text-sm text-gray-500">Verify details before placing order</p>
                  </div>
                </div>
                <ReviewOrder
                  formData={formData}
                  paymentMethod={paymentMethod}
                  items={cart}
                  subtotal={subtotal}
                  onBack={handleBack}
                  onPlaceOrder={handlePlaceOrder}
                  isProcessing={isProcessing}
                />
              </div>
            )}
          </div>

          {/* Right Column - Order Summary (Always visible) */}
          <div className="lg:col-span-1">
            <OrderSummary items={cart} subtotal={subtotal} />
          </div>
        </div>

        {/* Policy Links */}
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="transition-colors hover:text-[#8B4513]">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="transition-colors hover:text-[#8B4513]">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/shipping" className="transition-colors hover:text-[#8B4513]">
              Shipping Policy
            </Link>
            <span>•</span>
            <Link href="/returns" className="transition-colors hover:text-[#8B4513]">
              Return Policy
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
