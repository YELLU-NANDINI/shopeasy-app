"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = () => {
    const { name, phone, email, address, password, confirmPassword } = form;

    if (!name || !phone || !email || !address || !password || !confirmPassword) {
      toast.error("Fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ name, phone, email, address, password }));

    toast.success("Account created ✅");
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 border rounded">
        <h1 className="text-xl font-bold mb-4">Sign Up</h1>

        {["name", "phone", "email", "address", "password", "confirmPassword"].map((field) => (
          <input
            key={field}
            type={field.includes("password") ? "password" : "text"}
            placeholder={field}
            className="border p-2 w-full mb-3"
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}

        <button
          onClick={handleSignup}
          className="bg-black text-white w-full py-2"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}