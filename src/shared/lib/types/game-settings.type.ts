import type * as THREE from 'three';
import type { WindSettings } from './wind-settings.type';
import type { CanopySettings } from './canopy-settings.type';
import type { HelperSettings } from 'shared/lib/types/helper-settings.type';
import type { BeepSettings } from 'shared/lib/types/beep-settings';

export interface GameSettings {
  angelCorrection?: number;
  arrowAngel?: number;
  arrowPosition: THREE.Vector3;

  beep?: BeepSettings;
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
