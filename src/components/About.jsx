import React from 'react';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const containerStyle = {
  display: 'flex',
  alignItems: 'center', // Centraliza verticalmente
  justifyContent: 'center', // Centraliza horizontalmente
  maxWidth: '3xl',
  margin: '0 auto', // Centraliza horizontalmente
  marginTop: '10px', // Ajuste a margem superior conforme desejado
};

const imageStyle = {
  width: '300px',
  height: '300px',
  marginRight: '20px', // Ajuste a margem direita conforme desejado
  alignSelf: 'center', // Centraliza verticalmente a imagem
  borderRadius: '80px', // Arredonda a imagem
  overflow: 'hidden', // Esconda qualquer parte da imagem que esteja fora do círculo
};

const textContainerStyle = {
  maxWidth: '3xl',
  padding: '20px', // Ajuste o padding conforme desejado
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Sobre Mim.</h2>
      </motion.div>

<div className='flex-auto flex flex-wrap' style={containerStyle}>
  <div className='w-full md:w-1/2' style={imageStyle}>
    <img src="./src/assets/LOGO BRENO.png" alt="Minha Imagem" style={{ width: '100%', height: '100%' }} />
  </div>
  <div className='w-full md:w-1/2' style={textContainerStyle}>
    <motion.p
      variants={fadeIn('', '', 0.1, 1)}
      className='text-secondary text-[17px] leading-[30px]'
    >
      Profissional com 2 anos de experiência na área de Tecnologia da Informação, atuando em Suporte Técnico, Infraestrutura e Sistemas. Atualmente, estou cursando Análise e Desenvolvimento de Sistemas, demonstrando meu compromisso com a constante busca por novos aprendizados e conhecimentos.
      <br />
      <div className="flex items-center justify-center mt-4">
        <a href="./src/assets/curriculo/Curriculo Breno Juan De Oliveira Pinto.pdf" download>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
            Currículo
            <svg className="ml-2" stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 17 17" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <g></g>
              <path d="M17 16v1h-17v-1h17zM13.354 8.854l-0.707-0.707-3.646 3.646v-11.793h-1v11.794l-3.647-3.648-0.708 0.708 4.854 4.853 4.854-4.853z"></path>
            </svg>
          </button>
        </a>
      </div>
    </motion.p>
  </div>
</div>

    </>
  );
};

export default SectionWrapper(About, 'about');
