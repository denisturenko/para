import { Detailed, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Texture } from 'three';
import floorTexture from 'shared/assets/bg2.jpg';
// import floorTexture0 from 'shared/assets/bg.jpg';

const adjustTexture = (texture: ReturnType<typeof useTexture>) => {
  if (texture instanceof Texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = texture.wrapS;
  }

  return texture;
};

export const Ground = () => {
  // const texture0 = useTexture(floorTexture0);
  const texture = useTexture(floorTexture);

  if (texture instanceof Texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = texture.wrapS;
  }

  return (
    <Detailed distances={[0, 200]}>
      {/* <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[3500, 3500]} />
        <meshStandardMaterial color="gray" map={adjustTexture(texture0)} />
      </mesh> */}
      <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[3500, 3500]} />
        <meshStandardMaterial color="gray" map={adjustTexture(texture)} />
      </mesh>
    </Detailed>
  );
};
