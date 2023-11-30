import InputCountry from '../components/InputCountry';
import { FormEventHandler, useRef } from 'react';
import { UncontrolledFormState } from '../../types';
import { useDispatch } from 'react-redux';
import { saveData, saveImg64 } from '../../redux/uncontrolledSlice';
import { useNavigate } from 'react-router-dom';
import {
  ageSchema,
  emailSchema,
  nameSchema,
  passSchema,
} from '../../utils/yupSchema';
import useForceUpdate from '../../utils/updateHook';
import './form.scss';
import { validateFileSize, validateFileType } from '../../utils/fileValidation';
// import { encodeImage } from '../../utils/fileReader';

const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forceUpdate = useForceUpdate();

  const nameRef = useRef({ value: '', isError: false });
  const ageRef = useRef({ value: 0, isError: false });
  const emailRef = useRef({ value: '', isError: false });
  const pass1Ref = useRef({ value: '', isError: false });
  const pass2Ref = useRef({ value: '', isError: false });
  const tcRef = useRef({ value: false, isError: false });
  const imgRef: React.MutableRefObject<{
    value: null | File;
    isError: boolean;
  }> = useRef({ value: null, isError: false });

  const refs = [nameRef, ageRef, emailRef, pass1Ref, pass2Ref, tcRef, imgRef];

  const handleFileInput: FormEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.files) {
      imgRef.current.value = e.currentTarget.files[0];
      imgRef.current.isError = !(
        validateFileSize(e.currentTarget.files[0]) &&
        validateFileType(e.currentTarget.files[0])
      );
      const reader = new FileReader();
      reader.readAsDataURL(e.currentTarget.files[0]);
      reader.onloadend = () => {
        const img64 = reader.result?.toString() || '';
        if (!imgRef.current.isError) {
          dispatch(saveImg64(img64));
        }
      };
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const data: UncontrolledFormState = {
      name: nameRef.current.value,
      age: ageRef.current.value,
      email: emailRef.current.value,
      password: pass1Ref.current.value,
      gender: `${formData.get('gender')}`,
      tc: !!formData.get('tc'),
    };

    try {
      const res = await Promise.all([
        await nameSchema.isValid(nameRef.current.value),
        await ageSchema.isValid(ageRef.current.value),
        await emailSchema.isValid(emailRef.current.value),
        await passSchema.isValid(pass1Ref.current.value),
      ]);

      res.forEach((input, i) => {
        if (!input) {
          refs[i].current.isError = true;
        } else {
          refs[i].current.isError = false;
        }
      });
    } catch (error) {
      console.log(error);
    }
    pass2Ref.current.isError =
      pass1Ref.current.value !== pass2Ref.current.value;

    tcRef.current.isError = !data.tc;

    const hasError = refs.find((ref) => ref.current.isError);

    if (!hasError) {
      console.log(data);
      dispatch(saveData(data));
      navigate('/');
    } else {
      forceUpdate();
    }
  };

  return (
    <form
      className="form"
      action=""
      method="post"
      noValidate
      onSubmit={handleSubmit}
    >
      <h2>Uncontrolled Form page</h2>

      <label className="form__item" htmlFor="name">
        Name:
        <input
          type="text"
          id="name"
          name="name"
          onInput={(e) => (nameRef.current.value = e.currentTarget.value)}
        />
        <p className="form__item_hasError">
          {nameRef.current.isError &&
            `Name is required and should starts with uppercase letter`}
        </p>
      </label>

      <label className="form__item" htmlFor="age">
        Age:
        <input
          type="text"
          id="age"
          name="age"
          onInput={(e) =>
            (ageRef.current.value = Number(e.currentTarget.value))
          }
        />
        <p className="form__item_hasError">
          {ageRef.current.isError &&
            'Age is required and should be positive number'}
        </p>
      </label>

      <label className="form__item" htmlFor="email">
        E-mail:
        <input
          type="text"
          id="email"
          name="email"
          onInput={(e) => (emailRef.current.value = e.currentTarget.value)}
        />
        <p className="form__item_hasError">
          {emailRef.current.isError && 'Incorrect email'}
        </p>
      </label>
      <label className="form__item" htmlFor="password1">
        Password:
        <input
          type="password"
          id="password1"
          name="password1"
          onInput={(e) => (pass1Ref.current.value = e.currentTarget.value)}
        />
        <p className="form__item_hasError">
          {pass1Ref.current.isError &&
            'Password should contain 1 number, 1 uppercase letter, 1 lowercased letter, 1 special character'}
        </p>
      </label>

      <label className="form__item" htmlFor="password2">
        Repeat password:
        <input
          type="password"
          id="password2"
          name="password2"
          onInput={(e) => (pass2Ref.current.value = e.currentTarget.value)}
        />
        <p className="form__item_hasError">
          {pass2Ref.current.isError && 'Should match first password'}
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

      <label className="form__item" htmlFor="tc">
        Accept TC:
        <input type="checkbox" id="tc" name="tc" />
        <p className="form__item_hasError">
          {tcRef.current.isError && ' Accept TC'}
        </p>
      </label>

      <label className="form__item" htmlFor="image">
        Attach Image
        <input
          type="file"
          id="image"
          name="image"
          accept=".png, .jpeg"
          onInput={handleFileInput}
        />
        <p className="form__item_hasError">
          {imgRef.current.isError && 'png or jpeg, max size 4Mb'}
        </p>
      </label>
      <InputCountry />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
