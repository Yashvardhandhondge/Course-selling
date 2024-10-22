import React, { useState, useEffect } from "react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    if (isDarkMode) {
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    }
  };

  return (
    <header className="w-full fixed top-0 z-50 bg-white dark:bg-stone-900">
      <div className="flex items-center justify-between py-2 px-4 sm:px-20">
        <button
          onClick={toggleDarkMode}
          className="bg-slate-100 p-2 rounded-xl transition-colors duration-200 hover:bg-slate-200 dark:bg-stone-800 dark:hover:bg-stone-700"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? <RiSunLine size={30} /> : <RiMoonFill size={25} />}
        </button>
      </div>
    </header>
  );
}
