'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Package,
  Users,
  AlertCircle,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  ArrowRight,
} from 'lucide-react';

// Mock data - In production, fetch from your API
const dashboardStats = {
  totalOrders: 156,
  totalRevenue: 12450.75,
  totalProducts: 48,
  totalCustomers: 382,
  pendingOrders: 12,
  outOfStock: 3,
};

const recentOrders = [
  {
    id: 'HL20240427001',
    customer: 'John Doe',
    amount: 189.99,
    status: 'delivered',
    date: '2024-04-27',
  },
  {
    id: 'HL20240426002',
    customer: 'Sarah Smith',
    amount: 245.5,
    status: 'processing',
    date: '2024-04-26',
  },
  {
    id: 'HL20240425003',
    customer: 'Michael Lee',
    amount: 89.99,
    status: 'shipped',
    date: '2024-04-25',
  },
  {
    id: 'HL20240424004',
    customer: 'Priya Sharma',
    amount: 156.75,
    status: 'pending',
    date: '2024-04-24',
  },
  {
    id: 'HL20240423005',
    customer: 'David Chen',
    amount: 324.99,
    status: 'cancelled',
    date: '2024-04-23',
  },
];

const topProducts = [
  { name: 'Banarasi Silk Saree', sales: 45, revenue: 4049.55 },
  { name: 'Handloom Cotton Kurta', sales: 38, revenue: 1747.62 },
  { name: 'Kanchipuram Silk Saree', sales: 32, revenue: 4159.68 },
  { name: 'Chanderi Dupatta', sales: 28, revenue: 1007.72 },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusIcons = {
  pending: <Clock className="h-3 w-3" />,
  processing: <Package className="h-3 w-3" />,
  shipped: <Truck className="h-3 w-3" />,
  delivered: <CheckCircle className="h-3 w-3" />,
  cancelled: <AlertCircle className="h-3 w-3" />,
};

export default function AdminDashboard() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-900">{greeting}, Admin</h1>
        <p className="mt-1 text-gray-500">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-xl bg-blue-100 p-2">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{dashboardStats.totalOrders}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="mt-1 text-xs text-gray-400">+12% from last month</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-xl bg-green-100 p-2">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              ${dashboardStats.totalRevenue.toLocaleString()}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="mt-1 text-xs text-gray-400">+8% from last month</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-xl bg-purple-100 p-2">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{dashboardStats.totalProducts}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
          <p className="mt-1 text-xs text-gray-400">{dashboardStats.outOfStock} out of stock</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-xl bg-amber-100 p-2">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {dashboardStats.totalCustomers}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Customers</h3>
          <p className="mt-1 text-xs text-gray-400">+24 new this month</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-xl bg-red-100 p-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{dashboardStats.pendingOrders}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
          <p className="mt-1 text-xs text-gray-400">Awaiting processing</p>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="flex items-center gap-1 text-sm text-[#8B4513] hover:underline"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">Order ID</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">Customer</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">Amount</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{order.id}</td>
                    <td className="p-4 text-sm">{order.customer}</td>
                    <td className="p-4 text-sm font-semibold">${order.amount.toFixed(2)}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}
                      >
                        {statusIcons[order.status as keyof typeof statusIcons]}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-sm text-[#8B4513] hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900">Top Selling Products</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-[#8B4513]">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} units sold</p>
                  </div>
                </div>
                <p className="font-semibold text-green-600">${product.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
