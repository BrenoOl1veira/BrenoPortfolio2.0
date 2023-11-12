import React from "react";
import { useMediaQuery } from "react-responsive";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Adjust the maxWidth as needed

  return (
    <div className='text-center'>
      <h1 className='text-2xl font-bold mb-4'>HABILIDADES</h1>
      <div className={`flex flex-row flex-wrap justify-center gap-10 ${isMobile ? 'mobile-view' : ''}`}>
        {technologies.map((technology) => (
          <div className={`w-28 h-28 ${isMobile ? 'mobile-ball' : ''}`} key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
