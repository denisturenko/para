import * as THREE from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import type { GameSettings, GameSettingsBase } from 'shared/lib/types';

export const storageKey = 'gameSettings';

export const initialState: Omit<GameSettings, 'playerAzimuth' | 'playerPosition' | 'targetPosition'> = {
  angelCorrection: Math.PI,

  isNotStarted: true,
  isPaused: true,
  isRestart: false,
  isFinish: false,
  isReady: false,
  isPlayerArrowVisible: false,

  withOrbitControls: false,
  playerBodyHeight: 2,

  targets: [
    {
      id: '1',
      name: 'Банер',
      azimuth: degToRad(343),
      length: 290,
    },
    {
      id: '2',
      name: 'Фишка',
      azimuth: degToRad(320),
      length: 200,
    },
    {
      id: '3',
      name: 'Спорт',
      azimuth: degToRad(290),
      length: 100,
    },
  ],
  arrowPosition: new THREE.Vector3(-190, 0.1, -170),
};

export const initialSettings: GameSettingsBase = {
  winds: [{ minHeight: 0, angel: degToRad(345), speed: 2, hasGusts: false }],
  canopy: { verticalSpeed: 5, maxSpeed: 10, minSpeed: 1, inertiaFactor: 3 },
  helpers: { isVisibleCircles: true, isVisibleCross: true, isVisibleShadow: true, isVisibleTrack: true, allowToggleReleasing: false },

  beep: {
    volume: 1,
    heightFor3: { enable: true, value: 350 },
    heightFor2: { enable: true, value: 200 },
    heightFor1: { enable: true, value: 150 },
    heightForLong: { enable: true, value: 110 },
  },

  playerPositionHeight: 800,

  currentTargetId: '1',
};
