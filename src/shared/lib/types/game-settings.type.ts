import type * as THREE from 'three';
import type { WindSettings } from './wind-settings.type';
import type { CanopySettings } from './canopy-settings.type';
import type { HelperSettings } from './helper-settings.type';
import type { BeepSettingsType } from './beep-settings.type';
import type { TargetSettings } from './target-settings.type';

export interface GameSettingsBase {
  beep?: BeepSettingsType;
  canopy: CanopySettings;
  currentTargetId: string;

  helpers: HelperSettings;
  playerPositionHeight: number;
  winds: WindSettings[];
}

export interface GameSettings {
  angelCorrection?: number;
  arrowAngel?: number;
  arrowPosition: THREE.Vector3;
  isFinish: boolean;

  isNotStarted: boolean;
  isPaused: boolean;
  isReady: boolean;

  isRestart: boolean;
  playerAzimuth: number;
  playerBodyHeight: number;

  playerPosition: THREE.Vector3;
  targetPosition: THREE.Vector3;
  targets: TargetSettings[];

  withOrbitControls: boolean;
}
