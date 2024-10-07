import { createVector, getWindByHeight } from 'shared/r3f/player';
import type { GameSettings, GameSettingsBase } from 'shared/lib/types';

type InitialState = Omit<GameSettings, 'playerAzimuth' | 'playerPosition' | 'targetPosition'>;

export const adjustInitialState = (initialState: InitialState, distance: number = 400): GameSettings => {
  const currentTarget = initialState.targets.find(target => target.id === initialState.currentTargetId) || initialState.targets[0];

  const targetPosition = createVector(initialState.arrowPosition, currentTarget.length, -1 * currentTarget.azimuth, 0);

  const windAngel = Math.PI - initialState.angelCorrection - getWindByHeight(initialState.winds, 0)?.angel || 0;

  const playerPosition = createVector({ ...targetPosition, y: initialState.playerPositionHeight }, distance, windAngel, 0);
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
