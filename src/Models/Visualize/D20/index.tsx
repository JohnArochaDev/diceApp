import { useGLTF } from "@react-three/drei";

export const D20Vis = () => {
  const { scene: d20 } = useGLTF("/models/D20/mesh/dice.glb");

  return (
    <primitive castShadow object={d20} position={[0, 0, 0]} scale={[1, 1, 1]} />
  );
};
