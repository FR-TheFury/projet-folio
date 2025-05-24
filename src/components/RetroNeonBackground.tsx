import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import PerformanceToggle from './PerformanceToggle';

// Skybox Component
const CyberpunkSkybox = () => {
  const skyboxRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (skyboxRef.current) {
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
      />
    </mesh>
  );
};

// Floor Component
const CyberpunkFloor = () => {
  const floorRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (floorRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 1.2) * 0.3 + 0.7;
      const secondaryPulse = Math.sin(state.clock.elapsedTime * 0.8 + Math.PI) * 0.2 + 0.8;
      
      floorRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
          const intensity = index % 2 === 0 ? pulse * 1.2 : secondaryPulse * 0.8;
          (child.material as any).emissiveIntensity = intensity;
        }
      });
    }
  });

  const floorElements = useMemo(() => {
    const elements = [];
    
    elements.push(
      <mesh key="main-floor" position={[0, -80, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[500, 500]} />
        <meshLambertMaterial 
          color="#0a0a1a"
          transparent
          opacity={0.9}
        />
      </mesh>
    );
    
    const gridSize = 400;
    const divisions = 40;
    const step = gridSize / divisions;
    
    for (let i = 0; i <= divisions; i++) {
      const z = -gridSize / 2 + i * step;
      const isMainLine = i % 10 === 0;
      const isMajorLine = i % 20 === 0;
      const color = isMajorLine ? "#ff00ff" : (isMainLine ? "#00ffff" : "#004488");
      const emissive = isMajorLine ? "#cc00cc" : (isMainLine ? "#00aaaa" : "#002266");
      
      elements.push(
        <mesh key={`h-${i}`} position={[0, -79.3, z]}>
          <boxGeometry args={[gridSize, 0.4, isMajorLine ? 3 : (isMainLine ? 2 : 0.8)]} />
          <meshLambertMaterial 
            color={color} 
            transparent 
            opacity={isMajorLine ? 0.9 : (isMainLine ? 0.8 : 0.6)}
            emissive={emissive}
            emissiveIntensity={0.6}
          />
        </mesh>
      );
    }
    
    for (let i = 0; i <= divisions; i++) {
      const x = -gridSize / 2 + i * step;
      const isMainLine = i % 10 === 0;
      const isMajorLine = i % 20 === 0;
      const color = isMajorLine ? "#00ffff" : (isMainLine ? "#ff00ff" : "#442288");
      const emissive = isMajorLine ? "#00aaaa" : (isMainLine ? "#cc00cc" : "#221166");
      
      elements.push(
        <mesh key={`v-${i}`} position={[x, -79.3, 0]}>
          <boxGeometry args={[isMajorLine ? 3 : (isMainLine ? 2 : 0.8), 0.4, gridSize]} />
          <meshLambertMaterial 
            color={color} 
            transparent 
            opacity={isMajorLine ? 0.9 : (isMainLine ? 0.8 : 0.6)}
            emissive={emissive}
            emissiveIntensity={0.6}
          />
        </mesh>
      );
    }
    
    return elements;
  }, []);

  return <group ref={floorRef}>{floorElements}</group>;
};

// City Component
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
      
      const neonColors = ['#ff00ff', '#00ffff', '#ff0080', '#8000ff', '#0080ff', '#ff4080'];
      const primaryNeon = neonColors[Math.floor(Math.random() * neonColors.length)];
      const secondaryNeon = neonColors[Math.floor(Math.random() * neonColors.length)];
      
      buildingArray.push(
        <group key={i} position={[x, baseHeight / 2 - 80, z]}>
          <mesh>
            <boxGeometry args={[width, baseHeight, depth]} />
            <meshLambertMaterial 
              color="#0a0a0a"
              transparent
              opacity={0.95}
            />
          </mesh>
          
          <mesh>
            <boxGeometry args={[width + 0.5, baseHeight + 0.5, depth + 0.5]} />
            <meshLambertMaterial 
              color={primaryNeon}
              wireframe
              transparent
              opacity={0.8}
              emissive={primaryNeon}
              emissiveIntensity={2.5}
            />
          </mesh>
          
          <mesh position={[width/2 + 0.1, 0, 0]}>
            <boxGeometry args={[0.3, baseHeight, 0.5]} />
            <meshLambertMaterial 
              color={secondaryNeon}
              transparent
              opacity={0.9}
              emissive={secondaryNeon}
              emissiveIntensity={3.5}
            />
          </mesh>
          
          {Array.from({ length: Math.floor(baseHeight / 8) }, (_, floor) => {
            const windowColor = Math.random() > 0.3 ? '#ffaa00' : '#004488';
            const emissiveIntensity = Math.random() > 0.3 ? 2.5 : 1.5;
            
            return (
              <group key={floor}>
                <mesh position={[0, -baseHeight/2 + floor * 8 + 4, depth/2 + 0.1]}>
                  <planeGeometry args={[width * 0.8, 6]} />
                  <meshLambertMaterial 
                    color={windowColor}
                    transparent
                    opacity={0.9}
                    emissive={windowColor}
                    emissiveIntensity={emissiveIntensity}
                  />
                </mesh>
              </group>
            );
          })}
          
          <mesh position={[0, baseHeight/2 + 2, 0]}>
            <boxGeometry args={[width + 2, 1, depth + 2]} />
            <meshLambertMaterial 
              color={primaryNeon}
              transparent
              opacity={0.7}
              emissive={primaryNeon}
              emissiveIntensity={3}
            />
          </mesh>
        </group>
      );
    }
    
    return buildingArray;
  }, []);

  return <group ref={cityRef}>{buildings}</group>;
};

// Camera Component
const CyberpunkCamera = ({ movementType = 'mixed' }: { movementType?: 'orbital' | 'vertical' | 'mixed' }) => {
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

// Lighting Component
const CyberpunkLighting = () => {
  return (
    <>
      <fog attach="fog" args={['#1a0a2e', 80, 350]} />
      <ambientLight intensity={0.3} color="#2a2a4a" />
      <pointLight position={[0, 120, 0]} color="#ff00ff" intensity={8} distance={400} />
      <pointLight position={[-80, 80, -80]} color="#00ffff" intensity={7} distance={300} />
      <pointLight position={[80, 80, 80]} color="#ff0080" intensity={7} distance={300} />
      <pointLight position={[0, 50, -120]} color="#8000ff" intensity={6} distance={250} />
      <pointLight position={[-40, 60, 40]} color="#0080ff" intensity={5} distance={200} />
      <pointLight position={[40, 60, -40]} color="#ff4080" intensity={5} distance={200} />
      <directionalLight 
        position={[50, 100, 50]} 
        color="#aa88ff" 
        intensity={2}
        castShadow 
      />
      <directionalLight 
        position={[-50, 60, -50]} 
        color="#ff88aa" 
        intensity={1.5}
      />
      <hemisphereLight 
        args={["#4a2a8a", "#1a0a3a", 0.6]}
      />
    </>
  );
};

// Main Component
const RetroNeonBackground: React.FC = () => {
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [cameraMovement, setCameraMovement] = useState<'orbital' | 'vertical' | 'mixed'>('mixed');

  console.log("Rendering enhanced cyberpunk cityscape without post-processing");

  return (
    <>
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
          onCreated={() => console.log("Enhanced cyberpunk environment loaded")}
        >
          <CyberpunkCamera movementType={cameraMovement} />
          <CyberpunkSkybox />
          <CyberpunkLighting />
          <CyberpunkFloor />
          <CyberpunkCity />
        </Canvas>
      </div>
      
      <PerformanceToggle 
        enabled={effectsEnabled} 
        onToggle={setEffectsEnabled} 
      />
    </>
  );
};

export default RetroNeonBackground;
