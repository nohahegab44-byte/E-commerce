import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
export async function getMyToken(){
    const myCookies = await cookies();
    const tokenFromCookies = myCookies.get("next-auth.session-token")?.value;
    console.log("TOKEN FROM COOKIES ", tokenFromCookies);

    if (!tokenFromCookies) {
      return null;
    }

    const rawToken: any = tokenFromCookies;
    const myTokenAfterDecodeed = await decode({ token: rawToken, secret: process.env.NEXTAUTH_SECRET } as any);

    console.log("DECODED TOKEN ", myTokenAfterDecodeed);
    console.log("TOKEN FROM DECODED ", myTokenAfterDecodeed?.realTokenFromBackend);

    return myTokenAfterDecodeed?.realTokenFromBackend || null;
}