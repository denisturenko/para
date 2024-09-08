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
import { useDeviceOrientation } from "../hooks/useDeviceOrientation";

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

  const azimuthHead = degToRad(0);
  const thetaHead = degToRad(80);

  const orientation = useDeviceOrientation();

  document.getElementById("info").innerHTML =
    String(orientation.theta) + String(orientation.azimuth);
  // document.getElementById("info").innerHTML = String(
  //   !window.DeviceOrientationEvent
  // );

  const azimuth = useRef(props.azimuth || 0);

  const playerRef = useRef<THREE.Mesh>(null!);
  const arrowHelperRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!playerRef.current) return;

    const windSpeed = modifyParamWithinRange(windSpeeds[0], windSpeeds[1]);

    const nextAxle = moveAxle(
      getSpeed(leftControlValue, maxSpeed, minSpeed),
      getSpeed(rightControlValue, maxSpeed, minSpeed),
      azimuth.current,
      delta,
      inertiaFactor
    );

    const nextX =
      playerRef.current.position.x -
      (nextAxle.x + windSpeed * delta * Math.sin(windAngel));
    const nextZ =
      playerRef.current.position.z -
      (nextAxle.z + windSpeed * delta * Math.cos(windAngel));

    playerRef.current.position.set(nextX, playerRef.current.position.y, nextZ);
    playerRef.current.rotation.set(0, degToRad(180) + nextAxle.angle, 0);

    const pos = new THREE.Vector3();
    playerRef.current.getWorldDirection(pos);

    playerRef.current.attach(state.camera as THREE.Camera);
    state.camera.position.set(0, 1, 0.4);
    state.camera.rotation.set(thetaHead, Math.PI, -1 * azimuthHead);

    azimuth.current = nextAxle.angle;
  });

  return (
    <>
      <mesh ref={playerRef} position={props.position}>
        <boxGeometry args={[0.5, 2, 0.5]} />
        <meshBasicMaterial attach="material" color="red" />
        <arrowHelper ref={arrowHelperRef} />
      </mesh>
    </>
  );
};
