import type * as THREE from 'three';

interface ArrowProps {
  position: THREE.Vector3;
  arrowAngel?: number;
}

export const Arrow = (props: ArrowProps) => {
  const { arrowAngel = 0 } = props;

  return (
    <mesh position={props.position} rotation-y={arrowAngel}>
      <arrowHelper args={[undefined, undefined, 20, 'orange', 10, 5]} />
    </mesh>
  );
};
