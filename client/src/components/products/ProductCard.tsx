import { FC } from "react";
import { Product } from "../../types/product";
import { ShoppingCart } from "lucide-react";

interface ProductProps {
  product: Product;
}

const getDiscountPrice = (price: number, discount: number): string => {
  const newPrice = price - price * (discount / 100);
  return `$${newPrice.toFixed(2)}`;
};

const ProductCard: FC<ProductProps> = ({ product }) => {
  return (
    <div className="group relative border rounded-lg p-4 hover:cursor-pointer hover:shadow-lg transition-all">
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
        <button className="w-full bg-primary text-surface-light py-2 rounded flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors">
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
