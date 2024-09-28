import { createVector, getWindByHeight } from 'shared/r3f/player';
import type { GameSettings } from 'shared/lib/types';

export const attachPlayerPosition = (initialState: Omit<GameSettings, 'playerPosition'>, distance: number = 500): GameSettings => {
  const windAngel = Math.PI - initialState.angelCorrection - getWindByHeight(initialState.winds, 0)?.angel || 0;

  const playerPosition = createVector({ ...initialState.targetPosition, y: initialState.playerPositionHeight }, distance, windAngel, 0);

  return {
    ...initialState,
    playerPosition,
  };
};
