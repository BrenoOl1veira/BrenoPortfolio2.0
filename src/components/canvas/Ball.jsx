import React, { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, Preload, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader"; // Certifique-se que o caminho está correto
import * as THREE from 'three'; // Importe THREE para dispose

// Componente Ball (Ajustado)
const Ball = ({ imgUrl }) => {
  // Carrega a textura usando useTexture (já lida com Suspense)
  const [decal] = useTexture([imgUrl]);
  const meshRef = useRef();

  // Efeito para limpeza robusta de recursos da GPU ao desmontar
  useEffect(() => {
    const mesh = meshRef.current; // Guarda a referência atual
    const texture = decal;      // Guarda a referência atual da textura

    return () => {
      // Limpeza da Mesh (Geometria e Material)
      if (mesh) {
        if (mesh.geometry) {
          mesh.geometry.dispose();
          // console.log(`Disposed geometry for: ${imgUrl}`); // Log de debug (opcional)
        }
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => mat.dispose());
          } else {
            mesh.material.dispose();
          }
          // console.log(`Disposed material for: ${imgUrl}`); // Log de debug (opcional)
        }
      }
      // Limpeza da Textura (Decal)
      if (texture && texture.dispose) {
         texture.dispose();
        // console.log(`Disposed texture for: ${imgUrl}`); // Log de debug (opcional)
      }
    };
  }, [decal, imgUrl]); // Re-executa se a textura (decal) ou imgUrl mudar

  return (
    // Componente Float para animação sutil
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <ambientLight intensity={0.35} /> {/* Luz ambiente suave */}
      <directionalLight position={[0, 0, 0.15]} intensity={1.0} /> {/* Luz direcional suave */}
      <mesh ref={meshRef} castShadow receiveShadow scale={2}> {/* Aumenta a escala da esfera */}
        {/* Geometria da esfera */}
        <sphereGeometry args={[1, 64, 64]} /> {/* Aumentei a subdivisão para melhor qualidade */}
        {/* Material padrão da esfera */}
        <meshStandardMaterial
          color="#CCCCCC" // Cor base um pouco mais escura
          polygonOffset
          polygonOffsetFactor={-5} // Ajuda a evitar z-fighting com o decal
          flatShading={false} // Usar sombreamento suave
          metalness={0.4} // Adiciona um leve aspecto metálico
          roughness={0.5} // Define o quão "áspero" ou reflexivo é o material
        />
        {/* Decal (ícone) aplicado à esfera - Renderiza apenas se decal existir */}
        {decal && (
           <Decal
            position={[0, 0, 1]} // Posição na frente da esfera
            rotation={[0, 0, 0]} // Rotação (2 * Math.PI ajustado se necessário)
            scale={1} // Escala do decal (ajuste fino se necessário)
            map={decal} // Textura a ser aplicada
            flatShading={false} // Usar sombreamento suave também no decal
          />
        )}
      </mesh>
    </Float>
  );
};

// Componente BallCanvas (Ajustado)
const BallCanvas = ({ icon }) => {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing"> {/* Adiciona feedback visual de arrastar */}
      <Canvas
        frameloop="demand" // Renderiza apenas quando necessário ou em movimento
        dpr={[1, 2]} // Densidade de pixels para telas retina (performance vs qualidade)
        gl={{ antialias: true, preserveDrawingBuffer: true, alpha: true }} // Habilita antialiasing e buffer para screenshots, fundo transparente
        camera={{ fov: 35, position: [0, 0, 7] }} // Ajusta FOV e posição da câmera
        // Desabilitado pointerEvents e touchAction para evitar bloqueio de scroll na página
        // onCreated={({ gl }) => {
        //   gl.domElement.style.pointerEvents = "none";
        //   gl.domElement.style.touchAction = "pan-y"; // Permite scroll vertical na página
        // }}
      >
        {/* Suspense para mostrar o loader enquanto a Ball carrega */}
        <Suspense fallback={<CanvasLoader />}>
          {/* OrbitControls removido para simplificar - reative se quiser interação */}
          {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
          <Ball imgUrl={icon} /> {/* Renderiza a esfera com o ícone */}
        </Suspense>

        <Preload all /> {/* Pré-carrega todos os assets */}
      </Canvas>
    </div>
  );
};

export default BallCanvas;