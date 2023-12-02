import { string, number, object, ref, mixed, boolean, ObjectSchema } from 'yup';
import { YupSchemaType } from '../types';

export const nameSchema = string()
  .required('Name is required')
  .matches(/^[A-Z][a-zA-Z0-9]*$/, 'Should start with uppercase letter');

export const ageSchema = number()
  .required('Age is required')
  .positive('Should be a positive number')
  .integer('Age should be an integer')
  .typeError('Number is required');
export const emailSchema = string()
  .required('Enter e-mail')
  .email('Should be a valid mail');

export const passSchema = string()
  .required('Password is required')
  .matches(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
    ' Should contain 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
  );
export const confirmPassSchema = string()
  .required('Confirm your password')
  .oneOf([ref('password1')], 'Passwords must match');

export const tcAcceptSchema = boolean()
  .required()
  .oneOf([true], 'TC should be accepted');
export const imageSchema = mixed<FileList>()
  .required('Image is required')
  .test('type', 'Not a valid image type', (value) => {
    if (!value[0]) return;
    return ['image/jpeg', 'image/png'].includes(value[0].type);
  })

  .test(
    'size',
    'Max allowed size is 4MB',
    (value) => value && value[0] && value[0].size <= 4194304
  );

export const formSchema: ObjectSchema<YupSchemaType> = object({
  name: nameSchema,
  age: ageSchema,
  email: emailSchema,
  password1: passSchema,
  password2: confirmPassSchema,
  gender: string().required().oneOf(['male', 'female']),
  tc: tcAcceptSchema,
  file: imageSchema,
});
