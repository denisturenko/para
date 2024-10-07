import * as THREE from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import type { GameSettings } from 'shared/lib/types';

export const initialState: Omit<GameSettings, 'playerAzimuth' | 'playerPosition' | 'targetPosition'> = {
  angelCorrection: Math.PI,

  isNotStarted: true,
  isPaused: true,
  isRestart: false,
  withOrbitControls: false,

  winds: [{ minHeight: 0, angel: degToRad(345), speed: 2, hasGusts: false }],

  canopy: { verticalSpeed: 7, maxSpeed: 13, minSpeed: 3, inertiaFactor: 1 },

  helpers: { isVisibleCircles: true, isVisibleCross: true, isVisibleShadow: true, isVisibleTrack: true },

  beep: {
    volume: 1,
    heightFor3: { enable: true, value: 350 },
    heightFor2: { enable: true, value: 200 },
    heightFor1: { enable: true, value: 150 },
    heightForLong: { enable: true, value: 110 },
  },

  // Player setting
  // playerPosition: new THREE.Vector3(-300, 600, -300), // !
  // playerAzimuth: Math.PI / 2, // !
  playerBodyHeight: 2,
  playerPositionHeight: 800,
  isReady: false,

  currentTargetId: '1',
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
