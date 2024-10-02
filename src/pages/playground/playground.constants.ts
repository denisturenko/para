import * as THREE from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import type { GameSettings } from 'shared/lib/types';

export const initialState: Omit<GameSettings, 'playerAzimuth' | 'playerPosition'> = {
  angelCorrection: Math.PI,

  isNotStarted: true,
  isPaused: true,
  isRestart: false,
  withOrbitControls: false,

  winds: [{ minHeight: 0, angel: degToRad(345), speed: 2, hasGusts: false }],

  canopy: { verticalSpeed: 7, maxSpeed: 13, minSpeed: 3, inertiaFactor: 1 },

  helpers: { isVisibleCircles: true, isVisibleCross: true, isVisibleShadow: true, isVisibleTrack: true },

  // Player setting
  // playerPosition: new THREE.Vector3(-300, 600, -300), // !
  // playerAzimuth: Math.PI / 2, // !
  playerBodyHeight: 2,
  playerPositionHeight: 800,

  targetPosition: new THREE.Vector3(-274, 0.1, -448),
  arrowPosition: new THREE.Vector3(-190, 0.1, -170),
};
