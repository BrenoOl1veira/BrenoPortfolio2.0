import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

const Stars = (props) => {
  const ref = useRef();
  const sphere = useMemo(() => {
    const points = new Float32Array(2600 * 3);
    const result = random.inSphere(points, { radius: 1.15 });

    for (let i = 0; i < result.length; i += 1) {
      if (!Number.isFinite(result[i])) result[i] = 0;
    }

    return result;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 11;
      ref.current.rotation.y -= delta / 16;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.0023}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <div className="w-full h-auto absolute inset-0 z-[-1]">
    <Canvas
      dpr={[1, 1.25]}
      gl={{ antialias: false, powerPreference: "low-power", alpha: true }}
      camera={{ position: [0, 0, 1] }}
      performance={{ min: 0.7 }}
    >
      <Suspense fallback={null}>
        <Stars />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsCanvas;
