import type { SettingsFormProps, SettingsFormValues } from './settings-form.types';
import { degToRad, radToDeg } from 'three/src/math/MathUtils';

export const getInitialValues = (props: SettingsFormProps): SettingsFormValues => {
  const { initialValues } = props;
  const res: SettingsFormValues = {
    ...initialValues,
    winds: initialValues.winds.map(wind => ({ ...wind, angel: Number(radToDeg(wind.angel).toFixed()) })),
    // currentTargetId: initialValues.targets[0].id,
  };

  return res;
};

export const normalized = (values: SettingsFormValues): SettingsFormValues => {
  const res: SettingsFormValues = {
    ...values,
    winds: values.winds.map(wind => ({ ...wind, angel: degToRad(wind.angel) })),
  };

  return res;
};
