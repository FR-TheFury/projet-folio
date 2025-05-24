
import { useFrame } from '@react-three/fiber';

interface CyberpunkCameraProps {
  movementType?: 'orbital' | 'vertical' | 'mixed';
}

const CyberpunkCamera = ({ movementType = 'mixed' }: CyberpunkCameraProps) => {
  useFrame((state) => {
    const time = state.clock.elapsedTime * 0.03;
    
    switch (movementType) {
      case 'orbital':
        state.camera.position.x = Math.sin(time) * 60 + Math.cos(time * 0.7) * 30;
        state.camera.position.z = Math.cos(time) * 60 + Math.sin(time * 0.7) * 30;
        state.camera.position.y = 40;
        break;
        
      case 'vertical':
        state.camera.position.x = 50;
        state.camera.position.z = 50;
        state.camera.position.y = 40 + Math.sin(time * 0.5) * 25;
        break;
        
      case 'mixed':
      default:
        state.camera.position.x = Math.sin(time) * 60 + Math.cos(time * 0.7) * 30;
        state.camera.position.z = Math.cos(time) * 60 + Math.sin(time * 0.7) * 30;
        state.camera.position.y = 40 + Math.sin(time * 0.3) * 15;
        break;
    }
    
    const lookAtY = -20 + Math.sin(time * 0.2) * 8;
    state.camera.lookAt(0, lookAtY, 0);
  });
  
  return null;
};

export default CyberpunkCamera;
