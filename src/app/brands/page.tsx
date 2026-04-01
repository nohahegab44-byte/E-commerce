"use client";

import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { BrandType } from "@/types/Product.type";
import { getBrands } from "../_actions/CardActions";
import BrandCard from "./productBrands/productCard";

export default function BrandsPage() {
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      const data = await getBrands();
      setBrands(data || []); // array مباشرة
      setLoading(false);
    }

    fetchBrands();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#059669" size={50} />
    </div>;

  return (
    <div className="p-10">
      <h1 className="border-l-4 border-l-emerald-600 rounded-2xl font-bold text-2xl py-2 pl-2.5 ml-5 mb-5">Brands</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-7 m-10">
        {brands.map((brand) => (
          <BrandCard key={brand._id} brand={brand} />
        ))}
      </div>
    </div>
  );
}