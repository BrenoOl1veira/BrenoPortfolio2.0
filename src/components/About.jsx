import React from 'react';
import { motion } from 'framer-motion';
// Importa estilos globais, HOC da seção e funções de animação
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
// Importa os assets: imagem de perfil e arquivo de currículo
import { logohero, curriculo } from '../assets';

/* 
  Estilos inline para o container principal da seção "About".
  - display: flex => alinha horizontalmente a imagem e o texto
  - alignItems: center => centraliza verticalmente os itens
  - justifyContent: center => centraliza horizontalmente o conjunto
  - maxWidth: 72rem (1152px) => permite mais espaço para o texto no desktop
  - margin: centraliza o container horizontalmente
  - marginTop: 10px => cria espaçamento em relação ao topo da seção
  - flexWrap: wrap => garante que em telas menores os elementos fiquem empilhados
*/
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '72rem',
  margin: '0 auto',
  marginTop: '10px',
  flexWrap: 'wrap',
};

/* 
  Estilos inline para a imagem de perfil
  - width / height: define o tamanho fixo da imagem
  - marginRight: cria espaçamento entre imagem e texto
  - borderRadius: bordas arredondadas para efeito visual agradável
  - overflow: esconde qualquer parte que ultrapasse o contorno
  - flexShrink: 0 => impede que a imagem encolha em telas menores
*/
const imageStyle = {
  width: '300px',
  height: '300px',
  marginRight: '20px',
  borderRadius: '80px',
  overflow: 'hidden',
  flexShrink: 0,
};

/* 
  Estilos inline para o container de texto
  - padding: cria espaçamento interno ao redor do texto
  - não limitamos largura para permitir que o texto ocupe espaço máximo disponível
*/
const textContainerStyle = {
  padding: '20px',
};

const About = () => {
  return (
    <>
      {/* 
        Cabeçalho da seção com animação
        - motion.div: permite animar o componente com framer-motion
        - textVariant(): animação de entrada do texto
      */}
      <motion.div variants={textVariant()}>
        {/* Subtítulo da seção */}
        <p className={`${styles.sectionSubText} text-center`}>
          A little about my journey
        </p>
        {/* Título principal */}
        <h2 className={`${styles.sectionHeadText} text-center`}>
          About Me
        </h2>
      </motion.div>

      <br />

      {/* 
        Container principal que engloba imagem e texto
        - flex-auto: permite flexibilidade de tamanho
        - style={containerStyle}: aplica os estilos definidos acima
      */}
      <div className='flex-auto' style={containerStyle}>
        
        {/* 
          Container da imagem de perfil
          - w-full: largura total em mobile
          - md:w-auto: largura automática no desktop
          - flex justify-center: centraliza a imagem horizontalmente
          - style={imageStyle}: aplica os estilos definidos acima
        */}
        <div
          className='w-full md:w-auto flex justify-center'
          style={imageStyle}
        >
          <img
            src={logohero}
            alt="Profile Image"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* 
          Container do texto
          - w-full: largura total em mobile
          - md:flex-1: ocupa o espaço restante no desktop
          - style={textContainerStyle}: aplica padding interno
        */}
        <div 
          className='w-full md:flex-1'
          style={textContainerStyle}
        >
          {/* 
            Parágrafo animado
            - fadeIn(): animação de entrada do texto
            - className: define cores, tamanho e espaçamento do texto
          */}
          <motion.p
            variants={fadeIn('', '', 0.1, 1)}
            className='text-secondary text-[17px] leading-[30px]'
          >
            I am a data professional with solid experience in automation,
            integration, and data analysis. My career began in IT infrastructure
            and evolved into the development, implementation, and support of
            ERP systems, with a focus on process optimization and data
            management—especially within the TOTVS Protheus and RM systems. I
            have extensive knowledge of TOTVS RM and Protheus processes related
            to financial management, accounting, purchasing, inventory, human
            resources, and global services, ensuring efficiency and reliability
            in business operations. I develop customized reports and automated
            routines in RM and Protheus, also working on process automation
            using C# and Python. I have experience in building ETL processes and
            data integrations for Data Warehouse environments, as well as
            system integrations using REST and SOAP APIs. I also have expertise
            in developing interactive dashboards with Power BI and SQL queries.
            My approach combines technical expertise with strategic vision,
            translating complex data into clear, actionable insights that drive
            innovation and growth. I am constantly seeking new challenges and
            technologies to expand my impact in the data field.
          </motion.p>
          
          {/* 
            Botão para download do currículo
            - a tag <a> com download habilitado permite baixar o arquivo
            - button: estilizado com cores, padding, bordas arredondadas e efeito hover
            - svg: ícone de seta indicando download
          */}
          <div className="flex items-center justify-center mt-4">
            <a href={curriculo} download>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center transition-colors">
                Resume
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
