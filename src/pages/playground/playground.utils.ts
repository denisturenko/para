import { createVector, getWindByHeight } from 'shared/r3f/player';
import type { GameSettings } from 'shared/lib/types';

export const adjustInitialState = (
  initialState: Omit<GameSettings, 'playerAzimuth' | 'playerPosition' | 'targetPosition'>,
  distance: number = 400
): GameSettings => {
  const currentTarget = initialState.targets.find(target => target.id === initialState.currentTargetId);

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
