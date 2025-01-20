import { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ViewOptions } from "../components/products/ViewOptions";
import ProductGrid from "../components/products/ProductGrid";
import { Product } from "../types/product";
import { api } from "../services/api";
import Filters from "../components/products/Filters";

const Products = () => {
  const [sort, setSort] = useState("popular");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // เพิ่ม states สำหรับ products
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 12;

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await api.getAllProducts(150);
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [sort]); // เพิ่ม sort เพื่อ fetch ใหม่เมื่อ sort เปลี่ยน

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">All Products</h1>
      </div>

      <div className="flex gap-8">
        <aside className="hidden md:block w-64">
          <Filters />
        </aside>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span>{products.length} products found</span>
            {/* Mobile Filter Button */}
            <button
              className="md:hidden flex items-center gap-2"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <SlidersHorizontal size={20} />
              Filters
            </button>
            <div className="ml-auto">
              <ViewOptions sort={sort} setSort={setSort} />
            </div>
          </div>

          <main className="flex-1">
            <ProductGrid products={products} isLoading={isLoading} />
          </main>
        </div>

        {/* Mobile Filters Modal */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)}>✕</button>
              </div>
              <Filters />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
