import { ChevronRight, ChevronLeft, Flame, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { useState, useEffect } from "react";
import { Product } from "../types/product";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getAllProducts();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchCategories = async () => {
      try {
        const data = await api.getAllCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div>Loading...</div>
        </div>
      ) : (
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
                  <h2 className="text-3xl font-bold text-primary-600">
                    $299.00
                  </h2>
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
                <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                <h2 className="text-xl font-semibold">Browse by Category</h2>
              </div>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-7 gap-4 ">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/category/${category}`}
                  className="flex flex-col items-center p-4 border rounded-lg hover:border-primary-600 transition-colors shadow"
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
          </section>

          {/* Products */}
          <section className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                <h2 className="text-xl font-semibold">Explore Our Products</h2>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border rounded-full hover:bg-gray-100">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-2 border rounded-full hover:bg-gray-100">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="group relative border rounded-lg p-4">
                  <span className="absolute top-4 right-4 bg-blue-500 text-white text-sm px-2 py-1 rounded">
                    30% Off
                  </span>
                  <div className="aspect-square mb-4">
                    <img
                      src="/api/placeholder/300/300"
                      alt="Product"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Gaming Controller</h3>
                    <div className="flex gap-2">
                      <span className="text-primary-600 font-bold">$29.99</span>
                      <span className="text-gray-400 line-through">$49.99</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Home;
