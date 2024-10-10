import { Canvas } from '@react-three/fiber';
import React from 'react';
import { Game } from 'entities/r3f/game';
import ReactLoading from 'react-loading';
import { GameControls } from 'shared/ui/game-controls';
import { AltitudeStyled, ContainerStyled, LoaderWrapperStyled, LogoImgStyled } from './playground.styled';
import { Settings } from 'features/ui/settings';
import { GameControlsProvider } from 'shared/ui/game-controls/game-controls.provider';
import { usePlayground } from 'pages/playground/use-playground';
import { Player } from 'shared/r3f/player';
import logoImg from 'shared/assets/logo.png';
import { projectName } from 'shared/lib/configs';
import { Intro } from 'shared/ui/intro';

export const Playground = () => {
  const {
    meta: { isNotStarted, withOrbitControls },
    ui: { game, player, settings, gameControls },
  } = usePlayground();

  return (
    <GameControlsProvider>
      <ContainerStyled>
        {!isNotStarted && (
          <>
            {!game.isReady && (
              <Intro />
              /* <LoaderWrapperStyled>
                <LogoImgStyled alt={projectName} height="100" src={logoImg} />
                {projectName}
                <ReactLoading color="white" height={20} type="bubbles" width={100} />
              </LoaderWrapperStyled> */
            )}
            <Canvas>
              <Game {...game}>
                <Player {...player} />
              </Game>
            </Canvas>
          </>
        )}
      </ContainerStyled>

      {!withOrbitControls && game.isReady && (
        <>
          <AltitudeStyled id="altitude" />
          {/* <InfoStyled id="info" /> */}
          <GameControls {...gameControls} />
        </>
      )}

      <Settings {...settings} />
    </GameControlsProvider>
  );
};
