import React from "react";
// Importa o timeline vertical e seus elementos do pacote
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
// Importa animações do Framer Motion
import { motion } from "framer-motion";

// Importa estilos globais, dados de experiência, HOC de seção e animações
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

// Importa estilos CSS do timeline vertical
import "react-vertical-timeline-component/style.min.css";

/**
 * Componente ExperienceCard
 * ----------------------------------------
 * Renderiza cada experiência individual dentro do VerticalTimeline
 * - Recebe como prop o objeto `experience`
 * - Utiliza VerticalTimelineElement para cada item da timeline
 */
const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      // Estilos do conteúdo da timeline
      contentStyle={{
        background: "#1d1836", // Fundo escuro
        color: "#fff",          // Texto branco
      }}
      // Estilo da seta do conteúdo
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      // Data da experiência
      date={experience.date}
      // Estilo do ícone
      iconStyle={{ background: experience.iconBg }}
      // Ícone personalizado dentro do círculo
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}                     // Caminho do ícone
            alt={experience.company_name}             // Acessibilidade
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      {/* Conteúdo do card */}
      <div>
        {/* Título da posição ou cargo */}
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        {/* Nome da empresa */}
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      {/* Lista de responsabilidades ou conquistas */}
      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}      // Key única para cada item
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}                                  // Texto visível (em inglês)
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

/**
 * Componente Experience
 * ----------------------------------------
 * Renderiza toda a seção de experiências profissionais
 * - Usa SectionWrapper para layout, espaçamento e animações padrão de seção
 * - Inclui animação do cabeçalho via Framer Motion
 * - Itera sobre o array `experiences` para criar ExperienceCard para cada item
 */
const Experience = () => {
  return (
    <>
      {/* Cabeçalho da seção com animação */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Professional Experience
        </h2>
      </motion.div>

      {/* Timeline vertical */}
      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {/* Itera sobre o array de experiências e cria um card para cada */}
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`} // Key única para React
              experience={experience}      // Passa os dados da experiência
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

// Exporta o componente com o HOC SectionWrapper para layout e animações da seção
export default SectionWrapper(Experience, "work");
