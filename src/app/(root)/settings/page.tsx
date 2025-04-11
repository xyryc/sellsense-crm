"use client";

import { useEffect, useState } from "react";
import React from "react";
import { Moon, Sun, LogOut } from "lucide-react";
import Link from "next/link";

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [mounted, setMounted] = useState(false); // Prevent flicker

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);

    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const savedNotifications = localStorage.getItem("notifications") === "true";
    setNotifications(savedNotifications);

    setMounted(true); // Done mounting
  }, []);

  useEffect(() => {
    if (!mounted) return; // Prevent flicker
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode, mounted]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const toggleNotifications = () => {
    const newNotificationsState = !notifications;
    setNotifications(newNotificationsState);
    localStorage.setItem("notifications", String(newNotificationsState));
  };

  // ⛔ Don't render until mounted
  if (!mounted) return null;

  return (
    <div className="p-6 mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Settings</h1>
      <section className="space-y-6">
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

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={toggleNotifications}
              className="hidden"
            />
            <div
              className={`w-10 h-5 flex items-center rounded-full p-1 transition-all ${
                notifications ? "bg-green-500" : "bg-gray-400 dark:bg-gray-600"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${
                  notifications ? "translate-x-5" : "translate-x-0"
                }`}
              ></div>
            </div>
          </label>
        </div>

        <div className="p-4 bg-red-100 dark:bg-red-800 rounded-lg shadow-md">
          <div className="flex items-center justify-end gap-2">
            <Link
              href={"/"}
              className="flex items-center gap-1 bg-red-500 px-4 py-2 rounded-xl text-white"
            >
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
