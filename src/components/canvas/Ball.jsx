import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, Preload, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";

const BallCanvas = ({ icon }) => {
  // Detecta se é mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Se for mobile, mostra apenas a imagem PNG
  if (isMobile) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src={icon} 
          alt="Skill icon" 
          className="max-w-full max-h-full object-contain"
          style={{ width: '80px', height: '80px' }}
        />
      </div>
    );
  }

  // Se for desktop, mostra o componente 3D original
  return (
    <div className="w-full h-full">
      <Canvas
        frameloop="always"
        dpr={[1, 1.5]}
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          gl.domElement.style.pointerEvents = "none";
          gl.domElement.style.touchAction = "pan-y";
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <Ball imgUrl={icon} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

// Componente Ball original (precisa ser movido para fora ou mantido no mesmo arquivo)
const Ball = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={1.25} rotationIntensity={0.8} floatIntensity={1.5}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 0.1]} intensity={1} />
      <mesh castShadow receiveShadow scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#f0f0f0"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 0]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

export default BallCanvas;