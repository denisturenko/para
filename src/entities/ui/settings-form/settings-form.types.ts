import type { WindSettings, HelperSettings, CanopySettings, BeepSettingsType, TargetSettings } from 'shared/lib/types';

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
  onChange?(values: SettingsFormValues): void;
  onReset?(): void;
}
