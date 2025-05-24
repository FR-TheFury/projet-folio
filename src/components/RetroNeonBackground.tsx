
import React from 'react';

const RetroNeonBackground: React.FC = () => {
  console.log("Rendering static background image");

  return (
    <div 
      className="fixed inset-0 z-[-1] w-full h-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(./background.jpeg)'
      }}
    />
  );
};

export default RetroNeonBackground;
