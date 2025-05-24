
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  CyberpunkSkybox,
  CyberpunkFloor,
  CyberpunkCity,
  CyberpunkCamera,
  CyberpunkLighting,
  CyberpunkEffects
} from './cyberpunk';
import PerformanceToggle from './PerformanceToggle';

const RetroNeonBackground: React.FC = () => {
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [cameraMovement, setCameraMovement] = useState<'orbital' | 'vertical' | 'mixed'>('mixed');

  console.log("Rendering enhanced cyberpunk cityscape with post-processing");

  return (
    <>
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
          onCreated={() => console.log("Enhanced cyberpunk environment with post-processing loaded")}
        >
          {/* Contrôle de caméra amélioré */}
          <CyberpunkCamera movementType={cameraMovement} />
          
          {/* Skybox cyberpunk */}
          <CyberpunkSkybox />
          
          {/* Éclairage cyberpunk amélioré */}
          <CyberpunkLighting />
          
          {/* Sol néon amélioré */}
          <CyberpunkFloor />
          
          {/* Ville cyberpunk avec néons intenses */}
          <CyberpunkCity />
          
          {/* Effets post-processing */}
          <CyberpunkEffects enabled={effectsEnabled} />
        </Canvas>
      </div>
      
      {/* Toggle de performance */}
      <PerformanceToggle 
        enabled={effectsEnabled} 
        onToggle={setEffectsEnabled} 
      />
    </>
  );
};

export default RetroNeonBackground;
