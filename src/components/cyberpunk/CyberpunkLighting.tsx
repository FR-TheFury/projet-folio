
import React from 'react';

const CyberpunkLighting = () => {
  return (
    <>
      {/* Brouillard cyberpunk plus dense avec tons violets */}
      <fog attach="fog" args={['#1a0a2e', 80, 350]} />
      
      {/* Éclairage ambiant réduit pour plus de contraste néon */}
      <ambientLight intensity={0.2} color="#2a2a4a" />
      
      {/* Éclairages néon principaux plus intenses */}
      <pointLight position={[0, 120, 0]} color="#ff00ff" intensity={6} distance={400} />
      <pointLight position={[-80, 80, -80]} color="#00ffff" intensity={5} distance={300} />
      <pointLight position={[80, 80, 80]} color="#ff0080" intensity={5} distance={300} />
      <pointLight position={[0, 50, -120]} color="#8000ff" intensity={4} distance={250} />
      
      {/* Éclairages colorés supplémentaires pour l'atmosphère */}
      <pointLight position={[-40, 60, 40]} color="#0080ff" intensity={3} distance={200} />
      <pointLight position={[40, 60, -40]} color="#ff4080" intensity={3} distance={200} />
      
      {/* Éclairage directionnel principal teinté */}
      <directionalLight 
        position={[50, 100, 50]} 
        color="#aa88ff" 
        intensity={1.5}
        castShadow 
      />
      
      {/* Éclairage de remplissage coloré */}
      <directionalLight 
        position={[-50, 60, -50]} 
        color="#ff88aa" 
        intensity={1}
      />
      
      {/* Éclairage hémisphérique cyberpunk */}
      <hemisphereLight 
        args={["#4a2a8a", "#1a0a3a", 0.4]}
      />
    </>
  );
};

export default CyberpunkLighting;
