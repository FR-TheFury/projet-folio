
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const RetroGrid = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.z = (state.clock.elapsedTime * 2) % 20 - 10;
    }
  });

  const gridGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(100, 100, 50, 50);
    return geometry;
  }, []);

  return (
    <mesh ref={meshRef} geometry={gridGeometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
      <meshBasicMaterial 
        color="#00ffff" 
        wireframe 
        transparent 
        opacity={0.3}
      />
    </mesh>
  );
};

const NeonCity = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.z = (state.clock.elapsedTime * 1.5) % 30 - 15;
    }
  });

  const buildings = useMemo(() => {
    const buildingArray = [];
    for (let i = 0; i < 20; i++) {
      const height = Math.random() * 15 + 5;
      const x = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 80;
      const color = Math.random() > 0.5 ? '#ff00ff' : '#00ffff';
      
      buildingArray.push(
        <mesh key={i} position={[x, height / 2, z]}>
          <boxGeometry args={[2, height, 2]} />
          <meshBasicMaterial 
            color={color} 
            wireframe 
            transparent 
            opacity={0.6}
          />
        </mesh>
      );
    }
    return buildingArray;
  }, []);

  return (
    <group ref={groupRef}>
      {buildings}
    </group>
  );
};

const StarField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.5}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const RetroNeonBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 75 }}
        style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0a2e 50%, #16213e 100%)' }}
      >
        <fog attach="fog" args={['#0a0a0a', 10, 100]} />
        
        {/* Grilles rétro qui défilent */}
        <RetroGrid />
        <RetroGrid />
        
        {/* Ville néon */}
        <NeonCity />
        
        {/* Champ d'étoiles */}
        <StarField />
        
        {/* Éclairage d'ambiance */}
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 20, 0]} color="#00ffff" intensity={0.5} />
        <pointLight position={[-20, 10, -20]} color="#ff00ff" intensity={0.3} />
        <pointLight position={[20, 10, -20]} color="#ffff00" intensity={0.3} />
      </Canvas>
    </div>
  );
};

export default RetroNeonBackground;
