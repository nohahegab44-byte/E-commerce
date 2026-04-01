import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "fresh cart",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await res.json();
        console.log("API RESPONSE ", data);

        if (res.ok && data.token) {
          return {
            id: data.user._id,
            email: data.user.email,
            name: data.user.name,
            token: data.token, // هيتحفظ في JWT callback
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
  async jwt({ token, user }: { token: any; user?: any }) {
    if (user) {
      // لو first login، خزني token من backend
      token.realTokenFromBackend = user.token;
    }
    return token;
  },

  async session({ session, token }: { session: any; token: any }) {
    // session.user.token يبقى دايماً موجود
    if (session.user) {
      // fallback: لو realTokenFromBackend موجود خليه، لو مش موجود خلي اللي موجود في session.user.token
      session.user.token = token.realTokenFromBackend || session.user.token || null;
    }
    return session;
  },
},

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 يوم
  },

  pages: {
    signIn: "/login",
  },
};