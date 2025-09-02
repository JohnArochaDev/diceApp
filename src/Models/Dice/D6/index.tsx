import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useConvexPolyhedron } from "@react-three/cannon";
import * as THREE from "three";
import { useScene } from "../../../Context";
import { useFrame } from "@react-three/fiber";

export const D6 = () => {
  const modelRef = useRef<THREE.Group>(null);
  const restCounterRef = useRef(0);
  const linearVelRef = useRef([0, 0, 0]);
  const angularVelRef = useRef([0, 0, 0]);

  const { scene: d6 } = useGLTF("/models/D6/mesh/d6.glb");
  const { scene: d6Collider } = useGLTF("/models/D6/mesh/d6Collider.glb");

  const geometry =
    d6Collider.children[0] instanceof THREE.Mesh
      ? d6Collider.children[0].geometry
      : null;
  if (!geometry) throw new Error("No valid geometry found in d6Collider.glb");

  const restThreshold = 0.01;
  const restFrameCount = 10;
  const faces: number[][] = [];
  const vertexArray = geometry.attributes.position.array;
  const vertices: [number, number, number][] = [];

  const [isAtRest, setIsAtRest] = useState(false);
  const { simulate, reset, setSimulate } = useScene();

  const resetDice = () => {
    setTimeout(() => {
      setSimulate(false);
    }, 3000);
  };

  for (let i = 0; i < vertexArray.length; i += 3) {
    vertices.push([vertexArray[i], vertexArray[i + 1], vertexArray[i + 2]]);
  }

  for (let i = 0; i < geometry.index!.array.length; i += 3) {
    faces.push([
      geometry.index!.array[i],
      geometry.index!.array[i + 1],
      geometry.index!.array[i + 2],
    ]);
  }

  const [, api] = useConvexPolyhedron(
    () => ({
      mass: 0,
      position: [0, 0, 6],
      args: [vertices, faces],
      scale: [0.1, 0.1, 0.1],
      type: "Dynamic",
    }),
    modelRef
  );

  useEffect(() => {
    const unsubscribeLinear = api.velocity.subscribe((v) => {
      linearVelRef.current = v;
    });
    const unsubscribeAngular = api.angularVelocity.subscribe((v) => {
      angularVelRef.current = v;
    });
    return () => {
      unsubscribeLinear();
      unsubscribeAngular();
    };
  }, [api]);

  useFrame(() => {
    if (simulate && !isAtRest) {
      const [vx, vy, vz] = linearVelRef.current;
      const linearVel = Math.sqrt(vx * vx + vy * vy + vz * vz);
      const [avx, avy, avz] = angularVelRef.current;
      const angularVel = Math.sqrt(avx * avx + avy * avy + avz * avz);

      if (linearVel < restThreshold && angularVel < restThreshold) {
        restCounterRef.current++;
        if (restCounterRef.current >= restFrameCount) {
          setIsAtRest(true);
          // Stop physics simulation
          api.mass.set(0);
          api.velocity.set(0, 0, 0);
          api.angularVelocity.set(0, 0, 0);

          console.log("SHOULD BE ONCE AND NEVER AGAIN");
          resetDice();
        }
      } else {
        restCounterRef.current = 0;
      }
    }
  });

  useEffect(() => {
    if (simulate) {
      setIsAtRest(false);
      restCounterRef.current = 0;
      api.mass.set(0.1);
      api.position.set(0, 0, 0);
      api.rotation.set(
        THREE.MathUtils.degToRad(Math.random() * 360),
        THREE.MathUtils.degToRad(Math.random() * 360),
        THREE.MathUtils.degToRad(Math.random() * 360)
      );
      api.velocity.set(15, 25, 0);
      api.angularVelocity.set(10, -10, 5);
    }
  }, [api, simulate, reset]);

  return (
    <primitive
      castShadow
      ref={modelRef}
      object={d6}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
    />
  );
};
