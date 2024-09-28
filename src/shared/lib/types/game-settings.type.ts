import type * as THREE from 'three';
import type { WindSettings } from './wind-settings.type';
import type { CanopySettings } from './canopy-settings.type';
import type { HelperSettings } from 'shared/lib/types/helper-settings.type';

export interface GameSettings {
  isNotStarted: boolean;
  isPaused: boolean;
  isRestart: boolean;

  withOrbitControls: boolean;

  winds: WindSettings[];
  canopy: CanopySettings;
  helpers: HelperSettings;

  playerPosition: THREE.Vector3;
  playerAzimuth: number;
  playerBodyHeight: number;

  cameraTheta?: number;
  leftControlValue: number;
  rightControlValue: number;

  targetPosition: THREE.Vector3;
  arrowPosition: THREE.Vector3;
  arrowAngel?: number;

  angelCorrection?: number;
}
