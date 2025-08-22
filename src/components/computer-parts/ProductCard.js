"use client";

import { useState } from "react";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      cpu: "⚡",
      gpu: "🎮",
      ram: "💾",
      storage: "💿",
      motherboard: "🔌",
      psu: "⚡",
      cooling: "❄️",
      case: "🏠",
      peripherals: "🖱️",
    };
    return icons[category?.toLowerCase()] || "🔧";
  };

  const getAvailabilityBadge = (isAvailable) => {
    return isAvailable ? (
      <span className="availability-badge in-stock">
        In Stock
      </span>
    ) : (
      <span className="availability-badge out-of-stock">
        Out of Stock
      </span>
    );
  };

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image-container">
        {!imageError && product.img_url ? (
          <img
            src={product.img_url}
            alt={product.product_name}
            className="product-image"
            onError={handleImageError}
          />
        ) : (
          <div className="product-image-placeholder">
            <div className="placeholder-icon">
              {getCategoryIcon(product.category)}
            </div>
            <div className="placeholder-text">No Image</div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        {/* Category Badge */}
        <div className="product-badges">
          <span className="category-badge">
            {getCategoryIcon(product.category)} {product.category}
          </span>
          {getAvailabilityBadge(product.is_available)}
        </div>

        {/* Product Name */}
        <h3 className="product-name">
          {product.product_name}
        </h3>

        {/* Description */}
        <p className="product-description">
          {product.description}
        </p>

        {/* Price and Actions */}
        <div className="product-actions">
          <div className="product-price">
            ${parseFloat(product.price).toFixed(2)}
          </div>
          
          <div className="action-buttons">
            <button className="btn btn-secondary">
              View Details
            </button>
            <button className="btn btn-primary">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="hover-overlay"></div>
    </div>
  );
}
