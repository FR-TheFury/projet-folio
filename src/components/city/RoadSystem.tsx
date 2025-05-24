
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createRoadMaterial } from './CityMaterials';

const RoadSystem: React.FC = () => {
  const roadMaterial = useMemo(() => createRoadMaterial(), []);
  
  const roads = useMemo(() => {
    const roadElements = [];
    const citySize = 400;
    const roadWidth = 8;
    const blockSize = 40;

    // Main roads (horizontal)
    for (let z = -citySize/2; z <= citySize/2; z += blockSize * 2) {
      roadElements.push(
        <mesh key={`road-h-${z}`} position={[0, 0.1, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[citySize, roadWidth]} />
          <meshStandardMaterial color="#404040" roughness={0.9} metalness={0.1} />
        </mesh>
      );
      
      // Road markings
      for (let x = -citySize/2; x <= citySize/2; x += 20) {
        roadElements.push(
          <mesh key={`marking-h-${z}-${x}`} position={[x, 0.11, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[8, 0.3]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        );
      }
    }

    // Main roads (vertical)
    for (let x = -citySize/2; x <= citySize/2; x += blockSize * 2) {
      roadElements.push(
        <mesh key={`road-v-${x}`} position={[x, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[roadWidth, citySize]} />
          <meshStandardMaterial color="#404040" roughness={0.9} metalness={0.1} />
        </mesh>
      );
      
      // Road markings
      for (let z = -citySize/2; z <= citySize/2; z += 20) {
        roadElements.push(
          <mesh key={`marking-v-${x}-${z}`} position={[x, 0.11, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.3, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        );
      }
    }

    // Sidewalks
    for (let z = -citySize/2; z <= citySize/2; z += blockSize * 2) {
      // Left sidewalk
      roadElements.push(
        <mesh key={`sidewalk-h-l-${z}`} position={[-roadWidth/2 - 1, 0.15, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[citySize, 2]} />
          <meshStandardMaterial color="#666666" roughness={0.8} />
        </mesh>
      );
      // Right sidewalk
      roadElements.push(
        <mesh key={`sidewalk-h-r-${z}`} position={[roadWidth/2 + 1, 0.15, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[citySize, 2]} />
          <meshStandardMaterial color="#666666" roughness={0.8} />
        </mesh>
      );
    }

    return roadElements;
  }, []);

  return <group>{roads}</group>;
};

export default RoadSystem;
