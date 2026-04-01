
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import { Toaster } from "sonner";
import MySessionProvider from "./_providers/MySessionProvider";
import CartContextProvider from "./_context/CartContextProvider";
import { getUserCard } from "./_actions/CardActions";
import { getAllProducts } from "@/services/ProductsServies";
import Footer from "./_components/Footer/page";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCard - Your Online Grocery Store",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 const userCard = await getUserCard();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MySessionProvider>
          <CartContextProvider userCard={userCard}>
            <Toaster/>
            <Navbar />
            {children}
          </CartContextProvider>
          <Footer/>
        </MySessionProvider>
   
      </body>
    </html>
  );
}

//middlewares are not supported in app router, so we will use session provider to wrap our app and provide session to all components