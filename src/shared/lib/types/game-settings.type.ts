import type * as THREE from 'three';
import type { WindSettings } from './wind-settings.type';

export interface GameSettings {
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
