// Importa componentes do pacote @react-three/drei
// Html: Permite renderizar elementos HTML dentro do canvas 3D
// useProgress: Hook que fornece o progresso de carregamento de assets
import { Html, useProgress } from "@react-three/drei";

// Componente funcional que mostra um loader enquanto os assets do canvas carregam
const CanvasLoader = () => {
  // useProgress retorna o progresso do carregamento em porcentagem
  const { progress } = useProgress();

  return (
    // Html funciona como um "portal" HTML dentro do canvas 3D
    <Html
      as="div"        // Tipo do elemento HTML que será renderizado (div)
      center          // Centraliza o HTML dentro do canvas
      style={{
        display: "flex",             // Usamos flexbox para layout
        justifyContent: "center",    // Centraliza horizontalmente
        alignItems: "center",        // Centraliza verticalmente
        flexDirection: "column",     // Alinha elementos verticalmente
      }}
    >
      {/* 
        Loader animado. 
        Pode ser um spinner CSS ou animação personalizada.
        Aqui assumimos que a classe 'canvas-loader' está definida em CSS. 
      */}
      <span className="canvas-loader"></span>

      {/* 
        Mostra o progresso do carregamento.
        toFixed(2) limita o número de casas decimais para duas.
      */}
      <p
        style={{
          fontSize: 14,        // Tamanho da fonte em pixels
          color: "#F1F1F1",    // Cor do texto
          fontWeight: 800,      // Negrito
          marginTop: 40,        // Espaçamento acima do texto
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default CanvasLoader;
