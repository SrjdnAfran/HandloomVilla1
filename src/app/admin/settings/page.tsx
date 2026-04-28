'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Settings,
  Store,
  Mail,
  CreditCard,
  Shield,
  Bell,
  Globe,
  Save,
  RefreshCw,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    storeName: 'HandloomVilla',
    storeEmail: 'hello@handloomvilla.com',
    storePhone: '+94 76 463 4990',
    currency: 'USD',
    taxRate: 8,
    freeShippingThreshold: 50,
    orderPrefix: 'HL',
    lowStockAlert: 5,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // In production, save to database
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('Settings saved successfully!');
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-500">Manage your store configuration</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* General Settings */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
            <Store className="h-5 w-5 text-[#8B4513]" />
            General Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Store Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={e => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Store Email</label>
              <input
                type="email"
                value={settings.storeEmail}
                onChange={e => setSettings({ ...settings, storeEmail: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Store Phone</label>
              <input
                type="text"
                value={settings.storePhone}
                onChange={e => setSettings({ ...settings, storePhone: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Currency</label>
              <select
                value={settings.currency}
                onChange={e => setSettings({ ...settings, currency: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="LKR">LKR (Rs)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Shipping & Tax */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
            <Globe className="h-5 w-5 text-[#8B4513]" />
            Shipping & Tax
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Tax Rate (%)</label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={e => setSettings({ ...settings, taxRate: parseFloat(e.target.value) })}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Free Shipping Threshold ($)
              </label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={e =>
                  setSettings({
                    ...settings,
                    freeShippingThreshold: parseFloat(e.target.value),
                  })
                }
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Order ID Prefix
              </label>
              <input
                type="text"
                value={settings.orderPrefix}
                onChange={e =>
                  setSettings({ ...settings, orderPrefix: e.target.value.toUpperCase() })
                }
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
                maxLength={3}
              />
              <p className="mt-1 text-xs text-gray-400">Example: HL202400001</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Low Stock Alert (units)
              </label>
              <input
                type="number"
                value={settings.lowStockAlert}
                onChange={e =>
                  setSettings({ ...settings, lowStockAlert: parseInt(e.target.value) })
                }
                className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-[#8B4513] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="lg:col-span-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#8B4513] px-6 py-3 text-white transition-all hover:bg-[#5C2E0B] disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
