import { createVector, getWindByHeight } from 'shared/r3f/player';
import type { GameSettings, GameSettingsBase } from 'shared/lib/types';
import type { InitialState } from './playground.type';
import * as THREE from 'three';

export const adjustInitialState = (initialState: InitialState, distance: number = 400): GameSettings => {
  const currentTarget = initialState.targets.find(target => target.id === initialState.currentTargetId) || initialState.targets[0];

  const targetPosition = createVector(initialState.arrowPosition, currentTarget.length, -1 * currentTarget.azimuth, 0);

  const windAngel = Math.PI - (initialState?.angelCorrection || 0) - (getWindByHeight(initialState.winds, 0)?.angel || 0);

  const playerPosition = createVector(
    new THREE.Vector3(targetPosition.x, initialState.playerPositionHeight, targetPosition.z),
    distance,
    windAngel,
    0
  );
  const playerAzimuth = windAngel - Math.PI;

  return {
    ...initialState,
    playerPosition,
    playerAzimuth,
    targetPosition,
  };
};

export const prepareForStorage = (initialState: InitialState): GameSettingsBase => ({
  beep: initialState.beep,
  canopy: initialState.canopy,
  currentTargetId: initialState.currentTargetId,
  helpers: initialState.helpers,
  playerPositionHeight: initialState.playerPositionHeight,
  winds: initialState.winds,
});

export const isSettingsStoreValid = (initialState: Record<string, unknown>, settingsStore: Record<string, unknown>): boolean => {
  console.log('***', initialState, settingsStore);

  return true;
};
