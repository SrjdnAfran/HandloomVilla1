'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  Package,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Mock orders data
const allOrders = [
  {
    id: 'HL20240427001',
    customer: 'John Doe',
    email: 'john@example.com',
    amount: 189.99,
    status: 'delivered',
    date: '2024-04-27',
    items: 3,
  },
  {
    id: 'HL20240426002',
    customer: 'Sarah Smith',
    email: 'sarah@example.com',
    amount: 245.5,
    status: 'processing',
    date: '2024-04-26',
    items: 2,
  },
  {
    id: 'HL20240425003',
    customer: 'Michael Lee',
    email: 'michael@example.com',
    amount: 89.99,
    status: 'shipped',
    date: '2024-04-25',
    items: 1,
  },
  {
    id: 'HL20240424004',
    customer: 'Priya Sharma',
    email: 'priya@example.com',
    amount: 156.75,
    status: 'pending',
    date: '2024-04-24',
    items: 4,
  },
  {
    id: 'HL20240423005',
    customer: 'David Chen',
    email: 'david@example.com',
    amount: 324.99,
    status: 'cancelled',
    date: '2024-04-23',
    items: 2,
  },
  {
    id: 'HL20240422006',
    customer: 'Emma Wilson',
    email: 'emma@example.com',
    amount: 78.5,
    status: 'delivered',
    date: '2024-04-22',
    items: 2,
  },
  {
    id: 'HL20240421007',
    customer: 'Raj Kumar',
    email: 'raj@example.com',
    amount: 199.99,
    status: 'processing',
    date: '2024-04-21',
    items: 3,
  },
  {
    id: 'HL20240420008',
    customer: 'Lisa Wong',
    email: 'lisa@example.com',
    amount: 129.99,
    status: 'shipped',
    date: '2024-04-20',
    items: 2,
  },
];

const statusOptions = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};
const statusIcons = {
  pending: <Clock className="h-4 w-4" />,
  processing: <Package className="h-4 w-4" />,
  shipped: <Truck className="h-4 w-4" />,
  delivered: <CheckCircle className="h-4 w-4" />,
  cancelled: <AlertCircle className="h-4 w-4" />,
};

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const filteredOrders = allOrders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-900">Orders</h1>
        <p className="mt-1 text-gray-500">Manage and track customer orders</p>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID, customer name, or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === 'all'
                    ? 'All Status'
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Order ID</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Customer</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Items</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Amount</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map(order => (
                <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-mono text-sm">{order.id}</td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{order.date}</td>
                  <td className="p-4 text-sm">{order.items}</td>
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
                      className="inline-flex items-center gap-1 text-sm text-[#8B4513] hover:underline"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 p-4">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-[#8B4513] disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-[#8B4513] disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 text-sm text-gray-500">
        Showing {paginatedOrders.length} of {filteredOrders.length} orders
      </div>
    </div>
  );
}
