import { Menu, Search, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">

          <Link to="/" className="text-2xl font-bold text-primary-600">
            GetGad
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <Link to="/products" className="hover:text-primary-600">Products</Link>
            <Link to="/categories" className="hover:text-primary-600">Categories</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button>
              <Search className="w-6 h-6" />
            </button>
            <button className="relative">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col gap-4">
              <Link to="/" className="hover:text-primary-600">Home</Link>
              <Link to="/products" className="hover:text-primary-600">Products</Link>
              <Link to="/categories" className="hover:text-primary-600">Categories</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;