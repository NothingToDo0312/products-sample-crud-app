"use client";

import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/lib/api/products";
import CustomHeader from "@/components/ui/CustomHeader";
import CustomModal from "@/components/ui/CustomModal";
import ProductForm from "@/components/products/ProductsForm";
import CustomButton from "@/components/ui/CustomButton";
import DeleteProduct from "@/components/products/ProductsDelete";

export default function ProductsGrid() {
  // ========================
  // Component State
  // ========================
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      const data = await fetchProducts();
      setProducts(data?.data || []);
    } catch (err) {
      console.error("Failed to load products:", err);
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
      await loadProducts();
      setIsProductModalFormOpen(false);
      setFormData(initialFormState());
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  // ========================
  // API: Update Product
  // ========================
  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    try {
      await updateProduct(selectedProduct.id, formData);
      await loadProducts();
      setIsUpdateProductModalOpen(false);
      setFormData(initialFormState());
      setSelectedProduct(null);
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  // ========================
  // API: Delete Product
  // ========================
  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      await deleteProduct(selectedProduct.id);
      await loadProducts();
      setIsDeleteProductModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Failed to delete product:", err);
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
    setFormData(product);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
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
        <CustomHeader
          label="Groceries"
          button={{
            isVisible: true,
            label: "Add new product",
            onClick: openAddModal,
          }}
        />

        {/* Product Grid */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <img
                alt={product.product_name}
                src={product.img_url}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    {product.product_name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.description}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
              <div className="mt-4 flex gap-2">
                <CustomButton
                  type="secondary"
                  label="Delete"
                  onClick={() => openDeleteModal(product)}
                />
                <CustomButton
                  label="Update"
                  onClick={() => openUpdateModal(product)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      <CustomModal
        label="Add new product"
        isOpen={isProductModalFormOpen}
        onClose={closeAllModals}
        content={
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            onClick={addProduct}
            onClose={closeAllModals}
          />
        }
      />

      {/* Update Product Modal */}
      <CustomModal
        label="Update product"
        isOpen={isUpdateProductModalOpen}
        onClose={closeAllModals}
        content={
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            onClick={handleUpdateProduct}
            onClose={closeAllModals}
          />
        }
      />

      {/* Delete Product Modal */}
      <CustomModal
        label="Confirm Delete"
        isOpen={isDeleteProductModalOpen}
        onClose={closeAllModals}
        content={
          <DeleteProduct
            productName={selectedProduct?.product_name}
            onConfirm={handleDeleteProduct}
            onCancel={closeAllModals}
          />
        }
      />
    </div>
  );
}
