import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Ball = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);

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

const BallCanvas = ({ icon }) => {
  return (
    <div className="w-full h-full">
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
          <Ball imgUrl={icon} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BallCanvas;
