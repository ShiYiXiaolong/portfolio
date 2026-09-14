import { useState, useEffect } from "react";
import en from "../translations/en";
import de from "../translations/de";
import zh from "../translations/zh";

const translations = { en, de, zh };

// Map browser language codes to our supported languages
function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.languages?.[0] || "en";
  const code = browserLang.toLowerCase();

  if (code.startsWith("de")) return "de";
  if (code.startsWith("zh")) return "zh";
  return "en"; // default fallback
}

export function useLanguage() {
  const [lang, setLang] = useState(() => {
    // Check localStorage first (user previously selected a language)
    const saved = localStorage.getItem("ln_lang");
    if (saved && translations[saved]) return saved;
    // Otherwise detect from browser
    return detectBrowserLanguage();
  });

  // Persist user choice
  useEffect(() => {
    localStorage.setItem("ln_lang", lang);
    // Set html lang attribute for accessibility and SEO
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  return { lang, setLang, t };
}
