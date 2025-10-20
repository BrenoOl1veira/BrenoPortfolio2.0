// Stars.jsx
import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random";

const Stars = (props) => {
  const ref = useRef();

  // Gera pontos apenas uma vez, com verificação de segurança
  const [sphere] = useState(() => {
    const points = new Float32Array(5000 * 3); // sempre múltiplo de 3
    const result = random.inSphere(points, { radius: 1.2 });

    // Sanitiza para evitar NaN
    for (let i = 0; i < result.length; i++) {
      if (!Number.isFinite(result[i])) result[i] = 0;
    }
    return result;
  });

  // Anima a rotação
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <div className="w-full h-auto absolute inset-0 z-[-1]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <Stars />
      </Suspense>
      <Preload all />
    </Canvas>
  </div>
);

export default StarsCanvas;
