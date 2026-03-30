"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, X, Edit2 } from "lucide-react";

interface Category {
  id: number;
  name: string;
  subCategories: string[];
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubCategory, setNewSubCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // Load categories
  useEffect(() => {
    const saved = localStorage.getItem("handloomCategories");
    
    if (saved) {
      setCategories(JSON.parse(saved));
    } else {
      // Default categories for Handloom Villa Sri Lanka
      const defaults: Category[] = [
        { 
          id: 1, 
          name: "Saree", 
          subCategories: ["Cotton Saree", "Silk Saree", "Banarasi", "Kanchipuram", "Linen Saree"] 
        },
        { 
          id: 2, 
          name: "Sarong & Lungi", 
          subCategories: ["Cotton Sarong", "Silk Sarong", "Lungi", "Checked Sarong"] 
        },
        { 
          id: 3, 
          name: "Kurti", 
          subCategories: ["Anarkali Kurti", "Straight Kurti", "Long Kurti"] 
        },
        { 
          id: 4, 
          name: "Dupatta & Shawl", 
          subCategories: ["Chiffon Dupatta", "Cotton Dupatta", "Silk Shawl"] 
        },
      ];
      
      setCategories(defaults);
      localStorage.setItem("handloomCategories", JSON.stringify(defaults));
    }
  }, []);

  // Save to localStorage whenever categories change
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem("handloomCategories", JSON.stringify(categories));
    }
  }, [categories]);

  const addNewCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCat: Category = {
      id: Date.now(),
      name: newCategoryName.trim(),
      subCategories: [],
    };
    
    setCategories([...categories, newCat]);
    setNewCategoryName("");
    setShowForm(false);
  };

  const addSubCategory = () => {
    if (!newSubCategory.trim() || !selectedCategoryId) return;

    setCategories(categories.map(cat => 
      cat.id === selectedCategoryId 
        ? { ...cat, subCategories: [...cat.subCategories, newSubCategory.trim()] }
        : cat
    ));
    setNewSubCategory("");
  };

  const deleteCategory = (id: number) => {
    if (confirm("Delete this category and all its sub-categories?")) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const deleteSubCategory = (categoryId: number, subName: string) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, subCategories: cat.subCategories.filter(s => s !== subName) }
        : cat
    ));
  };

  const startEditing = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setShowForm(true);
  };

  const updateCategory = () => {
    if (!newCategoryName.trim() || !editingCategory) return;

    setCategories(categories.map(cat => 
      cat.id === editingCategory.id 
        ? { ...cat, name: newCategoryName.trim() }
        : cat
    ));

    setNewCategoryName("");
    setEditingCategory(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-2">Manage product categories and sub-categories for Handloom Villa</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setNewCategoryName("");
            setShowForm(true);
          }}
          className="flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8 py-3 rounded-xl font-medium transition-all"
        >
          <Plus size={22} />
          Add New Category
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white p-8 rounded-3xl shadow mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h2>
            <button 
              onClick={() => setShowForm(false)} 
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category Name (e.g. Saree, Sarong)"
              className="flex-1 border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-[var(--accent)]"
            />
            <button
              onClick={editingCategory ? updateCategory : addNewCategory}
              className="bg-[var(--accent)] text-white px-10 py-4 rounded-xl font-medium hover:bg-[var(--accent-hover)] min-w-[120px]"
            >
              {editingCategory ? "Update" : "Add"}
            </button>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="space-y-8">
        {categories.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center text-gray-500">
            No categories yet. Click "Add New Category" to start.
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="bg-white rounded-3xl shadow p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">{category.name}</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => startEditing(category)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 size={22} />
                  </button>
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              </div>

              {/* Sub Categories Section */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <input
                    type="text"
                    value={newSubCategory}
                    onChange={(e) => setNewSubCategory(e.target.value)}
                    placeholder="Add sub-category (e.g. Cotton Saree)"
                    className="flex-1 border border-gray-300 rounded-xl px-5 py-3 focus:outline-none"
                    onKeyDown={(e) => e.key === "Enter" && addSubCategory()}
                  />
                  <button
                    onClick={() => {
                      setSelectedCategoryId(category.id);
                      addSubCategory();
                    }}
                    className="bg-gray-800 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-700"
                  >
                    Add Sub
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.subCategories.length > 0 ? (
                    category.subCategories.map((sub, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-100 px-5 py-2.5 rounded-full flex items-center gap-2 text-sm"
                      >
                        <span>{sub}</span>
                        <button
                          onClick={() => deleteSubCategory(category.id, sub)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No sub-categories added yet</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}