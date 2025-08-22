"use client";

import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/lib/api/products";

export default function ProductsGrid() {
  // ========================
  // Component State
  // ========================
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [isProductModalFormOpen, setIsProductModalFormOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] =
    useState(false);

  // Form and selection state
  const [formData, setFormData] = useState(initialFormState());
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ========================
  // Helpers
  // ========================
  function initialFormState() {
    return {
      product_name: "",
      description: "",
      price: "",
      category: "",
      img_url: "",
      is_available: true,
    };
  }

  // ========================
  // API: Fetch Products
  // ========================
  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await fetchProducts();
      setProducts(data?.data || []);
      setError(null);
    } catch (err) {
      console.error("Failed to load products:", err);
      setError("Failed to load products. Please check your API connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // ========================
  // API: Create Product
  // ========================
  const addProduct = async () => {
    try {
      await createProduct(formData);
      await loadProducts(); // Reload products after creation
      setIsProductModalFormOpen(false);
      setFormData(initialFormState());
    } catch (err) {
      console.error("Failed to create product:", err);
      alert("Failed to create product. Please try again.");
    }
  };

  // ========================
  // API: Update Product
  // ========================
  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    try {
      await updateProduct(selectedProduct.id, formData);
      await loadProducts(); // Reload products after update
      setIsUpdateProductModalOpen(false);
      setFormData(initialFormState());
      setSelectedProduct(null);
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("Failed to update product. Please try again.");
    }
  };

  // ========================
  // API: Delete Product
  // ========================
  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      await deleteProduct(selectedProduct.id);
      await loadProducts(); // Reload products after deletion
      setIsDeleteProductModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  // ========================
  // Modal Open/Close Handlers
  // ========================
  const openAddModal = () => {
    setFormData(initialFormState());
    setIsProductModalFormOpen(true);
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      product_name: product.product_name,
      description: product.description,
      price: product.price,
      category: product.category,
      img_url: product.img_url,
      is_available: product.is_available,
    });
    setIsUpdateProductModalOpen(true);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteProductModalOpen(true);
  };

  const closeAllModals = () => {
    setIsProductModalFormOpen(false);
    setIsUpdateProductModalOpen(false);
    setIsDeleteProductModalOpen(false);
    setSelectedProduct(null);
    setFormData(initialFormState());
  };

  // ========================
  // Load products on mount
  // ========================
  useEffect(() => {
    loadProducts();
  }, []);

  // ========================
  // Loading UI
  // ========================
  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p style={{ marginLeft: '1rem', color: '#6b7280' }}>Loading products...</p>
      </div>
    );
  }

  // ========================
  // Error UI
  // ========================
  if (error) {
    return (
      <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626' }}>
        <p>{error}</p>
        <button 
          className="btn btn-primary" 
          onClick={loadProducts}
          style={{ marginTop: '0.5rem' }}
        >
          Retry
        </button>
      </div>
    );
  }

  // ========================
  // Main Render
  // ========================
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="border-b border-gray-200 px-4 py-5 sm:px-6 dark:border-white/10">
          <div className="-mt-2 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="mt-2 ml-4">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Computer Parts
              </h2>
            </div>
            <div className="mt-2 ml-4 shrink-0">
              <button
                className="btn btn-primary"
                onClick={openAddModal}
              >
                Add new product
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {products.length === 0 ? (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '3rem', 
              color: '#6b7280',
              background: '#f9fafb',
              borderRadius: '8px'
            }}>
              <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No products found</p>
              <p>Start by adding your first computer part product.</p>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  alt={product.product_name}
                  src={product.img_url}
                  className="product-image"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop";
                  }}
                />
                <div className="product-info">
                  <h3 className="product-name">
                    {product.product_name}
                  </h3>
                  <p className="product-description">
                    {product.description}
                  </p>
                  <p className="product-price">
                    ${product.price}
                  </p>
                  <div className="product-actions">
                    <button
                      className="btn btn-danger"
                      onClick={() => openDeleteModal(product)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => openUpdateModal(product)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {isProductModalFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Add new product</h3>
              <div className="mt-2">
                <ProductForm
                  formData={formData}
                  setFormData={setFormData}
                  onClick={addProduct}
                  onClose={closeAllModals}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Product Modal */}
      {isUpdateProductModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Update product</h3>
              <div className="mt-2">
                <ProductForm
                  formData={formData}
                  setFormData={setFormData}
                  onClick={handleUpdateProduct}
                  onClose={closeAllModals}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Product Modal */}
      {isDeleteProductModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Confirm Delete</h3>
              <div className="mt-2">
                <DeleteProduct
                  productName={selectedProduct?.product_name}
                  onConfirm={handleDeleteProduct}
                  onCancel={closeAllModals}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple ProductForm component for now
function ProductForm({ formData, setFormData, onClick, onClose }) {
  const fields = [
    { label: "Product Name", name: "product_name", type: "text", required: true },
    { label: "Description", name: "description", type: "text", required: true },
    { label: "Price", name: "price", type: "number", required: true, step: "0.01", min: "0" },
    { label: "Category", name: "category", type: "text", required: true },
    { label: "Image URL", name: "img_url", type: "url", required: false },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.product_name || !formData.description || !formData.price || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }
    
    if (parseFloat(formData.price) <= 0) {
      alert("Price must be greater than 0");
      return;
    }
    
    onClick();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(({ label, name, type, required, step, min }) => (
        <div key={name} className="form-group">
          <label className="form-label">
            {label}
            {required && <span style={{ color: '#ef4444' }}> *</span>}
          </label>
          <input
            className="form-input"
            name={name}
            type={type}
            value={formData[name] || ""}
            onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
            required={required}
            step={step}
            min={min}
          />
        </div>
      ))}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

// Simple DeleteProduct component for now
function DeleteProduct({ productName, onConfirm, onCancel }) {
  return (
    <>
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="modal-title">
            Delete Product
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete "{productName}"? This product will
              be permanently removed from our servers forever. This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="form-actions">
        <button className="btn btn-danger" onClick={onConfirm}>
          Delete
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </>
  );
}
