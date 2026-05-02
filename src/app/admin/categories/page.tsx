'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, X, Edit2, Save, FolderPlus, Tag, Layers } from 'lucide-react';
import { useCategoryStore } from '@/lib/categoryStore';

export default function AdminCategoriesPage() {
  const {
    categories,
    isLoading,
    loadCategories,
    addCategory,
    renameCategory,
    deleteCategory,
    addSubCategory,
    deleteSubCategory,
  } = useCategoryStore();

  const [showForm, setShowForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubCategoryInputs, setNewSubCategoryInputs] = useState<Record<number, string>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    setError('');
    try {
      await addCategory(newCategoryName.trim());
      setNewCategoryName('');
      setShowForm(false);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleAddSubCategory = async (categoryId: number) => {
    const name = newSubCategoryInputs[categoryId]?.trim();
    if (!name) return;
    try {
      await addSubCategory(categoryId, name);
      setNewSubCategoryInputs(prev => ({ ...prev, [categoryId]: '' }));
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Delete this category and all its subcategories?')) return;
    await deleteCategory(id);
  };

  const handleDeleteSubCategory = async (categoryId: number, subId: number) => {
    await deleteSubCategory(categoryId, subId);
  };

  const startEditing = (id: number, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const saveEditing = async () => {
    if (!editingName.trim() || editingId === null) return;
    await renameCategory(editingId, editingName.trim());
    setEditingId(null);
    setEditingName('');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#8B4513] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-amber-100 pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-[#8B4513]" />
            <h1 className="font-serif text-3xl font-bold text-[#5C2E0B] md:text-4xl">
              Category Management
            </h1>
          </div>
          <p className="mt-1 text-gray-500">
            {categories.length} categories ·{' '}
            {categories.reduce((sum, c) => sum + c.sub_categories.length, 0)} subcategories
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#8B4513] px-5 py-2.5 font-medium text-white shadow-sm transition-all hover:bg-[#5C2E0B]"
        >
          <Plus size={18} />
          New Category
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Add Category Modal */}
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
                <h2 className="text-xl font-semibold">Create New Category</h2>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              value={newCategoryName}
              onChange={e => setNewCategoryName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
              placeholder="e.g., Saree, Sarong"
              className="mb-4 w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100"
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="rounded-lg bg-[#8B4513] px-4 py-2 text-white hover:bg-[#5C2E0B]"
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories List */}
      {categories.length === 0 ? (
        <div className="rounded-xl border border-amber-100 bg-white p-12 text-center shadow-sm">
          <FolderPlus size={48} className="mx-auto mb-3 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900">No categories yet</h3>
          <p className="mt-1 text-gray-500">Get started by creating your first category</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 inline-flex items-center gap-2 font-medium text-[#8B4513] hover:text-[#5C2E0B]"
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
                        onKeyDown={e => e.key === 'Enter' && saveEditing()}
                        className="rounded-lg border border-gray-200 px-3 py-1.5 text-lg font-medium focus:border-[#8B4513] focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={saveEditing}
                        className="rounded-lg p-1 text-green-600 hover:bg-green-50"
                      >
                        <Save size={18} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="rounded-lg p-1 text-gray-400 hover:bg-gray-100"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-[#5C2E0B]">{cat.name}</h3>
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-[#8B4513]">
                        {cat.sub_categories.length}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {editingId !== cat.id && (
                    <button
                      onClick={() => startEditing(cat.id, cat.name)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-amber-50 hover:text-[#8B4513]"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Subcategories */}
              <div className="p-6">
                {/* Add Subcategory Input */}
                <div className="mb-6 flex gap-3">
                  <input
                    type="text"
                    value={newSubCategoryInputs[cat.id] || ''}
                    onChange={e =>
                      setNewSubCategoryInputs(prev => ({ ...prev, [cat.id]: e.target.value }))
                    }
                    onKeyDown={e => e.key === 'Enter' && handleAddSubCategory(cat.id)}
                    placeholder="Add a subcategory..."
                    className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100"
                  />
                  <button
                    onClick={() => handleAddSubCategory(cat.id)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#8B4513] px-5 py-2.5 font-medium text-white hover:bg-[#5C2E0B]"
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>

                {/* Subcategory Tags */}
                {cat.sub_categories.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-amber-200 bg-amber-50/30 py-8 text-center">
                    <p className="text-sm text-amber-500">No subcategories yet.</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {cat.sub_categories.map(sub => (
                      <div
                        key={sub.id}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#8B4513] py-1.5 pr-1.5 pl-3 shadow-sm hover:bg-[#5C2E0B]"
                      >
                        <span className="text-sm text-white">{sub.name}</span>
                        <button
                          onClick={() => handleDeleteSubCategory(cat.id, sub.id)}
                          className="rounded-full p-0.5 text-white/70 hover:bg-white/20 hover:text-white"
                        >
                          <X size={14} />
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
