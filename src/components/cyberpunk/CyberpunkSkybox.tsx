
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CyberpunkSkybox = () => {
  const skyboxRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (skyboxRef.current) {
      // Rotation très lente de la skybox
      skyboxRef.current.rotation.y = state.clock.elapsedTime * 0.002;
    }
  });

  return (
    <mesh ref={skyboxRef} scale={[600, 600, 600]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial 
        color="#0a0a1a"
        side={THREE.BackSide}
        transparent
        opacity={0.9}
      >
        <primitive 
          object={(() => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              // Gradient de ciel cyberpunk
              const gradient = ctx.createLinearGradient(0, 0, 0, 512);
              gradient.addColorStop(0, '#1a0a2e');
              gradient.addColorStop(0.3, '#16213e');
              gradient.addColorStop(0.6, '#0f3460');
              gradient.addColorStop(1, '#0a0a0a');
              ctx.fillStyle = gradient;
              ctx.fillRect(0, 0, 512, 512);
              
              // Étoiles subtiles
              ctx.fillStyle = '#ffffff';
              for (let i = 0; i < 100; i++) {
                const x = Math.random() * 512;
                const y = Math.random() * 256;
                const size = Math.random() * 2;
                ctx.globalAlpha = Math.random() * 0.8 + 0.2;
                ctx.fillRect(x, y, size, size);
              }
            }
            const texture = new THREE.CanvasTexture(canvas);
            return texture;
          })()}
          attach="map"
        />
      </meshBasicMaterial>
    </mesh>
  );
};

export default CyberpunkSkybox;
