"use client";

import { toast } from "sonner";
import { addProductToCart } from "../_actions/CardActions";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../_context/CartContextProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToCardBtn({ productId }: { productId: string }) {
  const { setNumOfCartItems, setTotalPriceOfCart, setCartProducts } =
    useContext(cartContext);

  const { data: session, status } = useSession(); // ✅ بدل getToken
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleAddToCart() {
   //no user
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    // loading 
    if (status === "loading") return;

    if (loading) return;
    setLoading(true);

    try {
      const res = await addProductToCart(productId);

      if (res.status === "success" && res.data?.products) {
        const products = res.data.products;

        setCartProducts(products);
        setNumOfCartItems(res?.numberOfCartItems || 0);
        setTotalPriceOfCart(res?.data.totalCartPrice ?? 0);

        toast.success(res.message, { position: "top-center" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) return null;

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading || status === "loading"}
      className={`bg-emerald-600 text-white rounded-full h-10 w-10 flex items-center justify-center text-2xl 
        hover:bg-emerald-700 transition-colors duration-200 font-bold cursor-pointer
        ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      +
    </button>
  );
}