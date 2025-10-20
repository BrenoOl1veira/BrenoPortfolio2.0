import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, Preload, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Ball = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);
  return (
    <Float speed={1.25} rotationIntensity={0.8} floatIntensity={1.5}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 0.1]} intensity={1} />
      <mesh castShadow receiveShadow scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#f0f0f0" polygonOffset polygonOffsetFactor={-5} flatShading />
        <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 0]} scale={1} map={decal} flatShading />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
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
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BallCanvas;
