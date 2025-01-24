import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    totalSubPrice,
    totalDiscount,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="w-screen h-screen flex items-center justify-center pt-0">
        <div className="max-w-2xl mx-auto text-center py-20">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-36 md:pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">
          Shopping Cart ({totalItems} items)
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-white rounded-lg border"
              >
                <Link
                  to={`/products/${item.id}`}
                  className="w-24 h-24 bg-white rounded-md flex-shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    to={`/products/${item.id}`}
                    className="font-medium hover:text-primary"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    ${item.price} each
                  </p>

                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-100 rounded border"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-100 rounded border"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Remove</span>
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-medium">
                    {" "}
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-red-500">
                    - ${totalDiscount.toFixed(2)}
                  </span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${totalSubPrice.toFixed(2)}</span>
                </div>

                <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors">
                  Proceed to Checkout
                </button>

                <Link
                  to="/products"
                  className="block text-center text-gray-600 hover:text-gray-800 underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
