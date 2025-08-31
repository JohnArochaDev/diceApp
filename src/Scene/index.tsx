import { Canvas } from "@react-three/fiber";
import styles from "./styles.module.scss";
import { Physics } from "@react-three/cannon";

import { D20 } from "../Models/Dice/D20";
// import { Box } from "../Models/Box";
import { TestPlane } from "../Models/TestFloor";

export const Scene = () => {
  const distance = 5;

  return (
    <Canvas
      shadows
      className={styles.canvas}
      camera={{ position: [0, 0, distance], fov: 75 }}
    >
      <Physics gravity={[0, 0, -15]}>
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[0, 1, 1]} intensity={1} />
        <D20 />
        {/* <Box distance={distance} /> */}
        <TestPlane />
      </Physics>
      {/* <axesHelper args={[3]} /> */}
    </Canvas>
  );
};
