
import * as THREE from 'three';

export const createBuildingMaterials = () => {
  // Concrete material
  const concreteMaterial = new THREE.MeshStandardMaterial({
    color: '#8a8a8a',
    roughness: 0.8,
    metalness: 0.1,
  });

  // Glass material
  const glassMaterial = new THREE.MeshStandardMaterial({
    color: '#87ceeb',
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.3,
  });

  // Red brick material
  const brickMaterial = new THREE.MeshStandardMaterial({
    color: '#8b4513',
    roughness: 0.9,
    metalness: 0.0,
  });

  // Modern dark material
  const modernDarkMaterial = new THREE.MeshStandardMaterial({
    color: '#2c2c2c',
    roughness: 0.3,
    metalness: 0.6,
  });

  // Roof material
  const roofMaterial = new THREE.MeshStandardMaterial({
    color: '#4a4a4a',
    roughness: 0.8,
    metalness: 0.2,
  });

  return {
    concrete: concreteMaterial,
    glass: glassMaterial,
    brick: brickMaterial,
    modernDark: modernDarkMaterial,
    roof: roofMaterial,
  };
};

export const createRoadMaterial = () => {
  return new THREE.MeshStandardMaterial({
    color: '#404040',
    roughness: 0.9,
    metalness: 0.1,
  });
};

export const createSkyboxMaterial = () => {
  const skyGeometry = new THREE.SphereGeometry(1000, 32, 32);
  const skyMaterial = new THREE.ShaderMaterial({
    uniforms: {
      topColor: { value: new THREE.Color(0x0077ff) },
      bottomColor: { value: new THREE.Color(0xffffff) },
      offset: { value: 33 },
      exponent: { value: 0.6 }
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 bottomColor;
      uniform float offset;
      uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + offset).y;
        gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
      }
    `,
    side: THREE.BackSide
  });

  return { skyGeometry, skyMaterial };
};
