import { GameControlsContextValues } from 'shared/ui/game-controls/game-controls.provider';

interface Window {
  game: {
    wind: {
      setIgnoreGusts: (flg: boolean) => void;
    };
    speed: {
      set: (num: number) => void;
      reset: () => void;
    };
    controls: GameControlsContextValues['onLeftControlChange'];
  };
}
