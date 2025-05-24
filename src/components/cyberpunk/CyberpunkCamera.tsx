
import { useFrame } from '@react-three/fiber';

const CyberpunkCamera = () => {
  useFrame((state) => {
    const time = state.clock.elapsedTime * 0.03;
    
    state.camera.position.x = Math.sin(time) * 60 + Math.cos(time * 0.7) * 30;
    state.camera.position.z = Math.cos(time) * 60 + Math.sin(time * 0.7) * 30;
    state.camera.position.y = 40 + Math.sin(time * 0.3) * 15;
    
    const lookAtY = -20 + Math.sin(time * 0.2) * 8;
    state.camera.lookAt(0, lookAtY, 0);
  });
  
  return null;
};

export default CyberpunkCamera;
