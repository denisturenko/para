import type * as THREE from 'three';
import type { WindSettings } from './wind-settings.type';
import type { CanopySettings } from './canopy-settings.type';
import type { HelperSettings } from './helper-settings.type';
import type { BeepSettingsType } from './beep-settings.type';
import type { TargetSettings } from './target-settings.type';

export interface GameSettings {
  angelCorrection?: number;
  arrowAngel?: number;
  arrowPosition: THREE.Vector3;

  beep?: BeepSettingsType;
  canopy: CanopySettings;
  currentTargetId: string;

  helpers: HelperSettings;
  isNotStarted: boolean;
  isPaused: boolean;

  isRestart: boolean;
  playerAzimuth: number;
  playerBodyHeight: number;

  playerPosition: THREE.Vector3;
  playerPositionHeight: number;
  targetPosition: THREE.Vector3;
  targets: TargetSettings[];
  winds: WindSettings[];

  withOrbitControls: boolean;
}
