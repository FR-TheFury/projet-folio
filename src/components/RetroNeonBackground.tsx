
import React from 'react';
import { Canvas } from '@react-three/fiber';
import {
  CyberpunkSkybox,
  CyberpunkFloor,
  CyberpunkCity,
  CyberpunkCamera,
  CyberpunkLighting
} from './cyberpunk';

const RetroNeonBackground: React.FC = () => {
  console.log("Rendering improved cyberpunk cityscape with skybox");

  return (
    <div className="fixed inset-0 z-[-1] w-full h-full">
      <Canvas
        camera={{ 
          position: [50, 40, 50], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'linear-gradient(180deg, #1a0a2e 0%, #16213e 25%, #0f3460 60%, #0a0a1a 100%)'
        }}
        onCreated={() => console.log("Improved cyberpunk environment loaded")}
      >
        {/* Contrôle de caméra */}
        <CyberpunkCamera />
        
        {/* Skybox cyberpunk */}
        <CyberpunkSkybox />
        
        {/* Éclairage */}
        <CyberpunkLighting />
        
        {/* Sol propre avec grille néon */}
        <CyberpunkFloor />
        
        {/* Ville cyberpunk */}
        <CyberpunkCity />
      </Canvas>
    </div>
  );
};

export default RetroNeonBackground;
