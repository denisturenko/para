import type { WindSettings, HelperSettings, CanopySettings, BeepSettingsType, TargetSettings } from 'shared/lib/types';

export interface SettingsFormMethods {
  submit(): void;
}

export interface SettingsFormValues {
  beep?: BeepSettingsType;
  canopy: CanopySettings;
  currentTargetId: string;
  helpers: HelperSettings;
  playerPositionHeight: number;
  targets: TargetSettings[];
  winds: WindSettings[];
}

export interface SettingsFormProps {
  initialValues: SettingsFormValues;
  onReset?(): void;
  onSubmit?(values: SettingsFormValues): void;
}
