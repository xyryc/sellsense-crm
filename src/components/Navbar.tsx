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
          className={`${
            pathname === "/customer-support"
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
              src="https://wallpapers-clan.com/wp-content/uploads/2022/11/cute-frog-pfp-2.jpg"
              alt="user pfp"
              width={40}
              height={40}
              className="rounded-full border-2 border-cyan-500 cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            <DropdownMenuLabel className="text-lg">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* My Profile */}
            <DropdownMenuItem className="hover:scale-105 hover:translate-x-1 transition-all duration-300">
              <Link
                href={"/profile"}
                className="flex items-center gap-1 text-lg"
              >
                <User /> My Profile
              </Link>
            </DropdownMenuItem>
            {/* Log Out */}
            <DropdownMenuItem className="hover:scale-105 hover:translate-x-1 transition-all duration-300">
              <Link href={"/"} className="flex items-center gap-1 text-lg">
                <LogOut />
                Log Out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
