import React, { use } from "react";
import { ThemeContext } from "../../Provider/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = use(ThemeContext);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={`btn btn-ghost btn-sm ${className}`}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      <span className="ml-2 hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}