"use client"

import { toast } from "sonner";
import { addProductToCart } from "../_actions/CardActions";
import { useContext, useEffect, useState }  from "react";
import { cartContext } from "../_context/CartContextProvider";

export default function AddToCardBtn({ productId }: { productId: string }) {
    const { setNumOfCartItems ,setTotalPriceOfCart,setCartProducts} = useContext(cartContext);
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => setMounted(true), []);

   async function handleAddToCart() {
  if (loading) return;
  setLoading(true);

  try {
    const res = await addProductToCart(productId);

    if (res.status === "success" && res.data?.products) {
      const products = res?.data.products;
      setCartProducts(products);
      toast.success(res.message , { position: "top-center" });

      // const itemsCount = res.numOfCartItems ?? res.numberOfCartItems ??
      //   products.reduce((acc, p) => acc + (p.count || 0), 0);
      setNumOfCartItems(res?.numberOfCartItems || 0);

      setTotalPriceOfCart(res?.data.totalCartPrice ?? 0);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

    if (!mounted) return null;

    return (
        <button
            onClick={handleAddToCart}
            disabled={loading}
            className={`bg-emerald-600 text-white rounded-full h-10 w-10 flex items-center justify-center text-2xl 
                        hover:bg-emerald-700 transition-colors duration-200 font-bold cursor-pointer
                        ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            +
        </button>
    );
}