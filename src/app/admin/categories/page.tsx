'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, X, Edit2, Save, FolderPlus, Tag, Layers } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  subCategories: string[];
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubCategory, setNewSubCategory] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');

  // Load Categories
  useEffect(() => {
    const saved = localStorage.getItem('handloomCategories');

    if (saved) {
      setCategories(JSON.parse(saved));
    } else {
      const defaultCategories: Category[] = [
        {
          id: 1,
          name: 'Saree',
          subCategories: ['Cotton', 'Silk', 'Embroidery Cotton', 'Embroidery Cotton'],
        },
        {
          id: 2,
          name: 'Sarong',
          subCategories: ['Cotton', 'Silk', 'Embroidery Cotton', 'Embroidery Cotton'],
        },
      ];
      setCategories(defaultCategories);
      localStorage.setItem('handloomCategories', JSON.stringify(defaultCategories));
    }
  }, []);

  // Auto save
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('handloomCategories', JSON.stringify(categories));
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
    setNewCategoryName('');
    setShowForm(false);
  };

  const addSubCategory = (catId: number) => {
    if (!newSubCategory.trim()) return;

    setCategories(
      categories.map(cat =>
        cat.id === catId
          ? { ...cat, subCategories: [...cat.subCategories, newSubCategory.trim()] }
          : cat
      )
    );
    setNewSubCategory('');
  };

  const deleteCategory = (id: number) => {
    if (confirm('Delete this category? All subcategories will be removed.')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const deleteSubCategory = (catId: number, subName: string) => {
    setCategories(
      categories.map(cat =>
        cat.id === catId
          ? { ...cat, subCategories: cat.subCategories.filter(s => s !== subName) }
          : cat
      )
    );
  };

  const startEditing = (cat: Category) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };

  const saveEditing = () => {
    if (!editingName.trim()) return;
    setCategories(
      categories.map(cat => (cat.id === editingId ? { ...cat, name: editingName.trim() } : cat))
    );
    setEditingId(null);
    setEditingName('');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName('');
  };

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-amber-100 pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-[#8B4513]" />
            <h1 className="font-serif text-3xl font-bold text-[#5C2E0B] md:text-4xl">
              Category Management
            </h1>
          </div>
          <p className="mt-1 text-gray-500">
            Organize your product catalog with categories and subcategories
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#8B4513] px-5 py-2.5 font-medium text-white shadow-sm transition-all hover:bg-[#5C2E0B] hover:shadow-md"
        >
          <Plus size={18} />
          <span>New Category</span>
        </button>
      </div>

      {/* Add Category Modal / Form */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowForm(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderPlus className="h-5 w-5 text-[#8B4513]" />
                <h2 className="text-xl font-semibold text-gray-900">Create New Category</h2>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">Category Name</label>
              <input
                type="text"
                value={newCategoryName}
                onChange={e => setNewCategoryName(e.target.value)}
                placeholder="e.g., Saree, Sarong"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 transition-all outline-none focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={addCategory}
                className="rounded-lg bg-[#8B4513] px-4 py-2 text-white transition-colors hover:bg-[#5C2E0B]"
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="rounded-xl border border-amber-100 bg-white p-12 text-center shadow-sm">
          <div className="mb-3 text-gray-300">
            <FolderPlus size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No categories yet</h3>
          <p className="mt-1 text-gray-500">Get started by creating your first category</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 inline-flex items-center gap-2 font-medium text-[#8B4513] transition-colors hover:text-[#5C2E0B]"
          >
            <Plus size={16} /> Create Category
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {categories.map(cat => (
            <div
              key={cat.id}
              className="overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm transition-all hover:shadow-md"
            >
              {/* Category Header */}
              <div className="flex flex-col gap-3 border-b border-amber-100 bg-gradient-to-r from-amber-50/30 to-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5 text-[#8B4513]" />
                  {editingId === cat.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingName}
                        onChange={e => setEditingName(e.target.value)}
                        className="rounded-lg border border-gray-200 px-3 py-1.5 text-lg font-medium focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100"
                        autoFocus
                      />
                      <button
                        onClick={saveEditing}
                        className="rounded-lg p-1 text-green-600 transition-colors hover:bg-green-50"
                      >
                        <Save size={18} />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-[#5C2E0B]">{cat.name}</h3>
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-[#8B4513]">
                        {cat.subCategories.length}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {editingId !== cat.id && (
                    <button
                      onClick={() => startEditing(cat)}
                      className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-amber-50 hover:text-[#8B4513]"
                      title="Edit category"
                    >
                      <Edit2 size="16" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Delete category"
                  >
                    <Trash2 size="16" />
                  </button>
                </div>
              </div>

              {/* Subcategories Section */}
              <div className="p-6">
                {/* Add Subcategory Input */}
                <div className="mb-6 flex gap-3">
                  <input
                    type="text"
                    value={newSubCategory}
                    onChange={e => setNewSubCategory(e.target.value)}
                    placeholder="Add a subcategory..."
                    className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 transition-all outline-none focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100"
                    onKeyDown={e => e.key === 'Enter' && addSubCategory(cat.id)}
                  />
                  <button
                    onClick={() => addSubCategory(cat.id)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#8B4513] px-5 py-2.5 font-medium text-white transition-colors hover:bg-[#5C2E0B]"
                  >
                    <Plus size="16" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Subcategories List */}
                {cat.subCategories.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-amber-200 bg-amber-50/30 py-8 text-center">
                    <p className="text-sm text-amber-500">No subcategories yet. Add one above.</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {cat.subCategories.map((sub, index) => (
                      <div
                        key={index}
                        className="group inline-flex items-center gap-1.5 rounded-full bg-[#8B4513] py-1.5 pr-1.5 pl-3 shadow-sm transition-all hover:bg-[#5C2E0B]"
                      >
                        <span className="text-sm text-white">{sub}</span>
                        <button
                          onClick={() => deleteSubCategory(cat.id, sub)}
                          className="rounded-full p-0.5 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
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
