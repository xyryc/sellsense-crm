"use client";
import { useState } from "react";
import { Menu, X, Home, Settings, Users, ShoppingBag, Box, Tag, BarChart, Gift, CreditCard, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Sidebar demo routes with path and icon
const routes = [
    { name: "Dashboard", path: "/", icon: <Home size={20} /> },
    { name: "Orders", path: "/orders", icon: <ShoppingBag size={20} /> },
    { name: "Products", path: "/products", icon: <Box size={20} /> },
    { name: "Categories", path: "/categories", icon: <Tag size={20} /> },
    { name: "Customers", path: "/customers", icon: <Users size={20} /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart size={20} /> },
    { name: "Promotions", path: "/promotions", icon: <Gift size={20} /> },
    { name: "Payments", path: "/payments", icon: <CreditCard size={20} /> },
    { name: "Inventory", path: "/inventory", icon: <Package size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];
  

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Overlay for closing sidebar */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div
        className={`fixed md:relative bg-white dark:bg-gray-800 h-full transition-all duration-300 ease-in-out px-0 md:px-2 ${
          open ? "w-64" : "w-0 md:w-64"
        }`}
      >
        {/* Menu button for sidebar toggling */}
        <button className="p-4 md:hidden mt-1" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Main Logo */}
        <div
          className={`p-4 text-center ${open ? "block" : "hidden md:block"}`}
        >
          <Link href={"/"} className="text-4xl font-bold text-cyan-500">
            SellSense
          </Link>
        </div>

        {/* Admin profile */}
        <div
          className={`pl-7 bg-gray-200 dark:bg-gray-700 py-2 rounded-md ${
            open ? "block" : "hidden md:block"
          }`}
        >
          <div className="flex items-center gap-2">
            <Image
              src={"https://avatarfiles.alphacoders.com/322/322784.png"}
              alt="admin pfp"
              width={48}
              height={48}
              className="rounded-xl border-2 border-cyan-500"
            />
            <div>
              <h3 className="font-semibold">Super Admin</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">SellSense</p>
            </div>
          </div>
        </div>

        {/* Sidebar navigation */}
        <nav className="p-4 space-y-4">
          {routes.map((route) => (
            <Link
              key={route.name}
              href={route.path}
              className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            >
              {route.icon}
              <span className={`${open ? "ml-3" : "hidden md:inline ml-3"}`}>
                {route.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
