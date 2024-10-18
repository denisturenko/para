import { Canvas } from '@react-three/fiber';
import React, { memo, useEffect, useRef } from 'react';
import { Game } from 'entities/r3f/game';
import ReactLoading from 'react-loading';
import { GameControls } from 'shared/ui/game-controls';
import {
  AltitudeStyled,
  ContainerStyled,
  LoaderWrapperStyled,
  LogoImgStyled,
  InfoStyled,
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
import { HomePageHeaderComponent } from 'entities/ui/home-page-header';
import { HomePageTopSection } from 'entities/ui/home-page-top-section';
import { HomePageFooterComponent } from 'entities/ui/home-page-footer';
import { HomePageAboutApp } from 'entities/ui/home-page-about-app/home-page-about-app.component';
import { links } from 'pages/playground/playground.constants';
import { HomePageInstallApp } from 'entities/ui/home-page-install-app';
import { Greetings } from 'features/ui/greetings';

export const Playground = memo(() => {
  const params = usePlayground();

  const {
    meta: { isNotStarted, withOrbitControls, isHomePageVisible },
    ui: { game, player, settings, gameControls, homePage, greetings },
  } = params;

  const homePageBlock = (
    <>
      <HomePageHeaderComponent aboutLink={links.about} dataTestId="hp-header" installLink={links.install} />
      <HomePageTopSection {...homePage} />
      <HomePageAboutApp id={links.about} />
      <HomePageInstallApp id={links.install} />
      <HomePageFooterComponent />
    </>
  );

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
      <InfoStyled data-testid="block-vert-speed-game-control" id="info" />
      <GameControls {...gameControls} />
      <AngelStyled data-testid="block-angel-game-control" id="angel" />
      <DebugStyled data-testid="block-debug-game-control" id="debug" />
    </>
  );

  const settingsBlock = <Settings {...settings} />;

  const greetingsBlock = <Greetings {...greetings} />;

  return (
    <>
      {greetingsBlock}
      <ContainerStyled $isHidden={!isHomePageVisible}>{homePageBlock}</ContainerStyled>
      <GameContainerStyled $isHidden={isHomePageVisible}>
        <GameControlsProvider>
          {!isNotStarted && (
            <>
              {!game.isReady && loadingBlock}
              {gameCanvasBlock}
            </>
          )}

          {!withOrbitControls && game.isReady && controlsBlock}

          {!isHomePageVisible && settingsBlock}
        </GameControlsProvider>
      </GameContainerStyled>
    </>
  );
});

Playground.displayName = 'Playground';
