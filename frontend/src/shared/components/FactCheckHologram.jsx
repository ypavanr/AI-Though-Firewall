import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';

function HologramShape({ isFake, isNeutral }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (isFake) {
        meshRef.current.rotation.x += delta * 5;
        meshRef.current.rotation.y += delta * 5;
      } else if (isNeutral) {
        meshRef.current.rotation.x += delta * 0.5;
        meshRef.current.rotation.y += delta * 0.5;
      } else {
        meshRef.current.rotation.y += delta * 1;
      }
    }
  });

  // Colors: Fake = Red, Neutral = Cyan, True = Green
  const color = isFake ? "#ff003c" : isNeutral ? "#00e5ff" : "#00ffa2";
  const distort = isFake ? 0.8 : isNeutral ? 0.2 : 0.0;
  const speed = isFake ? 10 : isNeutral ? 2 : 1;

  return (
    <Icosahedron ref={meshRef} args={[1.2, 1]}>
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isFake ? 2 : 1}
        wireframe={!isFake}
        distort={distort}
        speed={speed}
      />
    </Icosahedron>
  );
}

export function FactCheckHologram({ ratingText }) {
  // Determine state based on ratingText
  const ratingLower = (ratingText || "").toLowerCase();
  
  let isFake = false;
  let isNeutral = true;
  
  if (ratingLower.includes("false") || ratingLower.includes("pants on fire") || ratingLower.includes("fake")) {
    isFake = true;
    isNeutral = false;
  } else if (ratingLower.includes("true") && !ratingLower.includes("mostly false")) {
    isNeutral = false;
  }

  return (
    <div className="w-full h-full min-h-[150px] relative rounded-xl overflow-hidden bg-transparent">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <HologramShape isFake={isFake} isNeutral={isNeutral} />
      </Canvas>
    </div>
  );
}
