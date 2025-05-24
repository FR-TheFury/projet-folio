
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CyberpunkCity = () => {
  const cityRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (cityRef.current) {
      cityRef.current.rotation.y = state.clock.elapsedTime * 0.005;
    }
  });

  const buildings = useMemo(() => {
    const buildingArray = [];
    const citySize = 300;
    const buildingCount = 80;
    
    for (let i = 0; i < buildingCount; i++) {
      const x = (Math.random() - 0.5) * citySize;
      const z = (Math.random() - 0.5) * citySize;
      const baseHeight = Math.random() * 60 + 20;
      const width = Math.random() * 8 + 4;
      const depth = Math.random() * 8 + 4;
      
      buildingArray.push(
        <group key={i} position={[x, baseHeight / 2 - 80, z]}>
          {/* Building principal avec couleur plus claire */}
          <mesh>
            <boxGeometry args={[width, baseHeight, depth]} />
            <meshLambertMaterial 
              color="#2a2a3a"
              transparent
              opacity={0.9}
            />
          </mesh>
          
          {/* Contours subtils */}
          <mesh>
            <boxGeometry args={[width + 0.3, baseHeight + 0.3, depth + 0.3]} />
            <meshLambertMaterial 
              color="#004488"
              wireframe
              transparent
              opacity={0.5}
              emissive="#002244"
              emissiveIntensity={0.2}
            />
          </mesh>
          
          {/* Fenêtres éclairées */}
          {Array.from({ length: Math.floor(baseHeight / 8) }, (_, floor) => (
            <group key={floor}>
              <mesh position={[0, -baseHeight/2 + floor * 8 + 4, depth/2 + 0.1]}>
                <planeGeometry args={[width * 0.8, 6]} />
                <meshLambertMaterial 
                  color={Math.random() > 0.7 ? "#ffaa44" : "#333344"}
                  transparent
                  opacity={0.8}
                  emissive={Math.random() > 0.7 ? "#aa6622" : "#111122"}
                  emissiveIntensity={0.4}
                />
              </mesh>
            </group>
          ))}
        </group>
      );
    }
    
    return buildingArray;
  }, []);

  return <group ref={cityRef}>{buildings}</group>;
};

export default CyberpunkCity;
