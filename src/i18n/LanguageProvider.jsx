import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, translations } from "./translations";

const STORAGE_KEY = "portfolio-language";
const LanguageContext = createContext(null);

/**
 * Escolhe o idioma inicial. Primeiro respeita a escolha salva no navegador;
 * se nao houver escolha, usa portugues para qualquer navegador em portugues
 * (pt, pt-BR, pt-PT) e ingles como alternativa. Esta regra pode ser alterada
 * sem mexer nas telas.
 */
const getInitialLocale = () => {
  if (typeof window === "undefined") return defaultLocale;

  // localStorage pode lancar erro em aba anonima ou com cookies bloqueados;
  // nesse caso o site segue funcionando, so nao lembra a escolha.
  try {
    const savedLocale = window.localStorage.getItem(STORAGE_KEY);
    if (savedLocale && translations[savedLocale]) return savedLocale;
  } catch {
    // ignora e usa o idioma do navegador
  }

  return navigator.language?.toLowerCase().startsWith("pt") ? "pt-BR" : defaultLocale;
};

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(getInitialLocale);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // sem armazenamento disponivel; a escolha vale so para esta visita
    }
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

/**
 * Hook usado pelos componentes para obter idioma, funcao de troca e textos.
 * O erro fora do provider e proposital: ele avisa o desenvolvedor que esqueceu
 * de envolver o componente com LanguageProvider em main.jsx.
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
};
