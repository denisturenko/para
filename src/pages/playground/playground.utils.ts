import { createVector, getWindByHeight } from 'shared/r3f/player';
import type { GameSettings, GameSettingsBase } from 'shared/lib/types';
import * as THREE from 'three';

type InitialState = Omit<GameSettings, 'playerAzimuth' | 'playerPosition' | 'targetPosition'>;

export const adjustInitialState = (initialState: InitialState, settings: GameSettingsBase, distance: number = 400): GameSettings => {
  const currentTarget = initialState.targets.find(target => target.id === settings.currentTargetId) || initialState.targets[0];

  const targetPosition = createVector(initialState.arrowPosition, currentTarget.length, -1 * currentTarget.azimuth, 0);

  const windAngel = Math.PI - (initialState?.angelCorrection || 0) - (getWindByHeight(settings.winds, 0)?.angel || 0);

  const playerPosition = createVector(
    new THREE.Vector3(targetPosition.x, settings.playerPositionHeight, targetPosition.z),
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

// Remove all extra fields before saving to store
export const prepareForStorage = (settings: GameSettingsBase): GameSettingsBase => ({
  beep: settings.beep,
  canopy: settings.canopy,
  currentTargetId: settings.currentTargetId,
  helpers: settings.helpers,
  playerPositionHeight: settings.playerPositionHeight,
  winds: settings.winds,
});

type Arg = Record<string, unknown>;

export const isSettingsStoreValid = (obj1: Arg, obj2: Arg): boolean => {
  // Проверка на равенство ссылок
  if (typeof obj1 !== 'object' && typeof obj2 !== 'object' && typeof obj1 === typeof obj2) return true;

  // Проверка на типы
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length === 0) return true;

    for (const value of obj2) {
      if (!isSettingsStoreValid(obj1[0] as Arg, value as Arg)) {
        return false;
      }
    }
  } else {
    // Получаем ключи объектов
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Сравнение количества ключей
    if (keys1.length !== keys2.length) {
      return false;
    }

    // Рекурсивное сравнение ключей и значений
    for (const key of keys1) {
      if (!keys2.includes(key) || !isSettingsStoreValid(obj1[key] as Arg, obj2[key] as Arg)) {
        return false;
      }
    }
  }

  return true;
};
