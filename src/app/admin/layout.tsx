"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Tags, ShoppingBag, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const password = localStorage.getItem("adminPassword");
    if (password === "handloom123") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).password.value;
    if (input === "handloom123") {
      localStorage.setItem("adminPassword", input);
      setIsAuthenticated(true);
    } else {
      alert("Wrong password!");
    }
  };

  const logout = () => {
    localStorage.removeItem("adminPassword");
    window.location.reload();
  };

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/categories", label: "Categories", icon: Tags },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfaf5]">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full">
          <h1 className="text-3xl font-serif text-center mb-8 text-[var(--accent)]">
            HandloomVilla Admin
          </h1>
          <form onSubmit={login} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Admin Password</label>
              <input
                type="password"
                name="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--accent)]"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--accent)] text-white py-4 rounded-lg font-medium hover:bg-[var(--accent-hover)]"
            >
              Login to Admin Panel
            </button>
          </form>
          <p className="text-center text-xs text-gray-500 mt-6">
            Default password: <span className="font-mono">handloom123</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Dark Blue Sidebar */}
      <div className="w-72 bg-[#0f2a5e] text-white border-r border-gray-800 flex flex-col">
        <div className="p-8 border-b border-gray-700">
          <h1 className="text-3xl font-serif font-bold text-white">
            HandloomVilla
          </h1>
          <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-[#274a9c] text-white"
                        : "hover:bg-[#1e3a7a] text-gray-300"
                    }`}
                  >
                    <Icon size={22} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-6 border-t border-gray-700">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-5 py-3 hover:bg-[#1e3a7a] text-gray-300 rounded-xl transition-all"
          >
            <LogOut size={22} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}