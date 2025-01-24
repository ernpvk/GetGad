import { Menu, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartButton from "../cart/CartButton";
import { api } from "../../services/api";
import { Product } from "../../types/product";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await api.getAllProducts(150);
        if (response?.products) setAllProducts(response.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const searchTerm = query.toLowerCase();
    if (Array.isArray(allProducts)) {
      const filteredResults = allProducts
        .filter(
          (product) =>
            product.title?.toLowerCase().includes(searchTerm) ||
            product.brand?.toLowerCase().includes(searchTerm) ||
            product.category?.toLowerCase().includes(searchTerm)
        )
        .slice(0, 6);
      setSearchResults(filteredResults);
      setShowResults(true);
    }
  };

  const handleResultClick = (product: Product) => {
    navigate(`/products/${product.id}`);
    setSearchQuery("");
    setShowResults(false);
    setSearchResults([]);
    setIsOpen(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary-600"
          >
            <img
              src="/assets/getgadlogo.png"
              alt="GetGad"
              className="h-8 w-auto object-contain"
            />
            <span>GetGad</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 flex-1 max-w-xl mx-4">
            <div className="relative flex-1">
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="ml-2 flex-1 outline-none bg-transparent"
                  onBlur={() => {
                    // Delay hiding results to allow for clicks
                    setTimeout(() => setShowResults(false), 200);
                  }}
                  onFocus={() => {
                    if (searchQuery) setShowResults(true);
                  }}
                />
              </div>

              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border p-2">
                  {isLoading && (
                    <div className="text-center text-gray-500 py-2">
                      Loading...
                    </div>
                  )}

                  {searchResults.length > 0 && (
                    <div className="max-h-80 overflow-y-auto">
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleResultClick(product)}
                          className="w-full text-left p-2 hover:bg-gray-100 rounded-lg flex items-start gap-3"
                        >
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">
                              {product.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.brand}
                            </div>
                            <div className="text-sm font-medium text-primary-600">
                              {formatPrice(product.price)}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {searchQuery && searchResults.length === 0 && !isLoading && (
                    <div className="text-center text-gray-500 py-2">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/products"
              className="hover:text-primary-600 hidden md:block hover:bg-gray-100 rounded-lg px-2 py-1"
            >
              All Products
            </Link>
            <CartButton />
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        <hr className="mt-0 my-2  md:hidden" />
        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 mb-2 md:hidden">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="ml-2 flex-1 outline-none bg-transparent"
          />
          {showResults && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border p-2">
              {isLoading && (
                <div className="text-center text-gray-500 py-2">Loading...</div>
              )}

              {searchResults.length > 0 && (
                <div className="max-h-80 overflow-y-auto">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleResultClick(product)}
                      className="w-full text-left p-2 hover:bg-gray-100 rounded-lg flex items-start gap-3"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {product.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.brand}
                        </div>
                        <div className="text-sm font-medium text-primary-600">
                          {formatPrice(product.price)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {searchQuery && searchResults.length === 0 && !isLoading && (
                <div className="text-center text-gray-500 py-2">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col gap-4">
              <Link
                to="/products"
                onClick={() => setIsOpen(false)}
                className="hover:text-primary-600"
              >
                All Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
