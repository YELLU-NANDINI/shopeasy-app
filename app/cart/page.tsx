"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

export default function CartPage() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCartStore();

  const [address, setAddress] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      setAddress(user.name + " (" + user.email + ")");
    }
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!address) {
      toast.error("Please enter address ❌");
      return;
    }

    toast.success("Order placed successfully 🎉");

    clearCart();
    setAddress("");
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">
          Your cart is empty 🛒
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-center">
        🛒 Your Cart
      </h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 border p-4 mb-4 rounded"
        >
          <img
            src={item.thumbnail}
            className="w-24 h-24 object-contain"
          />

          <div className="flex-1">
            <h2 className="font-semibold">{item.title}</h2>
            <p>₹{item.price}</p>

            <div className="flex gap-2 mt-2">
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 mt-2"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 border-t pt-4">

        <h2 className="text-xl font-bold mb-3">
          Total: ₹{total}
        </h2>

        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          className="border p-2 w-full mb-3"
        />

        <button
          onClick={handleCheckout}
          className="bg-green-600 text-white w-full py-2 rounded mb-2"
        >
          Place Order
        </button>

        <button
          onClick={clearCart}
          className="bg-red-500 text-white w-full py-2 rounded"
        >
          Clear Cart
        </button>

      </div>
    </div>
  );
}