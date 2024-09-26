import { useRef, useState } from 'react';

import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useDeviceOrientation } from '../hooks/useDeviceOrientation';
import { createVector, getSpeed, modifyParamWithinRange, moveAxle } from '../utils/calculcation';

const { Vector3, MathUtils, ArrowHelper, Ray } = THREE;
const { degToRad, radToDeg } = MathUtils;

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
