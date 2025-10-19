import { useState, useRef, Suspense } from "react";
// Importa Canvas e hooks do React Three Fiber
import { Canvas, useFrame } from "@react-three/fiber";
// Importa componentes auxiliares do drei para pontos e pré-carregamento
import { Points, PointMaterial, Preload } from "@react-three/drei";
// Importa funções de geração aleatória de posições
import * as random from "maath/random/dist/maath-random.esm";

/**
 * Componente Stars
 * Renderiza um conjunto de pontos 3D representando estrelas
 */
const Stars = (props) => {
  const ref = useRef();

  // Cria posições aleatórias dentro de uma esfera usando maath/random
  // useState garante que os pontos são gerados apenas uma vez
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  // Anima a rotação do grupo de estrelas a cada frame
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;  // Rotação lenta no eixo X
      ref.current.rotation.y -= delta / 15;  // Rotação lenta no eixo Y
    }
  });

  return (
    // Grupo de estrelas rotacionado inicialmente em 45 graus no eixo Z
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"        // Cor das estrelas
          size={0.002}           // Tamanho de cada ponto
          sizeAttenuation={true} // Pontos menores à medida que se afastam da câmera
          depthWrite={false}     // Evita conflitos de depth buffer
        />
      </Points>
    </group>
  );
};

/**
 * Componente StarsCanvas
 * Renderiza o Canvas 3D completo com o fundo de estrelas
 */
const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      {/* Canvas do React Three Fiber */}
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* Suspense garante fallback enquanto os assets carregam */}
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        {/* Preload carrega todos os assets para otimizar performance */}
        <Preload all />
      </Canvas>
    </div>
  );
};

// Exporta o componente para uso em qualquer parte da aplicação
export default StarsCanvas;
