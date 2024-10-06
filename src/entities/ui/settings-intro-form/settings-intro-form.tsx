import { Button } from '@mantine/core';
import { ContainerStyled } from './settings-intro-form.styled';

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
