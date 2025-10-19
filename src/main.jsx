import React from 'react'; // Importa o React para usar JSX
import ReactDOM from 'react-dom/client'; // Importa o ReactDOM moderno (v18+) para renderizar a aplicação
import App from './App.jsx'; // Importa o componente raiz da aplicação
import './index.css'; // Importa estilos globais da aplicação

// Seleciona o elemento HTML com id 'root' e cria a raiz do React
// O React 18 usa createRoot ao invés de ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza a aplicação dentro do StrictMode
// StrictMode ajuda a detectar problemas e efeitos colaterais durante o desenvolvimento
root.render(
  <React.StrictMode>
    <App /> {/* Componente raiz da aplicação */}
  </React.StrictMode>
);
