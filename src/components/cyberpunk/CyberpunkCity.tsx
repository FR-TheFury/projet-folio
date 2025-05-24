
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
      
      // Random neon colors for variety
      const neonColors = ['#ff00ff', '#00ffff', '#ff0080', '#8000ff', '#0080ff', '#ff4080'];
      const primaryNeon = neonColors[Math.floor(Math.random() * neonColors.length)];
      const secondaryNeon = neonColors[Math.floor(Math.random() * neonColors.length)];
      
      buildingArray.push(
        <group key={i} position={[x, baseHeight / 2 - 80, z]}>
          {/* Building principal avec matériau plus sombre pour contraste */}
          <mesh>
            <boxGeometry args={[width, baseHeight, depth]} />
            <meshLambertMaterial 
              color="#0a0a0a"
              transparent
              opacity={0.95}
            />
          </mesh>
          
          {/* Contours néon plus intenses */}
          <mesh>
            <boxGeometry args={[width + 0.5, baseHeight + 0.5, depth + 0.5]} />
            <meshLambertMaterial 
              color={primaryNeon}
              wireframe
              transparent
              opacity={0.8}
              emissive={primaryNeon}
              emissiveIntensity={1.2}
            />
          </mesh>
          
          {/* Bandes néon verticales */}
          <mesh position={[width/2 + 0.1, 0, 0]}>
            <boxGeometry args={[0.3, baseHeight, 0.5]} />
            <meshLambertMaterial 
              color={secondaryNeon}
              transparent
              opacity={0.9}
              emissive={secondaryNeon}
              emissiveIntensity={2}
            />
          </mesh>
          
          {/* Fenêtres néon améliorées */}
          {Array.from({ length: Math.floor(baseHeight / 8) }, (_, floor) => {
            const windowColor = Math.random() > 0.3 ? '#ffaa00' : '#004488';
            const emissiveIntensity = Math.random() > 0.3 ? 1.5 : 0.8;
            
            return (
              <group key={floor}>
                <mesh position={[0, -baseHeight/2 + floor * 8 + 4, depth/2 + 0.1]}>
                  <planeGeometry args={[width * 0.8, 6]} />
                  <meshLambertMaterial 
                    color={windowColor}
                    transparent
                    opacity={0.9}
                    emissive={windowColor}
                    emissiveIntensity={emissiveIntensity}
                  />
                </mesh>
              </group>
            );
          })}
          
          {/* Néon de toit pulsant */}
          <mesh position={[0, baseHeight/2 + 2, 0]}>
            <boxGeometry args={[width + 2, 1, depth + 2]} />
            <meshLambertMaterial 
              color={primaryNeon}
              transparent
              opacity={0.7}
              emissive={primaryNeon}
              emissiveIntensity={1.8}
            />
          </mesh>
        </group>
      );
    }
    
    return buildingArray;
  }, []);

  return <group ref={cityRef}>{buildings}</group>;
};

export default CyberpunkCity;
