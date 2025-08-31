import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const D20 = () => {
  const modelRef = useRef<THREE.Group>(null);

  const { scene: d20 } = useGLTF("/models/D20/mesh/dice.glb");

  return (
    <primitive
      ref={modelRef}
      object={d20}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
    />
  );
};

export const D20Collider = () => {
  const modelRef = useRef<THREE.Group>(null);

  const { scene: d20Collider } = useGLTF("/models/D20/mesh/diceCollider.glb");

  return (
    <primitive
      ref={modelRef}
      object={d20Collider}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
    />
  );
};
