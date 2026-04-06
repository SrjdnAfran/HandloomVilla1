"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, X, Upload, Pencil, Trash2 } from "lucide-react";
import { useProductStore } from "@/lib/productStore";
import { Product } from "@/data/products";

interface Category {
  id: number;
  name: string;
  subCategories: string[];
}

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();

  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    image: "",
    category: "",
    subCategory: "",
    color: "", // Changed from fabric to color
    description: "",
  });

  // Load Categories
  useEffect(() => {
    const saved = localStorage.getItem("handloomCategories");
    if (saved) setCategories(JSON.parse(saved));
  }, []);

  // Load Initial Products if empty
  useEffect(() => {
    if (products.length === 0) {
      import("@/data/products").then((mod) => {
        useProductStore.getState().setProducts(mod.products);
      });
    }
  }, [products.length]);

  const resetForm = () => {
    setFormData({ name: "", price: 0, image: "", category: "", subCategory: "", color: "", description: "" });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({ ...prev, image: event.target?.result as string }));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image || !formData.category) {
      alert("Please fill required fields");
      return;
    }

    const finalCategory = formData.subCategory 
      ? `${formData.category} - ${formData.subCategory}` 
      : formData.category;

    const productData = { ...formData, category: finalCategory };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      const newProduct: Product = { id: Date.now(), ...productData };
      addProduct(newProduct);
    }
    resetForm();
  };

  const handleEdit = (product: Product) => {
    const [mainCat, subCat] = product.category.includes(" - ") 
      ? product.category.split(" - ") 
      : [product.category, ""];

    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      category: mainCat,
      subCategory: subCat,
      color: product.color || "", // Changed from fabric to color
      description: product.description,
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this product?")) deleteProduct(id);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-serif font-bold">Products</h1>
          <p className="text-gray-600">Total Products: {products.length}</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-3 bg-[var(--accent)] text-white px-8 py-3 rounded-xl font-medium hover:bg-[var(--accent-hover)]"
        >
          <Plus size={22} /> Add New Product
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-auto">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-8">{editingProduct ? "Edit Product" : "Add New Product"}</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-3">Product Photo *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                    {formData.image ? (
                      <div className="relative mx-auto w-48 h-64 rounded-xl overflow-hidden">
                        <Image src={formData.image} alt="preview" fill className="object-cover" />
                        <button type="button" onClick={() => setFormData(p => ({...p, image: ""}))} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <Upload size={50} className="mx-auto text-gray-400 mb-3" />
                        <span>Click to upload image</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Product Name *</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border rounded-xl px-4 py-3" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price (LKR) *</label>
                    <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} className="w-full border rounded-xl px-4 py-3" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value, subCategory: ""})} className="w-full border rounded-xl px-4 py-3" required>
                      <option value="">Select Category</option>
                      {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Sub Category</label>
                    <select value={formData.subCategory} onChange={(e) => setFormData({...formData, subCategory: e.target.value})} className="w-full border rounded-xl px-4 py-3" disabled={!formData.category}>
                      <option value="">Select Sub Category</option>
                      {categories.find(c => c.name === formData.category)?.subCategories.map((sub, i) => (
                        <option key={i} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>

                  {/* Color Field - Optional */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Color (Optional)</label>
                    <input 
                      type="text" 
                      value={formData.color} 
                      onChange={(e) => setFormData({...formData, color: e.target.value})} 
                      className="w-full border rounded-xl px-4 py-3" 
                      placeholder="e.g., Red, Blue, Green, Yellow"
                    />
                    <p className="text-xs text-gray-500 mt-1">Optional field - leave empty if not applicable</p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={4} className="w-full border rounded-xl px-4 py-3" required />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="flex-1 bg-[var(--accent)] text-white py-4 rounded-2xl font-medium">
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                  <button type="button" onClick={resetForm} className="flex-1 border py-4 rounded-2xl font-medium">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        {products.length === 0 ? (
          <div className="p-20 text-center text-gray-500">
            No products yet. Click "Add New Product" to start.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-6">Photo</th>
                <th className="text-left p-6">Name</th>
                <th className="text-left p-6">Category</th>
                <th className="text-left p-6">Color</th>
                <th className="text-right p-6">Price (LKR)</th>
                <th className="text-center p-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="p-6">
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden border">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="p-6 font-medium">{product.name}</td>
                  <td className="p-6">{product.category}</td>
                  <td className="p-6">
                    {product.color ? (
                      <span className="inline-flex items-center gap-2">
                        <span 
                          className="w-4 h-4 rounded-full border" 
                          style={{ backgroundColor: product.color.toLowerCase() }}
                        />
                        {product.color}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>
                  <td className="p-6 text-right font-bold text-[var(--accent)]">LKR {product.price}</td>
                  <td className="p-6 text-center">
                    <button onClick={() => handleEdit(product)} className="text-blue-600 mx-2"><Pencil size={20} /></button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 mx-2"><Trash2 size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}