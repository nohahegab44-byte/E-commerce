"use client"

import React, { useState } from "react";
import { toast } from "sonner";

interface Product {
  id: string;
  title: string;
  price: number;
}

const initialProducts: Product[] = [
  { id: "1", title: "Product 1", price: 100 },
  { id: "2", title: "Product 2", price: 200 },
  { id: "3", title: "Product 3", price: 300 },
];

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState<number>(0);

  // Add product
  const handleAddProduct = () => {
    if (!newTitle || !newPrice) return toast.error("Enter title and price");
    const newProduct = {
      id: (products.length + 1).toString(),
      title: newTitle,
      price: newPrice,
    };
    setProducts([...products, newProduct]);
    toast.success("Product added", { position: "top-center" });
    setNewTitle("");
    setNewPrice(0);
  };

  // Update product
  const handleUpdateProduct = (id: string) => {
    const title = prompt("New title");
    const price = prompt("New price");
    if (!title || !price) return;
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, title, price: Number(price) } : p
      )
    );
    toast.success("Product updated", { position: "top-center" });
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Product deleted", { position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add new product */}
      <div className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Product title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border px-3 py-1 rounded w-1/3"
        />
        <input
          type="number"
          placeholder="Price"
          value={newPrice || ""}
          onChange={(e) => setNewPrice(Number(e.target.value))}
          className="border px-3 py-1 rounded w-1/6"
        />
        <button
          onClick={handleAddProduct}
          className="bg-emerald-600 text-white px-4 py-1 rounded hover:bg-emerald-700"
        >
          Add Product
        </button>
      </div>

      {/* Products table */}
      <table className="w-10/12 mx-auto bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Title</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="p-2 text-center">{product.id}</td>
              <td className="p-2">{product.title}</td>
              <td className="p-2 text-center">${product.price}</td>
              <td className="p-2 text-center flex justify-center gap-2">
                <button
                  onClick={() => handleUpdateProduct(product.id)}
                  className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}