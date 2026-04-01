"use client"
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, signUpDataType } from "./signup.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

//use react hook form to handle the form state and validation
export default function Page() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(schema),
  });

  const inputStyle = {
    inputWrapper:
      "bg-emerald-50 border border-emerald-200 hover:border-emerald-400 focus-within:border-emerald-600 rounded-lg",
    input: "text-sm"
  };

  async function  onSubmit(data :signUpDataType) {
    console.log(data);
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        rePassword: data.rePassword,
        phone: data.phone,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const responseData = await res.json();
    console.log(responseData);
    if (res.ok) {
      toast.success(responseData.message ||"Signup successful!",{
        position: "top-center",
        richColors: true,
      });
      router.push("/login");
  }else{
    toast.error(responseData.message || "Signup failed",{
      position: "top-center",
      richColors: true,
    });
  }
  }
  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* Background ,Overlay */}
      <div className="absolute inset-0">
        <img src="/bg.jpg" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-emerald-800/60"></div>
      </div>

      {/* form*/}
      <div className="relative bg-emerald-500 backdrop-blur-md rounded-3xl shadow-xl w-full md:w-1/2 m-5 p-8 hover:shadow-emerald-700 transition-shadow duration-300">
        <h1 className="md:text-3xl font-semibold my-3 text-center text-white">
          Sign Up
        </h1>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mx-auto space-y-5"
        >

          {/* Name */}
          {/* controller to control the input */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-white md:text-xl font-semibold">Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Enter your name"
                  variant="bordered"
                  radius="lg"
                  classNames={inputStyle}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-white md:text-xl font-semibold" htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="Enter email"
                  variant="bordered"
                  radius="lg"
                  classNames={inputStyle}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-white md:text-xl font-semibold" htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="Enter password"
                  variant="bordered"
                  radius="lg"
                  classNames={inputStyle}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-white md:text-xl font-semibold" htmlFor={field.name}>Confirm Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="Confirm password"
                  variant="bordered"
                  radius="lg"
                  classNames={inputStyle}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Phone */}
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-white md:text-xl font-semibold" htmlFor={field.name}>Phone</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="tel"
                  placeholder="Enter phone number"
                  variant="bordered"
                  radius="lg"
                  classNames={inputStyle}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Button
            type="submit"
            className="bg-black text-white w-full py-3 rounded-lg cursor-pointer hover:bg-gray-800"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
  }