import type { GameSettings } from 'shared/lib/types';

export type InitialState = Omit<GameSettings, 'playerAzimuth' | 'playerPosition' | 'targetPosition'>;
