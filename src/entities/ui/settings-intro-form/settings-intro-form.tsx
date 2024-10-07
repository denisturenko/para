import { Button } from '@mantine/core';
import { ContainerStyled, IconWrapperStyled } from './settings-intro-form.styled';
import logoImg from 'shared/assets/logo.png';
import { projectName } from 'shared/lib/configs';
import React from 'react';

interface SettingsIntroFormProps {
  isNotStarted: boolean;
  onRestart?(): void;
  onResume?(): void;
  onSettings?(): void;
  onStart?(): void;
}

export const SettingsIntroForm = (props: SettingsIntroFormProps) => {
  const { onRestart, onResume, onStart, onSettings, isNotStarted } = props;

  return (
    <ContainerStyled>
      <IconWrapperStyled>
        <img alt={projectName} src={logoImg} width="100" />
        {projectName}
      </IconWrapperStyled>
      {isNotStarted ? (
        <Button size="md" variant="filled" onClick={onStart}>
          Начать
        </Button>
      ) : (
        <Button size="md" variant="filled" onClick={onResume}>
          Продолжить
        </Button>
      )}
      {!isNotStarted && (
        <Button size="md" variant="default" onClick={onRestart}>
          Начать заново
        </Button>
      )}
      <Button size="md" variant="default" onClick={onSettings}>
        Настройки
      </Button>
    </ContainerStyled>
  );
};
