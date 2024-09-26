import { useRef, useState } from 'react';

import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useDeviceOrientation } from '../hooks/useDeviceOrientation';
import { createVector, getSpeed, modifyParamWithinRange, moveAxle } from '../utils/calculcation';

const { Vector3, MathUtils, ArrowHelper, Ray } = THREE;
const { degToRad, radToDeg } = MathUtils;

interface TargetProps {
  position: THREE.Vector3;
  arrowAngel?: number;
}

export const Target = (props: TargetProps) => {
  const { arrowAngel = 0 } = props;
  const [showArrowHelper, setShowArrowHelper] = useState(true);

  // useThree((state) => {
  //   console.log("***", state);
  // });

  return (
    <>
      <mesh position={props.position} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[3, 32]} />
        <meshBasicMaterial attach="material" color="silver" />
      </mesh>

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

      <mesh position={props.position} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[49, 50, 64]} />
        <meshBasicMaterial attach="material" color="silver" />
      </mesh>

      <mesh position={props.position} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[99, 100, 64]} />
        <meshBasicMaterial attach="material" color="silver" />
      </mesh>
    </>
  );
};
