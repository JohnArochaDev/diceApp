import { Canvas } from "@react-three/fiber";
import styles from "./styles.module.scss";
import { Physics } from "@react-three/cannon";

import { D20 } from "../Models/Dice/D20";
import { Box } from "../Models/Box";

export const Scene = () => {
  const distance = 5;

  return (
    <Canvas
      shadows
      className={styles.canvas}
      camera={{ position: [0, 0, distance], fov: 75 }}
    >
      <Physics
        gravity={[0, 0, -20]}
        iterations={100}
        defaultContactMaterial={{
          friction: 0.9,
          restitution: .2,
          contactEquationStiffness: 1e10,
          frictionEquationStiffness: 1e10,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[0, 1, 1]} intensity={1} />
        <D20 />
        <Box distance={distance} />
      </Physics>
    </Canvas>
  );
};
