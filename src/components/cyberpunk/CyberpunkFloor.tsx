
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CyberpunkFloor = () => {
  const floorRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (floorRef.current) {
      // Pulsation subtile de la grille
      const pulse = Math.sin(state.clock.elapsedTime * 0.8) * 0.1 + 0.9;
      floorRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
          (child.material as any).emissiveIntensity = pulse * 0.3;
        }
      });
    }
  });

  const floorElements = useMemo(() => {
    const elements = [];
    
    // Plan de sol principal
    elements.push(
      <mesh key="main-floor" position={[0, -80, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[500, 500]} />
        <meshLambertMaterial 
          color="#1a1a2e"
          transparent
          opacity={0.8}
        />
      </mesh>
    );
    
    // Grille néon principale
    const gridSize = 400;
    const divisions = 40;
    const step = gridSize / divisions;
    
    // Lignes principales horizontales (cyan)
    for (let i = 0; i <= divisions; i++) {
      const z = -gridSize / 2 + i * step;
      const isMainLine = i % 10 === 0;
      elements.push(
        <mesh key={`h-${i}`} position={[0, -79.5, z]}>
          <boxGeometry args={[gridSize, 0.2, isMainLine ? 2 : 0.5]} />
          <meshLambertMaterial 
            color={isMainLine ? "#00aaff" : "#004466"} 
            transparent 
            opacity={isMainLine ? 0.8 : 0.6}
            emissive={isMainLine ? "#0088cc" : "#002244"}
            emissiveIntensity={0.3}
          />
        </mesh>
      );
    }
    
    // Lignes principales verticales (magenta)
    for (let i = 0; i <= divisions; i++) {
      const x = -gridSize / 2 + i * step;
      const isMainLine = i % 10 === 0;
      elements.push(
        <mesh key={`v-${i}`} position={[x, -79.5, 0]}>
          <boxGeometry args={[isMainLine ? 2 : 0.5, 0.2, gridSize]} />
          <meshLambertMaterial 
            color={isMainLine ? "#ff00aa" : "#442266"} 
            transparent 
            opacity={isMainLine ? 0.8 : 0.6}
            emissive={isMainLine ? "#cc0088" : "#221144"}
            emissiveIntensity={0.3}
          />
        </mesh>
      );
    }
    
    return elements;
  }, []);

  return <group ref={floorRef}>{floorElements}</group>;
};

export default CyberpunkFloor;
