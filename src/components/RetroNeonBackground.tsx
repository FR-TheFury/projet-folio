
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Grille lumineuse au sol avec perspective infinie
const CyberpunkGrid = () => {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      // Animation très subtile sans clignotement
      const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 0.9;
      gridRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
          (child.material as any).opacity = pulse * 0.6;
        }
      });
    }
  });

  const gridElements = useMemo(() => {
    const elements = [];
    const gridSize = 400;
    const divisions = 60;
    const step = gridSize / divisions;
    
    // Lignes principales horizontales (cyan subtil)
    for (let i = 0; i <= divisions; i++) {
      const z = -gridSize / 2 + i * step;
      elements.push(
        <mesh key={`h-${i}`} position={[0, -80, z]}>
          <boxGeometry args={[gridSize, 0.5, 1]} />
          <meshLambertMaterial 
            color="#004466" 
            transparent 
            opacity={0.6}
            emissive="#002233"
            emissiveIntensity={0.2}
          />
        </mesh>
      );
    }
    
    // Lignes principales verticales (violet subtil)
    for (let i = 0; i <= divisions; i++) {
      const x = -gridSize / 2 + i * step;
      elements.push(
        <mesh key={`v-${i}`} position={[x, -80, 0]}>
          <boxGeometry args={[1, 0.5, gridSize]} />
          <meshLambertMaterial 
            color="#442266" 
            transparent 
            opacity={0.6}
            emissive="#221133"
            emissiveIntensity={0.2}
          />
        </mesh>
      );
    }
    
    return elements;
  }, []);

  return <group ref={gridRef}>{gridElements}</group>;
};

// Buildings cyberpunk avec textures propres
const CyberpunkCity = () => {
  const cityRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (cityRef.current) {
      // Rotation très lente de la ville
      cityRef.current.rotation.y = state.clock.elapsedTime * 0.008;
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
      
      // Couleurs subtiles pour les contours
      const edgeColors = ['#003355', '#330055', '#553300', '#005533', '#550033'];
      const edgeColor = edgeColors[Math.floor(Math.random() * edgeColors.length)];
      
      // Types de buildings variés
      const buildingType = Math.random();
      let height = baseHeight;
      
      buildingArray.push(
        <group key={i} position={[x, height / 2 - 80, z]}>
          {/* Building principal */}
          <mesh>
            <boxGeometry args={[width, height, depth]} />
            <meshLambertMaterial 
              color="#1a1a1a"
              transparent
              opacity={0.95}
            />
          </mesh>
          
          {/* Contours subtils du building */}
          <mesh>
            <boxGeometry args={[width + 0.5, height + 0.5, depth + 0.5]} />
            <meshLambertMaterial 
              color={edgeColor}
              wireframe
              transparent
              opacity={0.4}
              emissive={edgeColor}
              emissiveIntensity={0.2}
            />
          </mesh>
          
          {/* Tour supplémentaire pour certains buildings */}
          {buildingType > 0.6 && (
            <>
              <mesh position={[0, height / 2 + 15, 0]}>
                <boxGeometry args={[width * 0.6, 30, depth * 0.6]} />
                <meshLambertMaterial color="#1a1a1a" transparent opacity={0.95} />
              </mesh>
              <mesh position={[0, height / 2 + 15, 0]}>
                <boxGeometry args={[width * 0.6 + 0.4, 30.4, depth * 0.6 + 0.4]} />
                <meshLambertMaterial 
                  color={edgeColor}
                  wireframe
                  transparent
                  opacity={0.3}
                  emissive={edgeColor}
                  emissiveIntensity={0.15}
                />
              </mesh>
            </>
          )}
          
          {/* Antennes subtiles sur le toit */}
          {Math.random() > 0.5 && (
            <mesh position={[0, height / 2 + 8, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 16]} />
              <meshLambertMaterial 
                color="#666666"
                emissive="#333333"
                emissiveIntensity={0.3}
              />
            </mesh>
          )}
          
          {/* Fenêtres avec éclairage subtil */}
          {Array.from({ length: Math.floor(height / 12) }, (_, floor) => (
            <group key={floor}>
              {/* Fenêtres face avant */}
              <mesh position={[0, -height/2 + floor * 12 + 6, depth/2 + 0.2]}>
                <planeGeometry args={[width * 0.9, 8]} />
                <meshLambertMaterial 
                  color={Math.random() > 0.6 ? "#445566" : "#222222"}
                  transparent
                  opacity={0.8}
                  emissive={Math.random() > 0.6 ? "#223344" : "#000000"}
                  emissiveIntensity={0.2}
                />
              </mesh>
              {/* Fenêtres face arrière */}
              <mesh position={[0, -height/2 + floor * 12 + 6, -depth/2 - 0.2]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[width * 0.9, 8]} />
                <meshLambertMaterial 
                  color={Math.random() > 0.6 ? "#445566" : "#222222"}
                  transparent
                  opacity={0.8}
                  emissive={Math.random() > 0.6 ? "#223344" : "#000000"}
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

  return <group ref={cityRef}>{buildings}</group>;
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
  console.log("Rendering clean cyberpunk cityscape");

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
        onCreated={() => console.log("Clean cyberpunk cityscape environment loaded")}
      >
        {/* Contrôle de caméra immersif */}
        <CyberpunkCamera />
        
        {/* Brouillard atmosphérique cyberpunk */}
        <fog attach="fog" args={['#000815', 80, 350]} />
        
        {/* Grille lumineuse au sol */}
        <CyberpunkGrid />
        
        {/* Ville cyberpunk 3D */}
        <CyberpunkCity />
        
        {/* Éclairage ambiant sombre */}
        <ambientLight intensity={0.1} color="#001040" />
        
        {/* Éclairages subtils stratégiques */}
        <pointLight position={[0, 120, 0]} color="#004488" intensity={2} distance={200} />
        <pointLight position={[-80, 80, -80]} color="#440088" intensity={1.5} distance={160} />
        <pointLight position={[80, 80, 80]} color="#004455" intensity={1.5} distance={160} />
        <pointLight position={[0, 40, -120]} color="#554400" intensity={1.2} distance={140} />
        <pointLight position={[-120, 60, 0]} color="#440044" intensity={1.2} distance={140} />
        
        {/* Éclairage directionnel pour la profondeur */}
        <directionalLight 
          position={[40, 100, 40]} 
          color="#330066" 
          intensity={0.8}
          castShadow 
        />
        
        {/* Lumière de contraste */}
        <directionalLight 
          position={[-40, 60, -40]} 
          color="#003366" 
          intensity={0.6}
        />
      </Canvas>
    </div>
  );
};

export default RetroNeonBackground;
