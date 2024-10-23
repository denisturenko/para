import { Canvas } from '@react-three/fiber';
import React, { memo, useEffect } from 'react';
import { Game } from 'entities/r3f/game';
import ReactLoading from 'react-loading';
import { GameControls } from 'shared/ui/game-controls';
import {
  AltitudeStyled,
  LoaderWrapperStyled,
  LogoImgStyled,
  SpeedStyled,
  GameContainerStyled,
  DebugStyled,
  AngelStyled,
} from './playground.styled';
import { Settings } from 'features/ui/settings';
import { GameControlsProvider } from 'shared/ui/game-controls/game-controls.provider';
import { usePlayground } from 'pages/playground/use-playground';
import { Player } from 'shared/r3f/player';
import logoImg from 'shared/assets/logo.png';
import { projectName } from 'shared/lib/configs';

export const Playground = memo(() => {
  const params = usePlayground();

  const {
    meta: { withOrbitControls },
    ui: { game, player, gameControls, settings },
  } = params;

  const loadingBlock = (
    <LoaderWrapperStyled>
      <LogoImgStyled alt={projectName} height="100" src={logoImg} />
      {projectName}
      <ReactLoading color="white" height={20} type="bubbles" width={100} />
    </LoaderWrapperStyled>
  );

  const gameCanvasBlock = (
    <Canvas data-testid="canvas-game">
      <Game {...game} />
      <Player {...player} />
    </Canvas>
  );

  const controlsBlock = (
    <>
      <AltitudeStyled data-testid="block-altitude-game-control" id="altitude" />
      <SpeedStyled data-testid="block-vert-speed-game-control" id="info" />
      <GameControls {...gameControls} />
      <AngelStyled data-testid="block-angel-game-control" id="angel" />
      <DebugStyled data-testid="block-debug-game-control" id="debug" />
    </>
  );

  const settingsBlock = <Settings {...settings} />;

  return (
    <GameContainerStyled id="playgroundId">
      <GameControlsProvider>
        {!game.isReady && loadingBlock}
        {gameCanvasBlock}

        {!withOrbitControls && game.isReady && controlsBlock}

        {settingsBlock}
      </GameControlsProvider>
    </GameContainerStyled>
  );
});

Playground.displayName = 'Playground';

export const PlaygroundSwitcher = () => {
  useEffect(() => {
    const el = document.getElementById('playgroundId');

    el.style.display = 'block';

    return () => {
      el.style.display = 'none';
    };
  }, []);

  return null;
};
