import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { LanguageProvider } from "./i18n/LanguageProvider.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// StrictMode ajuda a encontrar efeitos colaterais incorretos durante o
// desenvolvimento. LanguageProvider envolve todo o site porque qualquer secao
// pode precisar ler ou trocar os textos no idioma selecionado.
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
