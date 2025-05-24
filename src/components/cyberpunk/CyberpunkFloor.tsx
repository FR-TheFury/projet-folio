
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CyberpunkFloor = () => {
  const floorRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (floorRef.current) {
      // Pulsation plus intense de la grille
      const pulse = Math.sin(state.clock.elapsedTime * 1.2) * 0.3 + 0.7;
      const secondaryPulse = Math.sin(state.clock.elapsedTime * 0.8 + Math.PI) * 0.2 + 0.8;
      
      floorRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
          const intensity = index % 2 === 0 ? pulse * 0.6 : secondaryPulse * 0.4;
          (child.material as any).emissiveIntensity = intensity;
        }
      });
    }
  });

  const floorElements = useMemo(() => {
    const elements = [];
    
    // Plan de sol principal plus sombre
    elements.push(
      <mesh key="main-floor" position={[0, -80, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[500, 500]} />
        <meshLambertMaterial 
          color="#0a0a1a"
          transparent
          opacity={0.9}
        />
      </mesh>
    );
    
    // Grille néon améliorée
    const gridSize = 400;
    const divisions = 40;
    const step = gridSize / divisions;
    
    // Lignes principales horizontales (cyan/magenta alternées)
    for (let i = 0; i <= divisions; i++) {
      const z = -gridSize / 2 + i * step;
      const isMainLine = i % 10 === 0;
      const isMajorLine = i % 20 === 0;
      const color = isMajorLine ? "#ff00ff" : (isMainLine ? "#00ffff" : "#004488");
      const emissive = isMajorLine ? "#cc00cc" : (isMainLine ? "#00aaaa" : "#002266");
      
      elements.push(
        <mesh key={`h-${i}`} position={[0, -79.3, z]}>
          <boxGeometry args={[gridSize, 0.4, isMajorLine ? 3 : (isMainLine ? 2 : 0.8)]} />
          <meshLambertMaterial 
            color={color} 
            transparent 
            opacity={isMajorLine ? 0.9 : (isMainLine ? 0.8 : 0.6)}
            emissive={emissive}
            emissiveIntensity={0.6}
          />
        </mesh>
      );
    }
    
    // Lignes principales verticales (magenta/cyan alternées)
    for (let i = 0; i <= divisions; i++) {
      const x = -gridSize / 2 + i * step;
      const isMainLine = i % 10 === 0;
      const isMajorLine = i % 20 === 0;
      const color = isMajorLine ? "#00ffff" : (isMainLine ? "#ff00ff" : "#442288");
      const emissive = isMajorLine ? "#00aaaa" : (isMainLine ? "#cc00cc" : "#221166");
      
      elements.push(
        <mesh key={`v-${i}`} position={[x, -79.3, 0]}>
          <boxGeometry args={[isMajorLine ? 3 : (isMainLine ? 2 : 0.8), 0.4, gridSize]} />
          <meshLambertMaterial 
            color={color} 
            transparent 
            opacity={isMajorLine ? 0.9 : (isMainLine ? 0.8 : 0.6)}
            emissive={emissive}
            emissiveIntensity={0.6}
          />
        </mesh>
      );
    }
    
    return elements;
  }, []);

  return <group ref={floorRef}>{floorElements}</group>;
};

export default CyberpunkFloor;
