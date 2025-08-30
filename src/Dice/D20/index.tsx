import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const D20 = () => {
  const modelRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF("/models/dice/mesh/dice.glb");

  return (
    <primitive
      ref={modelRef}
      object={scene}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
    />
  );
};
