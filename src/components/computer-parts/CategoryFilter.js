"use client";

import "./CategoryFilter.css";

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <div className="category-filter-container">
        <label htmlFor="category-select" className="category-filter-label">
          Browse by Category
        </label>
        
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="category-select"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
