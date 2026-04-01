"use client"
import { createContext, useState, useEffect } from "react";
import { cardResType, cartItemType } from "@/types/cart.type";

export const cartContext = createContext({
  cartId: null as string | null,
  cartProducts: [] as cartItemType[],
  totalPriceOfCart: 0,
  numOfCartItems: 0,
  setCartId: (id: string | null) => {},
  setCartProducts: (products: cartItemType[]) => {},
  setTotalPriceOfCart: (price: number) => {},
  setNumOfCartItems: (num: number) => {},
});



function getCartItemsCount(products: cartItemType[] = []) {
  return products.reduce((total, item) => total + (item.count || 0), 0);
}

export default function CartContextProvider({
  children,
  userCard,
}: {
  children: React.ReactNode;
  userCard: cardResType;
}) {
  const [cartId, setCartId] = useState(userCard?.cartId || null);
  const [cartProducts, setCartProducts] = useState<cartItemType[]>(
    userCard?.data?.products || []);
  const [totalPriceOfCart, setTotalPriceOfCart] = useState(
    userCard?.data?.totalCartPrice || 0);
  const [numOfCartItems, setNumOfCartItems] = useState(
    userCard?.numOfCartItems ?? userCard?.numberOfCartItems ?? getCartItemsCount(userCard?.data?.products || []));

  useEffect(() => {
    const calculatedItems = getCartItemsCount(cartProducts);
    if (calculatedItems !== numOfCartItems) {
      setNumOfCartItems(calculatedItems);
    }
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
      }}
    >
      {children}
    </cartContext.Provider>
  );
}