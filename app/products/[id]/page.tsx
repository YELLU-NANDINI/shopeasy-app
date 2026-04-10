"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
};

export default function ProductDetails() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product");
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen p-6 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md max-w-3xl w-full">

        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-64 mx-auto object-contain mb-6"
        />

        <h1 className="text-2xl font-bold mb-3">{product.title}</h1>

        <p className="text-gray-600 mb-4">
          {product.description}
        </p>

        <p className="text-xl font-bold mb-4">
          ₹{product.price}
        </p>

        <button
          onClick={() => {
            addToCart({ ...product, quantity: 1 }); // ✅ FIXED
            toast.success("Added to cart 🛒");
          }}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>

        <button
          onClick={() => window.history.back()}
          className="ml-3 px-4 py-2 border rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
}