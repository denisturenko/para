import useSound from 'use-sound';
import beepLongSound from 'shared/assets/sounds/beep-long.wav';
import beepSound from 'shared/assets/sounds/beep05s.wav';
import { useCallback } from 'react';

export enum BEEP {
  LONG = 'LONG',
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
}

interface UseBeepParams {
  volume?: number; // 0-100
}

export const useBeep = (param: UseBeepParams) => {
  const { volume = 50 } = param;

  const [playBeep] = useSound(beepSound, { volume: (volume * 0.5) / 100 });
  const [playBeepLong] = useSound(beepLongSound, { volume: (volume * 0.3) / 100 });

  const beepWithDelay = useCallback(
    (cb?: () => void) => {
      playBeep();
      setTimeout(() => {
        cb?.();
      }, 1000);
    },
    [playBeep]
  );

  const beepHandler = useCallback(
    (type: BEEP) => {
      switch (type) {
        case 'THREE':
          beepWithDelay(() => beepWithDelay(beepWithDelay));
          break;
        case 'TWO':
          beepWithDelay(beepWithDelay);
          break;
        case 'ONE':
          beepWithDelay();
          break;
        case 'LONG':
        default:
          playBeepLong();
          break;
      }
    },
    [beepWithDelay, playBeepLong]
  );

  return {
    beep: beepHandler,
  };
};
