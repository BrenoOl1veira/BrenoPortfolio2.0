import React from 'react';
import { motion } from 'framer-motion';

// Importa estilos globais, HOC de seção e funções de animação
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

// Importa assets (imagem de perfil e currículo)
import { logohero, curriculo } from '../assets';

/* 
  Estilos inline para o container principal da seção "About".
  - Flex para alinhar horizontalmente a imagem e o texto
  - maxWidth para limitar largura do container
  - margin auto para centralizar
*/
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '48rem', // equivalente a 3xl
  margin: '0 auto',
  marginTop: '10px',
  flexWrap: 'wrap', // Garante responsividade
};

/* 
  Estilos inline para a imagem de perfil
  - width/height fixos
  - borderRadius para bordas arredondadas
  - overflow escondendo partes que ultrapassam o círculo
*/
const imageStyle = {
  width: '300px',
  height: '300px',
  marginRight: '20px',
  borderRadius: '80px',
  overflow: 'hidden',
};

/* 
  Estilos inline para o container do texto
  - maxWidth limita a largura do texto
  - padding para espaçamento interno
*/
const textContainerStyle = {
  maxWidth: '48rem',
  padding: '20px',
};

const About = () => {
  return (
    <>
      {/* Cabeçalho da seção com animação */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Um pouco da minha trajetória
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Sobre Mim.
        </h2>
      </motion.div>

      <br />

      {/* Container principal: imagem + texto */}
      <div className='flex-auto' style={containerStyle}>
        {/* Imagem de perfil */}
        <div className='w-full md:w-1/2 flex justify-center' style={imageStyle}>
          <img
            src={logohero}
            alt="Minha Imagem"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Texto com animação */}
        <div className='w-full md:w-1/2' style={textContainerStyle}>
          <motion.p
            variants={fadeIn('', '', 0.1, 1)}
            className='text-secondary text-[17px] leading-[30px]'
          >
            Profissional com 2 anos de experiência na área de Tecnologia da Informação, atuando em Suporte Técnico, Infraestrutura e Sistemas. Atualmente, estou cursando Análise e Desenvolvimento de Sistemas, demonstrando meu compromisso com a constante busca por novos aprendizados e conhecimentos.
          </motion.p>

          {/* Botão para download do currículo */}
          <div className="flex items-center justify-center mt-4">
            <a href={curriculo} download>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center transition-colors">
                Currículo
                {/* Ícone de download */}
                <svg
                  className="ml-2"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.1"
                  viewBox="0 0 17 17"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g></g>
                  <path d="M17 16v1h-17v-1h17zM13.354 8.854l-0.707-0.707-3.646 3.646v-11.793h-1v11.794l-3.647-3.648-0.708 0.708 4.854 4.853 4.854-4.853z"></path>
                </svg>
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

// Exporta o componente com HOC SectionWrapper para layout e animações da seção
export default SectionWrapper(About, 'about');
