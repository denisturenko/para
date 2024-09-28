import { Drawer } from 'shared/ui/drawer/drawer';
import { SettingsIntroForm } from 'entities/ui/settings-intro-form';
import { SettingsForm } from 'entities/ui/settings-form';
import React, { useCallback, useState, memo } from 'react';
import { Button, Space } from 'antd';
import type { SettingsFormValues } from 'entities/ui/settings-form/settings-form.types';

export interface SettingsProps {
  values: SettingsFormValues;
  isNotStarted: boolean;
  isOpen?: boolean;
  onStart?(): void;
  onRestart?(): void;
  onResume?(): void;
  onSaveSettings?(initialValues: SettingsFormValues): void;
}

export const Settings = memo((props: SettingsProps) => {
  const { isOpen, onResume, onRestart, onSaveSettings, onStart, isNotStarted } = props;

  const [values, setValues] = useState(props.values);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const onCloseHandler = useCallback(() => {
    onResume?.();
  }, [onResume]);

  const openSettingsHandler = useCallback(() => setIsOpenSettings(true), []);
  const closeSettingsHandler = useCallback(() => setIsOpenSettings(false), []);

  const onCloseSettingsHandler = useCallback(() => {
    closeSettingsHandler();
  }, [closeSettingsHandler]);

  const onSaveSettingsHandler = useCallback(() => {
    onSaveSettings?.(values);

    closeSettingsHandler();
  }, [closeSettingsHandler, onSaveSettings, values]);

  return (
    <Drawer closeIcon={!isNotStarted} open={isOpen} size="default" title="PaRa" onClose={onCloseHandler}>
      <SettingsIntroForm
        isNotStarted={isNotStarted}
        onRestart={onRestart}
        onResume={onResume}
        onSettings={openSettingsHandler}
        onStart={onStart}
      />

      <Drawer
        extra={
          <Space>
            <Button onClick={onCloseSettingsHandler}>Отмена</Button>
            <Button type="primary" onClick={onSaveSettingsHandler}>
              Сохранить
            </Button>
          </Space>
        }
        open={isOpenSettings}
        size="large"
        onClose={onCloseSettingsHandler}
      >
        <SettingsForm initialValues={values} onChange={setValues} />
      </Drawer>
    </Drawer>
  );
});
Settings.displayName = 'Settings';
