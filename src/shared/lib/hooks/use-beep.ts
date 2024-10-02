import useSound from 'use-sound';
import beepSound from 'shared/assets/sounds/beep.wav';
import beepLongSound from 'shared/assets/sounds/beep-long.wav';
import { useCallback } from 'react';

export enum BEEP {
  LONG = 'LONG',
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
}

export const useBeep = () => {
  const [playBeep] = useSound(beepSound, { volume: 0.7 });
  const [playBeepLong] = useSound(beepLongSound, { volume: 0.3 });

  const beepWithDelay = useCallback(
    (cb?: () => void) => {
      playBeep();
      setTimeout(() => {
        cb?.();
      }, 600);
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
