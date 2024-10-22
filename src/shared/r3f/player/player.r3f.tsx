import { useFrame } from '@react-three/fiber';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { BeepSettingsType, CanopySettings, HelperSettings, WindSettings } from 'shared/lib/types';
import {
  calculateVerticalSpeed,
  calculateVerticalSpeedForTurns,
  getSpeed,
  getWindByHeight,
  modifyParamWithinRange,
  moveAxle,
} from './player.utils';
import { useGameControlsContext } from 'shared/ui/game-controls/game-controls.provider';
import { useThrottledCallback } from 'use-debounce';
import { BEEP, useBeep, useOneTimeCall } from 'shared/lib/hooks';
import { Skydiver2 } from 'shared/r3f/skydiver';
import set from 'lodash/set';
import { initialGameSpeed, initialWindIgnoreGusts } from './player.constants';
import { getVectorAngel, normalizeAngle } from 'shared/lib/utils';

const { degToRad, radToDeg } = THREE.MathUtils;

/** Need for selenium tests . */
const toAngel = (str: string = '') => {
  const el = document.getElementById('angel');

  if (el) {
    el.innerHTML = str;
  }
};

export interface PlayerProps {
  angelCorrection?: number;
  arrowAngel?: number;
  azimuth?: number;
  beep?: BeepSettingsType;
  canopy: CanopySettings;
  helpers: HelperSettings;
  ignoreHeadCamera?: boolean;
  isPaused: boolean;
  isPlayerArrowVisible: boolean;
  isRestart: boolean;
  onChangePosition?(position: THREE.Vector3): void;
  onFinish?(position: THREE.Vector3): void;
  playerBodyHeight: number;
  position: THREE.Vector3;
  winds: WindSettings[];
}

export const Player = memo((props: PlayerProps) => {
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
    helpers: { isVisibleShadow, isVisibleTrack, isVisibleAngelCircles },
    onFinish,
    arrowAngel = 0,
    isPlayerArrowVisible,
  } = props;

  const { beep } = useBeep({ volume: props.beep?.volume });

  const [beepThree, beepThreeReset] = useOneTimeCall(() => beep(BEEP.THREE));
  const [beepTwo, beepTwoReset] = useOneTimeCall(() => beep(BEEP.TWO));
  const [beepOne, beepOneReset] = useOneTimeCall(() => beep(BEEP.ONE));
  const [beepLong, beepLongReset] = useOneTimeCall(() => beep(BEEP.LONG));

  const [track, setTrack] = useState<THREE.Vector3[]>([]);
  const [showTrack, setShowTrack] = useState(isVisibleTrack);

  const { leftControlValue, rightControlValue, cameraTheta, onLeftControlChange, onRightControlChange, onChangeCameraTheta } =
    useGameControlsContext();

  const azimuth = useRef(props.azimuth || 0);

  const gameSpeedRef = useRef(initialGameSpeed);
  const resetGameSpeed = useCallback(() => (gameSpeedRef.current = initialGameSpeed), []);
  const ignoreGustsRef = useRef(initialWindIgnoreGusts);

  const playerRef = useRef<THREE.Mesh>({ position } as THREE.Mesh);
  const playerShadowRef = useRef<THREE.Mesh>({ position } as THREE.Mesh);
  const arrowHelperRef = useRef<THREE.Mesh>({ position } as THREE.Mesh);
  const calculateVerticalSpeedRef = useRef<ReturnType<typeof calculateVerticalSpeed> | null>();

  const [onFinishHandler, onFinishHandlerReset] = useOneTimeCall(() => onFinish?.(playerRef.current.position));

  useEffect(() => {
    if (isRestart) {
      calculateVerticalSpeedRef.current = calculateVerticalSpeed([
        [70, 10 * 1000, 0.25],
        [80, 8 * 1000, 1],
        [90, 5 * 1000, 2],
        [95, 2 * 1000, 3],
        [100, 2 * 1000, 75],
      ]);

      playerRef.current.position.set(props.position.x, props.position.y, props.position.z);
      azimuth.current = props.azimuth || 0;
      setTrack([]);
      setShowTrack(isVisibleTrack);

      beepThreeReset();
      beepTwoReset();
      beepOneReset();
      beepLongReset();

      onLeftControlChange();
      onRightControlChange();
      onChangeCameraTheta();

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
    onLeftControlChange,
    onRightControlChange,
    onChangeCameraTheta,
  ]);

  /** Selenium tests stuff */
  useEffect(() => {
    set(window, 'game.wind.setIgnoreGusts', (flg: boolean) => {
      ignoreGustsRef.current = flg;
    });
    set(window, 'game.speed.set', (num: number) => {
      gameSpeedRef.current = num;
    });
    set(window, 'game.speed.reset', resetGameSpeed);
  }, [resetGameSpeed]);

  const setTrackThrottled = useThrottledCallback(() => {
    setTrack(prev => {
      const copy = [...prev];

      const { x, z } = playerShadowRef.current.position;

      copy.push(new THREE.Vector3(x, 0.1, z));

      return copy;
    });
  }, 1000);

  useFrame((state, originalDelta) => {
    const delta = originalDelta * gameSpeedRef.current;

    if (!playerRef.current) return;

    if (isPaused) return;

    const currentWind: WindSettings = getWindByHeight(winds, playerRef.current.position.y) || { speed: 1, angel: 0, minHeight: 0 };

    const windSpeed = modifyParamWithinRange(currentWind.speed, currentWind.speed + (currentWind.hasGusts ? 3 : 1), ignoreGustsRef.current);

    const nextAxle = moveAxle(
      getSpeed(leftControlValue, maxSpeed, minSpeed),
      getSpeed(rightControlValue, maxSpeed, minSpeed),
      azimuth.current,
      delta,
      inertiaFactor
    );

    const currentWindAngel = angelCorrection - currentWind.angel;

    const printedAngel = getVectorAngel(new THREE.Vector3(nextAxle.x, 0, nextAxle.z)) - currentWind.angel - Math.PI / 2;

    toAngel(String(radToDeg(normalizeAngle(printedAngel)).toFixed(1)));

    // todos
    // const currentVerticalSpeed =
    // calculateVerticalSpeedRef.current?.(leftControlValue, rightControlValue, verticalSpeed) || verticalSpeed;
    const currentVerticalSpeed = calculateVerticalSpeedForTurns({ leftControlValue, rightControlValue, middleSpeed: verticalSpeed });

    const nextX = playerRef.current.position.x - (nextAxle.x + windSpeed * delta * Math.sin(currentWindAngel));
    const nextZ = playerRef.current.position.z - (nextAxle.z + windSpeed * delta * Math.cos(currentWindAngel));
    const nextY = playerRef.current.position.y - currentVerticalSpeed * delta;
    // nextY = 100;

    const { heightFor3, heightFor2, heightFor1, heightForLong } = props.beep || {};

    if (heightFor3?.enable && heightFor3?.value !== undefined && nextY < heightFor3?.value) {
      beepThree();
    }

    if (heightFor2?.enable && heightFor2?.value !== undefined && nextY < heightFor2?.value) {
      beepTwo();
    }

    if (heightFor1?.enable && heightFor1?.value !== undefined && nextY < heightFor1?.value) {
      beepOne();
    }

    if (heightForLong?.enable && heightForLong?.value !== undefined && nextY < heightForLong?.value) {
      beepLong();
    }

    // if (nextY < 50) {
    //   resetGameSpeed();
    // }

    // todo
    if (nextY < 0) {
      onFinishHandler();

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

    if (isPlayerArrowVisible) {
      // todo looks like PI wouldn't be here
      arrowHelperRef.current.rotation.set(0, arrowAngel - azimuth.current - Math.PI, 0);
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

    // todo ugly ugly
    const infoEl = document.getElementById('info');

    if (infoEl) infoEl.innerHTML = String(currentVerticalSpeed.toFixed(1));

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
          {isPlayerArrowVisible && (
            <mesh ref={arrowHelperRef} position={[0, playerBodyHeight / 2, 0.2]} rotation-y={arrowAngel}>
              <arrowHelper args={[undefined, undefined, 2, 'orange', 1]} />
            </mesh>
          )}
        </mesh>

        {isVisibleAngelCircles && (
          <>
            <mesh ref={arrowHelperRef} position={[0, playerBodyHeight / 2, 0.2]} rotation-x={-Math.PI / 2}>
              <ringGeometry args={[0.9, 0.903, 64]} />
              <meshBasicMaterial attach="material" color="white" />
            </mesh>
            <mesh ref={arrowHelperRef} position={[0, playerBodyHeight / 2, 0.2]} rotation-x={-Math.PI / 2}>
              <ringGeometry args={[2.29, 2.295, 64]} />
              <meshBasicMaterial attach="material" color="white" />
            </mesh>
            <mesh ref={arrowHelperRef} position={[0, playerBodyHeight / 2 + 1.8, 0.2]} rotation-x={-Math.PI / 2}>
              <ringGeometry args={[2.2, 2.205, 64]} />
              <meshBasicMaterial attach="material" color="white" />
            </mesh>
          </>
        )}
      </mesh>

      <mesh ref={playerShadowRef} rotation-x={-Math.PI / 2} visible={isVisibleShadow}>
        <circleGeometry args={[0.5, 32]} />
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
            <circleGeometry args={[1, 32]} />
            <meshBasicMaterial attach="material" color="white" />
          </mesh>
        ))}
    </>
  );
});

Player.displayName = 'Player';
