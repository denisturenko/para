import type * as THREE from 'three';
import type { HelperSettings } from 'shared/lib/types';

interface TargetProps {
  helpers: HelperSettings;
  position: THREE.Vector3;
  arrowAngel?: number;
}

export const Target = (props: TargetProps) => {
  const {
    arrowAngel = 0,
    helpers: { isVisibleCircles, isVisibleCross },
  } = props;

  return (
    <>
      <mesh position={props.position} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[3, 32]} />
        <meshBasicMaterial attach="material" color="silver" />
      </mesh>

      {isVisibleCross && (
        <>
          <mesh position={props.position} rotation-y={arrowAngel}>
            <arrowHelper args={[undefined, undefined, 200]} />
          </mesh>
          <mesh position={props.position} rotation-y={arrowAngel + Math.PI}>
            <arrowHelper args={[undefined, undefined, 200, undefined, 0]} />
          </mesh>
          <mesh position={props.position} rotation-y={arrowAngel - Math.PI / 2}>
            <arrowHelper args={[undefined, undefined, 200, undefined, 0]} />
          </mesh>
          <mesh position={props.position} rotation-y={arrowAngel + Math.PI / 2}>
            <arrowHelper args={[undefined, undefined, 200, undefined, 0]} />
          </mesh>
        </>
      )}

      {isVisibleCircles && (
        <>
          <mesh position={props.position} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[49, 50, 64]} />
            <meshBasicMaterial attach="material" color="silver" />
          </mesh>

          <mesh position={props.position} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[99, 100, 64]} />
            <meshBasicMaterial attach="material" color="silver" />
          </mesh>
        </>
      )}
    </>
  );
};
