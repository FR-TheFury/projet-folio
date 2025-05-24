
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Grille lumineuse au sol avec perspective infinie
const CyberpunkGrid = () => {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
      gridRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
          (child.material as any).opacity = pulse * (0.6 + Math.sin(state.clock.elapsedTime + index * 0.2) * 0.2);
        }
      });
    }
  });

  const gridElements = useMemo(() => {
    const elements = [];
    const gridSize = 400;
    const divisions = 60;
    const step = gridSize / divisions;
    
    // Lignes principales horizontales (cyan)
    for (let i = 0; i <= divisions; i++) {
      const z = -gridSize / 2 + i * step;
      elements.push(
        <mesh key={`h-${i}`} position={[0, -80, z]}>
          <boxGeometry args={[gridSize, 0.5, 1]} />
          <meshLambertMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.8}
            emissive="#00ffff"
            emissiveIntensity={0.4}
          />
        </mesh>
      );
    }
    
    // Lignes principales verticales (magenta)
    for (let i = 0; i <= divisions; i++) {
      const x = -gridSize / 2 + i * step;
      elements.push(
        <mesh key={`v-${i}`} position={[x, -80, 0]}>
          <boxGeometry args={[1, 0.5, gridSize]} />
          <meshLambertMaterial 
            color="#ff00ff" 
            transparent 
            opacity={0.8}
            emissive="#ff00ff"
            emissiveIntensity={0.4}
          />
        </mesh>
      );
    }
    
    return elements;
  }, []);

  return <group ref={gridRef}>{gridElements}</group>;
};

// Buildings cyberpunk avec architecture variée
const CyberpunkCity = () => {
  const cityRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (cityRef.current) {
      // Rotation très lente de la ville
      cityRef.current.rotation.y = state.clock.elapsedTime * 0.008;
      
      // Animation des néons sur les buildings
      cityRef.current.children.forEach((building, index) => {
        if (building instanceof THREE.Group) {
          const neonPulse = Math.sin(state.clock.elapsedTime * 3 + index * 0.7) * 0.4 + 0.6;
          building.children.forEach((child) => {
            if (child instanceof THREE.Mesh && child.userData.isNeon) {
              (child.material as any).opacity = neonPulse;
              (child.material as any).emissiveIntensity = neonPulse * 0.6;
            }
          });
        }
      });
    }
  });

  const buildings = useMemo(() => {
    const buildingArray = [];
    const citySize = 300;
    const buildingCount = 120;
    
    for (let i = 0; i < buildingCount; i++) {
      const x = (Math.random() - 0.5) * citySize;
      const z = (Math.random() - 0.5) * citySize;
      const baseHeight = Math.random() * 80 + 30;
      const width = Math.random() * 12 + 6;
      const depth = Math.random() * 12 + 6;
      
      // Couleurs néon variées
      const neonColors = ['#00ffff', '#ff00ff', '#ffff00', '#ff0080', '#8000ff', '#00ff80', '#ff4000'];
      const neonColor = neonColors[Math.floor(Math.random() * neonColors.length)];
      
      // Types de buildings variés
      const buildingType = Math.random();
      let height = baseHeight;
      
      buildingArray.push(
        <group key={i} position={[x, height / 2 - 80, z]}>
          {/* Building principal */}
          <mesh>
            <boxGeometry args={[width, height, depth]} />
            <meshLambertMaterial 
              color="#0a0a0a"
              transparent
              opacity={0.95}
            />
          </mesh>
          
          {/* Contours néon du building */}
          <mesh userData={{ isNeon: true }}>
            <boxGeometry args={[width + 1, height + 1, depth + 1]} />
            <meshLambertMaterial 
              color={neonColor}
              wireframe
              transparent
              opacity={0.9}
              emissive={neonColor}
              emissiveIntensity={0.5}
            />
          </mesh>
          
          {/* Tour supplémentaire pour certains buildings */}
          {buildingType > 0.6 && (
            <>
              <mesh position={[0, height / 2 + 15, 0]}>
                <boxGeometry args={[width * 0.6, 30, depth * 0.6]} />
                <meshLambertMaterial color="#0a0a0a" transparent opacity={0.95} />
              </mesh>
              <mesh position={[0, height / 2 + 15, 0]} userData={{ isNeon: true }}>
                <boxGeometry args={[width * 0.6 + 0.8, 30.8, depth * 0.6 + 0.8]} />
                <meshLambertMaterial 
                  color={neonColor}
                  wireframe
                  transparent
                  opacity={0.8}
                  emissive={neonColor}
                  emissiveIntensity={0.4}
                />
              </mesh>
            </>
          )}
          
          {/* Antennes et détails sur le toit */}
          {Math.random() > 0.5 && (
            <mesh position={[0, height / 2 + 8, 0]} userData={{ isNeon: true }}>
              <cylinderGeometry args={[0.3, 0.3, 16]} />
              <meshLambertMaterial 
                color={neonColor}
                emissive={neonColor}
                emissiveIntensity={0.7}
              />
            </mesh>
          )}
          
          {/* Fenêtres lumineuses étage par étage */}
          {Array.from({ length: Math.floor(height / 12) }, (_, floor) => (
            <group key={floor}>
              {/* Fenêtres face avant */}
              <mesh position={[0, -height/2 + floor * 12 + 6, depth/2 + 0.2]}>
                <planeGeometry args={[width * 0.9, 8]} />
                <meshLambertMaterial 
                  color={Math.random() > 0.4 ? neonColor : '#222222'}
                  transparent
                  opacity={0.9}
                  emissive={Math.random() > 0.4 ? neonColor : '#000000'}
                  emissiveIntensity={0.3}
                />
              </mesh>
              {/* Fenêtres face arrière */}
              <mesh position={[0, -height/2 + floor * 12 + 6, -depth/2 - 0.2]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[width * 0.9, 8]} />
                <meshLambertMaterial 
                  color={Math.random() > 0.4 ? neonColor : '#222222'}
                  transparent
                  opacity={0.9}
                  emissive={Math.random() > 0.4 ? neonColor : '#000000'}
                  emissiveIntensity={0.3}
                />
              </mesh>
            </group>
          ))}
        </group>
      );
    }
    
    return buildingArray;
  }, []);

  return <group ref={cityRef}>{buildings}</group>;
};

// Particules atmosphériques flottantes
const AtmosphericParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      // Position dans un grand volume 3D
      positions[i * 3] = (Math.random() - 0.5) * 500;
      positions[i * 3 + 1] = Math.random() * 150 - 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 500;
      
      // Couleurs cyberpunk variées
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1; // Cyan
      } else if (colorChoice < 0.6) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 1; // Magenta
      } else if (colorChoice < 0.8) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 0; // Jaune
      } else {
        colors[i * 3] = 0.5; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 1; // Violet
      }
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      // Rotation lente des particules
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      
      // Mouvement vertical flottant
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.01) * 0.02;
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

// Caméra avec mouvement aérien immersif
const CyberpunkCamera = () => {
  useFrame((state) => {
    const time = state.clock.elapsedTime * 0.05;
    
    // Mouvement de caméra aérienne qui survole la ville
    state.camera.position.x = Math.sin(time) * 80 + Math.cos(time * 0.7) * 40;
    state.camera.position.z = Math.cos(time) * 80 + Math.sin(time * 0.7) * 40;
    state.camera.position.y = 60 + Math.sin(time * 0.3) * 20;
    
    // La caméra regarde légèrement vers le bas pour voir la ville
    const lookAtY = -30 + Math.sin(time * 0.2) * 10;
    state.camera.lookAt(0, lookAtY, 0);
  });
  
  return null;
};

const RetroNeonBackground: React.FC = () => {
  console.log("Rendering immersive cyberpunk cityscape");

  return (
    <div className="fixed inset-0 z-[-1] w-full h-full">
      <Canvas
        camera={{ 
          position: [60, 60, 60], 
          fov: 85,
          near: 0.1,
          far: 800
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'linear-gradient(180deg, #000510 0%, #001020 15%, #002030 35%, #000815 70%, #000000 100%)'
        }}
        onCreated={() => console.log("Cyberpunk cityscape environment loaded")}
      >
        {/* Contrôle de caméra immersif */}
        <CyberpunkCamera />
        
        {/* Brouillard atmosphérique cyberpunk */}
        <fog attach="fog" args={['#000815', 80, 350]} />
        
        {/* Grille lumineuse au sol */}
        <CyberpunkGrid />
        
        {/* Ville cyberpunk 3D */}
        <CyberpunkCity />
        
        {/* Particules atmosphériques */}
        <AtmosphericParticles />
        
        {/* Éclairage ambiant sombre */}
        <ambientLight intensity={0.05} color="#001040" />
        
        {/* Éclairages néon strategiques */}
        <pointLight position={[0, 120, 0]} color="#00ffff" intensity={3} distance={200} />
        <pointLight position={[-80, 80, -80]} color="#ff00ff" intensity={2.5} distance={160} />
        <pointLight position={[80, 80, 80]} color="#8000ff" intensity={2.5} distance={160} />
        <pointLight position={[0, 40, -120]} color="#ffff00" intensity={2} distance={140} />
        <pointLight position={[-120, 60, 0]} color="#ff0080" intensity={2} distance={140} />
        
        {/* Éclairage directionnel pour la profondeur */}
        <directionalLight 
          position={[40, 100, 40]} 
          color="#ff0080" 
          intensity={1.2}
          castShadow 
        />
        
        {/* Lumière de contraste */}
        <directionalLight 
          position={[-40, 60, -40]} 
          color="#00ffff" 
          intensity={0.8}
        />
      </Canvas>
    </div>
  );
};

export default RetroNeonBackground;
