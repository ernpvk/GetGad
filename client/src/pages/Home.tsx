import {
  ChevronRight,
  ChevronLeft,
  Flame,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";
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
    <main className="pt-24 md:pt-16">
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 items-center gap-8 p-6 md:p-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex bg-red-100 text-red-600 rounded-full px-4 py-2 text-sm w-fit items-center gap-2">
                  <Flame size={20} />
                  <span>Hot Item Of The Week</span>
                </div>
                <div className="bg-green-100 text-green-600 rounded-full px-3 py-1 text-xs">
                  In Stock
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
                  Sony WH-1000XM5
                </h1>
                <h2 className="text-4xl font-semibold text-blue-600">
                  $322.00
                </h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Industry-Leading Noise Cancellation</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>40-Hour Battery Life</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Adaptive Sound Control</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Link
                  to={`/products/4`}
                  className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <ShoppingCart size={20} />
                  <span>Shop Now</span>
                </Link>
                <Link
                  to={`https://www.sony.co.th/th/electronics/headband-headphones/wh-1000xm5`}
                >
                  <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="relative group">
                <img
                  src="https://store.sony.com.au/dw/image/v2/ABBC_PRD/on/demandware.static/-/Sites-sony-master-catalog/default/dw2e089ba5/images/WH1000XM5S/WH1000XM5S.png?sw=442&sh=442&sm=fit"
                  alt="Sony WH-1000XM5"
                  className="w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-100 opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition-all duration-300 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                to={`/products?categories=${category}`}
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
              <button className="gap-2 bg-gray-100 text-gray-500 px-8 py-3 rounded-md hover:bg-gray-200 transition-all">
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
