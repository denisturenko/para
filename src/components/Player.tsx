import * as THREE from "three";
import { useRef, useState } from "react";
const { Vector3, MathUtils, ArrowHelper, Ray } = THREE;
const { degToRad, radToDeg } = MathUtils;

import { useFrame } from "@react-three/fiber";
import {
  createVector,
  getSpeed,
  modifyParamWithinRange,
  moveAxle,
} from "../utils/calculcation";

interface PlayerProps {
  position: THREE.Vector3;
  azimuth?: number;
  leftControlValue: number;
  rightControlValue: number;
  maxSpeed: number;
  minSpeed: number;
  inertiaFactor: number;
  windSpeeds: number[];
  windAngel: number;
}

export const Player = (props: PlayerProps) => {
  const {
    leftControlValue,
    rightControlValue,
    maxSpeed,
    minSpeed,
    inertiaFactor,
    windSpeeds,
    windAngel,
  } = props;

  const alfaHeadH = 0;
  const alfaHeadY = degToRad(-90);
  const azimuth = useRef(props.azimuth || 0);

  const playerRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!playerRef.current) return;

    const windSpeed = modifyParamWithinRange(windSpeeds[0], windSpeeds[1]);

    // console.log("***", left, right);
    const { x, y, z } = playerRef.current.position;

    const nextAxle = moveAxle(
      getSpeed(leftControlValue, maxSpeed, minSpeed),
      getSpeed(rightControlValue, maxSpeed, minSpeed),
      azimuth.current,
      delta,
      inertiaFactor
    );

    const nextX = x - (nextAxle.x + windSpeed * delta * Math.sin(windAngel));
    const nextZ = z - (nextAxle.z + windSpeed * delta * Math.cos(windAngel));

    playerRef.current.position.set(nextX, y, nextZ);

    azimuth.current = nextAxle.angle;

    console.log("***", radToDeg(azimuth.current));

    // playerRef.current.translateOnAxis(new THREE.Vector3(0, -1, 0), 0.05);
    // playerRef.current.position.setY(y - 1);

    // moving camera

    state.camera.position.set(x, y, z);

    const dir0 = new Vector3(
      playerRef.current.position.x,
      playerRef.current.position.y,
      playerRef.current.position.z
    );
    const dir1 = createVector(
      dir0,
      100,
      azimuth.current + alfaHeadH,
      alfaHeadY
    );

    state.camera.lookAt(dir1);
  });

  return (
    <>
      <mesh ref={playerRef} position={props.position}>
        <capsuleGeometry args={[0.5, 0.5]} />
      </mesh>
    </>
  );
};
