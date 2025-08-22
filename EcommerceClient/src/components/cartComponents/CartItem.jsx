import { imgUrl } from "@/library";
import { clearCart, setCart } from "../../store";
import { X } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CartItem({ item, updateQuantity, removeItem }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.value);

  console.log(cart);

  console.log(cart);

  // const handleUpdateCartQty = (id, qty) => {
  //   let temp = { ...cart };

  //   let total = qty * cart?.[id]?.price;
  //   temp[id] = {
  //     ...temp[id],
  //     total,
  //     qty,
  //   };
  //   dispatch(setCart(temp));
  // };

  const handleDeleteCartItem = (id) => {
    console.log(id);

    // console.log(id);

    // console.log("clicked");

    let temp = {};

    for (let k in cart) {
      if (k != id) {
        temp = {
          ...temp,
          [k]: cart[k],
        };
      }
    }

    console.log(temp);

    if (Object.values(temp).length > 0) {
      dispatch(setCart(temp));
    } else {
      dispatch(clearCart());
      localStorage.clear();
    }
  };

  // const handleUpdateCartQty = (id, qty) => {
  //   console.log(id, qty);

  //   let temp = { ...cart };

  //   let total = qty * cart?.[id].price;
  //   temp[id] = {
  //     ...temp[id],
  //     total,
  //     qty,
  //   };
  //   dispatch(setCart(temp));
  // };

  console.log(removeItem);

  console.log(updateQuantity);

  // Handle quantity change with safeguards
  // const handleQuantityChange = (change) => {

  //   console.log(change);
  //   console.log("Quanrity is cahnged");

  //   const newQuantity = item?.quantity + change;
  //   if (newQuantity > 0) {
  //     updateQuantity(item.product._id, newQuantity);
  //   }
  // }

  const [countQty, setCountQty] = useState(item?.qty);

  console.log(countQty);

  const handleIncreaseQuantityofItem = (id) => {
    setCountQty(() => countQty + 1);
    console.log(countQty);
    handleUpdateCartQty(id, countQty);
  };

  const handleUpdateCartQty = (id, qty) => {
    console.log(qty);

    let temp = { ...cart };

    let total = qty * cart[id].price;
    temp[id] = {
      ...temp[id],
      total,
      qty,
    };
    dispatch(setCart(temp));
  };

  return (
    <div className="cart-item flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      {/* Product Image */}
      <img
        src={imgUrl(item?.product?.images?.[0].public_id)}
        alt={item?.product?.title}
        className="w-16 h-16 object-cover rounded-md"
      />

      {/* Product Info */}
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-center">
          <h4 className="text-sm text-gray-800">{item?.product?.title}</h4>
          <button
            className="text-red-500 text-sm hover:text-red-600 transition"
            onClick={() => handleDeleteCartItem(item?.product?._id)}
            aria-label={`Remove djkfngjk from cart`}
          >
            <X />
          </button>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div className="flex items-center">
            {/* Decrease Quantity */}
            <button
              className="px-2 py-1 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              onClick={() => handleDecreaseQuantity(item.product._id, countQty)}
              disabled={item?.qty <= 1} // Prevent decrementing below 1
            >
              -
            </button>

            {/* Quantity */}
            <span className="mx-3 text-gray-800 font-sm">{item?.qty}</span>

            {/* Increase Quantity */}
            <button
              className="px-2 py-1 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              onClick={() => handleIncreaseQuantityofItem(item.product._id)}
            >
              +
            </button>
          </div>
          <span className="block text-sm text-gray-900">{item?.total}</span>
        </div>
      </div>
    </div>
  );
}
