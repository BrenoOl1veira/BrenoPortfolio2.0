import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

/**
 * ProjectCard
 * ----------------------------------------
 * Componente que renderiza um card de projeto padronizado.
 * - Layout em coluna (flex-col) para garantir altura consistente entre os cards.
 * - Área da imagem tem altura fixa (h-[230px]) para alinhar todas as thumbnails.
 * - Footer com tags e descrição tem espaçamento consistente.
 * 
 * Props:
 *  - index: número do item (utilizado para delay na animação)
 *  - name, description, tags, image, source_code_link: dados do projeto
 */
const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  return (
    // motion.div controla a animação de entrada (fadeIn para cima)
    <motion.div variants={fadeIn("up", "spring", index * 0.35, 0.75)}>
      
      {/*
        Tilt cria efeito 3D ao passar o mouse.
        - tiltMaxAngleX/Y: define o ângulo máximo de inclinação
        - perspective: profundidade do efeito 3D
        - scale: leve aumento no hover
        - transitionSpeed: velocidade da transição
        - gyroscope: permite movimento em dispositivos móveis
        - classes Tailwind: w-full para mobile, sm:w-[360px] largura fixa no desktop, bg-tertiary e p-5 para estilo do card
      */}
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        perspective={1000}
        scale={1.02}
        transitionSpeed={400}
        gyroscope={true}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        {/* Container do card em coluna */}
        <div className="flex flex-col h-full">
          
          {/* ==================== ÁREA DA IMAGEM ==================== */}
          <div className="relative w-full h-[230px] rounded-2xl overflow-hidden">
            {/* Imagem do projeto */}
            <img
              src={image}
              alt={`${name} screenshot`}
              className="w-full h-full object-cover"
            />

            {/*
              Botão flutuante no canto superior direito para abrir o código-fonte
              - pointer-events-none no overlay garante que apenas o botão seja clicável
              - pointer-events-auto no botão habilita clique
            */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-3 right-3 pointer-events-auto">
                <button
                  onClick={() => window.open(source_code_link, "_blank", "noopener,noreferrer")}
                  aria-label={`Open ${name} project source code on GitHub`}
                  className="bg-black/60 w-10 h-10 rounded-full flex justify-center items-center backdrop-blur-sm hover:scale-105 transition-transform"
                >
                  <img src={github} alt="github icon" className="w-5 h-5 object-contain" />
                </button>
              </div>
            </div>
          </div>

          {/* ==================== CONTEÚDO (TÍTULO + DESCRIÇÃO) ==================== */}
          {/* flex-1 garante que a área de descrição cresça e cards fiquem alinhados verticalmente */}
          <div className="mt-5 flex-1 flex flex-col">
            {/* Título do projeto */}
            <h3 className="text-white font-bold text-[20px] sm:text-[24px]">{name}</h3>

            {/*
              Descrição do projeto
              - mt-2: espaçamento do título
              - text-secondary: cor mais discreta
              - min-h-[56px]: altura mínima para manter consistência entre cards
            */}
            <p className="mt-2 text-secondary text-[14px] leading-relaxed min-h-[56px]">
              {description}
            </p>

            {/* ==================== TAGS ==================== */}
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={`${name}-${tag.name}`}
                  className={`text-[13px] ${tag.color} bg-transparent`}
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

/**
 * Works
 * ----------------------------------------
 * Seção que lista os projetos do desenvolvedor.
 * - SectionWrapper adiciona padding, margens e animação padrão de seção.
 * - Container dos cards usa flex-wrap para responsividade; em telas grandes cada card tem largura fixa.
 */
const Works = () => {
  return (
    <>
      {/* Título da seção com animação */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Welcome to my projects showcase!
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Projects.</h2>
      </motion.div>

      {/* Texto introdutório (opcional) */}
      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] text-center"
        >
          {/* Optional short description about the projects */}
        </motion.p>
      </div>

      {/* Grid/Wrap dos cards */}
      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          // Cada ProjectCard recebe index (para controlar delay da animação) e os dados
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "works");
