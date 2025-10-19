import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, Preload, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Ball = ({ imgUrl }) => {
  const decal = useTexture(imgUrl); // useTexture já faz cache interno

  return (
    <Float speed={1.25} rotationIntensity={0.4} floatIntensity={0.5}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 0.1]} intensity={1} />
      <mesh castShadow receiveShadow scale={2}>
        {/* Geometria simplificada */}
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#f0f0f0"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal position={[0, 0, 1]} rotation={[0, 0, 0]} scale={1} map={decal} flatShading />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <div className="w-full h-full">
      <Canvas
        frameloop="demand" // renderiza apenas quando necessário
        dpr={[1, 1.5]}
        gl={{ antialias: true }} // remove preserveDrawingBuffer
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

export default BallCanvas;
