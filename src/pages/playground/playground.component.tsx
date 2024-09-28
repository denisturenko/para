import { Canvas } from '@react-three/fiber';
import React from 'react';
import { Game } from 'entities/r3f/game';
import { GameControls } from 'shared/ui/game-controls';
import { AltitudeStyled, ContainerStyled, InfoStyled } from './playground.styled';
import { Settings } from 'features/ui/settings';
import { GameControlsProvider } from 'shared/ui/game-controls/game-controls.provider';
import { usePlayground } from 'pages/playground/use-playground';

export const Playground = () => {
  const {
    meta: { isNotStarted, withOrbitControls },
    ui: { game, settings, gameControls },
  } = usePlayground();

  return (
    <GameControlsProvider>
      <ContainerStyled>
        {!isNotStarted && (
          <Canvas>
            <Game {...game} />
          </Canvas>
        )}
      </ContainerStyled>

      {!withOrbitControls && (
        <>
          <AltitudeStyled id="altitude" />
          <InfoStyled id="info" />
          <GameControls {...gameControls} />
        </>
      )}

      <Settings {...settings} />
    </GameControlsProvider>
  );
};
