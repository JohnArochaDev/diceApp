import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useConvexPolyhedron } from "@react-three/cannon";
import * as THREE from "three";

export const D20 = () => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene: d20 } = useGLTF("/models/D20/mesh/dice.glb");
  const { scene: d20Collider } = useGLTF("/models/D20/mesh/diceCollider.glb");

  const geometry =
    d20Collider.children[0] instanceof THREE.Mesh
      ? d20Collider.children[0].geometry
      : null;
  if (!geometry) throw new Error("No valid geometry found in diceCollider.glb");

  // Type vertices as [number, number, number][]
  const vertexArray = geometry.attributes.position.array;
  const vertices: [number, number, number][] = [];
  for (let i = 0; i < vertexArray.length; i += 3) {
    vertices.push([vertexArray[i], vertexArray[i + 1], vertexArray[i + 2]]);
  }

  const faces: number[][] = [];
  for (let i = 0; i < geometry.index!.array.length; i += 3) {
    faces.push([
      geometry.index!.array[i],
      geometry.index!.array[i + 1],
      geometry.index!.array[i + 2],
    ]);
  }

  const [, api] = useConvexPolyhedron(
    () => ({
      mass: .1,
      position: [0, 0, 0],
      args: [vertices, faces],
    }),
    modelRef
  );

  useEffect(() => {
    api.rotation.set(
      THREE.MathUtils.degToRad(Math.random() * 360),
      THREE.MathUtils.degToRad(Math.random() * 360),
      THREE.MathUtils.degToRad(Math.random() * 360)
    );
    api.velocity.set(25, 50, 0);
  }, [api]);

  return (
    <primitive
      castShadow
      ref={modelRef}
      object={d20}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
    />
  );
};
