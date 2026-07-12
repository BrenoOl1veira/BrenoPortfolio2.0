import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";

/** Base 3D comum para todos os itens de habilidade. */
const Sphere = ({ decal }) => {
  return (
    <Float speed={1} rotationIntensity={0.55} floatIntensity={0.9}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[0, 0, 0.1]} intensity={0.8} />
      <mesh scale={2.25}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#f0f0f0"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {decal && (
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 0]}
            scale={1}
            map={decal}
            flatShading
          />
        )}
      </mesh>
    </Float>
  );
};

/** Aplica PNG/JPG na esfera com uma textura nativa do Three.js. */
const TexturedBall = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);
  return <Sphere decal={decal} />;
};

/** Canvas isolado: falha de WebGL nao interrompe a secao de tecnologias inteira. */
const BallCanvas = ({ icon }) => {
  const isVectorIcon = icon.toLowerCase().endsWith(".svg");

  return (
    <div className="relative h-full w-full">
      <Canvas
        frameloop="always"
        dpr={[1, 1.2]}
        gl={{ antialias: false, powerPreference: "low-power", alpha: true }}
        onCreated={({ gl }) => {
          gl.domElement.style.pointerEvents = "none";
          gl.domElement.style.touchAction = "pan-y";
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          {isVectorIcon ? <Sphere /> : <TexturedBall imgUrl={icon} />}
        </Suspense>
      </Canvas>

      {/*
        SVGs funcionam bem no DOM, mas podem falhar como textura no Three.js.
        Mantemos o icone vetorial sobre a esfera para garantir leitura em todos
        os navegadores, enquanto PNGs e JPGs continuam aplicados como decalque.
      */}
      {isVectorIcon && (
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 m-auto h-12 w-12 object-contain"
        />
      )}
    </div>
  );
};

export default BallCanvas;
