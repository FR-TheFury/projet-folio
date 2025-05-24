
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import PerformanceToggle from './PerformanceToggle';
import CityGenerator from './city/CityGenerator';
import RoadSystem from './city/RoadSystem';
import RealisticLighting from './city/RealisticLighting';
import RealisticSkybox from './city/RealisticSkybox';
import CityCamera from './city/CityCamera';

const RealisticCityBackground: React.FC = () => {
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [cameraMovement, setCameraMovement] = useState<'smooth' | 'cinematic' | 'static'>('cinematic');

  console.log("Rendering realistic 3D city with PBR materials and advanced lighting");

  return (
    <>
      <div className="fixed inset-0 z-[-1] w-full h-full">
        <Canvas
          camera={{ 
            position: [150, 100, 150], 
            fov: 60,
            near: 1,
            far: 2000
          }}
          style={{ 
            width: '100%', 
            height: '100%',
            background: 'linear-gradient(180deg, #87ceeb 0%, #98d8e8 25%, #b0e7f0 60%, #ffffff 100%)'
          }}
          shadows
          onCreated={() => console.log("Realistic city environment loaded with PBR materials")}
        >
          <CityCamera movementType={cameraMovement} />
          <RealisticSkybox />
          <RealisticLighting />
          
          {/* Ground plane */}
          <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[1000, 1000]} />
            <meshStandardMaterial color="#4a4a4a" roughness={0.8} />
          </mesh>
          
          <RoadSystem />
          <CityGenerator />
        </Canvas>
      </div>
      
      <PerformanceToggle 
        enabled={effectsEnabled} 
        onToggle={setEffectsEnabled} 
      />
    </>
  );
};

export default RealisticCityBackground;
