"use client";
import { Bell, MessageCircle, Moon, Search, Sun } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="h-16 bg-white dark:bg-gray-800 flex items-center justify-between px-6 md:px-0 shadow-md">
      {/* search box */}
      <div className="items-center border px-2 rounded-full hidden md:flex">
        <Search />
        <input
          type="search"
          name=""
          id=""
          className="rounded-full p-2 focus:outline-none"
        />
      </div>

      {/* nav items */}
      <div className="flex items-center gap-3 ml-auto">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <MessageCircle />
        <Bell />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div>
              <Image
                src={
                  "https://wallpapers-clan.com/wp-content/uploads/2022/11/cute-frog-pfp-2.jpg"
                }
                alt="user pfp"
                width={40}
                height={40}
                className="rounded-full border-2 border-cyan-500 cursor-pointer"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:scale-105 hover:translate-x-1 transition-all duration-300">
              <Link href={"/my-profile"}>My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:scale-105 hover:translate-x-1 transition-all duration-300">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
