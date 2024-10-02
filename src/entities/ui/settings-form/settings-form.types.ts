import type { WindSettings, HelperSettings, CanopySettings, BeepSettings } from 'shared/lib/types';

export interface SettingsFormValues {
  beep?: BeepSettings;
  canopy: CanopySettings;
  helpers: HelperSettings;
  playerPositionHeight: number;
  winds: WindSettings[];
}

export interface SettingsFormProps {
  initialValues: SettingsFormValues;
  onChange?(values: SettingsFormValues): void;
}
