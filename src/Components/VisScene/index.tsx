import { Canvas } from "@react-three/fiber";
import styles from "./styles.module.scss";
// import { useScene } from "../../Context";
import { D20Vis } from "../../Models/Visualize/D20";

export const VisScene = () => {
//   const { simulate } = useScene();
  const distance = 5;

  return (
    <Canvas
      shadows
      className={styles.canvas}
      camera={{ position: [0, 0, distance], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[0, 1, 1]} intensity={1} />
      <D20Vis />
    </Canvas>
  );
};
