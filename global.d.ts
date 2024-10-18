import { GameControlsContextValues } from 'shared/ui/game-controls/game-controls.provider';

interface Window {
  game: {
    speed: {
      set: (num: number) => void;
      reset: () => void;
    };
    controls: GameControlsContextValues['onLeftControlChange'];
  };
}
