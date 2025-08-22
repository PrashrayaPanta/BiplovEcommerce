// CartPage.js
import { useState, useEffect } from "react";

import CartItem from "@/components/cartComponents/CartItem";
import { useSelector } from "react-redux";
import http from "@/http";

export function Cart() {
  const cart = useSelector((state) => state.cart.value);

  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(true);

  const [totalQty, setTotalQty] = useState(0);

  useEffect(() => {
    if (cart) {
      let tp = 0;
      let tq = 0;
      for (let key in cart) {
        tp += cart[key].total;
        tq += cart[key].qty;
      }

      setTotalPrice(tp);
      setTotalQty(tq);
    } else {
      setTotalPrice(0);
      setTotalQty(0);
    }
  }, [cart]);

  const handleCheckout = () => {
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || null;
    // console.log("Hello");

    setLoading(true);

    let data = [];
    for (let k in cart) {
      data.push({
        product_id: k,
        quantity: cart[k].qty,
      });
    }

    http
      .post("/orders", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(clearCart());
        navigate("/");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  // console.log(cart);

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
    <div className="cart-page max-w-4xl mx-auto p-8 bg-blue-100 mt-20">
      {cart ? (
        <>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
          {/* {cartItems.length > 0 ? ( */}
          <div className="cart-items space-y-4 bg-red-500">
            {Object.values(cart)?.map((item, index) => (
              // console.log(cart)

              // console.log(item)

              <CartItem key={index} item={item} />

              // <CartItem id={item.product_id}/>

              // <CartItem key={index} id={item.}  />
            ))}

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

          {/* {Sub Total Section with Procced To Checkout Part} */}
          <div className="cart-totals mt-8 p-6 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center border-b pb-4">
              <span className="text-lg font-medium text-gray-700">
                Subtotal: {totalPrice}
              </span>
              <span className="text-lg font-bold text-gray-900">
                {/* Rs {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)} */}
                <CartItem />
              </span>
            </div>
            <div className="shipping-options mt-4">
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                Shipping:
              </h4>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shipping"
                    value="free"
                    className="mr-2"
                    defaultChecked
                  />{" "}
                  Free shipping
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shipping"
                    value="pickup"
                    className="mr-2"
                  />{" "}
                  Local pickup (Rs 100.00)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shipping"
                    value="zone1"
                    className="mr-2"
                  />{" "}
                  Zone 1 (Rs 149.00)
                </label>
              </div>
            </div>
            <button
              className="w-full mt-6 bg-[#3c07ff] text-white py-3 rounded-md hover:bg-[#444444] transition"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <h1>CVart is empty</h1>
      )}
    </div>
  );
}
