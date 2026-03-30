export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-4xl font-serif font-bold mb-8">Welcome to Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-medium">Total Products</h3>
          <p className="text-5xl font-bold text-[var(--accent)] mt-4">24</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-medium">Pending Orders</h3>
          <p className="text-5xl font-bold text-[var(--accent)] mt-4">3</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-medium">This Month Sales</h3>
          <p className="text-5xl font-bold text-[var(--accent)] mt-4">LKR 2,840</p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500">
          Click on the navigation above to manage products, categories, or view orders.
        </p>
      </div>
    </div>
  );
}