import type { WindSettings, HelperSettings, CanopySettings } from 'shared/lib/types';
import type {} from 'shared/lib/types/helper-settings.type';

export interface SettingsFormValues {
  canopy: CanopySettings;
  helpers: HelperSettings;
  playerPositionHeight: number;
  winds: WindSettings[];
}

export interface SettingsFormProps {
  initialValues: SettingsFormValues;
  onChange?(values: SettingsFormValues): void;
}
