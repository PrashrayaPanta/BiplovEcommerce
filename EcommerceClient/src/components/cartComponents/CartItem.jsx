import { X } from 'lucide-react';
import React from 'react';

export default function CartItem({ item, updateQuantity, removeItem }) {
  // Handle quantity change with safeguards
  const handleQuantityChange = (change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="cart-item flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      {/* Product Image */}
      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />

      {/* Product Info */}
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-center">
          <h4 className="text-sm text-gray-800">{item.name}</h4>
          <button
            className="text-red-500 text-sm hover:text-red-600 transition"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name} from cart`}
          >
            <X />
          </button>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div className="flex items-center">
            {/* Decrease Quantity */}
            <button
              className="px-2 py-1 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              onClick={() => handleQuantityChange(-1)}
              disabled={item.quantity <= 1} // Prevent decrementing below 1
            >
              -
            </button>

            {/* Quantity */}
            <span className="mx-3 text-gray-800 font-sm">{item.quantity}</span>

            {/* Increase Quantity */}
            <button
              className="px-2 py-1 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
          <span className="block text-sm text-gray-900">Rs {item.price * item.quantity}</span>
        </div>
      </div>
    </div>
  );
}
