import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { ViewOptions } from "../components/products/ViewOptions";
import ProductGrid from "../components/products/ProductGrid";
import { Product } from "../types/product";
import { api } from "../services/api";
import Filters from "../components/products/Filters";
import { ProductsGridSkeleton } from "../components/products/Skeletons";

const Products = () => {
  const location = useLocation();
  const [sort, setSort] = useState("popular");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 6000]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoriesParam = searchParams.get("categories");

    if (categoriesParam) {
      const urlCategories = categoriesParam
        .split(",")
        .map((cat) => cat.toLowerCase());

      setSelectedCategories(urlCategories);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await api.getAllProducts(150);
        console.log("API Response:", response); // Debug response
        if (response?.products) {
          setProducts(response.products);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category.toLowerCase())
      );
    }

    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategories, priceRange, sort]);

  return (
    <div className="container mx-auto px-4 py-8 pt-36 md:pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          {selectedCategories.length > 0
            ? `${selectedCategories.join(", ")} Products`
            : "All Products"}
        </h1>
      </div>

      <div className="flex gap-8">
        <aside className="hidden md:block w-64 flex-shrink-0">
          <Filters
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </aside>

        <div className="flex-1 flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span>{filteredProducts.length} products found</span>
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

          <main className="w-full">
            {isLoading ? (
              <ProductsGridSkeleton />
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </main>
        </div>

        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)}>✕</button>
              </div>
              <Filters
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
