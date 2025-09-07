import { Canvas } from "@react-three/fiber";
import styles from "./styles.module.scss";
import { Physics } from "@react-three/cannon";
import { useScene } from "../../Context";
import { D20Vis } from "../../Models/Visualize/D20";
import { Box } from "../../Models/Box";
import { D20 } from "../../Models/Dice/D20";
import { D6Vis } from "../../Models/Visualize/D6";
import { D6 } from "../../Models/Dice/D6";
import { D4 } from "../../Models/Dice/D4";
import { D4Vis } from "../../Models/Visualize/D4";
import { D8 } from "../../Models/Dice/D8";
import { D8Vis } from "../../Models/Visualize/D8";
import { D12Vis } from "../../Models/Visualize/D12";
import { D12 } from "../../Models/Dice/D12";
import { D10Vis } from "../../Models/Visualize/D10";
import { D10 } from "../../Models/Dice/D10";

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
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          position={[2.5, 5, 5]}
          intensity={2}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
        />
        <Box distance={distance} />
        {simulate && selection === "d20" && <D20 />}
        {simulate && selection === "d12" && <D12 />}
        {simulate && selection === "d10" && <D10 />}
        {simulate && selection === "d8" && <D8 />}
        {simulate && selection === "d6" && <D6 />}
        {simulate && selection === "d4" && <D4 />}
      </Physics>
      <D20Vis />
      <D12Vis />
      <D10Vis />
      <D8Vis />
      <D6Vis />
      <D4Vis />
    </Canvas>
  );
};
