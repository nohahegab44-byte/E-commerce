import * as zod from "zod";

export const schema = zod.object({
    name: zod.string().min(1, "Name is required"),
    email: zod.string().email("Invalid email"),
    password: zod.string().regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
    ),
    rePassword: zod.string().regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
    ),
    phone: zod.string().min(1, "Phone is required"),
  })

  // return true or false
  .refine((data) => data.password === data.rePassword, {
    error: "Passwords do not match",
    path: ["rePassword"], // يظهر الخطأ تحت input rePassword
  });

  export type signUpDataType = zod.infer<typeof schema>;
