import { SettingsIntroForm } from 'entities/ui/settings-intro-form';
import React, { useCallback, useState, memo, useEffect } from 'react';
import { SettingsForm } from 'entities/ui/settings-form';
import { Drawer } from 'shared/ui/drawer';
import type { SettingsFormValues } from 'entities/ui/settings-form/settings-form.types';

export interface SettingsProps {
  isNotStarted: boolean;
  isOpen?: boolean;
  onResetSettings?(): void;
  onRestart?(): void;
  onResume?(): void;
  onSaveSettings?(initialValues: SettingsFormValues): void;
  onStart?(): void;
  values: SettingsFormValues;
}

export const Settings = memo((props: SettingsProps) => {
  const { isOpen, onResume, onRestart, onSaveSettings, onStart, onResetSettings, isNotStarted } = props;

  const [values, setValues] = useState(props.values);

  useEffect(() => setValues(props.values), [props.values]);

  // useListenChangedProps(values, 'setting');

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
    // onSaveSettings?.(values);
    // closeSettingsHandler();
  }, [closeSettingsHandler, onSaveSettings, values]);

  const onResetSettingsHandler = useCallback(() => {
    onResetSettings?.();

    closeSettingsHandler();
  }, [closeSettingsHandler, onResetSettings]);

  return (
    <Drawer opened={isOpen} position="right" size="md" onClose={onCloseHandler}>
      <SettingsIntroForm
        isNotStarted={isNotStarted}
        onRestart={onRestart}
        onResume={onResume}
        onSettings={openSettingsHandler}
        onStart={onStart}
      />
      <Drawer
        opened={isOpenSettings}
        position="right"
        size="xl"
        title="Настройки"
        onClose={onCloseSettingsHandler}
        onSubmit={onSaveSettingsHandler}
      >
        <SettingsForm initialValues={values} onChange={setValues} onReset={onResetSettingsHandler} />
      </Drawer>
    </Drawer>
  );
});
Settings.displayName = 'Settings';
