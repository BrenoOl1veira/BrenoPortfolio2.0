import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

// Constantes para facilitar ajustes
const MOBILE_SCALE = 0.7;
const DESKTOP_SCALE = 0.75;
const MOBILE_POSITION = [0, -3, -2.2];
const DESKTOP_POSITION = [0, -3.25, -1.5];
const ROTATION = [-0.01, -0.2, -0.1];

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? MOBILE_SCALE : DESKTOP_SCALE}
        position={isMobile ? MOBILE_POSITION : DESKTOP_POSITION}
        rotation={ROTATION}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Adicionar tratamento de erros para a mediaQuery
    if (mediaQuery.addListener) {
      mediaQuery.addListener(handleMediaQueryChange);
    } else {
      console.error("Media query listener not supported.");
    }

    return () => {
      if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleMediaQueryChange);
      }
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
