"use client"
import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="h-16 bg-white dark:bg-gray-800 flex items-center justify-between px-6 shadow-md">
      <span className="text-lg font-semibold ml-5 md:ml-0">CRM Dashboard</span>
      <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}