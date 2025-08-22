// Mock data for computer parts - used when API is not available
export const mockComputerParts = [
  {
    id: 1,
    product_name: "Intel Core i9-13900K",
    description: "24-core processor with 32 threads, perfect for gaming and content creation",
    price: "589.99",
    category: "cpu",
    img_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
    is_available: true
  },
  {
    id: 2,
    product_name: "NVIDIA RTX 4090",
    description: "Flagship graphics card with 24GB GDDR6X memory for ultimate gaming performance",
    price: "1599.99",
    category: "gpu",
    img_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
    is_available: true
  },
  {
    id: 3,
    product_name: "Corsair Dominator Platinum",
    description: "32GB DDR5-6000 memory kit with RGB lighting and premium heat spreaders",
    price: "299.99",
    category: "ram",
    img_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
    is_available: true
  },
  {
    id: 4,
    product_name: "Samsung 990 Pro NVMe SSD",
    description: "2TB PCIe 4.0 NVMe SSD with up to 7,450 MB/s read speeds",
    price: "199.99",
    category: "storage",
    img_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
    is_available: true
  },
  {
    id: 5,
    product_name: "ASUS ROG Maximus Z790",
    description: "Premium motherboard with DDR5 support, PCIe 5.0, and advanced cooling",
    price: "449.99",
    category: "motherboard",
    img_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
    is_available: true
  },
  {
    id: 6,
    product_name: "Corsair HX1000i",
    description: "1000W 80+ Platinum certified modular power supply with zero RPM mode",
    price: "249.99",
    category: "psu",
    img_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
    is_available: true
  },
  {
    id: 7,
    product_name: "NZXT Kraken X73",
    description: "360mm AIO liquid cooler with RGB fans and 7th generation pump",
    price: "179.99",
    category: "cooling",
    img_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
    is_available: false
  },
  {
    id: 8,
    product_name: "Lian Li O11 Dynamic",
    description: "Premium mid-tower case with tempered glass panels and excellent airflow",
    price: "159.99",
    category: "case",
    img_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
    is_available: true
  },
  {
    id: 9,
    product_name: "Logitech G Pro X",
    description: "Wireless gaming mouse with HERO 25K sensor and 70+ hour battery life",
    price: "149.99",
    category: "peripherals",
    img_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
    is_available: true
  },
  {
    id: 10,
    product_name: "AMD Ryzen 9 7950X",
    description: "16-core Zen 4 processor with 5.7GHz boost clock for ultimate performance",
    price: "699.99",
    category: "cpu",
    img_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
    is_available: true
  },
  {
    id: 11,
    product_name: "AMD RX 7900 XTX",
    description: "High-end graphics card with 24GB GDDR6 memory and ray tracing support",
    price: "999.99",
    category: "gpu",
    img_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
    is_available: true
  },
  {
    id: 12,
    product_name: "G.Skill Trident Z5",
    description: "64GB DDR5-6400 memory kit with optimized timings for gaming",
    price: "399.99",
    category: "ram",
    img_url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
    is_available: true
  }
];

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  if (category === "all") return mockComputerParts;
  return mockComputerParts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

// Helper function to search products
export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return mockComputerParts.filter(product =>
    product.product_name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};
