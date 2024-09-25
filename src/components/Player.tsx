import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
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

interface PlayerProps {
  isPaused: boolean;
  position: THREE.Vector3;
  playerBodyHeight: number;
  azimuth?: number;
  ignoreHeadCamera?: number;
  cameraTheta: number;
  leftControlValue: number;
  rightControlValue: number;
  verticalSpeed: number;
  maxSpeed: number;
  minSpeed: number;
  inertiaFactor: number;
  windSpeeds: number[];
  windAngel: number;
  onChangePosition: (position: THREE.Vector3) => void;
}

export const Player = (props: PlayerProps) => {
  const {
    ignoreHeadCamera,
    cameraTheta,
    leftControlValue,
    rightControlValue,
    verticalSpeed,
    maxSpeed,
    minSpeed,
    inertiaFactor,
    windSpeeds,
    windAngel,
    onChangePosition,
    playerBodyHeight,
    position,
    isPaused,
  } = props;

  const [showArrowHelper, setShowArrowHelper] = useState(false);

  const azimuth = useRef(props.azimuth || 0);

  const playerRef = useRef<THREE.Mesh>({ position } as THREE.Mesh);
  useEffect(() => {
    if (!isPaused) {
      playerRef.current.position.set(position.x, position.y, position.z);
      azimuth.current = props.azimuth;
    }
  }, [position, isPaused, props.azimuth]);

  const arrowHelperRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!playerRef.current) return;
    if (isPaused) return;

    const windSpeed = modifyParamWithinRange(windSpeeds[0], windSpeeds[1]);

    const nextAxle = moveAxle(
      getSpeed(leftControlValue, maxSpeed, minSpeed),
      getSpeed(rightControlValue, maxSpeed, minSpeed),
      azimuth.current,
      delta,
      inertiaFactor,
    );

    const nextX =
      playerRef.current.position.x -
      (nextAxle.x + windSpeed * delta * Math.sin(windAngel));
    const nextZ =
      playerRef.current.position.z -
      (nextAxle.z + windSpeed * delta * Math.cos(windAngel));
    const nextY = playerRef.current.position.y - verticalSpeed * delta;
    // nextY = 100;

    // todo
    if (nextY < 0) {
      state.camera.position.set(0, 30, 0);
      state.camera.rotation.set(Math.PI / 2, Math.PI, 0);

      onChangePosition(
        new THREE.Vector3(
          playerRef.current.position.x,
          0,
          playerRef.current.position.z,
        ),
      );
      return;
    }

    playerRef.current.position.set(nextX, nextY, nextZ);
    playerRef.current.rotation.set(0, degToRad(180) + nextAxle.angle, 0);

    onChangePosition(new THREE.Vector3(nextX, nextY, nextZ));

    const pos = new THREE.Vector3();
    playerRef.current.getWorldDirection(pos);

    if (!ignoreHeadCamera) {
      playerRef.current.attach(state.camera as THREE.Camera);
      state.camera.position.set(0, playerBodyHeight, 0.4);
      state.camera.rotation.set(cameraTheta, Math.PI, 0);
    }

    // console.log("***", radToDeg(orientation.theta));
    /*state.camera.rotation.set(
      orientation.theta,
      orientation.beta,
      // Math.PI + (Math.PI / 180) * 40,
      -1 * orientation.azimuth
    );*/

    // todo ugly ugly
    const altitudeEl = document.getElementById("altitude");
    if (altitudeEl) altitudeEl.innerHTML = String(nextY.toFixed(0));

    azimuth.current = nextAxle.angle;
  });

  return (
    <>
      <mesh ref={playerRef} position={playerRef.current.position}>
        <mesh position={[0, playerBodyHeight / 2, 0]}>
          <boxGeometry args={[0.5, playerBodyHeight, 0.5]} />
          <meshBasicMaterial attach="material" color="#595856" />
          {showArrowHelper && (
            <arrowHelper
              ref={arrowHelperRef}
              args={[undefined, undefined, 0.4]}
            />
          )}
        </mesh>
      </mesh>
    </>
  );
};
