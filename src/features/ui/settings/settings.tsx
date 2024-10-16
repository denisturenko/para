import { SettingsIntroForm } from 'entities/ui/settings-intro-form';
import React, { useCallback, useState, memo, useRef } from 'react';
import type { SettingsFormMethods } from 'entities/ui/settings-form';
import { SettingsFormComponent } from 'entities/ui/settings-form';
import { Drawer } from 'shared/ui/drawer';
import type { SettingsFormValues } from 'entities/ui/settings-form/settings-form.types';

export interface SettingsProps {
  isNotStarted: boolean;
  isOpen?: boolean;
  onGotoHomePageClick?(): void;
  onResetSettings?(): void;
  onRestart?(): void;
  onResume?(): void;
  onSaveSettings?(initialValues: SettingsFormValues): void;
  onStart?(): void;
  values: SettingsFormValues;
}

export const Settings = memo((props: SettingsProps) => {
  const { values, isOpen, onResume, onRestart, onSaveSettings, onStart, onResetSettings, onGotoHomePageClick, isNotStarted } = props;

  const settingFormMethodsRef = useRef<SettingsFormMethods>();

  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const onCloseHandler = useCallback(() => onResume?.(), [onResume]);

  const openSettingsHandler = useCallback(() => setIsOpenSettings(true), []);
  const closeSettingsHandler = useCallback(() => setIsOpenSettings(false), []);

  const onSubmitSettingsDrawerHandler = useCallback(() => {
    settingFormMethodsRef.current?.submit();
  }, []);

  const onSubmitSettingsHandler = useCallback(
    (formValues: SettingsFormValues) => {
      onSaveSettings?.(formValues);
      closeSettingsHandler();
    },
    [closeSettingsHandler, onSaveSettings]
  );

  const onResetSettingsHandler = useCallback(() => {
    onResetSettings?.();

    closeSettingsHandler();
  }, [closeSettingsHandler, onResetSettings]);

  return (
    <>
      {/* Intro drawer */}
      <Drawer dataTestId="settings-intro" opened={isOpen} position="right" size="md" onClose={onCloseHandler}>
        <SettingsIntroForm
          isNotStarted={isNotStarted}
          onGotoHomePageClick={onGotoHomePageClick}
          onRestart={onRestart}
          onResume={onResume}
          onSettings={openSettingsHandler}
          onStart={onStart}
        />
      </Drawer>

      {/* Setting form drawer */}
      <Drawer
        dataTestId="settings"
        opened={isOpenSettings}
        position="right"
        size="xl"
        title="Настройки"
        onClose={closeSettingsHandler}
        onSubmit={onSubmitSettingsDrawerHandler}
      >
        <SettingsFormComponent
          ref={settingFormMethodsRef}
          initialValues={values}
          onReset={onResetSettingsHandler}
          onSubmit={onSubmitSettingsHandler}
        />
      </Drawer>
    </>
  );
});
Settings.displayName = 'Settings';
