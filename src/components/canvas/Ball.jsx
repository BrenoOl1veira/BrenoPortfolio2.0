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
        dpr={[1, 1.5]}
        gl={{ preserveDrawingBuffer: true }}
        // onCreated permite acessar o contexto GL e o elemento canvas
        onCreated={({ gl }) => {
          // remove captura de ponteiro pelo canvas — nenhum clique/arrasto será recebido
          gl.domElement.style.pointerEvents = "none";
          // permite rolagem vertical nativa no mobile quando o dedo estiver sobre o canvas
          gl.domElement.style.touchAction = "pan-y";
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          {/* Como desabilitamos a interação do canvas, OrbitControls não é necessário.
              Se quiser manter apenas zoom/rotate por mouse em desktop, remova pointerEvents none e reative controls. */}
          <Ball imgUrl={icon} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default BallCanvas;
