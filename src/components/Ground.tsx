import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import floorTexture from "../assets/bg2.jpg";
import { Texture } from "three";

export const Ground = () => {
  const texture = useTexture(floorTexture);
  if (texture instanceof Texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  }

  return (
    <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[3500, 3500]} />
      <meshStandardMaterial color="gray" map={texture} />
    </mesh>
  );
};
