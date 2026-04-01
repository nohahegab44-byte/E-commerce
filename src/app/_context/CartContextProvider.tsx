"use client";

import { createContext, useState, useEffect } from "react";
import { cardResType, cartItemType } from "@/types/cart.type";
import { getUserCard } from "../_actions/CardActions";

// --------------- Context ----------------
export const cartContext = createContext({
  cartId: null as string | null,
  cartProducts: [] as cartItemType[],
  totalPriceOfCart: 0,
  numOfCartItems: 0,
  setCartId: (id: string | null) => {},
  setCartProducts: (products: cartItemType[]) => {},
  setTotalPriceOfCart: (price: number) => {},
  setNumOfCartItems: (num: number) => {},
  getCart: async () => {}, 
});

// --------------- Provider ----------------
export default function CartContextProvider({
  children,
  userCard,
}: {
  children: React.ReactNode;
  userCard?: cardResType;
}) {
  const [cartId, setCartId] = useState(userCard?.cartId || null);
  const [cartProducts, setCartProducts] = useState<cartItemType[]>(userCard?.data?.products || []);
  const [totalPriceOfCart, setTotalPriceOfCart] = useState(userCard?.data?.totalCartPrice || 0);
  const [numOfCartItems, setNumOfCartItems] = useState(
    userCard?.numOfCartItems ?? cartProducts.reduce((acc, p) => acc + (p.count || 0), 0)
  );

  // --------------- getCart Function ----------------
  async function getCart() {
    try {
      if (typeof window === "undefined") return; // prevent SSR issues
      const token = localStorage.getItem("token");
      if (!token) return;

      const data = await getUserCard();

      setCartId(data.cartId);
      setCartProducts(data.data.products || []);
      setTotalPriceOfCart(data.data.totalCartPrice || 0);
      setNumOfCartItems(data.numOfCartItems ?? 0);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  }

  // --------------- Load cart on mount ----------------
  useEffect(() => {
    getCart();
  }, []);

  // --------------- Recalculate items ----------------
  useEffect(() => {
    const itemsCount = cartProducts.reduce((acc, p) => acc + (p.count || 0), 0);
    if (itemsCount !== numOfCartItems) setNumOfCartItems(itemsCount);
  }, [cartProducts, numOfCartItems]);

  return (
    <cartContext.Provider
      value={{
        cartId,
        cartProducts,
        totalPriceOfCart,
        numOfCartItems,
        setCartId,
        setCartProducts,
        setTotalPriceOfCart,
        setNumOfCartItems,
        getCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}