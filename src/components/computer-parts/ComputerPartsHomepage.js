"use client";

import { useState, useEffect } from "react";
import { fetchProducts } from "@/lib/api/products";
import CustomHeader from "@/components/ui/CustomHeader";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";
import "./ComputerPartsHomepage.css";

export default function ComputerPartsHomepage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Computer part categories
  const categories = [
    { id: "all", name: "All Parts", icon: "🔧" },
    { id: "cpu", name: "Processors", icon: "⚡" },
    { id: "gpu", name: "Graphics Cards", icon: "🎮" },
    { id: "ram", name: "Memory (RAM)", icon: "💾" },
    { id: "storage", name: "Storage", icon: "💿" },
    { id: "motherboard", name: "Motherboards", icon: "🔌" },
    { id: "psu", name: "Power Supplies", icon: "⚡" },
    { id: "cooling", name: "Cooling", icon: "❄️" },
    { id: "case", name: "Cases", icon: "🏠" },
    { id: "peripherals", name: "Peripherals", icon: "🖱️" },
  ];

  // Load products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Filter products when category changes
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await fetchProducts();
      
      if (data?.data && data.data.length > 0) {
        setProducts(data.data);
        setFilteredProducts(data.data);
      } else {
        setProducts([]);
        setFilteredProducts([]);
        setError("No products found. Add some products through the admin panel!");
      }
    } catch (err) {
      console.error("Failed to load products:", err);
      setError("Failed to load products. Please check your API connection.");
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading computer parts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Computer Parts Store
          </h1>
          <p className="hero-subtitle">
            Discover high-quality computer components for your next build. 
            From processors to graphics cards, we have everything you need.
          </p>
          <div className="hero-button">
            🚀 Start Building Today
          </div>
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="error-notice">
          <div className="error-notice-content">
            <div className="error-notice-icon">⚠️</div>
            <p className="error-notice-text">
              {error}
            </p>
            <button 
              className="retry-button"
              onClick={loadProducts}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Products Section */}
        <div className="products-section">
          <div className="products-header">
            <h2 className="products-title">
              {selectedCategory === "all" 
                ? "All Computer Parts" 
                : categories.find(cat => cat.id === selectedCategory)?.name
              }
            </h2>
            <p className="products-count">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3 className="empty-state-title">
                {error ? "Error loading products" : "No products found"}
              </h3>
              <p className="empty-state-description">
                {error 
                  ? "There was an issue loading the products. Please try again."
                  : `No products found in the "${categories.find(cat => cat.id === selectedCategory)?.name}" category. Try selecting a different category or add some products through the admin panel.`
                }
              </p>
              {!error && (
                <div className="empty-state-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setSelectedCategory("all")}
                  >
                    View All Categories
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
