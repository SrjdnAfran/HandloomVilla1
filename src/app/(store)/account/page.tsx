'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  ShoppingBag,
  Settings,
  ChevronRight,
  CheckCircle,
  Clock,
  Truck,
  PackageCheck,
  Eye,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Define order status type
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

const statusIcons: Record<OrderStatus, React.ReactNode> = {
  pending: <Clock className="h-5 w-5 text-yellow-500" />,
  processing: <Package className="h-5 w-5 text-blue-500" />,
  shipped: <Truck className="h-5 w-5 text-purple-500" />,
  delivered: <CheckCircle className="h-5 w-5 text-green-500" />,
  cancelled: <PackageCheck className="h-5 w-5 text-red-500" />,
};

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

// Define types for order and item
type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

type Order = {
  id: string;
  orderNumber: string;
  date: Date;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
};

// Sample orders data (in real app, fetch from API)
const sampleOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'HL20240427001',
    date: new Date('2024-04-27'),
    status: 'delivered',
    total: 89.99,
    items: [
      {
        id: 1,
        name: 'Banarasi Silk Saree',
        quantity: 1,
        price: 89.99,
        image: '/images/products/banarasi-silk.jpg',
      },
    ],
    shippingAddress: {
      fullName: 'John Doe',
      address: '123 Main St',
      city: 'Colombo',
      state: 'Western',
      postalCode: '00100',
      country: 'Sri Lanka',
    },
  },
  {
    id: '2',
    orderNumber: 'HL20240420002',
    date: new Date('2024-04-20'),
    status: 'shipped',
    total: 135.98,
    items: [
      {
        id: 2,
        name: 'Handloom Cotton Kurta',
        quantity: 2,
        price: 45.99,
        image: '/images/products/cotton-kurta.jpg',
      },
      {
        id: 3,
        name: 'Chanderi Dupatta',
        quantity: 1,
        price: 35.99,
        image: '/images/products/chanderi-dupatta.jpg',
      },
    ],
    shippingAddress: {
      fullName: 'John Doe',
      address: '123 Main St',
      city: 'Colombo',
      state: 'Western',
      postalCode: '00100',
      country: 'Sri Lanka',
    },
  },
];

function OrderCard({ order }: { order: Order }) {
  const status = order.status as OrderStatus;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 transition-all hover:shadow-md">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm text-gray-500">Order #{order.orderNumber}</p>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[status]}`}
            >
              {statusIcons[status]}
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-400">Placed on {order.date.toLocaleDateString()}</p>
        </div>
        <Link
          href={`/orders/${order.id}`}
          className="flex items-center gap-1 text-sm font-semibold text-[#8B4513] hover:underline"
        >
          View Details
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-2">
        {order.items.slice(0, 2).map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.name} x {item.quantity}
            </span>
            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        {order.items.length > 2 && (
          <p className="text-xs text-gray-400">+{order.items.length - 2} more items</p>
        )}
      </div>

      <div className="mt-4 flex justify-between border-t border-gray-100 pt-4">
        <span className="font-semibold text-gray-900">Total</span>
        <span className="font-bold text-[#8B4513]">${order.total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, getOrders } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      // In production, fetch orders from API
      setOrders(sampleOrders);
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-gray-900">My Account</h1>
          <p className="mt-1 text-gray-600">Welcome back, {user.name}!</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200">
                  <User className="h-10 w-10 text-[#8B4513]" />
                </div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    activeTab === 'orders'
                      ? 'bg-amber-50 font-semibold text-[#8B4513]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ShoppingBag className="h-5 w-5" />
                  My Orders
                  {orders.length > 0 && (
                    <span className="ml-auto rounded-full bg-gray-200 px-2 py-0.5 text-xs">
                      {orders.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    activeTab === 'profile'
                      ? 'bg-amber-50 font-semibold text-[#8B4513]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  Profile Settings
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    activeTab === 'wishlist'
                      ? 'bg-amber-50 font-semibold text-[#8B4513]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  Wishlist
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    activeTab === 'addresses'
                      ? 'bg-amber-50 font-semibold text-[#8B4513]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <MapPin className="h-5 w-5" />
                  Addresses
                </button>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <button
                  onClick={logout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-red-600 transition-all hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Order History</h2>
                  {orders.length === 0 && (
                    <Link href="/shop" className="text-sm text-[#8B4513] hover:underline">
                      Continue Shopping
                    </Link>
                  )}
                </div>

                {orders.length === 0 ? (
                  <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
                    <Package className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">No orders yet</h3>
                    <p className="mb-6 text-gray-500">Shop our collection of handloom products</p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#8B4513] px-6 py-3 text-white transition-all hover:bg-[#5C2E0B]"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Profile Information</h2>
                <form className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all outline-none focus:border-[#8B4513] focus:ring-4 focus:ring-amber-100"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all outline-none focus:border-[#8B4513] focus:ring-4 focus:ring-amber-100"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue={user.phone || ''}
                      placeholder="+94 XX XXX XXXX"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all outline-none focus:border-[#8B4513] focus:ring-4 focus:ring-amber-100"
                    />
                  </div>
                  <button className="rounded-xl bg-[#8B4513] px-6 py-3 text-white transition-all hover:bg-[#5C2E0B]">
                    Save Changes
                  </button>
                </form>

                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all outline-none focus:border-[#8B4513] focus:ring-4 focus:ring-amber-100"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all outline-none focus:border-[#8B4513] focus:ring-4 focus:ring-amber-100"
                      />
                    </div>
                    <button className="rounded-xl border border-[#8B4513] px-6 py-3 text-[#8B4513] transition-all hover:bg-[#8B4513] hover:text-white">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
                <h2 className="mb-6 text-xl font-bold text-gray-900">My Wishlist</h2>
                <div className="py-12 text-center">
                  <Heart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Your wishlist is empty
                  </h3>
                  <p className="mb-6 text-gray-500">Save your favorite items here</p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#8B4513] px-6 py-3 text-white transition-all hover:bg-[#5C2E0B]"
                  >
                    Explore Products
                  </Link>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                  <button className="rounded-lg bg-[#8B4513] px-4 py-2 text-sm text-white transition-all hover:bg-[#5C2E0B]">
                    Add New Address
                  </button>
                </div>
                <div className="py-12 text-center">
                  <MapPin className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">No saved addresses</h3>
                  <p className="mb-6 text-gray-500">
                    Add your shipping addresses for faster checkout
                  </p>
                  <button className="inline-flex items-center gap-2 rounded-xl bg-[#8B4513] px-6 py-3 text-white transition-all hover:bg-[#5C2E0B]">
                    Add New Address
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
