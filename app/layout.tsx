import React from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "ShopEasy",
  description: "Online shopping app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
        <Navbar />

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              marginTop: "20px",
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
              padding: "10px 16px",
            },
          }}
        />
        <main>{children}</main>

      </body>
    </html>
  );
}