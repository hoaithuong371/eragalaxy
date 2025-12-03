import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { generateMemories } from '../constants';
import MemoryObject from './MemoryObject';

const SpaceScene: React.FC = () => {
  // Increased count from 60 to 200 for denser text effect
  const memories = useMemo(() => generateMemories(200), []);

  return (
    <Canvas
      camera={{ position: [0, 0, 0.1], fov: 90 }} // Camera inside the cylinder (near 0,0,0)
      gl={{ antialias: false, toneMappingExposure: 1.5 }}
      dpr={[1, 2]} // Handle high DPI screens
    >
      {/* Background - Deep Universe */}
      <color attach="background" args={['#050505']} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Ambient Light for base visibility */}
      <ambientLight intensity={0.2} />
      
      {/* Content */}
      <group>
        {memories.map((item) => (
          <MemoryObject key={item.id} item={item} />
        ))}
      </group>

      {/* Post Processing for Neon Glow */}
      <EffectComposer enableNormalPass={false}>
        <Bloom 
          luminanceThreshold={0.2} 
          mipmapBlur 
          intensity={1.5} 
          radius={0.6}
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>

      {/* Controls - User is at center, looking out */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={false}
        rotateSpeed={0.5}
        minDistance={0.1} // Allow getting very close to center
        maxDistance={20}  // Don't go outside the universe
      />
    </Canvas>
  );
};

export default SpaceScene;