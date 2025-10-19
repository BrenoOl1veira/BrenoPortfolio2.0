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
 *
 * Componente que renderiza um card de projeto padronizado.
 * - A estrutura usa flex column para garantir que todos os cards fiquem com altura consistente.
 * - A área da imagem tem altura fixa (h-[230px]) para alinhar todas as thumbnails.
 * - O footer (tags) e a descrição usam espaçamento consistente.
 *
 * Props:
 *  - index: número do item (usado na animação)
 *  - name, description, tags, image, source_code_link: dados do projeto
 */
const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  return (
    // motion.div controla a animação de entrada (fadeIn para cima)
    <motion.div variants={fadeIn("up", "spring", index * 0.35, 0.75)}>
      {/* 
        Tilt cria um leve efeito 3D ao passar o mouse.
        - Usamos props (tiltMaxAngleX/Y, scale, transitionSpeed) para compatibilidade.
        - Classe base padronizada: largura fixa em telas maiores e largura total em telas pequenas.
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
        {/* Container do card com layout em coluna (garante consistência) */}
        <div className="flex flex-col h-full">
          {/* ==================== ÁREA DA IMAGEM ==================== */}
          <div className="relative w-full h-[230px] rounded-2xl overflow-hidden">
            {/* Imagem do projeto */}
            <img
              src={image}
              alt={`${name} screenshot`}
              className="w-full h-full object-cover"
            />

            {/* Botão flutuante no canto superior direito para abrir o código-fonte */}
            <div className="absolute inset-0 pointer-events-none">
              {/* pointer-events-none no overlay permite que apenas o botão receba clique */}
              <div className="absolute top-3 right-3 pointer-events-auto">
                <button
                  onClick={() => window.open(source_code_link, "_blank", "noopener,noreferrer")}
                  aria-label={`Abrir código do projeto ${name} no GitHub`}
                  className="bg-black/60 w-10 h-10 rounded-full flex justify-center items-center backdrop-blur-sm hover:scale-105 transition-transform"
                >
                  <img src={github} alt="github icon" className="w-5 h-5 object-contain" />
                </button>
              </div>
            </div>
          </div>

          {/* ==================== CONTEÚDO (TÍTULO + DESCRIÇÃO) ==================== */}
          {/* flex-1 faz com que a área de descrição cresça e mantenha os cards alinhados verticalmente */}
          <div className="mt-5 flex-1 flex flex-col">
            <h3 className="text-white font-bold text-[20px] sm:text-[24px]">{name}</h3>

            {/* 
              Para manter os cards padronizados, limitamos a área de descrição com min-height.
              Isso evita que cards com poucas linhas fiquem visualmente menores que outros.
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
 *
 * Seção que lista os projetos. Uso do SectionWrapper para animação e espaçamento global.
 * O container dos cards usa flex-wrap para responsividade; em telas grandes cada card tem largura fixa.
 */
const Works = () => {
  return (
    <>
      {/* Título da seção com animação */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Bem-vindo à sessão dedicada aos meus projetos!
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Projetos.</h2>
      </motion.div>

      {/* Texto introdutório (opcional) */}
      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          {/* Aqui você pode colocar uma descrição curta da seção, se desejar */}
        </motion.p>
      </div>

      {/* Grid/Wrap dos cards */}
      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          // Cada ProjectCard recebe index (para controlar o delay da animação) e os dados
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "works");
