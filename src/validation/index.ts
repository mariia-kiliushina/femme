import * as yup from 'yup';
import {ref} from 'yup';

export const signUpSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup
    .string()
    .required('')
    .min(4, `Min length is 4 symbols`)
    .matches(
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$)/,
      'Should contain at least one capital letter and one digit',
    ),
  passwordConfirmation: yup
    .string()
    .required('')
    .oneOf([ref('password')], "Passwords don't match"),
});
