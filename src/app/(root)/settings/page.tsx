"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Moon, Sun,  LogOut, } from "lucide-react";
import Link from "next/link";
const SettingsPage: React.FC = () => {
  const savedTheme = localStorage.getItem("theme");
  const [darkMode, setDarkMode] = useState(savedTheme === "dark");
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Toggle dark mode and save preference to localStorage
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="p-6  mx-auto space-y-6 ">
     <h1 className="text-2xl font-bold text-center">Settings</h1>
      <section className='space-y-6'>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
          <h2 className="text-lg font-semibold">Dark Mode</h2>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Account</h2>
        <p>Manage your account settings and security.</p>
      </div>

      {/* Notifications Settings */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
           
            className="hidden"
          />
          <div
            className={`w-10 h-5 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-all $ {
              notifications ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all $ {
                notifications ? "translate-x-5" : "translate-x-0"
              }`}
            ></div>
          </div>
        </label>
      </div>

      <div className="p-4 bg-red-100 dark:bg-red-800 rounded-lg shadow-md">
       
        <div className="flex items-center justify-end gap-2">
        <Link href={"/"} className="flex items-center gap-1  bg-red-500 px-4 py-2 rounded-xl text-white">
                <LogOut />
                Log Out
              </Link>
        </div>
      </div>
        
      </section>
      
    </div>
  );
};

export default SettingsPage;
