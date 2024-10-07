import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ArrowHelper } from 'three';
import * as THREE from 'three';
import type { BeepSettingsType, CanopySettings, HelperSettings, WindSettings } from 'shared/lib/types';
import { getSpeed, getWindByHeight, modifyParamWithinRange, moveAxle } from './player.utils';
import { useGameControlsContext } from 'shared/ui/game-controls/game-controls.provider';
import { useThrottledCallback } from 'use-debounce';
import { BEEP, useBeep, useOneTimeCall } from 'shared/lib/hooks';
import { Skydiver2 } from 'shared/r3f/skydiver';
import { degToRad } from 'three/src/math/MathUtils';

export interface PlayerProps {
  angelCorrection?: number;
  azimuth?: number;
  beep?: BeepSettingsType;
  canopy: CanopySettings;
  helpers: HelperSettings;
  ignoreHeadCamera?: boolean;
  isPaused: boolean;
  isRestart: boolean;
  onChangePosition?(position: THREE.Vector3): void;
  onFinish?(): void;
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
    helpers: { isVisibleShadow, isVisibleTrack },
    onFinish,
  } = props;

  const { beep } = useBeep({ volume: props.beep?.volume });

  const [beepThree, beepThreeReset] = useOneTimeCall(() => beep(BEEP.THREE));
  const [beepTwo, beepTwoReset] = useOneTimeCall(() => beep(BEEP.TWO));
  const [beepOne, beepOneReset] = useOneTimeCall(() => beep(BEEP.ONE));
  const [beepLong, beepLongReset] = useOneTimeCall(() => beep(BEEP.LONG));
  const [onFinishHandler, onFinishHandlerReset] = useOneTimeCall(() => onFinish?.());

  const [track, setTrack] = useState<THREE.Vector3[]>([]);
  const [showTrack, setShowTrack] = useState(isVisibleTrack);

  const { leftControlValue, rightControlValue, cameraTheta } = useGameControlsContext();

  const [showArrowHelper] = useState(false);

  const azimuth = useRef(props.azimuth || 0);

  const playerRef = useRef<THREE.Mesh>({ position } as THREE.Mesh);
  const playerShadowRef = useRef<THREE.Mesh>({ position } as THREE.Mesh);
  const playerShadowGeometryRef = useRef<THREE.Mesh>();

  useEffect(() => {
    if (isRestart) {
      playerRef.current.position.set(props.position.x, props.position.y, props.position.z);
      azimuth.current = props.azimuth || 0;
      setTrack([]);
      setShowTrack(isVisibleTrack);

      beepThreeReset();
      beepTwoReset();
      beepOneReset();
      beepLongReset();
      onFinishHandlerReset();
    }
  }, [
    props.position,
    isRestart,
    props.azimuth,
    isVisibleTrack,
    beepThreeReset,
    beepTwoReset,
    beepOneReset,
    beepLongReset,
    onFinishHandlerReset,
  ]);

  const arrowHelperRef = useRef<ArrowHelper>(null!);

  const setTrackThrottled = useThrottledCallback(() => {
    setTrack(prev => {
      const copy = [...prev];

      const { x, z } = playerShadowRef.current.position;

      copy.push(new THREE.Vector3(x, 0.1, z));

      return copy;
    });
  }, 1000);

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

    const { heightFor3, heightFor2, heightFor1, heightForLong } = props.beep;

    if (heightFor3?.enable && nextY < heightFor3.value) {
      beepThree();
    }

    if (heightFor2?.enable && nextY < heightFor2.value) {
      beepTwo();
    }

    if (heightFor1?.enable && nextY < heightFor1.value) {
      beepOne();
    }

    if (heightForLong?.enable && nextY < heightForLong.value) {
      beepLong();
    }

    // todo
    if (nextY < 0) {
      onFinishHandler();
      // const cameraY = getSpeed(leftControlValue, 200, 800);

      state.camera.position.set(0, 400, 0);
      state.camera.rotation.set(Math.PI / 2, Math.PI, 0);
      setShowTrack(true);
      onChangePosition?.(new THREE.Vector3(playerRef.current.position.x, 0, playerRef.current.position.z));

      return;
    }

    playerRef.current.position.set(nextX, nextY, nextZ);
    playerRef.current.rotation.set(0, Math.PI + nextAxle.angle, 0);

    playerShadowRef.current.position.set(nextX, nextY - 100, nextZ);
    setTrackThrottled();

    onChangePosition?.(new THREE.Vector3(nextX, nextY, nextZ));

    const pos = new THREE.Vector3();

    playerRef.current.getWorldDirection(pos);

    if (!ignoreHeadCamera) {
      playerRef.current.attach(state.camera as THREE.Camera);
      state.camera.position.set(0, playerBodyHeight + 1.4, 0.1);
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

  // console.log('***', tmpTrack);

  return (
    <>
      <mesh ref={playerRef} position={playerRef.current.position}>
        <mesh position={[0, playerBodyHeight / 2, 0]} rotation-x={degToRad(-5)}>
          <Skydiver2 />
          {/* <boxGeometry args={[0.5, playerBodyHeight, 0.5]} />
          <meshBasicMaterial attach="material" color="#595856" /> */}
          {/* {showArrowHelper && <arrowHelper ref={arrowHelperRef} args={[undefined, undefined, 0.4]} />} */}
        </mesh>
      </mesh>

      <mesh ref={playerShadowRef} rotation-x={-Math.PI / 2} visible={isVisibleShadow}>
        <circleGeometry ref={playerShadowGeometryRef} args={[0.5, 32]} />
        <meshBasicMaterial attach="material" color="white" />
      </mesh>

      {showTrack &&
        track.map(trackPosition => (
          <mesh
            key={`${trackPosition.x}-${trackPosition.y}-${trackPosition.z}`}
            // position={new THREE.Vector3(trackPosition.x, 0, trackPosition.z)}
            position={trackPosition}
            rotation-x={-Math.PI / 2}
          >
            <circleGeometry ref={playerShadowGeometryRef} args={[1, 32]} />
            <meshBasicMaterial attach="material" color="white" />
          </mesh>
        ))}
    </>
  );
};
