import { SettingsIntroForm } from 'entities/ui/settings-intro-form';
import React, { useCallback, useState, memo } from 'react';
import { SettingsForm } from 'entities/ui/settings-form';
import { Drawer } from 'shared/ui/drawer';
import type { SettingsFormValues } from 'entities/ui/settings-form/settings-form.types';

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
    onSaveSettings?.(values);

    closeSettingsHandler();
  }, [closeSettingsHandler, onSaveSettings, values]);

  return (
    <Drawer opened={isOpen} position="right" size="md" title="P-AFFv1.0" withCloseButton={!isNotStarted} onClose={onCloseHandler}>
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
        <SettingsForm initialValues={values} onChange={setValues} />
      </Drawer>
    </Drawer>
  );
});
Settings.displayName = 'Settings';
