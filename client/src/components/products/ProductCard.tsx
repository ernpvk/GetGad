import { Product } from "../../types/product";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

interface ProductProps {
  product: Product;
}

const getDiscountPrice = (price: number, discount: number): string => {
  const newPrice = price - price * (discount / 100);
  return `$${newPrice.toFixed(2)}`;
};

const ProductCard = ({ product }: ProductProps) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
    addToCart(product);
  };

  return (
    <div
      className="group relative border rounded-lg p-4 hover:cursor-pointer hover:shadow-lg transition-all"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="flex items-center">
        {product.discount && (
          <span className="absolute top-4 left-[-8px] bg-red-500 text-white text-sm px-2 py-1 rounded shadow-lg z-20">
            {`${product.discount}% Off`}
          </span>
        )}
      </div>

      <div className="flex items-center justify-center aspect-square mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-60 h-60 object-contain hover:scale-105 transition-transform"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium line-clamp-2 h-12">{product.title}</h3>
        <h4 className="font-medium text-sm text-gray-400 capitalize">
          {product.category}
        </h4>
        <div className="flex gap-2">
          <span className="text-black font-bold">
            {getDiscountPrice(product.price, product.discount ?? 0)}
          </span>
          <span className="text-gray-400 line-through">{`$${product.price}`}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
