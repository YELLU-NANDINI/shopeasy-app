"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [login, setLogin] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleLogin = () => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      toast.error("No account found");
      return;
    }

    const user = JSON.parse(stored);

    if (
      (login.emailOrPhone === user.email ||
        login.emailOrPhone === user.phone) &&
      login.password === user.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Login successful ✅");
      router.push("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-80 p-6 border rounded">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          placeholder="Email or Phone"
          className="border p-2 w-full mb-3"
          onChange={(e) => setLogin({ ...login, emailOrPhone: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full py-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}