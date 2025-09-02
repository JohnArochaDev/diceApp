import { Canvas } from "@react-three/fiber";
import styles from "./styles.module.scss";
import { Physics } from "@react-three/cannon";
import { useScene } from "../../Context";
import { D20Vis } from "../../Models/Visualize/D20";
import { Box } from "../../Models/Box";
import { Suspense } from "react"; // Add this import
import { D20 } from "../../Models/Dice/D20";

export const Scene = () => {
  const { simulate, selection } = useScene();
  const distance = 5;

  console.log("WAT DIS", simulate);

  return (
    <Canvas
      shadows
      className={styles.canvas}
      camera={{ position: [0, 0, distance], fov: 75 }}
    >
      <Physics
        gravity={[0, 0, -20]}
        iterations={10000}
        defaultContactMaterial={{
          friction: 1,
          restitution: 0.1,
          contactEquationStiffness: 10,
          frictionEquationStiffness: 10,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[0, 1, 1]} intensity={1} />
        <Box distance={distance} />
        <D20 />
      </Physics>
      {(!simulate && selection === 'd20') && (
        <Suspense fallback={null}>
          <D20Vis />
        </Suspense>
      )}
    </Canvas>
  );
};
