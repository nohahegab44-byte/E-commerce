"use server"
import { shippingAddress } from "@/types/order.type";
import { getMyToken } from "../../../utils/getMyToken";

export async function createCashOrder(cartId: string, shippingAddress : shippingAddress, paymentMethod: string) {
  const token = await getMyToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
    body: JSON.stringify({
      shippingAddress,
      paymentMethod,
    }),
  });

  const finalRes = await res.json();
    console.log("final response from create cash order:", finalRes);
  return finalRes;
}