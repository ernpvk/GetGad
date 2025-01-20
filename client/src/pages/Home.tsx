import { ChevronRight, ChevronLeft, Flame, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { useState, useEffect } from "react";
import { Product } from "../types/product";
import {
  CategoriesSkeleton,
  ProductCardSkeleton,
} from "../components/products/Skeletons";
import ProductCard from "../components/products/ProductCard";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          api.getProductPage(1, limit),
          api.getAllCategories(),
        ]);
        setProducts(productsData.products);
        setCategories(categoriesData.categories);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!isInitialLoading) {
      const fetchProductsPage = async () => {
        setIsPageLoading(true);
        try {
          const data = await api.getProductPage(page, limit);
          setProducts(data.products);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setIsPageLoading(false);
        }
      };
      fetchProductsPage();
    }
  }, [page, isInitialLoading]);

  return (
    <main>
      {/* Hero */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex bg-red-100 text-red-600 rounded-full px-3 py-1 text-sm w-fit items-center gap-1">
                <Flame size={20} />
                <span className="">Hot Deal Of The Week</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold">
                Roco Wireless
                <br /> Headphone
              </h1>
              <h2 className="text-3xl font-bold text-primary">$299.00</h2>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                <ShoppingCart size={20} />
                <span>Shop Now</span>
              </button>
            </div>
            <div className="flex-1">
              <img
                src="/api/placeholder/600/600"
                alt="Roco Wireless Headphone"
                className="w-full hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Browse by Category</h2>
          </div>
        </div>
        {isInitialLoading ? (
          <CategoriesSkeleton />
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-7 gap-4 ">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category}`}
                className="flex flex-col items-center p-4 border rounded-lg hover:border-primary hover:shadow-md transition-colors shadow"
              >
                <span className="text-2xl mb-2 ">
                  {category === "tv" ? (
                    <img
                      src="/assets/icon/category/tv.png"
                      alt="TV"
                      className="w-12 h-12"
                    />
                  ) : category === "audio" ? (
                    <img
                      src="/assets/icon/category/audio.png"
                      alt="TV"
                      className="w-12 h-12"
                    />
                  ) : category === "laptop" ? (
                    <img
                      src="/assets/icon/category/laptop.png"
                      alt="Laptop"
                      className="w-12 h-12"
                    />
                  ) : category === "mobile" ? (
                    <img
                      src="/assets/icon/category/mobile.png"
                      alt="Mobile"
                      className="w-12 h-12"
                    />
                  ) : category === "gaming" ? (
                    <img
                      src="/assets/icon/category/gaming.png"
                      alt="Gaming"
                      className="w-12 h-12"
                    />
                  ) : category === "appliances" ? (
                    <img
                      src="/assets/icon/category/appliance.png"
                      alt="Gaming"
                      className="w-12 h-12"
                    />
                  ) : (
                    <img
                      src="/assets/icon/category/applit.png"
                      alt="Default"
                      className="w-12 h-12"
                    />
                  )}
                </span>
                <span className="text-sm text-gray-600 capitalize">
                  {category}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Explore Our Products</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1 || isPageLoading}
              className="p-2 border rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={isPageLoading}
              className="p-2 border rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isInitialLoading || isPageLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          <div className="col-span-full flex justify-center mt-10">
            <Link to="/products">
              <button className="gap-2 bg-gray-100 text-primary px-8 py-3 rounded-md hover:bg-gray-200 transition-all">
                <span>View All Products</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
