import React, { Suspense, useEffect, useRef } from "react";
import { LoopRepeat } from "three";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Html,
  useAnimations,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className="canvas-loader"></span>
      <p
        style={{
          fontSize: 14,
          color: "#F1F1F1",
          fontWeight: 800,
          marginTop: 28,
        }}
      >
        {progress.toFixed(0)}%
      </p>
    </Html>
  );
};

const Astronaut = () => {
  const group = useRef();
  const { scene, animations } = useGLTF("/astronaut/scene.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!scene) return;

    scene.traverse((node) => {
      if (!node.isMesh || !node.material) return;

      const name = node.name.toLowerCase();

      if (name.includes("helmet") || name.includes("visor")) {
        node.material.color?.set("#e8d48a");
        Object.assign(node.material, {
          metalness: 0.85,
          roughness: 0.12,
          transparent: true,
          opacity: 0.92,
          envMapIntensity: 1.5,
          clearcoat: 0.8,
          clearcoatRoughness: 0.08,
        });
      } else if (name.includes("suit") || name.includes("body")) {
        node.material.color?.set("#f8f8f8");
        Object.assign(node.material, {
          metalness: 0.24,
          roughness: 0.42,
          envMapIntensity: 0.8,
          clearcoat: 0.35,
          clearcoatRoughness: 0.22,
        });
      } else if (
        name.includes("tube") ||
        name.includes("valve") ||
        name.includes("connector")
      ) {
        node.material.color?.set("#1e3a8a");
        Object.assign(node.material, {
          metalness: 0.7,
          roughness: 0.22,
          envMapIntensity: 1,
        });
      }

      if ("emissiveIntensity" in node.material) {
        node.material.emissiveIntensity = 0.08;
      }

      node.castShadow = false;
      node.receiveShadow = false;
      node.material.needsUpdate = true;
    });
  }, [scene]);

  useEffect(() => {
    const actionKeys = Object.keys(actions || {});
    if (actionKeys.length === 0) return;

    const mainAction = actions[actionKeys[0]];
    if (!mainAction) return;

    mainAction.setLoop(LoopRepeat, Infinity);
    mainAction.play();
  }, [actions]);

  if (!scene) return null;

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.7}
      position={[0, -1.55, 0]}
      rotation={[0, Math.PI * 0.1, 0]}
    />
  );
};

useGLTF.preload("/astronaut/scene.gltf");

const AstronautCanvas = () => {
  const isMobile = useMediaQuery({ maxWidth: 800 });

  return (
    <Canvas
      dpr={isMobile ? [1, 1.1] : [1, 1.3]}
      gl={{
        alpha: true,
        antialias: !isMobile,
        powerPreference: "low-power",
      }}
      camera={{
        fov: isMobile ? 34 : 30,
        near: 0.1,
        far: 100,
        position: isMobile ? [0, 0.7, 6.4] : [0, 0.8, 6],
      }}
      performance={{ min: 0.7 }}
      style={{
        background: "transparent",
        cursor: "default",
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <hemisphereLight
          intensity={isMobile ? 0.65 : 0.8}
          groundColor="#0f172a"
          color="#dbeafe"
        />
        <ambientLight intensity={isMobile ? 0.45 : 0.55} />
        <directionalLight
          position={[5, 7, 5]}
          intensity={isMobile ? 1.1 : 1.45}
          color="#ffffff"
        />
        <directionalLight
          position={[-5, 3, -5]}
          intensity={isMobile ? 0.18 : 0.28}
          color="#4f8bff"
        />
        <spotLight
          position={[2, 4, 3]}
          angle={0.24}
          penumbra={0.5}
          intensity={isMobile ? 0.2 : 0.35}
          distance={16}
          decay={2}
          color="#ffeb99"
        />
        {!isMobile && <Environment preset="city" background={false} />}

        <group position={isMobile ? [0, -2.15, 0] : [0, -2.25, 0]}>
          <Astronaut />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default AstronautCanvas;
