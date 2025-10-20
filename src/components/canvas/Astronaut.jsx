// AstronautCanvas.jsx
import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Preload,
  useGLTF,
  useAnimations,
  Html,
  useProgress,
  Environment,
} from "@react-three/drei";

/* -------------------------------------------------------
COMPONENTE: CanvasLoader
------------------------------------------------------- */
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
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

/* -------------------------------------------------------
COMPONENTE: Astronaut
------------------------------------------------------- */
const Astronaut = () => {
  const group = useRef();
  const { scene, animations } = useGLTF("/astronaut/scene.gltf");
  const { actions, mixer } = useAnimations(animations, group);

  /* Ajuste avançado de materiais */
  useEffect(() => {
    if (!scene) return;

    scene.traverse((node) => {
      if (!node.isMesh || !node.material) return;

      const name = node.name.toLowerCase();

      // 🔹 Capacete
      if (name.includes("helmet") || name.includes("visor")) {
        node.material.color?.set("#e8d48a");
        Object.assign(node.material, {
          metalness: 0.95,
          roughness: 0.05,
          transparent: true,
          opacity: 0.92,
          transmission: 0.3,
          thickness: 0.5,
          ior: 1.45,
          specularIntensity: 1.2,
          envMapIntensity: 2.5,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
        });
      }

      // 🔹 Traje
      if (name.includes("suit") || name.includes("body")) {
        node.material.color?.set("#f8f8f8");
        Object.assign(node.material, {
          metalness: 0.3,
          roughness: 0.4,
          envMapIntensity: 1.2,
          clearcoat: 0.8,
          clearcoatRoughness: 0.3,
        });
      }

      // 🔹 Metais
      if (name.includes("tube") || name.includes("valve") || name.includes("connector")) {
        node.material.color?.set("#1e3a8a");
        Object.assign(node.material, {
          metalness: 0.95,
          roughness: 0.1,
          envMapIntensity: 2.0,
        });
      }

      // 🔹 Detalhes vermelhos
      if (name.includes("stripe") || name.includes("red") || name.includes("accent")) {
        node.material.color?.set("#dc2626");
        Object.assign(node.material, {
          metalness: 0.4,
          roughness: 0.6,
        });
      }

      // 🔹 Equipamentos e cinto
      if (name.includes("belt") || name.includes("box") || name.includes("equipment")) {
        node.material.color?.set("#4b5563");
        Object.assign(node.material, {
          metalness: 0.9,
          roughness: 0.3,
          envMapIntensity: 1.5,
        });
      }

      // 🔹 Luvas e botas
      if (name.includes("glove") || name.includes("boot") || name.includes("hand")) {
        node.material.color?.set("#e5e5e5");
        Object.assign(node.material, {
          metalness: 0.1,
          roughness: 0.7,
        });
      }

      if ("emissive" in node.material) {
        node.material.emissiveIntensity = 0.15;
      }

      node.castShadow = true;
      node.receiveShadow = true;
      node.material.needsUpdate = true;
    });
  }, [scene]);

  /* Executa a animação */
  useEffect(() => {
    if (!actions || !mixer) return;
    const actionKeys = Object.keys(actions);
    if (actionKeys.length === 0) return;

    const mainAction = actions[actionKeys[0]];
    if (!mainAction) return;

    import("three").then((THREE) => {
      mainAction.setLoop(THREE.LoopRepeat, Infinity);
      mainAction.play();
    });
  }, [actions, mixer]);

  // ✅ Protege contra valores indefinidos (evita NaN)
  if (!scene) return null;

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.8}
      position={[0, -1.5, 0]}
      rotation={[0, Math.PI * 0.1, 0]}
    />
  );
};

useGLTF.preload("/astronaut/scene.gltf");

/* -------------------------------------------------------
COMPONENTE: AstronautCanvas
------------------------------------------------------- */
const AstronautCanvas = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{
        preserveDrawingBuffer: true,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      camera={{
        fov: 30,
        near: 0.1,
        far: 100,
        position: [0, 1, 6],
      }}
      style={{
        background: "transparent",
        cursor: "default",
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* 💡 Sistema de iluminação premium */}
        <hemisphereLight intensity={0.8} groundColor="#0f172a" color="#e2e8f0" />
        <ambientLight intensity={0.6} />

        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.0001}
          color="#ffffff"
        />

        <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#4f8bff" />
        <spotLight position={[2, 4, 3]} angle={0.25} penumbra={0.6} intensity={0.8} distance={20} decay={2} color="#ffeb99" />
        <pointLight position={[0, 2, -5]} intensity={0.3} distance={15} decay={2} color="#3b82f6" />

        <Environment preset="studio" background={false} />

        <group position={[0, -2.5, 0]}>
          <Astronaut />
        </group>

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default AstronautCanvas;
