import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartButton = () => {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full">
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartButton;

