'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Printer,
  Mail,
  RefreshCw,
  MapPin,
  Phone,
  Mail as MailIcon,
  User,
  DollarSign,
  Calendar,
  CreditCard,
} from 'lucide-react';

// Mock order data - In production, fetch from API
const getOrderById = (id: string) => {
  return {
    id: id,
    orderNumber: id,
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
    },
    shippingAddress: {
      fullName: 'John Doe',
      address: '123 Main Street',
      city: 'Colombo',
      state: 'Western',
      postalCode: '00100',
      country: 'Sri Lanka',
    },
    items: [
      {
        id: 1,
        name: 'Banarasi Silk Saree',
        quantity: 1,
        price: 89.99,
        image: '/images/products/banarasi-silk.jpg',
      },
      {
        id: 2,
        name: 'Handloom Cotton Kurta',
        quantity: 2,
        price: 45.99,
        image: '/images/products/cotton-kurta.jpg',
      },
    ],
    subtotal: 181.97,
    shipping: 0,
    tax: 14.56,
    total: 196.53,
    status: 'processing',
    paymentMethod: 'Credit Card',
    date: '2024-04-27T10:30:00',
    notes: 'Please deliver before the weekend.',
  };
};

const statusOptions = [
  { value: 'pending', label: 'Pending', icon: Clock, color: 'yellow' },
  { value: 'processing', label: 'Processing', icon: Package, color: 'blue' },
  { value: 'shipped', label: 'Shipped', icon: Truck, color: 'purple' },
  { value: 'delivered', label: 'Delivered', icon: CheckCircle, color: 'green' },
  { value: 'cancelled', label: 'Cancelled', icon: AlertCircle, color: 'red' },
];

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const [order, setOrder] = useState(getOrderById(orderId));
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    // In production, call your API to update order status
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOrder({ ...order, status: newStatus });
    setIsUpdating(false);
  };

  const statusColorClasses = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    processing: 'bg-blue-100 text-blue-700 border-blue-200',
    shipped: 'bg-purple-100 text-purple-700 border-purple-200',
    delivered: 'bg-green-100 text-green-700 border-green-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200',
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Orders', href: '/admin/orders', icon: '🛒' },
    { name: 'Products', href: '/admin/products', icon: '📦' },
    { name: 'Customers', href: '/admin/customers', icon: '👥' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 min-h-screen w-64 bg-white pt-20 shadow-lg">
          <div className="mb-4 border-b border-gray-200 p-4">
            <h2 className="font-serif text-xl font-bold text-[#8B4513]">Admin Panel</h2>
            <p className="text-xs text-gray-500">HandloomVilla Dashboard</p>
          </div>
          <nav className="space-y-1 px-3">
            {navItems.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-amber-50 hover:text-[#8B4513]"
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Link
                href="/admin/orders"
                className="mb-2 inline-flex items-center gap-2 text-gray-500 hover:text-[#8B4513]"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Orders
              </Link>
              <h1 className="font-serif text-3xl font-bold text-gray-900">
                Order #{order.orderNumber}
              </h1>
              <p className="mt-1 text-gray-500">
                Placed on {new Date(order.date).toLocaleDateString()} at{' '}
                {new Date(order.date).toLocaleTimeString()}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50">
                <Printer className="h-4 w-4" />
                Print
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50">
                <Mail className="h-4 w-4" />
                Email Customer
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Order Details */}
            <div className="space-y-6 lg:col-span-2">
              {/* Status Update */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Update Order Status</h2>
                <div className="flex flex-wrap gap-3">
                  {statusOptions.map(status => (
                    <button
                      key={status.value}
                      onClick={() => handleStatusUpdate(status.value)}
                      disabled={isUpdating}
                      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 transition-all ${
                        order.status === status.value
                          ? statusColorClasses[status.value as keyof typeof statusColorClasses]
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      } disabled:opacity-50`}
                    >
                      <status.icon className="h-4 w-4" />
                      {status.label}
                    </button>
                  ))}
                </div>
                {isUpdating && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Updating status...
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="border-b border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-gray-900">Order Items</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {order.items.map(item => (
                    <div key={item.id} className="flex gap-4 p-4">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#8B4513]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 bg-gray-50 p-6">
                  <div className="ml-auto max-w-xs space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span>${order.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-[#8B4513]">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Customer & Shipping */}
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <User className="h-5 w-5 text-[#8B4513]" />
                  Customer Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{order.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a
                      href={`mailto:${order.customer.email}`}
                      className="text-[#8B4513] hover:underline"
                    >
                      {order.customer.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{order.customer.phone}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <MapPin className="h-5 w-5 text-[#8B4513]" />
                  Shipping Address
                </h2>
                <div className="space-y-2 text-sm">
                  <p>{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>

              {/* Payment Information */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <CreditCard className="h-5 w-5 text-[#8B4513]" />
                  Payment Information
                </h2>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Method</p>
                    <p className="font-medium text-gray-900">{order.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Transaction Date</p>
                    <p>{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              {order.notes && (
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-lg font-bold text-gray-900">Order Notes</h2>
                  <p className="text-sm text-gray-600">{order.notes}</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
