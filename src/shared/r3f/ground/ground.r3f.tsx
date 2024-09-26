import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Texture } from 'three';
import floorTexture from 'shared/assets/bg2.jpg';

export const Ground = () => {
  const texture = useTexture(floorTexture);

  if (texture instanceof Texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = texture.wrapS;
  }

  return (
    <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[3500, 3500]} />
      <meshStandardMaterial color="gray" map={texture} />
    </mesh>
  );
};
