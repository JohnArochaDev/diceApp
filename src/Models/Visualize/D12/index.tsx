import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useScene } from "../../../Context";

export const D12Vis = () => {
  const { scene: d12 } = useGLTF("/models/D12/mesh/d12Vis.glb");

  const { simulate, selection } = useScene();

  const ref = useRef<THREE.Group>(null);
  const draggingRef = useRef(false);
  const prevPosRef = useRef({ x: 0, y: 0 });
  const visible = !simulate && selection === "d12"

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingRef.current || !ref.current) return;

      e.preventDefault(); // Prevent scrolling on touch devices

      const deltaX = e.clientX - prevPosRef.current.x;
      const deltaY = e.clientY - prevPosRef.current.y;

      // Inverted for orbit-like feel (drag left = model rotates right)
      ref.current.rotation.y += deltaX * 0.01;
      ref.current.rotation.x += deltaY * 0.01;

      prevPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: PointerEvent) => {
      e.preventDefault(); // Prevent scrolling on touch devices

      draggingRef.current = false;
      document.body.style.cursor = "auto";
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  useEffect(() => {
    d12.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.raycast = THREE.Mesh.prototype.raycast; // Ensure standard raycasting
      }
    });
  }, [d12]);

  return (
    <primitive
      visible={visible}
      ref={ref}
      castShadow
      object={d12}
      position={visible ? [0, 0, 0] : [10, 10, 10]}
      rotation={[0, 0, 0]}
      onPointerDown={(e: any) => {
        e.stopPropagation();
        e.nativeEvent.preventDefault(); // mobile
        draggingRef.current = true;
        prevPosRef.current = { x: e.clientX, y: e.clientY };
        document.body.style.cursor = "grabbing";
      }}
    />
  );
};

useGLTF.preload("/models/D12/mesh/d12Vis.glb");
