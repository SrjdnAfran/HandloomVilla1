'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Plus,
  X,
  Upload,
  Pencil,
  Trash2,
  AlertCircle,
  Copy,
  ChevronDown,
  ChevronUp,
  Package,
  Tag,
  DollarSign,
  Layers,
} from 'lucide-react';
import { useProductStore } from '@/lib/productStore';
import { Product, ProductVariant } from '@/data/products';

interface Category {
  id: number;
  name: string;
  subCategories: string[];
}

const IMGBB_API_KEY = 'b9076e37e2d31f1fa37b526a83d1ef97';

export default function AdminProductsPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    addVariant,
    updateVariant,
    deleteVariant,
  } = useProductStore();

  const [categories, setCategories] = useState<Category[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingVariant, setEditingVariant] = useState<{
    productId: number;
    variant: ProductVariant;
  } | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Bulk variant states
  const [showBulkVariantModal, setShowBulkVariantModal] = useState(false);
  const [bulkVariants, setBulkVariants] = useState<File[]>([]);
  const [bulkVariantPreviews, setBulkVariantPreviews] = useState<string[]>([]);
  const [bulkVariantUploading, setBulkVariantUploading] = useState(false);
  const [bulkVariantProgress, setBulkVariantProgress] = useState({ current: 0, total: 0 });
  const [bulkVariantForm, setBulkVariantForm] = useState({
    colorPrefix: '',
    defaultStock: 10,
    startSerial: 1,
  });

  // Product Form
  const [productForm, setProductForm] = useState({
    name: '',
    skuPrefix: '',
    basePrice: 0,
    category: '',
    subCategory: '',
    description: '',
    materials: '',
    careInstructions: '',
  });

  // Variant Form
  const [variantForm, setVariantForm] = useState({
    color: '',
    colorCode: '',
    image: '',
    stock: 10,
    serialNumber: '',
  });

  // Load Categories
  useEffect(() => {
    const saved = localStorage.getItem('handloomCategories');
    if (saved) setCategories(JSON.parse(saved));
  }, []);

  // Generate variant SKU
  const generateVariantSKU = (
    product: Product,
    colorName: string,
    serialNumber: number
  ): string => {
    const colorCode = colorName.slice(0, 3).toUpperCase();
    const serial = String(serialNumber).padStart(3, '0');
    return `${product.skuPrefix}-${colorCode}-${serial}`;
  };

  // Generate slug for URL
  const generateSlug = (productName: string, colorName: string, sku: string): string => {
    const productSlug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const colorSlug = colorName.toLowerCase().replace(/\s+/g, '-');
    return `${productSlug}-${colorSlug}-${sku.toLowerCase()}`;
  };

  // Upload to ImgBB
  const uploadToImgBB = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      return data.data.url;
    }
    throw new Error('Upload failed');
  };

  // Handle Variant Image Upload
  const handleVariantImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be smaller than 5MB');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const imageUrl = await uploadToImgBB(file);
      setVariantForm(prev => ({ ...prev, image: imageUrl }));
    } catch (err) {
      setUploadError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Handle Product Submit
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !productForm.name ||
      !productForm.skuPrefix ||
      !productForm.basePrice ||
      !productForm.category
    ) {
      alert('Please fill all required fields including SKU Prefix');
      return;
    }

    // Validate SKU prefix is exactly 3 letters
    if (!/^[A-Za-z]{3}$/.test(productForm.skuPrefix)) {
      alert('SKU Prefix must be exactly 3 letters (A-Z)');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: productForm.name,
        skuPrefix: productForm.skuPrefix.toUpperCase(),
        basePrice: productForm.basePrice,
        category: productForm.category,
        subCategory: productForm.subCategory || undefined,
        description: productForm.description,
        materials: productForm.materials || undefined,
        careInstructions: productForm.careInstructions || undefined,
      });
      alert('Product updated!');
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name: productForm.name,
        skuPrefix: productForm.skuPrefix.toUpperCase(),
        category: productForm.category,
        subCategory: productForm.subCategory || undefined,
        description: productForm.description,
        basePrice: productForm.basePrice,
        materials: productForm.materials || undefined,
        careInstructions: productForm.careInstructions || undefined,
        variants: [],
        isFeatured: false,
        createdAt: new Date(),
      };
      addProduct(newProduct);
      alert('Product created! Now add variants.');
    }

    resetProductForm();
  };

  // Handle Single Variant Submit
  const handleVariantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || !variantForm.color || !variantForm.image) {
      alert('Color and Image are required');
      return;
    }

    const product = products.find(p => p.id === selectedProductId);
    if (!product) return;

    // Calculate next serial number
    const nextSerial = product.variants.length + 1;

    // Generate SKU using product prefix
    const sku = generateVariantSKU(product, variantForm.color, nextSerial);

    // Generate slug for URL
    const slug = generateSlug(product.name, variantForm.color, sku);

    const newVariant: ProductVariant = {
      id: editingVariant ? editingVariant.variant.id : `${selectedProductId}-${Date.now()}`,
      color: variantForm.color,
      colorCode: variantForm.colorCode || undefined,
      image: variantForm.image,
      stock: variantForm.stock,
      serialNumber: String(nextSerial).padStart(3, '0'),
      sku: sku,
      slug: slug,
      isDefault: !editingVariant && product.variants.length === 0,
    };

    if (editingVariant) {
      updateVariant(selectedProductId, editingVariant.variant.id, newVariant);
      alert('Variant updated!');
    } else {
      addVariant(selectedProductId, newVariant);
      alert('Variant added!');
    }

    resetVariantForm();
  };

  // Handle bulk variant image selection
  const handleBulkVariantSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        setUploadError(`${file.name} is not an image`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadError(`${file.name} is larger than 5MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 50) {
      setUploadError('Maximum 50 images per batch');
      return;
    }

    setBulkVariants(validFiles);
    const previews = validFiles.map(file => URL.createObjectURL(file));
    setBulkVariantPreviews(previews);
    setUploadError('');
  };

  // Remove bulk variant image
  const removeBulkVariantImage = (index: number) => {
    setBulkVariants(prev => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(bulkVariantPreviews[index]);
    setBulkVariantPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Generate color name from filename
  const generateColorFromFilename = (filename: string): string => {
    let name = filename.replace(/\.[^/.]+$/, '');
    name = name.replace(/[_-]/g, ' ');
    name = name.replace(/\d+/g, '');
    name = name.trim();
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Handle Bulk Variant Submit
  const handleBulkVariantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProductId) {
      alert('No product selected');
      return;
    }

    if (!bulkVariantForm.colorPrefix && bulkVariants.length > 0) {
      alert('Please enter a color prefix or pattern name');
      return;
    }

    if (bulkVariants.length === 0) {
      alert('Please select at least one image');
      return;
    }

    const product = products.find(p => p.id === selectedProductId);
    if (!product) return;

    setBulkVariantUploading(true);
    let successCount = 0;
    let failCount = 0;
    let currentSerial = product.variants.length + bulkVariantForm.startSerial;

    for (let i = 0; i < bulkVariants.length; i++) {
      try {
        setBulkVariantProgress({ current: i + 1, total: bulkVariants.length });

        const imageUrl = await uploadToImgBB(bulkVariants[i]);

        let colorName = '';
        if (bulkVariantForm.colorPrefix) {
          colorName = `${bulkVariantForm.colorPrefix} ${String(i + 1).padStart(2, '0')}`;
        } else {
          colorName = generateColorFromFilename(bulkVariants[i].name);
        }

        const serialNum = currentSerial + i;
        const sku = generateVariantSKU(product, colorName, serialNum);
        const slug = generateSlug(product.name, colorName, sku);

        const newVariant: ProductVariant = {
          id: `${selectedProductId}-${Date.now()}-${i}`,
          color: colorName,
          colorCode: undefined,
          image: imageUrl,
          stock: bulkVariantForm.defaultStock,
          serialNumber: String(serialNum).padStart(3, '0'),
          sku: sku,
          slug: slug,
          isDefault: product.variants.length === 0 && i === 0,
        };

        addVariant(selectedProductId, newVariant);
        successCount++;
      } catch (error) {
        console.error(`Failed to upload variant ${i + 1}:`, error);
        failCount++;
      }
    }

    bulkVariantPreviews.forEach(preview => URL.revokeObjectURL(preview));

    alert(
      `✅ Bulk Upload Complete!\n\nSuccessfully added: ${successCount} variants\nFailed: ${failCount} variants`
    );

    setBulkVariants([]);
    setBulkVariantPreviews([]);
    setBulkVariantForm({
      colorPrefix: '',
      defaultStock: 10,
      startSerial: 1,
    });
    setBulkVariantUploading(false);
    setShowBulkVariantModal(false);
    setExpandedProductId(selectedProductId);
  };

  // Edit Product
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      skuPrefix: product.skuPrefix || '',
      basePrice: product.basePrice,
      category: product.category,
      subCategory: product.subCategory || '',
      description: product.description || '',
      materials: product.materials || '',
      careInstructions: product.careInstructions || '',
    });
    setShowProductForm(true);
  };

  // Edit Variant
  const handleEditVariant = (productId: number, variant: ProductVariant) => {
    setEditingVariant({ productId, variant });
    setSelectedProductId(productId);
    setVariantForm({
      color: variant.color,
      colorCode: variant.colorCode || '',
      image: variant.image,
      stock: variant.stock,
      serialNumber: variant.serialNumber,
    });
    setShowVariantModal(true);
  };

  // Delete Variant
  const handleDeleteVariant = (productId: number, variantId: string) => {
    if (confirm('Delete this variant?')) {
      deleteVariant(productId, variantId);
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      skuPrefix: '',
      basePrice: 0,
      category: '',
      subCategory: '',
      description: '',
      materials: '',
      careInstructions: '',
    });
    setEditingProduct(null);
    setShowProductForm(false);
    setUploadError('');
  };

  const resetVariantForm = () => {
    setVariantForm({
      color: '',
      colorCode: '',
      image: '',
      stock: 10,
      serialNumber: '',
    });
    setEditingVariant(null);
    setSelectedProductId(null);
    setShowVariantModal(false);
    setUploadError('');
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Delete this product and all its variants?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-serif text-4xl font-bold text-[#5C2E0B]">Products Management</h1>
          <p className="mt-2 text-gray-600">
            Total Products: {products.length} | Total Variants:{' '}
            {products.reduce((sum, p) => sum + p.variants.length, 0)}
          </p>
        </div>
        <button
          onClick={() => setShowProductForm(true)}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#8B4513] px-6 py-3 text-white transition-all hover:bg-[#5C2E0B] hover:shadow-lg md:w-auto"
        >
          <Plus size={22} /> Add New Product
        </button>
      </div>

      {/* Products List */}
      <div className="space-y-8">
        {products.length === 0 ? (
          <div className="rounded-3xl bg-white p-20 text-center text-gray-500">
            No products yet. Click &quot;Add New Product&quot; to start.
          </div>
        ) : (
          products.map(product => (
            <div key={product.id} className="overflow-hidden rounded-3xl bg-white shadow-lg">
              {/* Product Header */}
              <div className="flex flex-col gap-4 border-b bg-gradient-to-r from-amber-50/30 to-white p-6 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-bold text-[#5C2E0B]">{product.name}</h3>
                    <span className="rounded-full bg-[#8B4513] px-3 py-1 text-sm text-white">
                      {product.variants.length}{' '}
                      {product.variants.length === 1 ? 'Variant' : 'Variants'}
                    </span>
                    {product.skuPrefix && (
                      <span className="rounded-full bg-amber-100 px-3 py-1 font-mono text-sm text-[#8B4513]">
                        Prefix: {product.skuPrefix}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">
                    {product.category} {product.subCategory && `- ${product.subCategory}`}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">Base Price: LKR {product.basePrice}</p>
                  {product.description && (
                    <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap">
                  <button
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setShowVariantModal(true);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-white transition-all hover:bg-emerald-700"
                  >
                    <Plus size={18} /> Add Variant
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProductId(product.id);
                      const nextSerial = product.variants.length + 1;
                      setBulkVariantForm(prev => ({ ...prev, startSerial: nextSerial }));
                      setShowBulkVariantModal(true);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-white transition-all hover:bg-blue-700"
                  >
                    <Upload size={18} /> Bulk Add
                  </button>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="rounded-xl bg-amber-600 px-5 py-2 text-white transition-colors hover:bg-amber-700"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="rounded-xl bg-red-600 px-5 py-2 text-white transition-colors hover:bg-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    onClick={() =>
                      setExpandedProductId(expandedProductId === product.id ? null : product.id)
                    }
                    className="rounded-xl border px-5 py-2 transition-colors hover:bg-gray-100"
                  >
                    {expandedProductId === product.id ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Variants Grid */}
              {expandedProductId === product.id && (
                <div className="p-6">
                  {product.variants.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                      <Package className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                      <p>No variants yet. Click &quot;Add Variant&quot; to add colors/options.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {product.variants.map((variant: ProductVariant) => (
                        <div
                          key={variant.id}
                          className="overflow-hidden rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl"
                        >
                          <div className="relative h-56 bg-gradient-to-br from-amber-100 to-amber-50">
                            {variant.image ? (
                              <Image
                                src={variant.image}
                                alt={variant.color}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Package className="h-12 w-12 text-amber-300" />
                              </div>
                            )}
                            {variant.isDefault && (
                              <span className="absolute top-2 left-2 rounded-full bg-amber-500 px-2 py-1 text-xs font-semibold text-white shadow-md">
                                Default
                              </span>
                            )}
                            {variant.stock < 5 && variant.stock > 0 && (
                              <span className="absolute top-2 right-2 rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold text-white shadow-md">
                                Low Stock
                              </span>
                            )}
                            {variant.stock === 0 && (
                              <span className="absolute top-2 right-2 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white shadow-md">
                                Out of Stock
                              </span>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {variant.colorCode && (
                                  <div
                                    className="h-6 w-6 rounded-full border shadow-sm"
                                    style={{ backgroundColor: variant.colorCode }}
                                  />
                                )}
                                <h4 className="text-lg font-semibold text-gray-900">
                                  {variant.color}
                                </h4>
                              </div>
                              <button
                                onClick={() =>
                                  navigator.clipboard.writeText(variant.sku || variant.serialNumber)
                                }
                                className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#8B4513]"
                                title="Copy SKU"
                              >
                                <Copy size={16} />
                              </button>
                            </div>
                            <p className="mb-1 font-mono text-xs text-gray-500">
                              SKU: {variant.sku || variant.serialNumber}
                            </p>
                            <p className="mb-3 text-sm">
                              Stock:{' '}
                              <span
                                className={`font-semibold ${variant.stock < 5 ? 'text-red-600' : 'text-green-600'}`}
                              >
                                {variant.stock}
                              </span>{' '}
                              units
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditVariant(product.id, variant)}
                                className="flex-1 rounded-lg bg-amber-600 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
                              >
                                <Pencil size={14} className="mr-1 inline" /> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteVariant(product.id, variant.id)}
                                className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                              >
                                <Trash2 size={14} className="mr-1 inline" /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Product Creation/Edit Modal */}
      {showProductForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/70 p-4">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-auto rounded-3xl bg-white shadow-2xl md:max-w-2xl">
            <button
              onClick={resetProductForm}
              className="absolute top-4 right-4 z-10 rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <X size={24} className="text-gray-500" />
            </button>

            <div className="p-6 md:p-8">
              <h2 className="mb-2 text-3xl font-bold text-[#5C2E0B]">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="mb-6 text-gray-500">
                {editingProduct
                  ? 'Update product information'
                  : 'Create a product first, then add color variants'}
              </p>

              <form onSubmit={handleProductSubmit} className="space-y-5">
                <div className="space-y-5">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100 focus:outline-none"
                      placeholder="e.g., Handloom Cotton Saree"
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        SKU Prefix <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={productForm.skuPrefix}
                        onChange={e =>
                          setProductForm({
                            ...productForm,
                            skuPrefix: e.target.value.toUpperCase().slice(0, 3),
                          })
                        }
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 font-mono uppercase focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100 focus:outline-none"
                        placeholder="HCS"
                        maxLength={3}
                        required
                      />
                      <p className="mt-1 text-xs text-gray-400">
                        3-letter prefix for all variant SKUs
                      </p>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Base Price (LKR) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={productForm.basePrice}
                        onChange={e =>
                          setProductForm({ ...productForm, basePrice: Number(e.target.value) })
                        }
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={productForm.category}
                        onChange={e =>
                          setProductForm({
                            ...productForm,
                            category: e.target.value,
                            subCategory: '',
                          })
                        }
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100 focus:outline-none"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(c => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Sub Category
                      </label>
                      <select
                        value={productForm.subCategory}
                        onChange={e =>
                          setProductForm({ ...productForm, subCategory: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100 focus:outline-none disabled:bg-gray-100"
                        disabled={!productForm.category}
                      >
                        <option value="">Select Sub Category</option>
                        {categories
                          .find(c => c.name === productForm.category)
                          ?.subCategories.map((sub, i) => (
                            <option key={i} value={sub}>
                              {sub}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={productForm.description}
                      onChange={e =>
                        setProductForm({ ...productForm, description: e.target.value })
                      }
                      rows={3}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100 focus:outline-none"
                      placeholder="Product description..."
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Materials & Fabric
                    </label>
                    <input
                      type="text"
                      value={productForm.materials}
                      onChange={e => setProductForm({ ...productForm, materials: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100 focus:outline-none"
                      placeholder="e.g., 100% Cotton, Handloom"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Care Instructions
                    </label>
                    <textarea
                      value={productForm.careInstructions}
                      onChange={e =>
                        setProductForm({ ...productForm, careInstructions: e.target.value })
                      }
                      rows={2}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100 focus:outline-none"
                      placeholder="e.g., Hand wash separately, Dry in shade"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-[#8B4513] py-3 font-semibold text-white transition-colors hover:bg-[#5C2E0B]"
                  >
                    {editingProduct ? 'Update Product' : 'Create Product'}
                  </button>
                  <button
                    type="button"
                    onClick={resetProductForm}
                    className="flex-1 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Variant Upload Modal */}
      {showBulkVariantModal && selectedProductId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/70 p-4">
          <div className="relative max-h-[95vh] w-full max-w-2xl overflow-auto rounded-3xl bg-white shadow-2xl">
            <button
              onClick={() => {
                setShowBulkVariantModal(false);
                bulkVariantPreviews.forEach(preview => URL.revokeObjectURL(preview));
                setBulkVariants([]);
                setBulkVariantPreviews([]);
              }}
              className="absolute top-4 right-4 z-10 rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <X size={24} className="text-gray-500" />
            </button>

            <div className="p-6 md:p-8">
              <h2 className="mb-2 text-2xl font-bold text-[#5C2E0B]">Bulk Add Variants</h2>
              <p className="mb-6 text-gray-500">
                Upload multiple images - each image becomes a separate variant with auto-generated
                SKU
              </p>

              <form onSubmit={handleBulkVariantSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Select Images (Max 50)
                  </label>
                  <div className="rounded-xl border-2 border-dashed border-gray-300 p-6 text-center">
                    {bulkVariantPreviews.length > 0 ? (
                      <div className="grid max-h-80 grid-cols-3 gap-3 overflow-auto md:grid-cols-4">
                        {bulkVariantPreviews.map((preview, index) => (
                          <div key={index} className="group relative">
                            <div className="relative aspect-square overflow-hidden rounded-lg border bg-amber-50">
                              <Image
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 33vw, 200px"
                                className="object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeBulkVariantImage(index)}
                              className="absolute -top-1 -right-1 rounded-full bg-red-500 p-1 text-white shadow-md transition-opacity hover:bg-red-600"
                            >
                              <X size={14} />
                            </button>
                            <p className="mt-1 truncate text-center text-xs text-gray-500">
                              {bulkVariantForm.colorPrefix
                                ? `${bulkVariantForm.colorPrefix} ${index + 1}`
                                : `Variant ${index + 1}`}
                            </p>
                          </div>
                        ))}
                        <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-50">
                          <Plus size={24} className="text-gray-400" />
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleBulkVariantSelect}
                            className="hidden"
                          />
                        </label>
                      </div>
                    ) : (
                      <label className="block cursor-pointer py-4">
                        <Upload size={40} className="mx-auto mb-2 text-gray-400" />
                        <span className="text-gray-600">Click to select multiple images</span>
                        <p className="mt-1 text-xs text-gray-400">
                          Max 50 images • 5MB each • PNG, JPG, JPEG
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleBulkVariantSelect}
                          className="hidden"
                        />
                      </label>
                    )}
                    {uploadError && (
                      <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-2">
                        <AlertCircle size={16} className="text-red-500" />
                        <p className="text-sm text-red-600">{uploadError}</p>
                      </div>
                    )}
                  </div>
                  {bulkVariants.length > 0 && (
                    <p className="mt-2 text-sm text-gray-500">
                      {bulkVariants.length} image(s) selected
                    </p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Color/Pattern Prefix
                    </label>
                    <input
                      type="text"
                      value={bulkVariantForm.colorPrefix}
                      onChange={e =>
                        setBulkVariantForm({ ...bulkVariantForm, colorPrefix: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100 focus:outline-none"
                      placeholder="e.g., Red, Blue, Floral"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Default Stock
                    </label>
                    <input
                      type="number"
                      value={bulkVariantForm.defaultStock}
                      onChange={e =>
                        setBulkVariantForm({
                          ...bulkVariantForm,
                          defaultStock: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100 focus:outline-none"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Starting Serial
                    </label>
                    <input
                      type="number"
                      value={bulkVariantForm.startSerial}
                      onChange={e =>
                        setBulkVariantForm({
                          ...bulkVariantForm,
                          startSerial: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100 focus:outline-none"
                      min="1"
                    />
                  </div>
                </div>

                {bulkVariantUploading && (
                  <div className="rounded-xl bg-amber-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-amber-800">
                        Creating variants...
                      </span>
                      <span className="text-sm text-amber-600">
                        {bulkVariantProgress.current} of {bulkVariantProgress.total}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-amber-200">
                      <div
                        className="h-2 rounded-full bg-amber-600 transition-all duration-300"
                        style={{
                          width: `${(bulkVariantProgress.current / bulkVariantProgress.total) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-[#8B4513] py-3 font-semibold text-white transition-colors hover:bg-[#5C2E0B] disabled:opacity-50"
                    disabled={bulkVariantUploading || bulkVariants.length === 0}
                  >
                    {bulkVariantUploading
                      ? 'Creating...'
                      : `Create ${bulkVariants.length} Variant${bulkVariants.length !== 1 ? 's' : ''}`}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowBulkVariantModal(false);
                      bulkVariantPreviews.forEach(preview => URL.revokeObjectURL(preview));
                      setBulkVariants([]);
                      setBulkVariantPreviews([]);
                    }}
                    className="flex-1 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Single Variant Modal */}
      {showVariantModal && selectedProductId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-md overflow-auto rounded-3xl bg-white shadow-2xl">
            <button
              onClick={resetVariantForm}
              className="absolute top-4 right-4 z-10 rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <X size={24} className="text-gray-500" />
            </button>

            <div className="p-6 md:p-8">
              <h2 className="mb-2 text-2xl font-bold text-[#5C2E0B]">
                {editingVariant ? 'Edit Variant' : 'Add New Variant'}
              </h2>
              <p className="mb-6 text-gray-500">
                {editingVariant
                  ? 'Update variant information'
                  : 'Add a new color option for this product'}
              </p>

              <form onSubmit={handleVariantSubmit} className="space-y-5">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Variant Image
                  </label>
                  <div className="rounded-xl border-2 border-dashed border-gray-300 p-4 text-center">
                    {variantForm.image ? (
                      <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-lg">
                        <Image
                          src={variantForm.image}
                          alt="preview"
                          fill
                          sizes="128px"
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setVariantForm(p => ({ ...p, image: '' }))}
                          className="absolute -top-1 -right-1 rounded-full bg-red-500 p-1 text-white"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <label className="block cursor-pointer py-3">
                        <Upload size={32} className="mx-auto mb-1 text-gray-400" />
                        <span className="text-sm text-gray-600">Click to upload image</span>
                        <p className="mt-0.5 text-xs text-gray-400">Max 5MB</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleVariantImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                    {uploading && <p className="mt-2 text-sm text-blue-600">Uploading...</p>}
                    {uploadError && <p className="mt-2 text-sm text-red-600">{uploadError}</p>}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Color Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={variantForm.color}
                    onChange={e => setVariantForm({ ...variantForm, color: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100 focus:outline-none"
                    placeholder="e.g., Red, Blue, Green"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Color Code (Hex)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={variantForm.colorCode || '#000000'}
                      onChange={e => setVariantForm({ ...variantForm, colorCode: e.target.value })}
                      className="h-10 w-14 cursor-pointer rounded border"
                    />
                    <input
                      type="text"
                      value={variantForm.colorCode}
                      onChange={e => setVariantForm({ ...variantForm, colorCode: e.target.value })}
                      className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100 focus:outline-none"
                      placeholder="#RRGGBB"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={variantForm.stock}
                    onChange={e =>
                      setVariantForm({ ...variantForm, stock: Number(e.target.value) })
                    }
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#8B4513] focus:ring-2 focus:ring-amber-100 focus:outline-none"
                    min="0"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-[#8B4513] py-2.5 font-semibold text-white transition-colors hover:bg-[#5C2E0B]"
                  >
                    {editingVariant ? 'Update Variant' : 'Add Variant'}
                  </button>
                  <button
                    type="button"
                    onClick={resetVariantForm}
                    className="flex-1 rounded-lg border border-gray-300 py-2.5 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
