"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { translations, type Language, type TranslationDictionary } from "./translations";
import { BRAND } from "@/lib/constants/brand";

interface LanguageContextType {
  language: Language;
  lang: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
}

const STORAGE_KEY = "vadhu_var_selected_lang";

const LanguageContext = createContext<LanguageContextType>({
  language: "mr",
  lang: "mr",
  setLanguage: () => {},
  t: translations.mr,
});


export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("mr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved && (saved === "mr" || saved === "en")) {
        setLanguageState(saved);
        document.documentElement.lang = saved;
        document.documentElement.setAttribute("data-lang", saved);
      } else {
        setLanguageState("mr");
        document.documentElement.lang = "mr";
        document.documentElement.setAttribute("data-lang", "mr");
      }
    } catch {
      // localStorage not accessible
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
      document.documentElement.setAttribute("data-lang", lang);
    } catch {
      // Ignore storage errors
    }
  };

  const t = useMemo(() => {
    return (translations[language] || translations.mr) as unknown as TranslationDictionary;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, lang: language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>

  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

interface LanguageSwitcherProps {
  variant?: "pill" | "subtle" | "minimal";
  className?: string;
}

export function LanguageSwitcher({
  variant = "pill",
  className = "",
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selector"
      className={`inline-flex items-center rounded-full p-0.5 border border-[var(--line)] bg-[var(--surface)] text-xs font-medium tracking-tight shadow-2xs ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage("mr")}
        className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          language === "mr"
            ? "bg-[var(--accent)] text-[#FAF7F2] font-semibold shadow-xs"
            : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
        }`}
        aria-pressed={language === "mr"}
      >
        मराठी
      </button>
      <span className="text-[var(--line)] select-none px-0.5">|</span>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          language === "en"
            ? "bg-[var(--accent)] text-[#FAF7F2] font-semibold shadow-xs"
            : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
        }`}
        aria-pressed={language === "en"}
      >
        English
      </button>
    </div>
  );
}
