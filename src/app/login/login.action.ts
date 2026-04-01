'use server'
// run in server component only to scure the token in the cookies and not accessible from the client side
import { cookies } from "next/headers";
import { logInDataType } from "./login.schema";


export async function loginUpAction(data:logInDataType) {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const responseData = await res.json();
        console.log(responseData);

// securitytoken with cookies
       const myCookies: any = cookies();
       if (typeof myCookies?.set === "function") {
         myCookies.set("token", responseData.token, {
           httpOnly: true,
           maxAge: 60 * 60 * 24,
           secure: true,
           sameSite: "strict",
         });
       } else {
         console.warn("Could not set cookie: cookies.set is not available in this runtime.");
       }

      

        return res.ok ;;
       
}