"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, X, Upload } from "lucide-react";
import { useProductStore } from "@/lib/productStore";
import { Product } from "@/data/products";

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    image: "",
    category: "",
    fabric: "",
    description: "",
  });

  // Initialize with default products if empty
  useEffect(() => {
    if (products.length === 0) {
      import("@/data/products").then((mod) => {
        useProductStore.getState().setProducts(mod.products);
      });
    }
  }, [products.length]);

  const resetForm = () => {
    setFormData({ name: "", price: 0, image: "", category: "", fabric: "", description: "" });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({ ...prev, image: event.target?.result as string }));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image || !formData.category || !formData.description) {
      alert("Please fill all required fields");
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      const newProduct: Product = {
        id: Date.now(),
        ...formData,
      };
      addProduct(newProduct);
    }

    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      fabric: product.fabric || "",
      description: product.description,
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this product?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-serif font-bold">Products</h1>
          <p className="text-gray-600">Manage your handloom collection ({products.length} items)</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8 py-3 rounded-xl font-medium"
        >
          <Plus size={22} />
          Add New Product
        </button>
      </div>

      {/* Form Modal - same as before */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-auto">
            <div className="p-8">
              <div className="flex justify-between mb-8">
                <h2 className="text-3xl font-bold">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button onClick={resetForm}><X size={32} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload Area */}
                <div>
                  <label className="block text-sm font-medium mb-3">Product Photo *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                    {formData.image ? (
                      <div className="relative mx-auto w-48 h-64 rounded-xl overflow-hidden border">
                        <Image src={formData.image} alt="Preview" fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: "" })}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center">
                        <Upload size={48} className="text-gray-400 mb-4" />
                        <span className="text-lg font-medium">Click to upload photo</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    )}
                    {uploading && <p className="text-blue-600 mt-3">Processing image...</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Product Name *</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded-xl px-4 py-3" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price (LKR) *</label>
                    <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full border rounded-xl px-4 py-3" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full border rounded-xl px-4 py-3" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Fabric</label>
                    <input type="text" value={formData.fabric} onChange={(e) => setFormData({ ...formData, fabric: e.target.value })} className="w-full border rounded-xl px-4 py-3" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={5} className="w-full border rounded-xl px-4 py-3" required />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-[var(--accent)] text-white py-4 rounded-2xl font-medium hover:bg-[var(--accent-hover)]">
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                  <button type="button" onClick={resetForm} className="flex-1 border py-4 rounded-2xl font-medium">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left p-6">Photo</th>
              <th className="text-left p-6">Product Name</th>
              <th className="text-left p-6">Category</th>
              <th className="text-left p-6">Fabric</th>
              <th className="text-right p-6">Price</th>
              <th className="text-center p-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-6">
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden border">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                </td>
                <td className="p-6 font-medium">{product.name}</td>
                <td className="p-6">{product.category}</td>
                <td className="p-6">{product.fabric || "—"}</td>
                <td className="p-6 text-right font-bold text-[var(--accent)]">LKR {product.price}</td>
                <td className="p-6">
                  <div className="flex gap-4 justify-center">
                    <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-800">
                      <Pencil size={22} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={22} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}