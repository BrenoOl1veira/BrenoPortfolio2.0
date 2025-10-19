import React from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";

/**
 * Componente: Tech
 * ----------------------------------------
 * Esta seção exibe as tecnologias/habilidades do desenvolvedor em formato de "bolas" 3D.
 * Cada ícone é renderizado pelo componente BallCanvas, que usa Three.js para o efeito dinâmico.
 * A lista de tecnologias é carregada a partir do arquivo constants/index.js.
 */
const Tech = () => {
  return (
    // Container principal da seção
    <section className="w-full text-center">
      {/* ====== TÍTULOS ====== */}
      <div className="mb-10">
        {/* Subtítulo da seção */}
        <p className={`${styles.sectionSubText} text-center`}>
          Um pouco das minhas habilidades
        </p>

        {/* Título principal */}
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Habilidades
        </h2>
      </div>

      {/* ====== LISTA DE TECNOLOGIAS ====== */}
      {/**
       * Flex container que organiza os ícones de forma responsiva:
       * - `flex-wrap`: permite quebrar linha se houver muitas tecnologias.
       * - `justify-center`: centraliza o conteúdo horizontalmente.
       * - `gap-10`: espaçamento uniforme entre os itens.
       * - `max-w-5xl mx-auto`: limita a largura máxima para evitar que os ícones se espalhem demais.
       */}
      <div className="flex flex-row flex-wrap justify-center gap-10 max-w-5xl mx-auto">
        {technologies.map((technology) => (
          <div
            key={technology.name}
            className="flex flex-col items-center justify-center w-28 h-28"
          >
            {/* 
              BallCanvas: componente 3D com animação de rotação.
              Props:
              - icon: caminho da imagem (ícone da tecnologia)
            */}
            <BallCanvas icon={technology.icon} />

            {/* 
              Nome da tecnologia (visível embaixo do ícone)
              - `text-sm text-white/80` para aparência discreta.
              - `mt-2` cria espaçamento entre o ícone e o texto.
            */}
            <p
              className="text-sm text-white/80 mt-2 font-medium tracking-wide"
              aria-label={`Tecnologia: ${technology.name}`}
            >
              {technology.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

// SectionWrapper adiciona padding, margens e animação padrão de seção
export default SectionWrapper(Tech, "tech");
