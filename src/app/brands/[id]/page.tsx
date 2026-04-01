"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { ProductType } from "@/types/Product.type";
import AddToCardBtn from "@/app/_components/AddToCardBtn";
import { getProductsByBrand } from "@/services/ProductsServies";
import { CiHeart } from "react-icons/ci";
import { FaEye, FaStar } from "react-icons/fa";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface BrandProductsProps {
  params: Promise<{ id: string }>;
}

export default function BrandProducts({ params }: BrandProductsProps) {
  const { id } = use(params);

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProductsByBrand(id);
        setProducts(data || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [id]);

  if (loading)
    if (loading) return <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#059669" size={50} />
    </div>;

  if (products.length === 0)
    return <div className="flex flex-col justify-center items-center h-screen">
      <AiOutlineCloseCircle className="text-red-500 text-6xl animate-pulse" />
      <p className="text-red-500 mt-2 font-semibold text-lg">
        No products found for this brand.
      </p>
    </div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 m-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white p-3 border rounded-xl shadow hover:shadow-lg transition relative"
        >
          <div className="absolute top-2 right-1 flex flex-col items-center">
            <div className="bg-white border shadow w-5 rounded-full flex items-center justify-center cursor-pointer">
              <CiHeart />
            </div>
            <Link
              href={`/product/${product.id}`}
              className="bg-white border shadow w-5 rounded-full flex items-center justify-center mt-2 cursor-pointer"
            >
              <FaEye />
            </Link>
          </div>

          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-70 object-cover rounded-lg"
          />

          <p className="text-gray-500 text-xs mt-3">
            {product.category?.name || "No Category"}
          </p>

          <h3 className="font-semibold line-clamp-2">
            {product.title.split(" ", 2).join(" ")}
          </h3>

          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className={
                  index < Math.round(product.ratingsAverage || 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="ml-2 text-sm">{product.ratingsAverage || 0}</span>
          </div>

          <div className="flex justify-between mt-2">
            {product.priceAfterDiscount ? (
              <div>
                <span className="text-emerald-500 text-xl font-semibold">
                  {product.priceAfterDiscount} EGP
                </span>
                <span className="text-gray-400 text-sm line-through mx-1">
                  {product.price} EGP
                </span>
              </div>
            ) : (
              <h4 className="text-lg font-semibold">{product.price} EGP</h4>
            )}

            <AddToCardBtn key={product.id} productId={product.id} />
          </div>
        </div>
      ))}
    </div>
  );
}