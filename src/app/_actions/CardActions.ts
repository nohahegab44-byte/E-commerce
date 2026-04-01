
"use server"
import { get } from "http";
import { getMyToken } from "../../../utils/getMyToken";
import { cardResType } from "@/types/cart.type";

function normalizeCartResponse(res: any): cardResType {
  const cartId = res?.cartId || res?.data?._id || null;
  const numOfCartItems = res?.numOfCartItems ?? res?.numberOfCartItems ?? 0;
  const numberOfCartItems = res?.numberOfCartItems ?? res?.numOfCartItems ?? 0;
  const totalCartPrice = res?.data?.totalCartPrice ?? 0;
  const products = res?.data?.products ?? [];

  return {
    ...res,
    cartId,
    numOfCartItems,
    numberOfCartItems,
    data: {
      ...res?.data,
      totalCartPrice,
      products,
    },
  };
}

//==============================================================================
export async function addProductToCart(id : string): Promise<cardResType> {
  console.log("Product added to cart");

  const token = await getMyToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
    body: JSON.stringify({ productId: id, quantity: 1 }),
  });

  const text = await res.text(); // read raw text first
  let finalRes;

  try {
    finalRes = JSON.parse(text); // try parse JSON
  } catch (err) {
    console.error("Response is not JSON, got:", err);
    throw new Error("API returned non-JSON response");
  }

  console.log("final response from add to cart:", finalRes);
  return normalizeCartResponse(finalRes);
 
}
//==============================================================================
 export async function getUserCard() : Promise<cardResType> {
      
  const token = await getMyToken();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/cart`,{
          headers :{
            token:token as string,
          }
      })
      const finalRes = await res.json();
      console.log("final response from get user cart:", finalRes);
      return normalizeCartResponse(finalRes);

      

}

//================================================================================
    export async function deleteTtemFromCard(productId: string): Promise<cardResType> {
      
      const token = await getMyToken();
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/cart/${productId}`,{
          headers :{
            token:token as string,
          },
          method : "DELETE",
      })
      const finalRes = await res.json();
      console.log("final response from deleteTtemFromCard:", finalRes);
      return normalizeCartResponse(finalRes);

    }
//====================================================================================
    export async function updateProductCart(id : string ,count: number): Promise<cardResType> {
       
       const token = await getMyToken();
       
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/cart/${id}`, {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
           token : token as string,
         },
         body: JSON.stringify({
          count, 
           quantity: 1,
         }),
       });

       const finalRes = await res.json();
       console.log("final response from updateProductCart:", finalRes);
       return normalizeCartResponse(finalRes);
    }

  //=======================================================================================
    export async function clearItemsFromCard() {
      
      const token = await getMyToken();
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/cart`,{
          headers :{
            token:token as string,
          },
          method : "DELETE",
      })
      const finalRes = await res.json();
      console.log("final response from clearItemsFromCard:", finalRes);
      return normalizeCartResponse(finalRes);

    }
//=======================================================================================
 export async function getBrands() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/brands?limit=30`);
    const data = await res.json();
    return data.data || []; 
  } catch (error) {
    console.error(error);
    return [];
  }
}
//===========================================================================================

    