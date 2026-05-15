import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';

function CoreSphere({ isScanning }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += isScanning ? delta * 2 : delta * 0.2;
      meshRef.current.rotation.y += isScanning ? delta * 3 : delta * 0.3;
      
      const scale = isScanning ? 1.2 + Math.sin(state.clock.elapsedTime * 10) * 0.1 : 1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color={isScanning ? "#b000ff" : "#00e5ff"}
        emissive={isScanning ? "#ff003c" : "#00e5ff"}
        emissiveIntensity={isScanning ? 2 : 0.5}
        attach="material"
        distort={isScanning ? 0.6 : 0.2}
        speed={isScanning ? 5 : 1}
        roughness={0.2}
        metalness={0.8}
        wireframe={!isScanning}
      />
    </Sphere>
  );
}

export function ScanningCore3D({ isScanning }) {
  return (
    <div className="w-full h-full min-h-[250px] relative rounded-xl overflow-hidden bg-[#020205] border border-white/5 shadow-inner">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00e5ff" />
        
        <CoreSphere isScanning={isScanning} />
        <Stars radius={50} depth={50} count={isScanning ? 2000 : 500} factor={4} saturation={1} fade speed={isScanning ? 3 : 1} />
      </Canvas>
      
      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {isScanning && (
          <span className="text-white font-bold tracking-[0.3em] uppercase text-xs animate-pulse-glow bg-black/40 px-3 py-1 rounded backdrop-blur-sm">
            Neural Core Active
          </span>
        )}
      </div>
    </div>
  );
}
