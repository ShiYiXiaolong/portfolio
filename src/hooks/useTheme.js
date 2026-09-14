import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("ln_theme");
    if (saved) return saved;
    // Respect system preference
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    localStorage.setItem("ln_theme", theme);
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
}
