
import React from 'react';

const CyberpunkLighting = () => {
  return (
    <>
      {/* Brouillard réduit pour plus de visibilité */}
      <fog attach="fog" args={['#0a0a2e', 100, 400]} />
      
      {/* Éclairage amélioré - plus lumineux */}
      <ambientLight intensity={0.4} color="#4a4a6a" />
      
      {/* Éclairages principaux plus intenses */}
      <pointLight position={[0, 100, 0]} color="#6688ff" intensity={4} distance={300} />
      <pointLight position={[-60, 60, -60]} color="#ff6688" intensity={3} distance={200} />
      <pointLight position={[60, 60, 60]} color="#66ffaa" intensity={3} distance={200} />
      <pointLight position={[0, 30, -100]} color="#ffaa66" intensity={2.5} distance={180} />
      
      {/* Éclairage directionnel principal */}
      <directionalLight 
        position={[30, 80, 30]} 
        color="#aabbff" 
        intensity={2}
        castShadow 
      />
      
      {/* Éclairage de remplissage */}
      <directionalLight 
        position={[-30, 40, -30]} 
        color="#ffaabb" 
        intensity={1.5}
      />
      
      {/* Éclairage ambiant supplémentaire pour la visibilité */}
      <hemisphereLight 
        args={["#4a6aaa", "#2a2a4a", 0.6]}
      />
    </>
  );
};

export default CyberpunkLighting;
