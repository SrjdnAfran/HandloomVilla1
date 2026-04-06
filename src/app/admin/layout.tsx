"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Tags, ShoppingBag, LogOut, Menu, X } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if user is logged in
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

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full">
          <h1 className="text-3xl font-serif text-center mb-8 text-[#274a9c]">
            HandloomVilla Admin
          </h1>
          <form onSubmit={login}>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#274a9c]"
              placeholder="Enter admin password"
              required
            />
            <button
              type="submit"
              className="w-full mt-6 bg-[#274a9c] text-white py-4 rounded-lg font-medium hover:bg-[#1e3a7a]"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-72 bg-[#0f2a5e] text-white flex-shrink-0 border-r border-gray-800">
        <div className="p-8 border-b border-gray-700">
          <h1 className="text-3xl font-serif font-bold">HandloomVilla</h1>
          <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
        </div>

        <nav className="p-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-xl mb-1 transition-all ${
                  active ? "bg-[#274a9c]" : "hover:bg-[#1e3a7a]"
                }`}
              >
                <Icon size={22} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-8 px-6 w-72">
          <button
            onClick={logout}
            className="flex items-center gap-3 text-red-400 hover:text-red-500 w-full px-5 py-3 rounded-xl hover:bg-red-950/30"
          >
            <LogOut size={22} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1">
        {/* Mobile Top Bar */}
        <div className="md:hidden bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
          <h1 className="text-2xl font-serif font-bold text-[#274a9c]">HandloomVilla</h1>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/70 z-50">
            <div className="bg-white h-full w-72 p-6">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-100"
                  >
                    <item.icon size={24} />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <button onClick={logout} className="mt-10 text-red-600 flex items-center gap-3 p-4">
                <LogOut size={24} /> Logout
              </button>
            </div>
          </div>
        )}

        {/* Content Area - NO Header & Footer */}
        <main className="p-4 md:p-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}