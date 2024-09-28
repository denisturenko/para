import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { WindSettings, CanopySettings } from 'shared/lib/types';
import { getSpeed, getWindByHeight, modifyParamWithinRange, moveAxle } from './player.utils';
import { useGameControlsContext } from 'shared/ui/game-controls/game-controls.provider';

export interface PlayerProps {
  angelCorrection?: number;
  azimuth?: number;
  canopy: CanopySettings;
  ignoreHeadCamera?: boolean;
  isPaused: boolean;
  isRestart: boolean;
  onChangePosition?(position: THREE.Vector3): void;
  playerBodyHeight: number;
  position: THREE.Vector3;
  winds: WindSettings[];
}

export const Player = (props: PlayerProps) => {
  const {
    ignoreHeadCamera,
    winds,
    canopy: { inertiaFactor, verticalSpeed, maxSpeed, minSpeed },
    onChangePosition,
    playerBodyHeight,
    position,
    isPaused,
    isRestart,
    angelCorrection = 0,
  } = props;

  const { leftControlValue, rightControlValue, cameraTheta } = useGameControlsContext();

  const [showArrowHelper] = useState(false);

  const azimuth = useRef(props.azimuth || 0);

  const playerRef = useRef<THREE.Mesh>({ position } as THREE.Mesh);

  useEffect(() => {
    if (isRestart) {
      playerRef.current.position.set(props.position.x, props.position.y, props.position.z);
      azimuth.current = props.azimuth;
    }
  }, [props.position, isRestart, props.azimuth]);

  const arrowHelperRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!playerRef.current) return;

    if (isPaused) return;

    const currentWind: WindSettings = getWindByHeight(winds, playerRef.current.position.y) || { speed: 1, angel: 0, minHeight: 0 };

    const windSpeed = modifyParamWithinRange(currentWind.speed, currentWind.speed + (currentWind.hasGusts ? 3 : 1));

    const nextAxle = moveAxle(
      getSpeed(leftControlValue, maxSpeed, minSpeed),
      getSpeed(rightControlValue, maxSpeed, minSpeed),
      azimuth.current,
      delta,
      inertiaFactor
    );

    const currentWindAngel = angelCorrection - currentWind.angel;

    const nextX = playerRef.current.position.x - (nextAxle.x + windSpeed * delta * Math.sin(currentWindAngel));
    const nextZ = playerRef.current.position.z - (nextAxle.z + windSpeed * delta * Math.cos(currentWindAngel));
    const nextY = playerRef.current.position.y - verticalSpeed * delta;
    // nextY = 100;

    // todo
    if (nextY < 0) {
      state.camera.position.set(0, 30, 0);
      state.camera.rotation.set(Math.PI / 2, Math.PI, 0);

      onChangePosition?.(new THREE.Vector3(playerRef.current.position.x, 0, playerRef.current.position.z));

      return;
    }

    playerRef.current.position.set(nextX, nextY, nextZ);
    playerRef.current.rotation.set(0, Math.PI + nextAxle.angle, 0);

    onChangePosition?.(new THREE.Vector3(nextX, nextY, nextZ));

    const pos = new THREE.Vector3();

    playerRef.current.getWorldDirection(pos);

    if (!ignoreHeadCamera) {
      playerRef.current.attach(state.camera as THREE.Camera);
      state.camera.position.set(0, playerBodyHeight, 0.4);
      state.camera.rotation.set(cameraTheta, Math.PI, 0);
    }

    // console.log("***", radToDeg(orientation.theta));
    /* state.camera.rotation.set(
      orientation.theta,
      orientation.beta,
      // Math.PI + (Math.PI / 180) * 40,
      -1 * orientation.azimuth
    ); */

    // todo ugly ugly
    const altitudeEl = document.getElementById('altitude');

    if (altitudeEl) altitudeEl.innerHTML = String(nextY.toFixed(0));

    azimuth.current = nextAxle.angle;
  });

  return (
    <mesh ref={playerRef} position={playerRef.current.position}>
      <mesh position={[0, playerBodyHeight / 2, 0]}>
        <boxGeometry args={[0.5, playerBodyHeight, 0.5]} />
        <meshBasicMaterial attach="material" color="#595856" />
        {showArrowHelper && <arrowHelper ref={arrowHelperRef} args={[undefined, undefined, 0.4]} />}
      </mesh>
    </mesh>
  );
};
