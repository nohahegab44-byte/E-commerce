"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const userRole = "admin"; // افتراضي دلوقتي، لاحقًا هتجي من الـ session أو token

  useEffect(() => {
    if (userRole !== "admin") {
      router.push("/"); // لو مش admin روح للصفحة الرئيسية
    }
  }, [userRole, router]);

  return (
    <div className="min-h-screen flex">
      {/* sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col gap-4">
        <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
        <a href="/admin/products" className="hover:text-emerald-400">Products</a>
        <a href="/admin/users" className="hover:text-emerald-400">Users</a>
        <a href="/" className="hover:text-emerald-400">Back to Shop</a>
      </aside>

      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}