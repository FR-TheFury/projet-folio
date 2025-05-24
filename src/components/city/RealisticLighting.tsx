
import React from 'react';
import * as THREE from 'three';

const RealisticLighting: React.FC = () => {
  return (
    <>
      {/* Natural sky lighting */}
      <ambientLight intensity={0.4} color="#87ceeb" />
      
      {/* Sun simulation */}
      <directionalLight
        position={[100, 100, 50]}
        intensity={2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={1000}
        shadow-camera-near={0.1}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
      />
      
      {/* Atmospheric perspective */}
      <fog attach="fog" args={['#87ceeb', 200, 800]} />
      
      {/* Street lighting */}
      <pointLight position={[50, 20, 50]} intensity={5} color="#ffaa44" distance={100} />
      <pointLight position={[-50, 20, 50]} intensity={5} color="#ffaa44" distance={100} />
      <pointLight position={[50, 20, -50]} intensity={5} color="#ffaa44" distance={100} />
      <pointLight position={[-50, 20, -50]} intensity={5} color="#ffaa44" distance={100} />
      
      {/* Building accent lights */}
      <pointLight position={[0, 80, 0]} intensity={3} color="#ffffff" distance={200} />
      <pointLight position={[100, 60, 100]} intensity={2} color="#ffaa88" distance={150} />
      <pointLight position={[-100, 60, -100]} intensity={2} color="#ffaa88" distance={150} />
    </>
  );
};

export default RealisticLighting;
