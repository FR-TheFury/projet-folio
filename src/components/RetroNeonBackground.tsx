
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Skybox cyberpunk environnante
const CyberpunkSkybox = () => {
  const skyboxRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (skyboxRef.current) {
      // Rotation très lente de la skybox
      skyboxRef.current.rotation.y = state.clock.elapsedTime * 0.002;
    }
  });

  return (
    <mesh ref={skyboxRef} scale={[600, 600, 600]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial 
        color="#0a0a1a"
        side={THREE.BackSide}
        transparent
        opacity={0.9}
      >
        <primitive 
          object={(() => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              // Gradient de ciel cyberpunk
              const gradient = ctx.createLinearGradient(0, 0, 0, 512);
              gradient.addColorStop(0, '#1a0a2e');
              gradient.addColorStop(0.3, '#16213e');
              gradient.addColorStop(0.6, '#0f3460');
              gradient.addColorStop(1, '#0a0a0a');
              ctx.fillStyle = gradient;
              ctx.fillRect(0, 0, 512, 512);
              
              // Étoiles subtiles
              ctx.fillStyle = '#ffffff';
              for (let i = 0; i < 100; i++) {
                const x = Math.random() * 512;
                const y = Math.random() * 256;
                const size = Math.random() * 2;
                ctx.globalAlpha = Math.random() * 0.8 + 0.2;
                ctx.fillRect(x, y, size, size);
              }
            }
            const texture = new THREE.CanvasTexture(canvas);
            return texture;
          })()}
          attach="map"
        />
      </meshBasicMaterial>
    </mesh>
  );
};

// Sol propre avec grille néon
const CleanCyberpunkFloor = () => {
  const floorRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (floorRef.current) {
      // Pulsation subtile de la grille
      const pulse = Math.sin(state.clock.elapsedTime * 0.8) * 0.1 + 0.9;
      floorRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
          (child.material as any).emissiveIntensity = pulse * 0.3;
        }
      });
    }
  });

  const floorElements = useMemo(() => {
    const elements = [];
    
    // Plan de sol principal
    elements.push(
      <mesh key="main-floor" position={[0, -80, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[500, 500]} />
        <meshLambertMaterial 
          color="#1a1a2e"
          transparent
          opacity={0.8}
        />
      </mesh>
    );
    
    // Grille néon principale
    const gridSize = 400;
    const divisions = 40;
    const step = gridSize / divisions;
    
    // Lignes principales horizontales (cyan)
    for (let i = 0; i <= divisions; i++) {
      const z = -gridSize / 2 + i * step;
      const isMainLine = i % 10 === 0;
      elements.push(
        <mesh key={`h-${i}`} position={[0, -79.5, z]}>
          <boxGeometry args={[gridSize, 0.2, isMainLine ? 2 : 0.5]} />
          <meshLambertMaterial 
            color={isMainLine ? "#00aaff" : "#004466"} 
            transparent 
            opacity={isMainLine ? 0.8 : 0.6}
            emissive={isMainLine ? "#0088cc" : "#002244"}
            emissiveIntensity={0.3}
          />
        </mesh>
      );
    }
    
    // Lignes principales verticales (magenta)
    for (let i = 0; i <= divisions; i++) {
      const x = -gridSize / 2 + i * step;
      const isMainLine = i % 10 === 0;
      elements.push(
        <mesh key={`v-${i}`} position={[x, -79.5, 0]}>
          <boxGeometry args={[isMainLine ? 2 : 0.5, 0.2, gridSize]} />
          <meshLambertMaterial 
            color={isMainLine ? "#ff00aa" : "#442266"} 
            transparent 
            opacity={isMainLine ? 0.8 : 0.6}
            emissive={isMainLine ? "#cc0088" : "#221144"}
            emissiveIntensity={0.3}
          />
        </mesh>
      );
    }
    
    return elements;
  }, []);

  return <group ref={floorRef}>{elements}</group>;
};

// Ville cyberpunk améliorée
const CyberpunkCity = () => {
  const cityRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (cityRef.current) {
      cityRef.current.rotation.y = state.clock.elapsedTime * 0.005;
    }
  });

  const buildings = useMemo(() => {
    const buildingArray = [];
    const citySize = 300;
    const buildingCount = 80;
    
    for (let i = 0; i < buildingCount; i++) {
      const x = (Math.random() - 0.5) * citySize;
      const z = (Math.random() - 0.5) * citySize;
      const baseHeight = Math.random() * 60 + 20;
      const width = Math.random() * 8 + 4;
      const depth = Math.random() * 8 + 4;
      
      buildingArray.push(
        <group key={i} position={[x, baseHeight / 2 - 80, z]}>
          {/* Building principal avec couleur plus claire */}
          <mesh>
            <boxGeometry args={[width, baseHeight, depth]} />
            <meshLambertMaterial 
              color="#2a2a3a"
              transparent
              opacity={0.9}
            />
          </mesh>
          
          {/* Contours subtils */}
          <mesh>
            <boxGeometry args={[width + 0.3, baseHeight + 0.3, depth + 0.3]} />
            <meshLambertMaterial 
              color="#004488"
              wireframe
              transparent
              opacity={0.5}
              emissive="#002244"
              emissiveIntensity={0.2}
            />
          </mesh>
          
          {/* Fenêtres éclairées */}
          {Array.from({ length: Math.floor(baseHeight / 8) }, (_, floor) => (
            <group key={floor}>
              <mesh position={[0, -baseHeight/2 + floor * 8 + 4, depth/2 + 0.1]}>
                <planeGeometry args={[width * 0.8, 6]} />
                <meshLambertMaterial 
                  color={Math.random() > 0.7 ? "#ffaa44" : "#333344"}
                  transparent
                  opacity={0.8}
                  emissive={Math.random() > 0.7 ? "#aa6622" : "#111122"}
                  emissiveIntensity={0.4}
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

// Caméra avec mouvement fluide
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

const RetroNeonBackground: React.FC = () => {
  console.log("Rendering improved cyberpunk cityscape with skybox");

  return (
    <div className="fixed inset-0 z-[-1] w-full h-full">
      <Canvas
        camera={{ 
          position: [50, 40, 50], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'linear-gradient(180deg, #1a0a2e 0%, #16213e 25%, #0f3460 60%, #0a0a1a 100%)'
        }}
        onCreated={() => console.log("Improved cyberpunk environment loaded")}
      >
        {/* Contrôle de caméra */}
        <CyberpunkCamera />
        
        {/* Skybox cyberpunk */}
        <CyberpunkSkybox />
        
        {/* Brouillard réduit pour plus de visibilité */}
        <fog attach="fog" args={['#0a0a2e', 100, 400]} />
        
        {/* Sol propre avec grille néon */}
        <CleanCyberpunkFloor />
        
        {/* Ville cyberpunk */}
        <CyberpunkCity />
        
        {/* Éclairage amélioré - plus lumineux */}
        <ambientLight intensity={0.4} color="#4a4a6a" />
        
        {/* Éclairages principaux plus intenses */}
        <pointLight position={[0, 100, 0]} color="#6688ff" intensity={4} distance={300} />
        <pointLight position={[-60, 60, -60]} color="#ff6688" intensity={3} distance={200} />
        <pointLight position={[60, 60, 60]} color="#66ffaa" intensity={3} distance={200} />
        <pointLight position={[0, 30, -100]} color="#ffaa66" intensity={2.5} distance={180} />
        
        {/* Éclairage directionnel principal */}
        <directionalLight 
          position={[30, 80, 30]} 
          color="#aabbff" 
          intensity={2}
          castShadow 
        />
        
        {/* Éclairage de remplissage */}
        <directionalLight 
          position={[-30, 40, -30]} 
          color="#ffaabb" 
          intensity={1.5}
        />
        
        {/* Éclairage ambiant supplémentaire pour la visibilité */}
        <hemisphereLight 
          skyColor="#4a6aaa" 
          groundColor="#2a2a4a" 
          intensity={0.6} 
        />
      </Canvas>
    </div>
  );
};

export default RetroNeonBackground;
