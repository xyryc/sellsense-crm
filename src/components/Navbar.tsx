"use client";
import { useEffect, useState } from "react";
import {
  Bell,
  Headset,
  LogOut,
  MessageCircle,
  Moon,
  Search,
  Sun,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserIcon from "@/assets/user.jpg"
import { doLogout } from "@/action/auth";

export default function Navbar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Fetch theme from localStorage only on the client side
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setDarkMode(false);
    }
  }, []); // This useEffect runs only once when the component mounts

  // Set dark mode based on preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="h-16 py-3 md:py-0 bg-white dark:bg-gray-800 flex items-center justify-between px-6 md:px-2 shadow-md">
      {/* Search Box */}
      <div className="items-center hidden md:flex px-4">
        <Input
          type="search"
          placeholder="Search"
          className="border dark:bg-gray-700 w-[40vw] rounded-full pr-10"
        />
        <Button className="relative -left-12 bg-transparent dark:text-white text-black shadow-none hover:bg-transparent">
          <Search />
        </Button>
      </div>

      {/* Navbar Items */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Message Icon */}
        <MessageCircle />
        <Link
          href={"/customer-support"}
          className={`${pathname === "/customer-support"
            ? "text-cyan-500 dark:text-cyan-600 font-bold"
            : ""
            }`}
        >
          <Headset />
        </Link>

        {/* Notification Bell */}
        <Bell />

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              src={UserIcon}
              alt="user pfp"
              width={40}
              height={40}
              className="rounded-full border-2 border-cyan-500 cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            <DropdownMenuLabel>
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* My Profile */}
            <DropdownMenuItem>
              <Link
                href={"/profile"}
                className="flex items-center gap-1"
              >
                <User size={16} />Profile
              </Link>
            </DropdownMenuItem>
            {/* Log Out */}
            <DropdownMenuItem>
              <form action={doLogout}>
                <button type="submit" className="flex items-center gap-1">
                  <LogOut size={16} />
                  Logout
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
