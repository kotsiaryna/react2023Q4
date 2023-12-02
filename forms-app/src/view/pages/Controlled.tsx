import { Path, UseFormRegister, useForm } from 'react-hook-form';
import { YupSchemaType } from '../../types';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { saveData } from '../../redux/formSlice';
import { formSchema } from '../../utils/yupSchema';
import './form.scss';
import { useNavigate } from 'react-router-dom';

// todo check types!!!!
type InputProps = {
  label: Path<YupSchemaType>;
  register: UseFormRegister<YupSchemaType>;
  required: boolean;
};

const Input = ({ label, register, required }: InputProps) => (
  <>
    <label className="form__item">
      {label}
      <input {...register(label, { required })} />
    </label>
  </>
);

const ControlledForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<YupSchemaType>({
    mode: 'onChange',
    resolver: yupResolver<YupSchemaType>(formSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <form
      className="form"
      onSubmit={handleSubmit((data) => {
        const reader = new FileReader();
        reader.readAsDataURL(data.file[0]);
        reader.onloadend = () => {
          const imgBase64 = reader.result?.toString();
          const dataToSave = { ...data, file: imgBase64 };
          dispatch(saveData(dataToSave));
          navigate('/');
        };
      })}
    >
      <h2>RHF page</h2>
      <Input label={'name'} register={register} required={true} />
      <p className="form__item_hasError">{errors.name?.message}</p>

      <Input label={'age'} register={register} required={true} />
      <p className="form__item_hasError">{errors.age?.message}</p>

      <Input label={'email'} register={register} required={true} />
      <p className="form__item_hasError">{errors.email?.message}</p>

      <Input label={'password1'} register={register} required={true} />
      <p className="form__item_hasError">{errors.password1?.message}</p>

      <Input label={'password2'} register={register} required={true} />
      <p className="form__item_hasError">{errors.password2?.message}</p>

      <div className="form__item radio">
        <legend>Gender:</legend>
        <label htmlFor="male">Male</label>
        <input
          {...register('gender')}
          type="radio"
          id="male"
          name="gender"
          value="male"
          defaultChecked
        />
        <label htmlFor="female">Female</label>
        <input
          {...register('gender')}
          type="radio"
          id="female"
          name="gender"
          value="female"
        />
      </div>

      <label className="form__item">
        Accept TC:
        <input {...register('tc')} type="checkbox" name="tc" />
      </label>
      <p className="form__item_hasError">{errors.tc?.message}</p>

      <label className="form__item">
        Attach Image
        <input {...register('file')} type="file" accept=".png, .jpeg" />
        <p className="form__item_hasError">{errors.file?.message}</p>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ControlledForm;
