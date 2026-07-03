"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

function DistortedBlob() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.08;
    meshRef.current.rotation.y += delta * 0.12;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.4, 4]} />
      <MeshDistortMaterial color="#EA580C" distort={0.35} speed={1.4} roughness={0.25} metalness={0.05} />
    </mesh>
  );
}

interface HeroSceneProps {
  isInView: boolean;
}

// The site's one WebGL accent: a procedural, noise-distorted icosahedron.
// No modeled assets exist yet (docs/ASSET_AUDIT.md), so this is generated
// entirely from geometry + a shader material — zero extra asset weight.
export function HeroScene({ isInView }: HeroSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={isInView ? "always" : "never"}
      camera={{ position: [0, 0, 4], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1.2} />
      <DistortedBlob />
    </Canvas>
  );
}
