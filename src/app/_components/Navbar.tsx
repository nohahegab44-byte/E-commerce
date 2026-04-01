"use client"

import React,{useContext} from "react"
import Link from "next/link"
import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
 
} from "@/components/ui/navigation-menu"

// import logo from "../../assets/images/freshCardlogo.png"
import logo from "@/images/freshCardlogo.png"
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@heroui/react"
import { cartContext } from "../_context/CartContextProvider"

export default function Navbar() {
  const { numOfCartItems, cartProducts } = useContext(cartContext);

  const cartItemCount = cartProducts?.reduce(
    (total, item) => total + ((item as any)?.count ?? 0),
    0
  );

  const badgeCount =
    typeof numOfCartItems === "number" && numOfCartItems > 0
      ? numOfCartItems
      : cartItemCount;

  //hook to get the session in the client side
  const session = useSession();
  console.log("SESSION IN NAVBAR", session);
  console.log("NAVBAR CART", { numOfCartItems, cartItemCount, badgeCount });

  const [mounted, setMounted] = React.useState(false);
React.useEffect(() => setMounted(true), []);
if (!mounted) return null;


  function handleLogout() {
    signOut({
      redirect: true, 
      callbackUrl: "/login",
    })
  }
  return (

    <div className="bg-gray-50 py-3 px-20 flex items-center justify-between shadow-md sticky top-0 z-50">

      {/* logo */}
      <img src={logo.src} alt="logo" className="w-32"/>

      {/* search */}
      {/* <div className="w-1/2">
        <input
          type="text"
          placeholder="search product"
          className="border w-full py-2 px-5 rounded-xl outline-none"
        />
      </div> */}

      {/* menu */}
      <NavigationMenu>
        <NavigationMenuList className="text-l flex items-center gap-3">

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/shop">Shop</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>


          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-4">
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built with Tailwind CSS.
                </ListItem>

                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies.
                </ListItem>

                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings and lists.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/brands">brands</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* icons */}

{/* 
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/favorites"><CiHeart size={22}/></Link>
            </NavigationMenuLink>
          </NavigationMenuItem> */}

          
          <NavigationMenuItem>
            <NavigationMenuLink asChild  >
              
              <Link href="/shop" className="relative">
              {mounted &&  (
              <span className="bg-red-500 text-white text-xs pl-1 pr-1 rounded-full  absolute top-0 right-0 ">{numOfCartItems}</span>
             )}
              <FaShoppingCart size={20}/></Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="#"><FaRegUserCircle size={22}/></Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {
            session.data ? 
            <NavigationMenuItem>
            <NavigationMenuLink>
              <Button onClick={(handleLogout)}className="bg-black p-2 text-blue-50 rounded-2xl hover:bg-white hover:text-black hover:border-2 hover:rounded-3xl hover:border-black" >Logout</Button>
            </NavigationMenuLink>
          </NavigationMenuItem> :
          <>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/login">Login</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>


          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/signup">Signup</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          </>

          }

        </NavigationMenuList>
      </NavigationMenu>

    </div>
  )
}

function ListItem({
  title,
  children,
  href,
}: {
  title: string
  children: React.ReactNode
  href: string
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={href} className="block space-y-1">
          <div className="font-medium">{title}</div>
          <p className="text-sm text-gray-500">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}