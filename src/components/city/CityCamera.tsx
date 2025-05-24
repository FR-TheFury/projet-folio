
import React from 'react';
import { useFrame } from '@react-three/fiber';

interface CityCameraProps {
  movementType?: 'smooth' | 'cinematic' | 'static';
}

const CityCamera: React.FC<CityCameraProps> = ({ movementType = 'cinematic' }) => {
  useFrame((state) => {
    const time = state.clock.elapsedTime * 0.02;
    
    switch (movementType) {
      case 'cinematic':
        // Smooth cinematic movement
        state.camera.position.x = Math.sin(time) * 120 + Math.cos(time * 0.3) * 40;
        state.camera.position.z = Math.cos(time) * 120 + Math.sin(time * 0.3) * 40;
        state.camera.position.y = 60 + Math.sin(time * 0.5) * 20;
        
        // Dynamic look-at with slight offset
        const lookAtX = Math.sin(time * 0.8) * 20;
        const lookAtZ = Math.cos(time * 0.8) * 20;
        state.camera.lookAt(lookAtX, 10, lookAtZ);
        break;
        
      case 'smooth':
        // Gentle circular movement
        state.camera.position.x = Math.sin(time * 0.5) * 100;
        state.camera.position.z = Math.cos(time * 0.5) * 100;
        state.camera.position.y = 80;
        state.camera.lookAt(0, 0, 0);
        break;
        
      case 'static':
        // Fixed position with slight movement
        state.camera.position.x = 150;
        state.camera.position.z = 150;
        state.camera.position.y = 100 + Math.sin(time) * 5;
        state.camera.lookAt(0, 0, 0);
        break;
    }
  });
  
  return null;
};

export default CityCamera;
