"use client"
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { logInDataType, loginSchema } from "./login.schema";

import { signIn } from "next-auth/react";
export default function Page() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const inputStyle = {
    inputWrapper:
      "bg-emerald-50 border border-emerald-200 hover:border-emerald-400 focus-within:border-emerald-600 rounded-lg",
    input: "text-sm"
  };

  async function onSubmit(data: logInDataType) {
    //بقوله هسين ان بمين 
    // بعتله الايميل والباسورد اللي دخلهم في الفورم 
  const res = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });

  console.log("RES", res);

  if (res?.ok) {
    console.log("SUCCESS");
    router.push("/");
  } else {
    console.log("ERROR", res?.error);
  }
}

  

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* Background + Overlay */}
      <div className="absolute inset-0">
        <img src="/bg.jpg" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-emerald-800/60"></div>
      </div>

      {/* form */}
      <div className="relative bg-emerald-500 backdrop-blur-md rounded-3xl shadow-xl w-full md:w-1/2 m-5 p-8 hover:shadow-emerald-700 transition-shadow duration-300">

        <h1 className="md:text-3xl font-semibold my-3 text-center text-white">
          Log In to Your Account
        </h1>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mx-auto space-y-5"
        >

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-white md:text-xl font-semibold" htmlFor={field.name}>
                  Email
                </FieldLabel>

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
                <FieldLabel className="text-white md:text-xl font-semibold" htmlFor={field.name}>
                  Password
                </FieldLabel>

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

          <Button
            type="submit"
            className="bg-black text-white w-full py-3 rounded-lg cursor-pointer hover:bg-gray-800"
          >
            Log In
          </Button>

        </form>
      </div>
    </div>
  );
}