import { useEffect, useState } from 'react';
import * as THREE from 'three'

type FloorProps = {
  scaleFactor?: number;
  boxDepth?: number;
};

export const Floor = ({ scaleFactor = 1, boxDepth = 1 }: FloorProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, length: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const aspect = window.innerWidth / window.innerHeight;
      const fov = 75;
      const distance = 5; // Camera distance from plane
      const length = 2 * Math.tan((fov * Math.PI / 180) / 2) * distance; // Screen height (Y-axis)
      const width = length * aspect; // Screen width (X-axis)
      setDimensions({
        width: width * scaleFactor,
        length: length * scaleFactor,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [scaleFactor]);

  return (
    <mesh position={[0, 0, -boxDepth / 2]}>
      <boxGeometry args={[dimensions.width, dimensions.length, boxDepth]} />
      <meshStandardMaterial opacity={0} side={THREE.BackSide} />
    </mesh>
  );
};