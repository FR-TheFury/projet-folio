
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Tunnel 3D infini avec anneaux néon
const NeonTunnel = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.z = (state.clock.elapsedTime * 15) % 100 - 50;
    }
  });

  const rings = useMemo(() => {
    const ringArray = [];
    for (let i = 0; i < 20; i++) {
      const z = i * 10 - 100;
      const colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff0080', '#80ff00'];
      const color = colors[i % colors.length];
      
      ringArray.push(
        <mesh key={i} position={[0, 0, z]} rotation={[0, 0, 0]}>
          <torusGeometry args={[25, 0.8, 8, 32]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      );
    }
    return ringArray;
  }, []);

  return <group ref={groupRef}>{rings}</group>;
};

// Ville cyberpunk 3D
const CyberpunkCity = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.z = (state.clock.elapsedTime * 8) % 120 - 60;
    }
  });

  const buildings = useMemo(() => {
    const buildingArray = [];
    
    // Buildings de chaque côté de la route
    for (let side = 0; side < 2; side++) {
      const xOffset = side === 0 ? -50 : 50;
      
      for (let i = 0; i < 30; i++) {
        const height = Math.random() * 40 + 10;
        const width = Math.random() * 8 + 3;
        const depth = Math.random() * 12 + 5;
        const x = xOffset + (Math.random() - 0.5) * 30;
        const z = i * 8 - 120;
        const colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff0080', '#8000ff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        buildingArray.push(
          <group key={`building-${side}-${i}`} position={[x, height / 2, z]}>
            {/* Building principal */}
            <mesh>
              <boxGeometry args={[width, height, depth]} />
              <meshLambertMaterial 
                color="#111111" 
                transparent 
                opacity={0.9}
              />
            </mesh>
            
            {/* Contours néon */}
            <mesh>
              <boxGeometry args={[width + 0.2, height + 0.2, depth + 0.2]} />
              <meshBasicMaterial 
                color={color} 
                wireframe 
                transparent 
                opacity={0.6}
              />
            </mesh>
            
            {/* Fenêtres lumineuses */}
            {Array.from({ length: Math.floor(height / 4) }, (_, floor) => (
              <mesh key={floor} position={[0, -height/2 + floor * 4 + 2, depth/2 + 0.1]}>
                <planeGeometry args={[width * 0.8, 2]} />
                <meshBasicMaterial 
                  color={Math.random() > 0.7 ? color : '#333333'} 
                  transparent 
                  opacity={0.8}
                />
              </mesh>
            ))}
          </group>
        );
      }
    }
    return buildingArray;
  }, []);

  return <group ref={groupRef}>{buildings}</group>;
};

// Route 3D avec lignes néon
const NeonHighway = () => {
  const roadRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (roadRef.current) {
      roadRef.current.position.z = (state.clock.elapsedTime * 20) % 40 - 20;
    }
  });

  const roadElements = useMemo(() => {
    const elements = [];
    
    // Route principale
    elements.push(
      <mesh key="road" position={[0, -1, 0]}>
        <planeGeometry args={[30, 200]} />
        <meshLambertMaterial color="#111111" />
      </mesh>
    );
    
    // Lignes centrales
    for (let i = 0; i < 20; i++) {
      elements.push(
        <mesh key={`centerline-${i}`} position={[0, -0.9, i * 10 - 100]}>
          <boxGeometry args={[0.8, 0.1, 4]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
      );
    }
    
    // Bordures néon
    elements.push(
      <mesh key="border-left" position={[-15, -0.8, 0]}>
        <boxGeometry args={[0.3, 0.2, 200]} />
        <meshBasicMaterial color="#ff00ff" />
      </mesh>
    );
    
    elements.push(
      <mesh key="border-right" position={[15, -0.8, 0]}>
        <boxGeometry args={[0.3, 0.2, 200]} />
        <meshBasicMaterial color="#ff00ff" />
      </mesh>
    );
    
    return elements;
  }, []);

  return <group ref={roadRef}>{roadElements}</group>;
};

// Particules volumétriques avancées
const VolumetricParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      
      // Couleurs néon
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1; // Cyan
      } else if (colorChoice < 0.6) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 1; // Magenta
      } else {
        colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 0; // Jaune
      }
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.position.z = (state.clock.elapsedTime * 5) % 50 - 25;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          count={particles.positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particles.colors}
          count={particles.colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

// Orbes flottants
const FloatingOrbs = () => {
  const orbsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (orbsRef.current) {
      orbsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const orbs = useMemo(() => {
    const orbArray = [];
    for (let i = 0; i < 15; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = Math.random() * 50 + 10;
      const z = (Math.random() - 0.5) * 100;
      const colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff0080', '#8000ff'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      orbArray.push(
        <Sphere key={i} args={[2, 16, 16]} position={[x, y, z]}>
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.6}
          />
        </Sphere>
      );
    }
    return orbArray;
  }, []);

  return <group ref={orbsRef}>{orbs}</group>;
};

const RetroNeonBackground: React.FC = () => {
  console.log("Rendering immersive 3D cyberpunk background");

  return (
    <div className="fixed inset-0 z-[-1] w-full h-full">
      <Canvas
        camera={{ 
          position: [0, 5, 10], 
          fov: 80,
          near: 0.1,
          far: 1000
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0030 30%, #000a20 70%, #0a0a0a 100%)'
        }}
        onCreated={() => console.log("3D Cyberpunk world initialized")}
      >
        {/* Brouillard atmosphérique */}
        <fog attach="fog" args={['#000a20', 20, 200]} />
        
        {/* Route néon */}
        <NeonHighway />
        
        {/* Tunnel infini */}
        <NeonTunnel />
        
        {/* Ville cyberpunk */}
        <CyberpunkCity />
        
        {/* Particules volumétriques */}
        <VolumetricParticles />
        
        {/* Orbes flottants */}
        <FloatingOrbs />
        
        {/* Éclairage dramatique */}
        <ambientLight intensity={0.2} color="#000a20" />
        
        {/* Projecteurs néon */}
        <pointLight position={[0, 30, -20]} color="#00ffff" intensity={3} distance={100} />
        <pointLight position={[-40, 20, -40]} color="#ff00ff" intensity={2} distance={80} />
        <pointLight position={[40, 20, -40]} color="#ffff00" intensity={2} distance={80} />
        <pointLight position={[0, 10, 30]} color="#ff0080" intensity={1.5} distance={60} />
        
        {/* Lumière directionnelle pour la profondeur */}
        <directionalLight 
          position={[10, 50, 10]} 
          color="#8000ff" 
          intensity={1.5} 
          castShadow 
        />
      </Canvas>
    </div>
  );
};

export default RetroNeonBackground;
