import { useEffect, useState } from "react";
import * as THREE from "three";

type FloorProps = {
  distance: number;
  scaleFactor?: number;
  boxDepth?: number;
};

export const Floor = ({
  scaleFactor = 1,
  boxDepth = 1,
  distance,
}: FloorProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, length: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const aspect = window.innerWidth / window.innerHeight;
      const fov = 75;
      const length = 2 * Math.tan((fov * Math.PI) / 180 / 2) * distance; // Screen height (Y-axis)
      const width = length * aspect; // Screen width (X-axis)
      setDimensions({
        width: width * scaleFactor,
        length: length * scaleFactor,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [scaleFactor, distance]);

  return (
    <mesh position={[0, 0, -boxDepth / 2]} receiveShadow={true}>
      <boxGeometry args={[dimensions.width, dimensions.length, boxDepth]} />
      <meshStandardMaterial
        color="#20292b"
        transparent
        opacity={0.5}
        side={THREE.BackSide}
      />
    </mesh>
  );
};
