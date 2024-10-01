import { Button, Stack } from '@mantine/core';

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
    <Stack>
      {!isNotStarted && (
        <Button size="xs" variant="default" onClick={onRestart}>
          Начать заново
        </Button>
      )}
      <Button size="xs" variant="default" onClick={onSettings}>
        Настройки
      </Button>
      {isNotStarted ? (
        <Button size="xs" variant="filled" onClick={onStart}>
          Начать
        </Button>
      ) : (
        <Button size="xs" variant="filled" onClick={onResume}>
          Продолжить
        </Button>
      )}
    </Stack>
  );
};
