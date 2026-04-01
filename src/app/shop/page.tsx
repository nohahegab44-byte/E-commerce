"use client"
import React, { useContext } from 'react'
import Link from "next/link"
import { cartContext } from '../_context/CartContextProvider'
import { cardResType, cartItemType } from '@/types/cart.type';
import { clearItemsFromCard, deleteTtemFromCard, updateProductCart } from '../_actions/CardActions';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";

export default function CartPage() {

  const {
    cartProducts,
    totalPriceOfCart,
    numOfCartItems,
    setCartProducts,
    setNumOfCartItems,
    setTotalPriceOfCart,
  } = useContext(cartContext);

  async function handelDeleteItem(id: string) {
    try {
      const res = await deleteTtemFromCard(id);
      console.log("Response from deleteTtemFromCard:", res);

      if (res?.data?.products) {
        const itemsCount =
          res?.numOfCartItems ??
          res?.numberOfCartItems ??
          res.data.products.reduce((acc, item) => acc + ((item as any)?.count ?? 0), 0);

        setCartProducts(res.data.products);
        setNumOfCartItems(itemsCount);
        setTotalPriceOfCart(res.data.totalCartPrice || 0);
        toast.success(res.message || "Item removed", { position: "top-center" });
      } else {
        toast.error(res.message || "Failed to delete item", { position: "top-center" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting item", { position: "top-center" });
    }
  }

  async function handelUpdate(id: string, count: number) {
    try {
      const res = await updateProductCart(id, count);
      console.log("Response from updateProductCart:", res);

      if (res?.data?.products) {
        const itemsCount =
          res?.numOfCartItems ??
          res?.numberOfCartItems ??
          res.data.products.reduce((acc, item) => acc + ((item as any)?.count ?? 0), 0);

        setCartProducts(res.data.products);
        setNumOfCartItems(itemsCount);
        setTotalPriceOfCart(res.data.totalCartPrice || 0);
        toast.success(res.message || "Cart updated", { position: "top-center" });
      } else {
        toast.error(res.message || "Failed to update cart", { position: "top-center" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating cart", { position: "top-center" });
    }
  }

  async function handleClearCart() {
    try {
    const res = await clearItemsFromCard();

      if (res.status === "success") {
        setCartProducts([]);
        setNumOfCartItems(0);
        setTotalPriceOfCart(0);
      toast.success(res.message || "Cart cleared successfully!", { position: "top-center" });
      } else {
      toast.error(res.message || "Failed to clear cart", { position: "top-center" });
      }
    } catch (error) {
    console.error("Error clearing cart:", error);
    toast.error("Something went wrong while clearing cart", { position: "top-center" });
    }
  }
const router = useRouter();
  function handleCheckout() {
    
    if(cartProducts.length === 0) {
      
      toast.error("Your cart is empty!", { position: "top-center" });
      return;
    }
    toast.success("Redirecting to checkout...", { position: "top-center" });
    router.push("/checkout");
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <h1 className="border-l-4 border-l-emerald-600 rounded-2xl font-bold text-2xl py-2 pl-2.5 ml-8 mb-5">
        Shopping Cart
      </h1>

      <div className="flex justify-between items-center w-10/12 mx-auto mb-4">
        <Link href="/" className="text-emerald-600 font-medium hover:underline">
          ← Continue Shopping
        </Link>

        <button
          onClick={handleClearCart}
          className="text-red-500 border border-red-500 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition"
        >
          Clear Cart
        </button>
      </div>

      {cartProducts.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold mb-3">Your cart is empty 🛒</h2>
          <Link href="/shop" className="text-emerald-600 hover:underline">
            Go Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className='w-10/12 mx-auto flex flex-col gap-6'>
            {cartProducts.map((item: cartItemType) => (
              <div key={item.product.id} className='grid grid-cols-4 gap-6 bg-white p-6 rounded-2xl shadow'>
                <img
                  className="w-full h-60 rounded-lg object-cover"
                  src={item.product.imageCover}
                  alt={item.product.title}
                />

                <div className='col-span-2 flex flex-col gap-2'>
                  <h2 className='text-xl font-bold'>{item.product.title}</h2>
                  <div className='flex gap-3 text-sm'>
                    <span className='bg-emerald-500 text-white px-2 py-1 rounded'>
                      {item.product.category?.name || "No Category"}
                    </span>
                    <span className='text-gray-600'>
                      {item.product.brand?.name || "No Brand"}
                    </span>
                  </div>
                  <p className='text-emerald-600 font-semibold'>
                    ${item.price}
                  </p>
                </div>

                <div className='flex flex-col justify-between items-end'>
                  <div className='flex items-center gap-3'>
                    <button
                      onClick={() => handelUpdate(item.product.id, item.count - 1)}
                      className='bg-gray-200 px-3 py-1 rounded'
                    >
                      -
                    </button>

                    <span>{item.count}</span>

                    <button
                      onClick={() => handelUpdate(item.product.id, item.count + 1)}
                      className='bg-gray-200 px-3 py-1 rounded'
                    >
                      +
                    </button>
                  </div>

                  <button
                    className='text-red-500 text-sm hover:underline'
                    onClick={() => handelDeleteItem(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
        </div>

          {/* total and checkout */}
          <div className="w-10/12 mx-auto mt-8 flex justify-between items-center bg-white p-6 rounded-2xl shadow">
              <div>
                <h2 className="text-xl font-bold">Total Items: {numOfCartItems}</h2>
                <h2 className="text-xl font-bold">Total Price: ${totalPriceOfCart}</h2>
            </div>

            {cartProducts.length > 0 && (
              <button
                onClick={handleCheckout}
                className="bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition"
              >
                Checkout
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}