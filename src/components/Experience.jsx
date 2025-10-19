import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

import "react-vertical-timeline-component/style.min.css";

// Card individual da experiência
const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold leading-tight">
          {experience.title}
        </h3>
        <p
          className="text-secondary text-sm sm:text-base font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-4 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[13px] sm:text-[14px] pl-1 tracking-wide"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

// Seção principal de experiências
const Experience = () => {
  return (
    <>
      <motion.div
        variants={textVariant()}
        className="px-4 sm:px-6 md:px-0" // Garante padding lateral em mobile
      >
        <p
          className={`${styles.sectionSubText} text-center text-xs sm:text-sm md:text-base`}
        >
          What I have done so far
        </p>
        <h2
          className={`${styles.sectionHeadText} text-center text-xl sm:text-3xl md:text-4xl font-bold`}
        >
          Professional Experience
        </h2>
      </motion.div>

      <div className="mt-10 sm:mt-16 md:mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
