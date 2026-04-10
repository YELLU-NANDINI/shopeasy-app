"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    addToCart({
      ...product,
      quantity: 1,
    });

    toast.success("Added to cart 🛒");
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">

        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-40 w-full object-contain mb-3"
        />

        <h3 className="font-semibold text-sm line-clamp-2">
          {product.title}
        </h3>

        <p className="text-gray-600 mt-1 font-medium">
          ₹{product.price}
        </p>

        <button
          onClick={handleAddToCart}
          className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}