import { CircleUserRound, Menu, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
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

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-primary-600">
              Home
            </Link>
            <Link to="/products" className="hover:text-primary-600">
              Products
            </Link>
            <Link to="/categories" className="hover:text-primary-600">
              Categories
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button>
              <Search className="w-6 h-6" />
            </button>
            <button className="relative" style={{ transform: "none" }}>
              <svg
                className="h-6 w-6 cursor-pointer outline-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 92 92"
              >
                <path
                  d="M91.8 27.3 81.1 61c-.8 2.4-2.9 4-5.4 4H34.4c-2.4 0-4.7-1.5-5.5-3.7L13.1 19H4c-2.2 0-4-1.8-4-4s1.8-4 4-4h11.9c1.7 0 3.2 1.1 3.8 2.7L36 57h38l8.5-27H35.4c-2.2 0-4-1.8-4-4s1.8-4 4-4H88c1.3 0 2.5.7 3.2 1.7.8 1 1 2.4.6 3.6zm-55.4 43c-1.7 0-3.4.7-4.6 1.9-1.2 1.2-1.9 2.9-1.9 4.6 0 1.7.7 3.4 1.9 4.6 1.2 1.2 2.9 1.9 4.6 1.9s3.4-.7 4.6-1.9c1.2-1.2 1.9-2.9 1.9-4.6 0-1.7-.7-3.4-1.9-4.6-1.2-1.2-2.9-1.9-4.6-1.9zm35.9 0c-1.7 0-3.4.7-4.6 1.9s-1.9 2.9-1.9 4.6c0 1.7.7 3.4 1.9 4.6 1.2 1.2 2.9 1.9 4.6 1.9 1.7 0 3.4-.7 4.6-1.9 1.2-1.2 1.9-2.9 1.9-4.6 0-1.7-.7-3.4-1.9-4.6s-2.9-1.9-4.6-1.9z"
                  fill="currentColor"
                  pathLength="1"
                  stroke-dashoffset="0px"
                  stroke-dasharray="0px 1px"
                ></path>
              </svg>
              <span
                className="bg-red-400 w-5 rounded-full text-white text-xs flex items-center justify-center absolute -top-2 -right-2 pointer-events-none"
                style={{ aspectRatio: "1 / 1", transform: "none" }}
              >
                <span className="absolute">1</span>
              </span>
            </button>
            <button>
              <CircleUserRound className="w-6 h-6" />
            </button>
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col gap-4">
              <Link to="/products" className="hover:text-primary-600">
                Products
              </Link>
              <Link to="/categories" className="hover:text-primary-600">
                Categories
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
