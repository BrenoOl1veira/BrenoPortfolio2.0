import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { useMediaQuery } from 'react-responsive';
import { EarthCanvas } from "./canvas";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 600 });

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 text-center`}>
        <div style={{ borderRadius: '10px', backgroundColor: '#151030', padding: '20px', opacity: '70%' }}>
          <h1 className={`${styles.heroHeadText}`}>
            Olá, Me chamo <span className='text-[#0000FF]'>Breno Oliveira</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100 text-center text-xxs`}>
            Sou Analista de Sistemas<br className='sm:block hidden' />
          </p>
          <div> <i className='bx bxl-linkedin-square'></i> <i className='bx bxl-github' ></i> </div>
        </div>
      </div>

      {/* Renderiza o ComputersCanvas apenas se não estiver em um dispositivo móvel */}
      {!isMobile && <ComputersCanvas />}
    </section>
  );
};

export default Hero;
