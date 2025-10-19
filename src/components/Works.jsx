import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

/* ========================================================
   ProjectCard
   --------------------------------------------------------
   Componente que renderiza um card de projeto padronizado
   - Tilt para efeito 3D em desktop
   - motion.div para animação de entrada
   - Lazy load nas imagens
   - Memoizado para evitar re-renders desnecessários
======================================================== */
const ProjectCard = React.memo(({ index, name, description, tags, image, source_code_link }) => {
  return (
    <motion.div
      // Animação de entrada para cada card
      variants={fadeIn("up", "spring", index * 0.2, 0.6)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }} // anima apenas quando entra na tela
    >
      {/* Efeito Tilt 3D */}
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        perspective={1000}
        scale={1.02}
        transitionSpeed={400}
        gyroscope={true}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
        tiltEnable={typeof window !== "undefined" && window.innerWidth >= 640} // desativa tilt em mobile
      >
        <div className="flex flex-col h-full">
          
          {/* ==================== ÁREA DA IMAGEM ==================== */}
          <div className="relative w-full h-[230px] rounded-2xl overflow-hidden">
            <img
              src={image}
              alt={`${name} screenshot`}
              className="w-full h-full object-cover"
              loading="lazy" // carrega a imagem apenas quando visível
            />

            {/* Botão GitHub no canto superior direito */}
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
          <div className="mt-5 flex-1 flex flex-col">
            <h3 className="text-white font-bold text-[20px] sm:text-[24px]">{name}</h3>

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
});

/* ========================================================
   Works
   --------------------------------------------------------
   Componente que lista todos os projetos
   - Animações de entrada usando Framer Motion
   - Grid responsivo usando flex-wrap
======================================================== */
const Works = () => {
  return (
    <>
      {/* Título da seção */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Welcome to my projects showcase!
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Projects.</h2>
      </motion.div>

      {/* Texto introdutório opcional */}
      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] text-center"
        >
          {/* Optional short description */}
        </motion.p>
      </div>

      {/* Grid de cards */}
      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

/* ========================================================
   Export
   --------------------------------------------------------
   SectionWrapper adiciona padding, animação de seção
======================================================== */
export default SectionWrapper(Works, "works");
