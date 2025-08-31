import { usePlane } from "@react-three/cannon";
import * as THREE from "three";

type TestPlaneProps = {
  boxDepth?: number;
};

export const TestPlane = (props: TestPlaneProps) => {
  const { boxDepth } = props;
  const [ref] = usePlane(() => ({
    mass: 0,
    position: [0, 0, boxDepth ?? -20],
    rotation: [0, 0, 0],
  }));

  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="blue" side={THREE.FrontSide} />
      <axesHelper args={[3]} />
    </mesh>
  );
};
