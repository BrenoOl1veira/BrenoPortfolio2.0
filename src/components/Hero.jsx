import { styles } from "../styles";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col items-center gap-5 text-center`}>
        
        {/* Card de apresentação */}
        <div style={{ borderRadius: '10px', backgroundColor: '#151030', padding: '20px', opacity: 0.85 }}>
          
          {/* Título */}
          <h1 className={`${styles.heroHeadText}`}>
            Hello, I’m <span className='text-[#0000FF]'>Breno Oliveira</span>
          </h1>

          {/* Subtítulo */}
          <p className={`${styles.heroSubText} mt-2 text-white text-center text-sm`}>
            System Analyst
          </p>

          {/* Ícones de redes sociais */}
          <div className="mt-4 flex justify-center gap-4 text-2xl text-white">
            <i className='bx bxl-linkedin-square cursor-pointer hover:text-[#0A66C2] transition-colors'></i>
            <i className='bx bxl-github cursor-pointer hover:text-gray-400 transition-colors'></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
