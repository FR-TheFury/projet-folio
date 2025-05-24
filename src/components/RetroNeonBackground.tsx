
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const NeonCity = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.z = (state.clock.elapsedTime * 3) % 100 - 50;
    }
  });

  const buildings = useMemo(() => {
    const buildingArray = [];
    for (let i = 0; i < 80; i++) {
      const height = Math.random() * 25 + 5;
      const width = Math.random() * 3 + 1;
      const depth = Math.random() * 3 + 1;
      const x = (Math.random() - 0.5) * 200;
      const z = (Math.random() - 0.5) * 200;
      const colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff0080'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      buildingArray.push(
        <mesh key={i} position={[x, height / 2, z]}>
          <boxGeometry args={[width, height, depth]} />
          <meshBasicMaterial 
            color={color} 
            wireframe 
            transparent 
            opacity={0.7}
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

const RetroGrid = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.z = (state.clock.elapsedTime * 4) % 40 - 20;
    }
  });

  const gridGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(200, 200, 100, 100);
    return geometry;
  }, []);

  return (
    <mesh ref={meshRef} geometry={gridGeometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -15, 0]}>
      <meshBasicMaterial 
        color="#00ffff" 
        wireframe 
        transparent 
        opacity={0.4}
      />
    </mesh>
  );
};

const NeonParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.position.z = (state.clock.elapsedTime * 2) % 50 - 25;
    }
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

const FlyingCamera = ({ children }: { children: React.ReactNode }) => {
  const cameraRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cameraRef.current) {
      // Mouvement sinusoïdal pour simuler un vol fluide
      cameraRef.current.position.y = 10 + Math.sin(state.clock.elapsedTime * 0.5) * 3;
      cameraRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return <group ref={cameraRef}>{children}</group>;
};

const RetroNeonBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 15, 20], fov: 75 }}
        style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0a2e 30%, #16213e 70%, #0a0a0a 100%)' }}
      >
        <fog attach="fog" args={['#0a0a0a', 20, 200]} />
        
        <FlyingCamera>
          {/* Grilles rétro qui défilent en continu */}
          <RetroGrid />
          
          {/* Ville néon avec des bâtiments plus nombreux */}
          <NeonCity />
          
          {/* Particules néon */}
          <NeonParticles />
        </FlyingCamera>
        
        {/* Éclairage d'ambiance renforcé */}
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 30, 0]} color="#00ffff" intensity={1} distance={100} />
        <pointLight position={[-50, 20, -50]} color="#ff00ff" intensity={0.8} distance={80} />
        <pointLight position={[50, 20, -50]} color="#ffff00" intensity={0.8} distance={80} />
        <directionalLight position={[10, 30, 10]} color="#00ffff" intensity={0.5} />
      </Canvas>
    </div>
  );
};

export default RetroNeonBackground;
