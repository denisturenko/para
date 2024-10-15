import * as yup from 'yup';

const required = 'Это обязательное поле';
const checkboxMsg = 'Вы должны принять это соглашение';

export const greetingsFormValidationSchema = yup.object().shape({
  nickName: yup.string().typeError(required).required(required),
  isAgree: yup.boolean().typeError(checkboxMsg).required(checkboxMsg).oneOf([true], checkboxMsg),
});
