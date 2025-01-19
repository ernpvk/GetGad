import { FC } from "react";
import { Product } from "../../types/product";

interface ProductProps {
  product: Product;
}

const getDiscountPrice = (price: number, discount: number): string => {
  const newPrice = price - price * (discount / 100);
  return `$${newPrice.toFixed(2)}`;
};

const ProductCard: FC<ProductProps> = ({ product }) => {
  return (
    <div className="group relative border rounded-lg p-4">
      {product.discount && (
        <span className="absolute top-4 right-[-5px] bg-red-500 text-white text-sm px-2 py-1 rounded shadow-lg">
          {`${product.discount}% Off`}
        </span>
      )}

      <div className="aspect-square mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-medium line-clamp-2">{product.title}</h3>
        <h4 className="font-medium line-clamp-2 text-gray-400">
          {product.category}
        </h4>
        <div className="flex gap-2">
          <span className="text-primary-600 font-bold">{`${getDiscountPrice(
            product.price,
            product.discount ?? 0
          )}`}</span>
          <span className="text-gray-400 line-through">{`$${product.price}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
