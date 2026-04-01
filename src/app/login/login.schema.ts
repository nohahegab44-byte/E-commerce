import * as zod from "zod";


export const loginSchema = zod.object({
    email: zod.string().email("Invalid email"),
    password: zod.string().regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
    ),
   
  })


  export type logInDataType = zod.infer<typeof loginSchema>;
