import * as THREE from "three";
import { useRef, useState } from "react";
const { Vector3, MathUtils, ArrowHelper, Ray } = THREE;
const { degToRad, radToDeg } = MathUtils;

import { useFrame, useThree } from "@react-three/fiber";
import {
  createVector,
  getSpeed,
  modifyParamWithinRange,
  moveAxle,
} from "../utils/calculcation";
import { useDeviceOrientation } from "../hooks/useDeviceOrientation";

interface ArrowProps {
  position: THREE.Vector3;
  arrowAngel?: number;
}

export const Arrow = (props: ArrowProps) => {
  const { arrowAngel = 0 } = props;

  return (
    <>
      <mesh position={props.position} rotation-y={arrowAngel}>
        <arrowHelper args={[undefined, undefined, 20, "orange", 10, 5]} />
      </mesh>
    </>
  );
};
