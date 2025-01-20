import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { api } from "../../services/api";
import { Product } from "../../types/product";
import { ProductDetailSkeleton } from "./Skeletons";

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const productId = Number(id); // Convert id to a number
        if (isNaN(productId)) throw new Error("Invalid product ID");

        const data = await api.getProduct(productId);
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Product not found
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center px-0">
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <div className="flex items-center justify-center">
          <div className="aspect-square bg-white rounded-lg w-full max-w-[500px]">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        <div className="space-y-8 flex flex-col justify-center px-4">
          <div>
            <span className="text-sm text-gray-500 mb-2 block">
              {product.category.toUpperCase()}
            </span>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600">
              {product.brand} - {product.model}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary">
              $
              {(
                product.price -
                (product.price * (product.discount || 0)) / 100
              ).toFixed(2)}
            </span>
            {product.discount && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ${product.price}
                </span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          <div className="space-y-4 border-t border-b py-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-500">Brand</span>
                <p className="font-medium">
                  {capitalizeFirstLetter(product.brand)}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Model</span>
                <p className="font-medium">{product.model}</p>
              </div>
              <div>
                <span className="text-gray-500">Color</span>
                <p className="font-medium capitalize">{product.color}</p>
              </div>
              <div>
                <span className="text-gray-500">Category</span>
                <p className="font-medium capitalize">{product.category}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-medium mb-4">Product Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <button className="w-full bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
