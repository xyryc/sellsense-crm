"use client";
import {
  BarChart,
  Box,
  Contact,
  CreditCard,
  Handshake,
  Headset,
  Heart,
  Home,
  Menu,
  Settings,
  ShoppingBag,
  UserPlus,
  Users,
  X
} from "lucide-react";
// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { useState } from "react";

// Sidebar demo routes with path and icon
const routes = [
  { name: "Dashboard", path: "/", icon: <Home size={20} /> },
  { name: "Orders", path: "/orders", icon: <ShoppingBag size={20} /> },
  { name: "Inventory", path: "/products", icon: <Box size={20} /> },
  { name: "Suppliers", path: "/suppliers", icon: <Handshake size={20} /> },
  { name: "Contacts", path: "/contacts", icon: <Contact size={20} /> },
  { name: "Customers", path: "/customers", icon: <Users size={20} /> },
  { name: "Analytics", path: "/analytics", icon: <BarChart size={20} /> },
  { name: "Payments", path: "/payments", icon: <CreditCard size={20} /> },
  { name: "Loyalty", path: "/loyalty", icon: <Heart size={20} /> },
  { name: "Referral", path: "/referral", icon: <UserPlus size={20} /> },
  { name: "Support", path: "/customer-support", icon: <Headset size={20} /> },
  { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname

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
         className={`
          bg-white dark:bg-gray-800
          transition-all duration-300 ease-in-out
          px-0 md:px-2
          overflow-y-auto
          ${open ? "fixed inset-0 z-50 w-64" : "w-0 fixed inset-0 z-50 md:relative md:w-64"}
          md:relative md:block md:h-screen
        `}
      >
        {/* Menu button for sidebar toggling */}
        <button
          className="p-4 relative left-52 md:hidden mt-1"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Main Logo */}
        <div
          className={`mt-4 text-center ${open ? "block" : "hidden md:block"}`}
        >
          <Link href={"/"} className="text-4xl font-bold text-cyan-500">
            SellSense
          </Link>
        </div>

        {/* Admin profile */}
        {/* <div
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
              <p className="text-xs text-gray-600 dark:text-gray-300">
                SellSense
              </p>
            </div>
          </div>
        </div> */}

        {/* Sidebar navigation */}
        <nav className="p-4">
          {routes.map((route) => (
            <Link
              key={route.name}
              href={route.path}
              className={`flex items-center p-3 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:translate-x-1 rounded-md ${
                pathname === route.path
                  ? "text-cyan-500 dark:text-cyan-600 font-bold" // Active route styling
                  : ""
              }`}
            >
              {route.icon}
              <span className={`${open ? "ml-3" : "hidden md:inline ml-3"}`}>
                {route.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Always visible menu button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? "" : <Menu size={40} />}
      </button>
    </>
  );
}
