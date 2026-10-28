/** @type {import('tailwindcss').Config} */
// As cores e fontes seguem o hub obrenin.dev: fundo escuro com grade de
// pontos, acento laranja, fonte em pixel e sombras "duras" deslocadas.
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#141413",
        dot: "#23221f",
        fg: "#faf9f5",
        muted: "#b0aea5",
        line: "#33312c",
        panel: "#1b1a18",
        accent: "#d97757",
        "accent-dark": "#b85f3f",
        soft: "#e39a7a",
        eye: "#1a1412",
      },
      fontFamily: {
        px: ['"Silkscreen"', "ui-monospace", '"Cascadia Mono"', "Consolas", "monospace"],
        mono: ['"JetBrains Mono"', "ui-monospace", '"Cascadia Mono"', "Consolas", "monospace"],
      },
      boxShadow: {
        px: "4px 4px 0 #33312c",
        "px-sm": "3px 3px 0 #33312c",
        "px-lg": "6px 6px 0 #33312c",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
