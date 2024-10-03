import { Detailed, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Texture } from 'three';
import floorTextureSmall from 'shared/assets/bg-small.jpg';
// import floorTextureBig from 'shared/assets/bg.jpg';

const adjustTexture = (texture: ReturnType<typeof useTexture>) => {
  if (texture instanceof Texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = texture.wrapS;
  }

  return texture;
};

export const Ground = () => {
  const textureSmall = useTexture(floorTextureSmall);
  // const textureBig = useTexture(floorTextureBig);

  return (
    <Detailed distances={[0, 200]}>
      {/* <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[3500, 3500]} />
        <meshStandardMaterial color="gray" map={adjustTexture(textureBig)} />
      </mesh> */}
      <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[3500, 3500]} />
        <meshStandardMaterial color="gray" map={adjustTexture(textureSmall)} />
      </mesh>
    </Detailed>
  );
};
