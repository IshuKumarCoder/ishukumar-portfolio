"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";

const AnimatedSphere = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere visible args={[1, 64, 64]} scale={2}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.3}
          metalness={0.3}
        />
      </Sphere>
    </Float>
  );
};

export const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};
