import type * as THREE from 'three';
import type { WindSettings } from './wind-settings.type';
import type { CanopySettings } from './canopy-settings.type';
import type { HelperSettings } from 'shared/lib/types/helper-settings.type';

export interface GameSettings {
  angelCorrection?: number;
  arrowAngel?: number;
  arrowPosition: THREE.Vector3;

  canopy: CanopySettings;
  helpers: HelperSettings;
  isNotStarted: boolean;

  isPaused: boolean;
  isRestart: boolean;

  playerAzimuth: number;
  playerBodyHeight: number;
  playerPosition: THREE.Vector3;
  playerPositionHeight: number;

  targetPosition: THREE.Vector3;
  winds: WindSettings[];

  withOrbitControls: boolean;
}
