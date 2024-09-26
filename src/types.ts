import type * as THREE from 'three';

export interface WindSettings {
  minHeight: number;
  angel: number;
  speed: number;
  hasGusts?: boolean;
}

export interface AppState {
  isPaused: boolean;
  withOrbitControls: boolean;
  winds: WindSettings[];
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
