import { useEffect, useState } from "react";

const ThemeToggleButton = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-800 border-2 border-orange-500 dark:border-orange-400 shadow-2xl rounded-full w-14 h-14 flex items-center justify-center transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={() => setDark((d) => !d)}
      aria-label="Alternar tema"
      type="button"
    >
      {dark ? (
        // Ícone Lua
        <svg
          className="w-7 h-7 text-orange-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
          />
        </svg>
      ) : (
        // Ícone Sol
        <svg
          className="w-7 h-7 text-orange-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth={2} />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggleButton;
