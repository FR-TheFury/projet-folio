
import React, { useMemo } from 'react';
import { createSkyboxMaterial } from './CityMaterials';

const RealisticSkybox: React.FC = () => {
  const { skyGeometry, skyMaterial } = useMemo(() => createSkyboxMaterial(), []);

  return (
    <mesh geometry={skyGeometry} material={skyMaterial} />
  );
};

export default RealisticSkybox;
