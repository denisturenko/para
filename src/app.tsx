import React, { useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { AltitudeStyled, ContainerStyled, InfoStyled } from './app.styled';
import { Game } from './components/game';
import type { AppState } from './types';
import { GameControls } from './ui/game-controls/game-controls';
import { SettingsPanel } from './ui/settings-panel/setting-panel';

const { MathUtils } = THREE;
const { degToRad } = MathUtils;

export const App = () => {
  const [state, setState] = useState<AppState>({
    isPaused: false,
    withOrbitControls: false,

    // Winds
    winds: [
      {
        minHeight: 0,
        angel: degToRad(140),
        speed: 4,
        hasGusts: false,
      },
    ],

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

  const onChangeCameraThetaHandler = useCallback((cameraTheta: number) => setState(prev => ({ ...prev, cameraTheta })), []);

  const onLeftControlChangeHandler = useCallback((leftControlValue: number) => setState(prev => ({ ...prev, leftControlValue })), []);

  const onRightControlChangeHandler = useCallback((rightControlValue: number) => setState(prev => ({ ...prev, rightControlValue })), []);

  // const onGroundHandler = useCallback(() => setState(prev => ({ ...prev, withOrbitControls: true })), []);
  //
  // const onRestart = useCallback((isPaused: boolean) => setState(prev => ({ ...prev, isPaused: !prev.isPaused })), []);

  const onChangePausedHandler = useCallback(
    () =>
      setState(prev => ({
        ...prev,
        isPaused: !prev.isPaused,
        playerPosition: new THREE.Vector3(-400, 600, -200),
      })),
    []
  );

  return (
    <>
      <ContainerStyled>
        <Canvas>
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
