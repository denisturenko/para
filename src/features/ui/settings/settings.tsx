import { Drawer } from 'shared/ui/drawer/drawer';
import { SettingsIntroForm } from 'entities/ui/settings-intro-form';
import { SettingsForm } from 'entities/ui/settings-form';
import React, { useCallback, useState, memo, useEffect } from 'react';
import { Button, Space } from 'antd';
import type { SettingsFormValues } from 'entities/ui/settings-form/settings-form.types';
import { useListenChangedProps } from 'shared/lib/hooks';

export interface SettingsProps {
  isNotStarted: boolean;
  isOpen?: boolean;
  onRestart?(): void;
  onResume?(): void;
  onSaveSettings?(initialValues: SettingsFormValues): void;
  onStart?(): void;
  values: SettingsFormValues;
}

export const Settings = memo((props: SettingsProps) => {
  const { isOpen, onResume, onRestart, onSaveSettings, onStart, isNotStarted } = props;

  const [values, setValues] = useState(props.values);

  useListenChangedProps(values, 'setting');

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