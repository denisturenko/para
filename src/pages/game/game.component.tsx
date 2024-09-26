import { Canvas } from '@react-three/fiber';
import React, { useCallback, useState } from 'react';
import * as THREE from 'three';
import { Game as GameR3f } from 'entities/r3f';
import type { GameSettings } from 'shared/lib/types';
import { GameControls } from 'shared/ui/game-controls';
import { AltitudeStyled, ContainerStyled, InfoStyled } from './game.styled';

const { MathUtils } = THREE;
const { degToRad } = MathUtils;

export const Game = () => {
  const [state, setState] = useState<GameSettings>({
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
          <GameR3f angelCorrection={Math.PI} {...state} />
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
