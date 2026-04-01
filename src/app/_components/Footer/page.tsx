"use client";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "@/images/freshCardlogo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo + Description */}
        <div className="flex flex-col gap-4">
          {/* logo */}
      <img src={logo.src} alt="logo" className="w-32 bg-white p-2 rounded-xl hover:border-2 hover:border-emerald-500"/>
          <p className="text-gray-400">
            Your one-stop shop for fresh products and exclusive deals. Quality you can trust, delivered to your door.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-emerald-500 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-emerald-500 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-emerald-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-emerald-500 transition"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-white mb-2">Quick Links</h4>
          <Link href="/" className="hover:text-emerald-500 transition">Home</Link>
          <Link href="/shop" className="hover:text-emerald-500 transition">Shop</Link>
          <Link href="/brands" className="hover:text-emerald-500 transition">Brands</Link>
        </div>

        {/* Customer Service */}
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-white mb-2">Customer Service</h4>
          <Link href="/" className="hover:text-emerald-500 transition">FAQ</Link>
          <Link href="/" className="hover:text-emerald-500 transition">Shipping & Returns</Link>
          <Link href="/" className="hover:text-emerald-500 transition">Support</Link>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-white mb-2">Newsletter</h4>
          <p className="text-gray-400">Subscribe to get the latest products and offers!</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-l-xl border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-r-xl transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-12 text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} FreshCart. All rights reserved.
      </div>
    </footer>
  );
}