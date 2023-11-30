import { string, number } from 'yup';

export const nameSchema = string()
  .required('Enter your name')
  .matches(/^[A-Z][a-zA-Z0-9]*$/);

export const ageSchema = number()
  .required()
  .positive()
  .integer()
  .typeError('Should be a positive number');
export const emailSchema = string()
  .required('Enter e-mail')
  .email('valid mail')
  .typeError('Should be valid email');

export const passSchema = string()
  .required()
  .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, 'contain all the staff');
