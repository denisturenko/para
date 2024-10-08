import type { SettingsFormProps, SettingsFormValues } from './settings-form.types';
import * as THREE from 'three';
import type { WindSettings } from 'shared/lib/types';

const { degToRad, radToDeg } = THREE.MathUtils;

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

export const isValidWindHeights = (arr: WindSettings[], idx: number): boolean => {
  // todo length === 0
  if (arr.length === 1) return true;

  const validationValue = arr[idx];

  for (const [i, element] of arr.entries()) {
    if (i < idx && validationValue.minHeight <= element.minHeight) return false;
  }

  return true;
};
