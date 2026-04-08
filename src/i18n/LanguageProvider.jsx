import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, translations } from "./translations";

const STORAGE_KEY = "portfolio-language";
const LanguageContext = createContext(null);

const getInitialLocale = () => {
  if (typeof window === "undefined") return defaultLocale;

  const savedLocale = window.localStorage.getItem(STORAGE_KEY);
  if (savedLocale && translations[savedLocale]) return savedLocale;

  return navigator.language === "pt-BR" ? "pt-BR" : defaultLocale;
};

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(getInitialLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
    }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
};
