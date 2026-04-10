"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const cartItems = useCartStore((state) => state.cartItems);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn");
    const storedUser = localStorage.getItem("user");

    if (logged && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">

      <Link href="/" className="text-xl font-bold">
        🛒 ShopEasy
      </Link>

      <div className="flex items-center gap-4">

        {isLoggedIn ? (
          <>
            <span className="font-medium">
              Hi, {user?.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">
              Login
            </Link>

            <Link href="/signup" className="hover:underline">
              Sign Up
            </Link>
          </>
        )}

        <Link href="/cart" className="relative">
          <span className="bg-white text-black px-4 py-2 rounded">
            Cart
          </span>

          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {cartItems.length}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}