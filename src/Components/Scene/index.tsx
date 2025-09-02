import { Canvas } from "@react-three/fiber";
import styles from "./styles.module.scss";
import { Physics } from "@react-three/cannon";
import { useScene } from "../../Context";
import { D20Vis } from "../../Models/Visualize/D20";
import { Box } from "../../Models/Box";
import { Suspense } from "react";
import { D20 } from "../../Models/Dice/D20";
import { D6Vis } from "../../Models/Visualize/D6";
import { D6 } from "../../Models/Dice/D6";

export const Scene = () => {
  const { simulate, selection } = useScene();
  const distance = 5;

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
        {selection === 'd20' && <D20 />}
        {selection === 'd6' && <D6 />}
      </Physics>
      {(!simulate && selection === 'd20') && (
        <Suspense fallback={null}>
          <D20Vis />
        </Suspense>
      )}
      {(!simulate && selection === 'd6') && (
        <Suspense fallback={null}>
          <D6Vis />
        </Suspense>
      )}
    </Canvas>
  );
};
