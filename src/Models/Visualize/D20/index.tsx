import { useGLTF } from "@react-three/drei";

export const D20Vis = () => {
  const { scene: d20 } = useGLTF("/models/D20/mesh/diceVis.glb");

  return (
    <primitive
      castShadow
      object={d20}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

// Preload the model to start loading early (reduces suspension time)
useGLTF.preload("/models/D20/mesh/diceVis.glb");
