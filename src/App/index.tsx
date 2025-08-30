import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import styles from "./styles.module.scss";

export const App = () => {
  const modelRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF("/models/dice/mesh/dice.glb");

  return (
    <div className={styles.background}>
      <Canvas className={styles.canvas} camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 1, 1]} intensity={1} />
        <primitive
          ref={modelRef}
          object={scene}
          position={[0, 0, 0]}
          scale={[1, 1, 1]}
        />
      </Canvas>
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => console.log("Roll button pressed!")}
            onMouseDown={() => ({ opacity: 0.7 })}
            onMouseUp={() => ({ opacity: 1 })}
          >
            <span className={styles.buttonText}>Roll</span>
          </button>
        </div>
      </div>
    </div>
  );
};
