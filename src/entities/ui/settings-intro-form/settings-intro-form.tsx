import { Button, Flex } from 'antd';

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
    <Flex vertical align="center" gap="middle">
      {!isNotStarted && (
        <Button block variant="outlined" onClick={onRestart}>
          Начать заново
        </Button>
      )}
      <Button block variant="outlined" onClick={onSettings}>
        Настройки
      </Button>
      {isNotStarted ? (
        <Button block type="primary" onClick={onStart}>
          Начать
        </Button>
      ) : (
        <Button block type="primary" onClick={onResume}>
          Продолжить
        </Button>
      )}
    </Flex>
  );
};
