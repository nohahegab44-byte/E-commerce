"use client"

import React, { useContext, useState } from "react"
import { toast } from "sonner"
import { cartContext } from "../_context/CartContextProvider"
import { createCashOrder } from "../_actions/order.action"
import { useForm } from "react-hook-form"
import { shippingAddress } from "@/types/order.type"

export default function CheckoutPage() {
  const form = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
      type: "cash",
    }
  })

  const { cartId } = useContext(cartContext)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(value: any) {
    setLoading(true)
    console.log("Form values:", value)

    const userData: shippingAddress = {
      city: value.city,
      details: value.details,
      phone: value.phone,
      postalCode: value.postalCode,
    }

    try {
      if (!cartId) {
        throw new Error("Cart ID is missing")
      }

      if (value.type === "cash") {
        const res = await createCashOrder(cartId, userData, "cash")
        console.log("Response from createCashOrder:", res)
        toast.success("Order placed with cash payment!", { position: "top-center" })
      } else {
        toast.success("Order placed with visa payment!", { position: "top-center" })
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to place order", { position: "top-center" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="bg-white p-8 rounded-2xl shadow w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Payment</h2>

        <input {...form.register("details")} placeholder="Address Details" className="border p-3 rounded-lg" />
        <input {...form.register("phone")} placeholder="Phone" className="border p-3 rounded-lg" />
        <input {...form.register("city")} placeholder="City" className="border p-3 rounded-lg" />
        <input {...form.register("postalCode")} placeholder="Postal Code" className="border p-3 rounded-lg" />

        <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input type="radio" value="cash" {...form.register("type")} /> Cash
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="visa" {...form.register("type")} /> Visa
          </label>
        </div>

        <button
          disabled={loading}
          className="bg-emerald-600 text-white py-3 rounded-xl mt-4"
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  )
}