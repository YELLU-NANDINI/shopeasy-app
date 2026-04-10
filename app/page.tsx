"use client";

import React from "react";
import { useEffect, useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">
        🛍️ ShopEase - Smart Shopping App
      </h1>

      <input
        className="border p-2 w-full mb-6 rounded"
        placeholder="Search products..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}