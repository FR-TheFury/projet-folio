
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const NeonCity = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.z = (state.clock.elapsedTime * 2) % 80 - 40;
    }
  });

  const buildings = useMemo(() => {
    const buildingArray = [];
    for (let i = 0; i < 50; i++) {
      const height = Math.random() * 15 + 3;
      const width = Math.random() * 2 + 0.5;
      const depth = Math.random() * 2 + 0.5;
      const x = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 60;
      const colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff0080'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      buildingArray.push(
        <mesh key={i} position={[x, height / 2, z]}>
          <boxGeometry args={[width, height, depth]} />
          <meshBasicMaterial 
            color={color} 
            wireframe 
            transparent 
            opacity={1}
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
      meshRef.current.position.z = (state.clock.elapsedTime * 3) % 30 - 15;
    }
  });

  const gridGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(100, 100, 50, 50);
    return geometry;
  }, []);

  return (
    <mesh ref={meshRef} geometry={gridGeometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
      <meshBasicMaterial 
        color="#00ffff" 
        wireframe 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
};

const NeonParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      pointsRef.current.position.z = (state.clock.elapsedTime * 1) % 30 - 15;
    }
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={1.2}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
};

const DebugCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#ff0000" />
    </mesh>
  );
};

const RetroNeonBackground: React.FC = () => {
  console.log("RetroNeonBackground is rendering");

  return (
    <div className="fixed inset-0 z-[-1] w-full h-full">
      <Canvas
        camera={{ position: [0, 8, 15], fov: 75 }}
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0a2e 30%, #16213e 70%, #0a0a0a 100%)'
        }}
        onCreated={() => console.log("Canvas created successfully")}
      >
        <fog attach="fog" args={['#0a0a0a', 10, 100]} />
        
        {/* Debug cube temporaire pour vérifier si Three.js fonctionne */}
        <DebugCube />
        
        {/* Grilles rétro qui défilent */}
        <RetroGrid />
        
        {/* Ville néon */}
        <NeonCity />
        
        {/* Particules néon */}
        <NeonParticles />
        
        {/* Éclairage renforcé */}
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 20, 0]} color="#00ffff" intensity={2} distance={50} />
        <pointLight position={[-30, 15, -30]} color="#ff00ff" intensity={1.5} distance={40} />
        <pointLight position={[30, 15, -30]} color="#ffff00" intensity={1.5} distance={40} />
        <directionalLight position={[10, 20, 10]} color="#00ffff" intensity={1} />
      </Canvas>
    </div>
  );
};

export default RetroNeonBackground;
