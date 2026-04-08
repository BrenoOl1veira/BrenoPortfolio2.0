import React, { Suspense, useRef, useEffect } from "react";
import { LoopRepeat } from "three";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, Html, useProgress } from "@react-three/drei";

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
          marginTop: 24,
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

      node.castShadow = false;
      node.receiveShadow = false;
      node.material.roughness = Math.min(node.material.roughness ?? 0.7, 0.7);
      node.material.metalness = Math.min(node.material.metalness ?? 0.2, 0.35);
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
      scale={1.55}
      position={[0, -1.5, 0]}
      rotation={[0, Math.PI * 0.08, 0]}
    />
  );
};

useGLTF.preload("/astronaut/scene.gltf");

const AstronautCanvas = () => {
  return (
    <Canvas
      dpr={[1, 1.2]}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      }}
      camera={{
        fov: 32,
        near: 0.1,
        far: 100,
        position: [0, 0.6, 6],
      }}
      style={{
        background: "transparent",
        cursor: "default",
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <hemisphereLight intensity={0.7} groundColor="#0f172a" color="#dbeafe" />
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 5, 4]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[-3, 2, -4]} intensity={0.25} color="#60a5fa" />

        <group position={[0, -2.1, 0]}>
          <Astronaut />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default AstronautCanvas;
