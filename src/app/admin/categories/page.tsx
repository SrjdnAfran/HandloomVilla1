"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, X, Edit2, Save, FolderPlus } from "lucide-react";

interface Category {
  id: number;
  name: string;
  subCategories: string[];
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubCategory, setNewSubCategory] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  // Load Categories
  useEffect(() => {
    const saved = localStorage.getItem("handloomCategories");
    
    if (saved) {
      setCategories(JSON.parse(saved));
    } else {
      const defaultCategories: Category[] = [
        { id: 1, name: "Saree", subCategories: ["Cotton Saree", "Silk Saree", "Banarasi", "Kanchipuram"] },
        { id: 2, name: "Sarong & Lungi", subCategories: ["Cotton Sarong", "Silk Sarong", "Lungi"] },
        { id: 3, name: "Kurti", subCategories: ["Anarkali Kurti", "Straight Kurti"] },
        { id: 4, name: "Dupatta", subCategories: ["Chiffon Dupatta", "Cotton Dupatta"] },
      ];
      setCategories(defaultCategories);
      localStorage.setItem("handloomCategories", JSON.stringify(defaultCategories));
    }
  }, []);

  // Auto save
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem("handloomCategories", JSON.stringify(categories));
    }
  }, [categories]);

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    const newCat = {
      id: Date.now(),
      name: newCategoryName.trim(),
      subCategories: [],
    };
    setCategories([...categories, newCat]);
    setNewCategoryName("");
    setShowForm(false);
  };

  const addSubCategory = (catId: number) => {
    if (!newSubCategory.trim()) return;
    
    setCategories(categories.map(cat =>
      cat.id === catId 
        ? { ...cat, subCategories: [...cat.subCategories, newSubCategory.trim()] }
        : cat
    ));
    setNewSubCategory("");
  };

  const deleteCategory = (id: number) => {
    if (confirm("Delete this category? All subcategories will be removed.")) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const deleteSubCategory = (catId: number, subName: string) => {
    setCategories(categories.map(cat =>
      cat.id === catId 
        ? { ...cat, subCategories: cat.subCategories.filter(s => s !== subName) }
        : cat
    ));
  };

  const startEditing = (cat: Category) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };

  const saveEditing = () => {
    if (!editingName.trim()) return;
    setCategories(categories.map(cat =>
      cat.id === editingId 
        ? { ...cat, name: editingName.trim() }
        : cat
    ));
    setEditingId(null);
    setEditingName("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Category Management
          </h1>
          <p className="text-gray-500 mt-1">
            Organize your product catalog with categories and subcategories
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>New Category</span>
        </button>
      </div>

      {/* Add Category Modal / Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Create New Category</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g., Saree, Kurti, Dhoti"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                autoFocus
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Cancel
              </button>
              <button onClick={addCategory} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Create Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-gray-400 mb-3">
            <FolderPlus size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No categories yet</h3>
          <p className="text-gray-500 mt-1">Get started by creating your first category</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <Plus size={16} /> Create Category
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Category Header */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  {editingId === cat.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-lg font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        autoFocus
                      />
                      <button onClick={saveEditing} className="text-green-600 hover:text-green-700 p-1">
                        <Save size={18} />
                      </button>
                      <button onClick={cancelEditing} className="text-gray-500 hover:text-gray-700 p-1">
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900">{cat.name}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {cat.subCategories.length}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {editingId !== cat.id && (
                    <button
                      onClick={() => startEditing(cat)}
                      className="text-gray-500 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-gray-100"
                      title="Edit category"
                    >
                      <Edit2 size="16" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="text-gray-500 hover:text-red-600 p-1.5 rounded-lg hover:bg-gray-100"
                    title="Delete category"
                  >
                    <Trash2 size="16" />
                  </button>
                </div>
              </div>

              {/* Subcategories Section */}
              <div className="p-6">
                {/* Add Subcategory Input */}
                <div className="flex gap-3 mb-6">
                  <input
                    type="text"
                    value={newSubCategory}
                    onChange={(e) => setNewSubCategory(e.target.value)}
                    placeholder="Add a subcategory..."
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && addSubCategory(cat.id)}
                  />
                  <button
                    onClick={() => addSubCategory(cat.id)}
                    className="inline-flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-lg hover:bg-gray-900 transition-colors font-medium"
                  >
                    <Plus size="16" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Subcategories List */}
                {cat.subCategories.length === 0 ? (
                  <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    <p className="text-gray-400 text-sm">No subcategories yet. Add one above.</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {cat.subCategories.map((sub, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-1.5 bg-blue-950 hover:bg-blue-900 rounded-full pl-3 pr-1.5 py-1.5 transition-colors group"
                      >
                        <span className="text-sm text-gray-200">{sub}</span>
                        <button
                          onClick={() => deleteSubCategory(cat.id, sub)}
                          className="text-gray-400 hover:text-red-500 rounded-full p-0.5 transition-colors"
                          title="Remove subcategory"
                        >
                          <X size="14" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}