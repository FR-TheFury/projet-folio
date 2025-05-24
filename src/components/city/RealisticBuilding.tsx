
import React, { useMemo } from 'react';
import * as THREE from 'three';

interface BuildingProps {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  style: 'modern' | 'classic' | 'residential' | 'office';
}

const RealisticBuilding: React.FC<BuildingProps> = ({ position, width, height, depth, style }) => {
  const buildingElements = useMemo(() => {
    const elements = [];
    
    // Main building structure
    const mainMaterialProps = style === 'modern' ? { color: '#2c2c2c', roughness: 0.3, metalness: 0.6 } :
                            style === 'classic' ? { color: '#8b4513', roughness: 0.9, metalness: 0.0 } :
                            style === 'residential' ? { color: '#8a8a8a', roughness: 0.8, metalness: 0.1 } :
                            { color: '#8a8a8a', roughness: 0.8, metalness: 0.1 };

    // Building base
    elements.push(
      <mesh key="main" position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial {...mainMaterialProps} />
      </mesh>
    );

    // Windows - create realistic window pattern
    const windowRows = Math.floor(height / 4);
    const windowCols = Math.floor(width / 3);
    
    for (let row = 0; row < windowRows; row++) {
      for (let col = 0; col < windowCols; col++) {
        const windowX = -width/2 + (col + 0.5) * (width / windowCols);
        const windowY = -height/2 + (row + 0.5) * (height / windowRows);
        const windowZ = depth/2 + 0.02;
        
        // Random window lighting
        const isLit = Math.random() > 0.4;
        const windowMaterialProps = isLit ? 
          { color: '#ffff88', emissive: '#ffff44', emissiveIntensity: 0.3 } : 
          { color: '#87ceeb', roughness: 0.1, metalness: 0.9, transparent: true, opacity: 0.3 };

        elements.push(
          <mesh key={`window-front-${row}-${col}`} position={[windowX, windowY, windowZ]}>
            <boxGeometry args={[1.5, 2, 0.1]} />
            <meshStandardMaterial {...windowMaterialProps} />
          </mesh>
        );

        // Back windows
        elements.push(
          <mesh key={`window-back-${row}-${col}`} position={[windowX, windowY, -windowZ]}>
            <boxGeometry args={[1.5, 2, 0.1]} />
            <meshStandardMaterial {...windowMaterialProps} />
          </mesh>
        );
      }
    }

    // Side windows
    const sideWindowCols = Math.floor(depth / 3);
    for (let row = 0; row < windowRows; row++) {
      for (let col = 0; col < sideWindowCols; col++) {
        const windowZ = -depth/2 + (col + 0.5) * (depth / sideWindowCols);
        const windowY = -height/2 + (row + 0.5) * (height / windowRows);
        const windowX = width/2 + 0.02;
        
        const isLit = Math.random() > 0.4;
        const windowMaterialProps = isLit ? 
          { color: '#ffff88', emissive: '#ffff44', emissiveIntensity: 0.3 } : 
          { color: '#87ceeb', roughness: 0.1, metalness: 0.9, transparent: true, opacity: 0.3 };

        elements.push(
          <mesh key={`window-side-right-${row}-${col}`} position={[windowX, windowY, windowZ]}>
            <boxGeometry args={[0.1, 2, 1.5]} />
            <meshStandardMaterial {...windowMaterialProps} />
          </mesh>
        );

        elements.push(
          <mesh key={`window-side-left-${row}-${col}`} position={[-windowX, windowY, windowZ]}>
            <boxGeometry args={[0.1, 2, 1.5]} />
            <meshStandardMaterial {...windowMaterialProps} />
          </mesh>
        );
      }
    }

    // Roof
    if (style === 'residential') {
      // Pitched roof
      elements.push(
        <mesh key="roof" position={[0, height + 2, 0]} rotation={[0, 0, 0]} castShadow>
          <coneGeometry args={[Math.max(width, depth) * 0.7, 4, 4]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.8} metalness={0.2} />
        </mesh>
      );
    } else {
      // Flat roof with details
      elements.push(
        <mesh key="roof" position={[0, height/2 + 0.5, 0]} castShadow>
          <boxGeometry args={[width + 0.5, 1, depth + 0.5]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.8} metalness={0.2} />
        </mesh>
      );
    }

    return elements;
  }, [width, height, depth, style]);

  return <group position={position}>{buildingElements}</group>;
};

export default RealisticBuilding;
