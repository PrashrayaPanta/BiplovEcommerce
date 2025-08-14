// CartPage.js
import  { useState } from 'react';


import CartItem from '@/components/cartComponents/CartItem';


export  function Cart() {
  // const [cartItems, setCartItems] = useState(initialCartItems);

  // const updateQuantity = (id, newQuantity) => {
  //   setCartItems(cartItems.map(item => 
  //     item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
  //   ));
  // };

  // const removeItem = (id) => {
  //   setCartItems(cartItems.filter(item => item.id !== id));
  // };

  return (
    <div className="cart-page max-w-4xl mx-auto p-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
      {/* {cartItems.length > 0 ? ( */}
        <div className="cart-items space-y-4">



            <CartItem />

          {/* {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))} */}
        </div>
      {/* ) : (
        <p className="text-gray-500">Your cart is empty</p>
      )} */}
      <div className="cart-totals mt-8 p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center border-b pb-4">
          <span className="text-lg font-medium text-gray-700">Subtotal:</span>
          <span className="text-lg font-bold text-gray-900">
            {/* Rs {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)} */}
            <CartItem/>
          </span>
        </div>
        <div className="shipping-options mt-4">
          <h4 className="text-lg font-medium text-gray-800 mb-2">Shipping:</h4>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input type="radio" name="shipping" value="free" className="mr-2" defaultChecked /> Free shipping
            </label>
            <label className="flex items-center">
              <input type="radio" name="shipping" value="pickup" className="mr-2" /> Local pickup (Rs 100.00)
            </label>
            <label className="flex items-center">
              <input type="radio" name="shipping" value="zone1" className="mr-2" /> Zone 1 (Rs 149.00)
            </label>
          </div>
        </div>
        <button className="w-full mt-6 bg-[#3c07ff] text-white py-3 rounded-md hover:bg-[#444444] transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
