import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Image } from '@react-three/drei';
import * as THREE from 'three';
import { MemoryItem, MemoryType } from '../types';

interface MemoryObjectProps {
  item: MemoryItem;
}

const NEON_CORE = '#ffe6f2';
const NEON_GLOW = '#ff66b2';

const MemoryObject: React.FC<MemoryObjectProps> = ({ item }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Random starting phase for gentle oscillation
  const randomPhase = useRef(Math.random() * Math.PI * 2);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // FALLING LOGIC
    groupRef.current.position.y -= item.speed * (hovered ? 0.2 : 1) * 60 * delta; // Fall down

    // GENTLE SWAY (Floating effect)
    // We can sway slightly in the radial direction or vertical, 
    // but simple X sway is fine for chaos or calculate tangential sway.
    groupRef.current.position.y += Math.sin(state.clock.elapsedTime + randomPhase.current) * 0.005;

    // RESET LOGIC
    // If it falls below visible area, respawn at top
    if (groupRef.current.position.y < -35) {
      groupRef.current.position.y = 35 + Math.random() * 10;
      
      // Respawn in a circle (Cylinder logic)
      const angle = Math.random() * Math.PI * 2;
      const radius = 15 + Math.random() * 15; // Radius 15 to 30
      
      groupRef.current.position.x = Math.cos(angle) * radius;
      groupRef.current.position.z = Math.sin(angle) * radius;
    }

    // Look at camera (billboard effect for text/images)
    groupRef.current.lookAt(state.camera.position);
  });

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
    setHovered(true);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
    setHovered(false);
  };

  return (
    <group 
      ref={groupRef} 
      position={item.initialPosition} 
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {item.type === MemoryType.TEXT ? (
        <Text
          font="https://fonts.gstatic.com/s/dancingscript/v24/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F5060dAA.woff"
          fontSize={item.scale}
          color={NEON_CORE}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor={NEON_GLOW}
          // Emissive properties require a custom material logic or relying on toneMapped=false for bloom
          material-toneMapped={false}
        >
          {item.content}
        </Text>
      ) : (
        <Image 
          url={item.content}
          scale={[item.scale, item.scale * 1.2]} // Aspect ratio guess
          transparent
          opacity={0.9}
          toneMapped={false} // Important for bloom to pick up bright parts
        />
      )}
    </group>
  );
};

export default MemoryObject;