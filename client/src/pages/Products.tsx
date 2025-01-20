import React, { useState, useEffect } from "react";
import { Product } from "../types/product";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 1000],
    brand: "all",
    color: "all",
  });
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    // Fetch products from an API or a local data source
    const fetchProducts = async () => {
      const data = await fetch("/api/products").then((res) => res.json());
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    // Apply filters here
    return true;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    // Implement sorting logic here
    return 0;
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Render product cards here */}
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-end mt-6">
        {/* Implement pagination and sorting controls here */}
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
      {/* Render product card content here */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-60 object-contain"
      />
      <h3 className="text-lg font-medium mt-4">{product.title}</h3>
      <p className="text-gray-500">{product.category}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-primary-600 font-bold">{`$${product.price}`}</span>
        <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Products;
