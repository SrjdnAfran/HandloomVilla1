'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  ShoppingBag,
  MoreVertical,
  Eye,
  MessageCircle,
} from 'lucide-react';

// Mock customers data
const customers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    totalOrders: 5,
    totalSpent: 1245.5,
    joinedDate: '2024-01-15',
    status: 'active',
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    phone: '+1 234 567 8901',
    totalOrders: 3,
    totalSpent: 567.75,
    joinedDate: '2024-02-20',
    status: 'active',
  },
  {
    id: 3,
    name: 'Michael Lee',
    email: 'michael@example.com',
    phone: '+1 234 567 8902',
    totalOrders: 8,
    totalSpent: 2345.99,
    joinedDate: '2024-01-05',
    status: 'active',
  },
  {
    id: 4,
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+1 234 567 8903',
    totalOrders: 2,
    totalSpent: 345.25,
    joinedDate: '2024-03-10',
    status: 'inactive',
  },
  {
    id: 5,
    name: 'David Chen',
    email: 'david@example.com',
    phone: '+1 234 567 8904',
    totalOrders: 12,
    totalSpent: 3456.8,
    joinedDate: '2023-11-20',
    status: 'active',
  },
  {
    id: 6,
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '+1 234 567 8905',
    totalOrders: 4,
    totalSpent: 876.3,
    joinedDate: '2024-02-01',
    status: 'active',
  },
  {
    id: 7,
    name: 'Raj Kumar',
    email: 'raj@example.com',
    phone: '+1 234 567 8906',
    totalOrders: 1,
    totalSpent: 89.99,
    joinedDate: '2024-04-01',
    status: 'active',
  },
  {
    id: 8,
    name: 'Lisa Wong',
    email: 'lisa@example.com',
    phone: '+1 234 567 8907',
    totalOrders: 6,
    totalSpent: 1234.5,
    joinedDate: '2024-01-28',
    status: 'inactive',
  },
];

export default function AdminCustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-900">Customers</h1>
        <p className="mt-1 text-gray-500">Manage and view customer information</p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-xl bg-blue-100 p-2">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{customers.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Customers</h3>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-xl bg-green-100 p-2">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">41</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-xl bg-purple-100 p-2">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">$10,162</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-xl bg-amber-100 p-2">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">6</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Active Customers</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
          >
            <option value="all">All Customers</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Customer</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Contact</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Orders</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Total Spent</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Joined</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 font-bold text-white">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-500">ID: {customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-semibold">{customer.totalOrders}</td>
                  <td className="p-4 text-sm font-semibold text-green-600">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="p-4 text-sm">{customer.joinedDate}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${customer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-400 transition-colors hover:text-[#8B4513]">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 transition-colors hover:text-[#8B4513]">
                        <MessageCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 text-sm text-gray-500">
        Showing {filteredCustomers.length} of {customers.length} customers
      </div>
    </div>
  );
}
