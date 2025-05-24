
import React from 'react';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

interface CyberpunkEffectsProps {
  enabled?: boolean;
}

const CyberpunkEffects = ({ enabled = true }: CyberpunkEffectsProps) => {
  if (!enabled) return null;

  return (
    <EffectComposer>
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.1}
        luminanceSmoothing={0.9}
        blendFunction={BlendFunction.SCREEN}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0005, 0.0012]}
      />
    </EffectComposer>
  );
};

export default CyberpunkEffects;
