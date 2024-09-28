import * as THREE from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import type { GameSettings } from 'shared/lib/types';

export const initialState: GameSettings = {
  isNotStarted: true,
  isPaused: true,
  isRestart: false,
  withOrbitControls: false,

  // Winds
  winds: [
    {
      minHeight: 0, // !
      angel: degToRad(140), // !
      speed: 5, // !
      hasGusts: false, // !
    },
  ],

  canopy: {
    verticalSpeed: 6,
    maxSpeed: 13,
    minSpeed: 3,
    inertiaFactor: 1,
  },

  helpers: {
    isVisibleCircles: true,
    isVisibleCross: true,
  },

  // Player setting
  playerPosition: new THREE.Vector3(-300, 600, -300), // !
  playerAzimuth: Math.PI / 2, // !
  playerBodyHeight: 2,

  cameraTheta: undefined,
  leftControlValue: 0,
  rightControlValue: 0,

  targetPosition: new THREE.Vector3(-274, 0.1, -448),
  arrowPosition: new THREE.Vector3(-190, 0.1, -170),
};
