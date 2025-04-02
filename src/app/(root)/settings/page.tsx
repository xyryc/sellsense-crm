"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Moon, Sun } from "lucide-react";
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
    <div className="settings-page">
      <h1>Settings</h1>
      <section>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
          <h2 className="text-lg font-semibold">Dark Mode</h2>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        {/* Add profile settings form or components here */}
      </section>
      <section>
        <h2>Account</h2>
        <p>Manage your account settings and security.</p>
        {/* Add account settings form or components here */}
      </section>
      <section>
        <h2>Notifications</h2>
        <p>Configure your notification preferences.</p>
        {/* Add notification settings form or components here */}
      </section>
    </div>
  );
};

export default SettingsPage;
