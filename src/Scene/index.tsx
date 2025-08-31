import { Canvas } from "@react-three/fiber";
import styles from "./styles.module.scss";

import { D20 } from "../Models/Dice/D20";
import { Floor } from "../Models/Floor";

export const Scene = () => {
  return (
    <Canvas className={styles.canvas} camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 1]} intensity={1} />
      <D20 />
      <Floor  />
    </Canvas>
  );
};
