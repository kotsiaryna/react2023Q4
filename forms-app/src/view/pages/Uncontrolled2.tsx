import InputCountry from '../components/InputCountry';
import { FormEventHandler, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { saveData } from '../../redux/formSlice';
import { useNavigate } from 'react-router-dom';
import {
  ageSchema,
  emailSchema,
  imageSchema,
  nameSchema,
  passSchema,
  tcAcceptSchema,
} from '../../utils/yupSchema';
import useForceUpdate from '../../utils/updateHook';
import './form.scss';
import { FormsState } from '../../types';

const UncontrolledForm2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forceUpdate = useForceUpdate();

  const imgRef = useRef<HTMLInputElement>(null);

  const nameError = useRef(false);
  const ageError = useRef(false);
  const emailError = useRef(false);
  const pass1Error = useRef(false);
  const pass2Error = useRef(false);
  const tcError = useRef(false);
  const imgError = useRef(false);

  const errors = [
    nameError,
    ageError,
    emailError,
    pass1Error,
    tcError,
    imgError,
    pass2Error,
  ];

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: `${formData.get('name')}`,
      age: Number(formData.get('age')),
      email: `${formData.get('email')}`,
      password: `${formData.get('password1')}`,
      gender: `${formData.get('gender')}`,
      tc: !!formData.get('tc'),
    };

    try {
      const res = await Promise.all([
        await nameSchema.isValid(data.name),
        await ageSchema.isValid(data.age),
        await emailSchema.isValid(data.email),
        await passSchema.isValid(data.password),
        await tcAcceptSchema.isValid(data.tc),
        await imageSchema.isValid(imgRef.current?.files),
      ]);

      res.forEach((input, i) => {
        if (!input) {
          errors[i].current = true;
        } else {
          errors[i].current = false;
        }
      });
    } catch (error) {
      console.log(error);
    }
    pass2Error.current =
      !formData.get('password2') ||
      `${formData.get('password1')}` !== `${formData.get('password2')}`;

    const hasError = errors.find((error) => error.current);

    if (!hasError) {
      const reader = new FileReader();
      if (imgRef.current?.files) {
        reader.readAsDataURL(imgRef.current?.files[0]);
        reader.onloadend = () => {
          const dataToSave: FormsState = {
            ...data,
            file: reader.result?.toString() || '',
          };
          dispatch(saveData(dataToSave));
          navigate('/');
        };
      }
    } else {
      forceUpdate();
    }
  };

  return (
    <>
      <h2>Uncontrolled Form page</h2>
      <form
        className="form"
        action=""
        method="post"
        noValidate
        onSubmit={handleSubmit}
      >
        <label className="form__item" htmlFor="name">
          Name:
          <input type="text" id="name" name="name" />
          <p className="form__item_hasError">
            {nameError.current &&
              `Name is required and should starts with uppercase letter`}
          </p>
        </label>

        <label className="form__item" htmlFor="age">
          Age:
          <input type="text" id="age" name="age" />
          <p className="form__item_hasError">
            {ageError.current &&
              'Age is required and should be positive number'}
          </p>
        </label>

        <label className="form__item" htmlFor="email">
          E-mail:
          <input type="text" id="email" name="email" />
          <p className="form__item_hasError">
            {emailError.current && 'Incorrect email'}
          </p>
        </label>
        <label className="form__item" htmlFor="password1">
          Password:
          <input type="password" id="password1" name="password1" />
          <p className="form__item_hasError">
            {pass1Error.current &&
              'Password should contain 1 number, 1 uppercase letter, 1 lowercased letter, 1 special character'}
          </p>
        </label>

        <label className="form__item" htmlFor="password2">
          Repeat password:
          <input type="password" id="password2" name="password2" />
          <p className="form__item_hasError">
            {pass2Error.current && 'Should match first password'}
          </p>
        </label>

        <div className="form__item radio">
          <legend>Gender:</legend>
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            defaultChecked
          />
          <label htmlFor="female">Female</label>
          <input type="radio" id="female" name="gender" value="female" />
        </div>

        <label className="form__item checkbox" htmlFor="tc">
          Accept TC:
          <input type="checkbox" id="tc" name="tc" />
          <p className="form__item_hasError">
            {tcError.current && ' Accept TC'}
          </p>
        </label>

        <label className="form__item" htmlFor="image">
          Attach Image
          <input
            type="file"
            id="image"
            name="image"
            accept=".png, .jpeg"
            ref={imgRef}
          />
          <p className="form__item_hasError">
            {imgError.current && 'Required, png or jpeg, max size 4Mb'}
          </p>
        </label>
        <InputCountry />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UncontrolledForm2;
