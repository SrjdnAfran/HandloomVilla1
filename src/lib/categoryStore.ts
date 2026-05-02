import { create } from 'zustand';

export interface SubCategory {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  sub_categories: SubCategory[];
}

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  loadCategories: () => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  renameCategory: (id: number, name: string) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  addSubCategory: (categoryId: number, name: string) => Promise<void>;
  deleteSubCategory: (categoryId: number, subId: number) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  isLoading: false,

  loadCategories: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      set({ categories: data, isLoading: false });
    } catch (error) {
      console.error('Failed to load categories:', error);
      set({ isLoading: false });
    }
  },

  addCategory: async (name) => {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create category');
    }
    await get().loadCategories();
  },

  renameCategory: async (id, name) => {
    await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    await get().loadCategories();
  },

  deleteCategory: async (id) => {
    await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    await get().loadCategories();
  },

  addSubCategory: async (categoryId, name) => {
    const res = await fetch(`/api/categories/${categoryId}/subcategories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to add subcategory');
    }
    await get().loadCategories();
  },

  deleteSubCategory: async (categoryId, subId) => {
    await fetch(`/api/categories/${categoryId}/subcategories/${subId}`, {
      method: 'DELETE',
    });
    await get().loadCategories();
  },
}));