import * as yup from 'yup';
import { WindSettings } from 'shared/lib/types';

const required = 'Это обязательное поле';
const moreThen0 = 'Значение должно быть больше 0';
const lessThen900 = 'Значение должно быть меньше 900';

// ObjectSchema<Partial<SettingsFormValues>>
export const settingsFormValidationSchema = yup.object().shape({
  playerPositionHeight: yup
    .number()
    .typeError(required)
    .required(required)
    .min(0, 'Значение должно быть больше 0')
    .max(900, 'Значение должно быть меньше 900'),
  winds: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          minHeight: yup.number().typeError(required).required(required).min(0, moreThen0).max(900, lessThen900),
          angel: yup
            .number()
            .typeError(required)
            .required(required)
            .min(0, moreThen0)
            .max(900, 'Значение должно быть меньше или равно 360'),
          speed: yup.number().typeError(required).required(required).min(0, moreThen0).max(20, 'Значение должно быть меньше или равно 20'),
        })
        .test({
          name: 'not less when',
          message: 'Значение должно быть больше',
          test: (values, ctx) => {
            console.log('***', ctx);

            /* return val.every(({ startTime, endTime }, index) => {
              if (index === 0 || index === val.length - 1) {
                return !!startTime && !!endTime;
              }

              return true;
            }); */
          },
        })
    )
    .required(required),
  canopy: yup.object().shape({
    maxSpeed: yup
      .number()
      .typeError(required)
      .required(required)
      .min(yup.ref<number>('minSpeed'), 'Значение должно быть больше чем минимальная скорость')
      .max(20, 'Значение должно быть меньше 20'),
    minSpeed: yup
      .number()
      .typeError(required)
      .required(required)
      .min(0, moreThen0)
      .max(yup.ref<number>('maxSpeed'), 'Значение должно быть меньше максимальной скорости'),
    verticalSpeed: yup.number().typeError(required).required(required).min(0, moreThen0).max(10, 'Значение должно быть меньше 10'),
    inertiaFactor: yup
      .number()
      .typeError(required)
      .required(required)
      .min(1, 'Это поле должно быть больше или равно 1')
      .max(5, 'Это поле должно быть меньше или равно 5'),
  }),
  beep: yup.object().shape({
    volume: yup
      .number()
      .typeError(required)
      .required(required)
      .min(0, 'Значение должно быть больше или равно 0')
      .max(100, 'Значение должно быть меньше или равно 100'),
    heightFor3: yup.object().shape({
      value: yup.number().typeError(required).required(required).min(1, moreThen0).max(900, lessThen900),
    }),
    heightFor2: yup.object().shape({
      value: yup.number().typeError(required).required(required).min(1, moreThen0).max(900, lessThen900),
    }),
    heightFor1: yup.object().shape({
      value: yup.number().typeError(required).required(required).min(1, moreThen0).max(900, lessThen900),
    }),
    heightForLong: yup.object().shape({
      value: yup.number().typeError(required).required(required).min(1, moreThen0).max(900, lessThen900),
    }),
  }),
});
