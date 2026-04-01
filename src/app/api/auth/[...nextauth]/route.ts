//code next auth
import NextAuth from "next-auth";
import { nextAuthConfig } from "@/lib/nextauth.confg";          

const handler = NextAuth(nextAuthConfig);
//api handler 
//  لازم يبقا غيه اسم ميسود عشان كدا غير اسمها فالاكسلورت كدا هتشتغل ب )(get,post)
export { handler as GET, handler as POST };