import * as THREE from "three";
import { usePlane } from "@react-three/cannon";

type FloorProps = {
  distance: number;
  scaleFactor?: number;
  boxDepth?: number;
};

export const Box = ({
  scaleFactor = 1,
  boxDepth = 10,
  distance,
}: FloorProps) => {
  const aspect = window.innerWidth / window.innerHeight;
  const fov = 75;
  const length = 2 * Math.tan((fov * Math.PI) / 180 / 2) * distance; // Screen height (Y-axis)
  const width = length * aspect; // Screen width (X-axis)
  const scaledWidth = width * scaleFactor;
  const scaledLength = length * scaleFactor;

  // const [ref] = useBox(() => ({
  //   mass: 0,
  //   position: [0, 0, -boxDepth / 2],
  //   rotation: [0, 0, 0],
  //   args: [scaledWidth / 2, scaledLength / 2, boxDepth / 2], // Use half-extents for physics
  // }));

  // Floor wall plane (normal points toward positive Z, at back of box)
  usePlane(() => ({
    mass: 0,
    position: [0, 0, -boxDepth / 2],
    rotation: [0, 0, 0],
  }));

  // Bottom plane (normal points up, at bottom of box)
  usePlane(() => ({
    mass: 0,
    position: [0, -length / 2, -boxDepth / 2],
    rotation: [-Math.PI / 2, 0, 0], // Normal points up (+Y)
  }));

  // Top wall plane (normal points toward negative Z, at front of box)
  usePlane(() => ({
    mass: 0,
    position: [0, length / 2, boxDepth / 2],
    rotation: [Math.PI / 2, 0, 0], // Normal points backward (-Z)
  }));

  // Left wall plane (normal points toward positive X, at left of box)
  usePlane(() => ({
    mass: 0,
    position: [-width / 2, 0, -boxDepth / 2],
    rotation: [0, Math.PI / 2, 0], // Normal points right (+X)
  }));

  // Right wall plane (normal points toward negative X, at right of box)
  usePlane(() => ({
    mass: 0,
    position: [width / 2, 0, -boxDepth / 2],
    rotation: [0, -Math.PI / 2, 0], // Normal points left (-X)
  }));

  return (
    <group>
      <mesh position={[0, 0, -boxDepth / 2]} receiveShadow={true}>
        <boxGeometry args={[scaledWidth, scaledLength, boxDepth]} />
        <meshStandardMaterial
          color="#20292b"
          transparent
          opacity={0.5}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh position={[0, 0, -boxDepth / 2]}>
        <boxGeometry args={[scaledWidth, scaledLength, boxDepth]} />
        <meshBasicMaterial color="red" wireframe={true} />
      </mesh>
    </group>
  );
};
