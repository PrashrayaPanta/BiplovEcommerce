import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { ShoppingCartIcon } from 'lucide-react';

import CartItem from './CartItem';
import { Link, useNavigate } from 'react-router-dom';

export default function CartSheet() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle link click, close the sheet and navigate
  const handleLinkClick = (path) => {
    setIsOpen(false); // Close the sheet
    navigate(path);   // Redirect to the path
  };
  const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);


  const removeItem = id => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <div className="relative cursor-pointer transition pr-4 pt-2 -mt-2">
          <ShoppingCartIcon />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {totalItems}
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className="w-96 p-4 bg-red-500 shadow-lg flex flex-col justify-between ">
        <div className="flex-1 overflow-y-auto bg-red-500">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Shopping Cart</h2>
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty</p>
          )}
        </div>

        {/* Subtotal Section and Buttons */}
        <div className="p-4 border-t flex flex-col">
        <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-medium">Subtotal:</span>
            <span className="text-lg font-bold">
            Rs {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </span>
        </div>
        
        {/* Link to View Cart */}
        <button
            onClick={()=>{
                handleLinkClick("/cart")
            }}
            className="text-sm text-red-500 hover:underline mx-auto w-full text-center mb-2"
        >
            View Cart
        </button>

        {/* Checkout Button */}
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition w-full">
            Checkout
        </button>
        </div>

      </SheetContent>
    </Sheet>
  );
}
