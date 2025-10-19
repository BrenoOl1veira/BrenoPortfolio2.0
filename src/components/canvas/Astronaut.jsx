import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, useGLTF, useAnimations, Html, useProgress, Environment } from "@react-three/drei";

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

  /* Ajuste avançado de materiais com foco no capacete */
  useEffect(() => {
    if (!scene) return;

    scene.traverse((node) => {
      if (node.isMesh && node.material) {
        node.castShadow = true;
        node.receiveShadow = true;

        const name = node.name.toLowerCase();

        // MELHORIAS ESPECÍFICAS PARA O CAPACETE
        if (name.includes("helmet") || name.includes("visor")) {
          // Material de vidro espacial premium
          node.material.color.set("#e8d48a");
          node.material.metalness = 0.95;
          node.material.roughness = 0.05;
          node.material.transparent = true;
          node.material.opacity = 0.92;
          node.material.transmission = 0.3; // Efeito de transmissão de luz
          node.material.thickness = 0.5; // Espessura do "vidro"
          node.material.ior = 1.45; // Índice de refração
          node.material.specularIntensity = 1.2;
          node.material.envMapIntensity = 2.5;
          node.material.clearcoat = 1.0;
          node.material.clearcoatRoughness = 0.05;
          
          // Melhor reflexão
          node.material.needsUpdate = true;
        }

        // Traje espacial - material melhorado
        if (name.includes("suit") || name.includes("body")) {
          node.material.color.set("#f8f8f8");
          node.material.metalness = 0.3;
          node.material.roughness = 0.4;
          node.material.envMapIntensity = 1.2;
          node.material.clearcoat = 0.8;
          node.material.clearcoatRoughness = 0.3;
        }

        // Detalhes metálicos
        if (name.includes("tube") || name.includes("valve") || name.includes("connector")) {
          node.material.color.set("#1e3a8a");
          node.material.metalness = 0.95;
          node.material.roughness = 0.1;
          node.material.envMapIntensity = 2.0;
        }

        // Acabamentos em vermelho
        if (name.includes("stripe") || name.includes("red") || name.includes("accent")) {
          node.material.color.set("#dc2626");
          node.material.metalness = 0.4;
          node.material.roughness = 0.6;
        }

        // Equipamentos e cinto
        if (name.includes("belt") || name.includes("box") || name.includes("equipment")) {
          node.material.color.set("#4b5563");
          node.material.metalness = 0.9;
          node.material.roughness = 0.3;
          node.material.envMapIntensity = 1.5;
        }

        // Luvas e botas
        if (name.includes("glove") || name.includes("boot") || name.includes("hand")) {
          node.material.color.set("#e5e5e5");
          node.material.metalness = 0.1;
          node.material.roughness = 0.7;
        }

        // Melhorias gerais de material
        if ("emissive" in node.material) {
          node.material.emissiveIntensity = 0.15;
        }

        // Ativa sombras suaves
        node.castShadow = true;
        node.receiveShadow = true;
        
        node.material.needsUpdate = true;
      }
    });
  }, [scene]);

  /* Executa a animação */
  useEffect(() => {
    if (!actions || !mixer) return;

    const mainAction = actions[Object.keys(actions)[0]];

    if (!mainAction) {
      console.warn("Nenhuma animação encontrada no GLTF.");
      return;
    }

    import("three").then((THREE) => {
      mainAction.setLoop(THREE.LoopRepeat, Infinity);
      mainAction.play();
    });
  }, [actions, mixer]);

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.8}
      position={[0, -1.5, 0]}
      rotation={[0, Math.PI * 0.1, 0]} // Rotação sutil para melhor visualização
    />
  );
};

/* -------------------------------------------------------
COMPONENTE: AstronautCanvas
Canvas com iluminação premium
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
        powerPreference: "high-performance"
      }}
      camera={{
        fov: 30, // Campo de visão reduzido para mais detalhes
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
        {/* Sistema de iluminação premium */}
        <hemisphereLight 
          intensity={0.8} 
          groundColor="#0f172a" 
          color="#e2e8f0"
        />
        
        <ambientLight intensity={0.6} />
        
        {/* Luz principal suave */}
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
        
        {/* Luz de preenchimento */}
        <directionalLight
          position={[-5, 3, -5]}
          intensity={0.4}
          color="#4f8bff"
        />
        
        {/* Luz de destaque para o capacete */}
        <spotLight
          position={[2, 4, 3]}
          angle={0.25}
          penumbra={0.6}
          intensity={0.8}
          distance={20}
          decay={2}
          color="#ffeb99"
        />
        
        {/* Luz traseira para contorno */}
        <pointLight
          position={[0, 2, -5]}
          intensity={0.3}
          distance={15}
          decay={2}
          color="#3b82f6"
        />

        {/* Ambiente com HDR de alta qualidade */}
        <Environment 
          preset="studio" 
          background={false}
          environmentIntensity={1.2}
        />

        {/* Grupo do astronauta com melhor posicionamento */}
        <group position={[0, -2.5, 0]}>
          <Astronaut />
        </group>

        {/* Pré-carrega todos os assets */}
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default AstronautCanvas;