
import React, { useMemo } from 'react';
import RealisticBuilding from './RealisticBuilding';

const CityGenerator: React.FC = () => {
  const buildings = useMemo(() => {
    const buildingArray = [];
    const citySize = 400;
    const blockSize = 40;
    const roadWidth = 8;
    
    const buildingStyles: ('modern' | 'classic' | 'residential' | 'office')[] = 
      ['modern', 'classic', 'residential', 'office'];

    for (let x = -citySize/2; x < citySize/2; x += blockSize) {
      for (let z = -citySize/2; z < citySize/2; z += blockSize) {
        // Skip some areas for roads
        if ((x + citySize/2) % (blockSize * 2) < roadWidth || 
            (z + citySize/2) % (blockSize * 2) < roadWidth) {
          continue;
        }

        const buildingWidth = Math.random() * 15 + 10;
        const buildingDepth = Math.random() * 15 + 10;
        const buildingHeight = Math.random() * 80 + 20;
        const style = buildingStyles[Math.floor(Math.random() * buildingStyles.length)];
        
        // Add some variation to position
        const offsetX = (Math.random() - 0.5) * 5;
        const offsetZ = (Math.random() - 0.5) * 5;
        
        buildingArray.push(
          <RealisticBuilding
            key={`${x}-${z}`}
            position={[x + offsetX, buildingHeight / 2, z + offsetZ]}
            width={buildingWidth}
            height={buildingHeight}
            depth={buildingDepth}
            style={style}
          />
        );
      }
    }
    
    return buildingArray;
  }, []);

  return <group>{buildings}</group>;
};

export default CityGenerator;
