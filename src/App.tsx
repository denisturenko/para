import { Game } from "./components/Game";
import { TouchBar } from "./ui/touch-bar/TouchBar";
import React, { useCallback, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { AltitudeStyled, ContainerStyled, InfoStyled } from "./App.styled";
import { GameControls } from "./ui/game-controls/GameControls";
import { SettingsPanel } from "./ui/settings-panel/SettingPanel";
const { Vector3, MathUtils, ArrowHelper, Ray } = THREE;
const { degToRad, radToDeg } = MathUtils;

interface State {
  isPaused: boolean;
  withOrbitControls: boolean;
  windAngel: number;
  windSpeeds: number[];
  playerPosition: THREE.Vector3;
  playerAzimuth: number;
  playerBodyHeight: number;
  cameraTheta?: number;
  leftControlValue: number;
  rightControlValue: number;
  verticalSpeed: number;
  maxSpeed: number;
  minSpeed: number;
  inertiaFactor: number;
  targetPosition: THREE.Vector3;
  arrowPosition: THREE.Vector3;
}

export const App = () => {
  const [state, setState] = useState<State>({
    isPaused: false,
    withOrbitControls: false,

    // Wind
    windAngel: degToRad(140),
    windSpeeds: [4, 6],
    // windSpeeds: [0, 0],

    // Player setting
    playerPosition: new THREE.Vector3(-400, 600, -200),
    playerAzimuth: Math.PI / 2,
    playerBodyHeight: 2,

    cameraTheta: undefined,
    leftControlValue: 0,
    rightControlValue: 0,

    // Canopy setting
    verticalSpeed: 6,
    maxSpeed: 13,
    minSpeed: 3,
    inertiaFactor: 1, // 1-5

    targetPosition: new THREE.Vector3(-274, 0.1, -448),
    arrowPosition: new THREE.Vector3(-190, 0.1, -170),
  });

  const onChangeCameraThetaHandler = useCallback(
    (cameraTheta: number) => setState((prev) => ({ ...prev, cameraTheta })),
    []
  );

  const onLeftControlChangeHandler = useCallback(
    (leftControlValue: number) =>
      setState((prev) => ({ ...prev, leftControlValue })),
    []
  );

  const onRightControlChangeHandler = useCallback(
    (rightControlValue: number) =>
      setState((prev) => ({ ...prev, rightControlValue })),
    []
  );

  const onGroundHandler = useCallback(
    () => setState((prev) => ({ ...prev, withOrbitControls: true })),
    []
  );

  const onRestart = useCallback(
    (isPaused: boolean) =>
      setState((prev) => ({ ...prev, isPaused: !prev.isPaused })),
    []
  );

  const onChangePausedHandler = useCallback(
    (isPaused: boolean) =>
      setState((prev) => ({
        ...prev,
        isPaused: !prev.isPaused,
        playerPosition: new THREE.Vector3(-400, 600, -200),
      })),
    []
  );

  /*useEffect(() => {
    setTimeout(() => {
      setLeftControlValue(50);
      setTimeout(() => {
        setLeftControlValue(0);

        setTimeout(() => {
          setLeftControlValue(50);
          setTimeout(() => {
            setLeftControlValue(0);
          }, 2000);
        }, 25 * 1000);
        //
      }, 2000);
    }, 25 * 1000);
  }, []);*/

  return (
    <>
      <ContainerStyled>
        <Canvas
        /*camera={
            {
              // fov: 60,
              // position: [0, 600, 0],
              // far: 3500,
              // rotation: [Math.PI / 2, 0, 0],
            }
          }*/
        >
          <Game angelCorrection={Math.PI} {...state} />
        </Canvas>
      </ContainerStyled>

      {!state.withOrbitControls && (
        <>
          <AltitudeStyled id="altitude" />
          <InfoStyled id="info" />
          <GameControls
            {...state}
            onChangeCameraTheta={onChangeCameraThetaHandler}
            onLeftControlChange={onLeftControlChangeHandler}
            onRightControlChange={onRightControlChangeHandler}
            onSettings={onChangePausedHandler}
          />
        </>
      )}

      {state.isPaused && <SettingsPanel />}
    </>
  );
};
