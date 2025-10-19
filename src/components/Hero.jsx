// Importa os estilos globais definidos em '../styles'
import { styles } from "../styles";

// Componente Hero: Seção inicial da página (geralmente chamada "Hero Section")
const Hero = () => {
  return (
    // Seção principal ocupa toda a tela (w-full, h-screen) e é posicionada relativamente
    <section className="relative w-full h-screen mx-auto">
      
      {/* 
        Container absoluto dentro da seção para posicionamento do conteúdo.
        inset-0: ocupa toda a área da seção
        top-[120px]: desloca o conteúdo 120px do topo
        max-w-7xl: largura máxima do container
        mx-auto: centraliza horizontalmente
        flex flex-row: organiza os elementos em linha
        items-start: alinha no topo
        gap-5: espaçamento entre elementos
        text-center: centraliza texto
      */}
      <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 text-center`}>

        {/* 
          Card de apresentação:
          - borderRadius: bordas arredondadas
          - backgroundColor: cor de fundo
          - padding: espaço interno
          - opacity: transparência
        */}
        <div style={{ borderRadius: '10px', backgroundColor: '#151030', padding: '20px', opacity: '70%' }}>
          
          {/* Título principal (nome) */}
          <h1 className={`${styles.heroHeadText}`}>
            Olá, Me chamo <span className='text-[#0000FF]'>Breno Oliveira</span>
          </h1>

          {/* Subtítulo (descrição) */}
          <p className={`${styles.heroSubText} mt-2 text-white-100 text-center text-xxs`}>
            Sou Analista de Sistemas<br className='sm:block hidden' />
          </p>

          {/* Ícones de redes sociais (LinkedIn e GitHub) */}
          <div className="mt-4 flex justify-center gap-4 text-2xl text-white">
            <i className='bx bxl-linkedin-square cursor-pointer hover:text-[#0A66C2] transition-colors'></i>
            <i className='bx bxl-github cursor-pointer hover:text-gray-400 transition-colors'></i>
          </div>
        </div>
      </div>
    </section>
  );
};

// Exporta o componente para uso em outras partes do projeto
export default Hero;
