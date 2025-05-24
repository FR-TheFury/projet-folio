
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Grille lumineuse au sol
const CyberpunkGrid = () => {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      // Animation subtile de pulsation
      const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 0.9;
      gridRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
          (child.material as any).opacity = pulse * (0.3 + Math.sin(state.clock.elapsedTime + index * 0.1) * 0.1);
        }
      });
    }
  });

  const gridElements = useMemo(() => {
    const elements = [];
    const gridSize = 200;
    const divisions = 40;
    const step = gridSize / divisions;
    
    // Lignes horizontales
    for (let i = 0; i <= divisions; i++) {
      const y = -gridSize / 2 + i * step;
      elements.push(
        <mesh key={`h-${i}`} position={[0, -50, y]}>
          <boxGeometry args={[gridSize, 0.2, 0.3]} />
          <meshBasicMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.4}
            emissive="#00ffff"
            emissiveIntensity={0.2}
          />
        </mesh>
      );
    }
    
    // Lignes verticales
    for (let i = 0; i <= divisions; i++) {
      const x = -gridSize / 2 + i * step;
      elements.push(
        <mesh key={`v-${i}`} position={[x, -50, 0]}>
          <boxGeometry args={[0.3, 0.2, gridSize]} />
          <meshBasicMaterial 
            color="#ff00ff" 
            transparent 
            opacity={0.4}
            emissive="#ff00ff"
            emissiveIntensity={0.2}
          />
        </mesh>
      );
    }
    
    return elements;
  }, []);

  return <group ref={gridRef}>{gridElements}</group>;
};

// Buildings cyberpunk avec contours néon
const CyberpunkBuildings = () => {
  const buildingsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (buildingsRef.current) {
      // Rotation lente de l'ensemble
      buildingsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      
      // Animation des néons
      buildingsRef.current.children.forEach((building, index) => {
        if (building instanceof THREE.Group) {
          const neonPulse = Math.sin(state.clock.elapsedTime * 2 + index * 0.5) * 0.3 + 0.7;
          building.children.forEach((child) => {
            if (child instanceof THREE.Mesh && child.userData.isNeon) {
              (child.material as any).opacity = neonPulse;
              (child.material as any).emissiveIntensity = neonPulse * 0.5;
            }
          });
        }
      });
    }
  });

  const buildings = useMemo(() => {
    const buildingArray = [];
    const citySize = 150;
    const buildingCount = 80;
    
    for (let i = 0; i < buildingCount; i++) {
      const x = (Math.random() - 0.5) * citySize;
      const z = (Math.random() - 0.5) * citySize;
      const height = Math.random() * 60 + 20;
      const width = Math.random() * 8 + 4;
      const depth = Math.random() * 8 + 4;
      
      const colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff0080', '#8000ff', '#00ff80'];
      const neonColor = colors[Math.floor(Math.random() * colors.length)];
      
      buildingArray.push(
        <group key={i} position={[x, height / 2 - 50, z]}>
          {/* Building principal */}
          <mesh>
            <boxGeometry args={[width, height, depth]} />
            <meshLambertMaterial 
              color="#0a0a0a"
              transparent
              opacity={0.9}
            />
          </mesh>
          
          {/* Contours néon */}
          <mesh userData={{ isNeon: true }}>
            <boxGeometry args={[width + 0.5, height + 0.5, depth + 0.5]} />
            <meshBasicMaterial 
              color={neonColor}
              wireframe
              transparent
              opacity={0.8}
              emissive={neonColor}
              emissiveIntensity={0.3}
            />
          </mesh>
          
          {/* Antennes sur certains buildings */}
          {Math.random() > 0.7 && (
            <mesh position={[0, height / 2 + 5, 0]} userData={{ isNeon: true }}>
              <cylinderGeometry args={[0.2, 0.2, 10]} />
              <meshBasicMaterial 
                color={neonColor}
                emissive={neonColor}
                emissiveIntensity={0.5}
              />
            </mesh>
          )}
          
          {/* Fenêtres lumineuses */}
          {Array.from({ length: Math.floor(height / 8) }, (_, floor) => (
            <group key={floor}>
              {/* Face avant */}
              <mesh position={[0, -height/2 + floor * 8 + 4, depth/2 + 0.1]}>
                <planeGeometry args={[width * 0.8, 4]} />
                <meshBasicMaterial 
                  color={Math.random() > 0.6 ? neonColor : '#333333'}
                  transparent
                  opacity={0.8}
                  emissive={Math.random() > 0.6 ? neonColor : '#000000'}
                  emissiveIntensity={0.2}
                />
              </mesh>
              {/* Face arrière */}
              <mesh position={[0, -height/2 + floor * 8 + 4, -depth/2 - 0.1]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[width * 0.8, 4]} />
                <meshBasicMaterial 
                  color={Math.random() > 0.6 ? neonColor : '#333333'}
                  transparent
                  opacity={0.8}
                  emissive={Math.random() > 0.6 ? neonColor : '#000000'}
                  emissiveIntensity={0.2}
                />
              </mesh>
            </group>
          ))}
        </group>
      );
    }
    
    return buildingArray;
  }, []);

  return <group ref={buildingsRef}>{buildings}</group>;
};

// Particules atmosphériques
const CyberpunkParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    const colors = new Float32Array(1000 * 3);
    
    for (let i = 0; i < 1000; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 300;
      positions[i * 3 + 1] = Math.random() * 100 - 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
      
      // Couleurs cyberpunk
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1; // Cyan
      } else if (colorChoice < 0.8) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 1; // Magenta
      } else {
        colors[i * 3] = 0.5; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 1; // Violet
      }
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.005;
      
      // Animation de flottement
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.01;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
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
        size={1.5}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

// Caméra animée
const AnimatedCamera = () => {
  useFrame((state) => {
    // Mouvement orbital lent de la caméra
    const time = state.clock.elapsedTime * 0.1;
    state.camera.position.x = Math.sin(time) * 50;
    state.camera.position.z = Math.cos(time) * 50;
    state.camera.position.y = 40 + Math.sin(time * 0.5) * 10;
    
    // La caméra regarde vers le centre de la ville
    state.camera.lookAt(0, -20, 0);
  });
  
  return null;
};

const RetroNeonBackground: React.FC = () => {
  console.log("Rendering immersive cyberpunk city environment");

  return (
    <div className="fixed inset-0 z-[-1] w-full h-full">
      <Canvas
        camera={{ 
          position: [0, 40, 50], 
          fov: 75,
          near: 0.1,
          far: 500
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'linear-gradient(180deg, #0a0015 0%, #1a0030 20%, #000a20 60%, #0a0a0a 100%)'
        }}
        onCreated={() => console.log("Cyberpunk city environment initialized")}
      >
        {/* Contrôle de la caméra */}
        <AnimatedCamera />
        
        {/* Brouillard atmosphérique dense */}
        <fog attach="fog" args={['#000a20', 50, 200]} />
        
        {/* Grille lumineuse au sol */}
        <CyberpunkGrid />
        
        {/* Buildings cyberpunk */}
        <CyberpunkBuildings />
        
        {/* Particules atmosphériques */}
        <CyberpunkParticles />
        
        {/* Éclairage cyberpunk */}
        <ambientLight intensity={0.1} color="#000a40" />
        
        {/* Projecteurs néon stratégiques */}
        <pointLight position={[0, 100, 0]} color="#00ffff" intensity={2} distance={150} />
        <pointLight position={[-50, 50, -50]} color="#ff00ff" intensity={1.5} distance={100} />
        <pointLight position={[50, 50, 50]} color="#8000ff" intensity={1.5} distance={100} />
        <pointLight position={[0, 20, 0]} color="#ffff00" intensity={1} distance={80} />
        
        {/* Éclairage directionnel pour la profondeur */}
        <directionalLight 
          position={[20, 80, 20]} 
          color="#ff0080" 
          intensity={0.8}
          castShadow 
        />
        
        {/* Lumière rimlight */}
        <directionalLight 
          position={[-20, 30, -20]} 
          color="#00ffff" 
          intensity={0.5}
        />
      </Canvas>
    </div>
  );
};

export default RetroNeonBackground;
