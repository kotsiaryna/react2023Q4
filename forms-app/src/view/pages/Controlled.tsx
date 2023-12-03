import { Path, UseFormRegister, useForm } from 'react-hook-form';
import { DataType, FormsState, StateType } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { saveData } from '../../redux/formSlice';
import { formSchema } from '../../utils/yupSchema';
import { useNavigate } from 'react-router-dom';
import './form.scss';
import AutoCompleteRHF from '../components/AutoCompleteRHF';

type InputProps = {
  label: Path<DataType>;
  labelName: string;
  register: UseFormRegister<DataType>;
  required: boolean;
};

const Input = ({ label, labelName, register, required }: InputProps) => (
  <>
    <label className="form__item">
      {labelName}
      <input {...register(label, { required })} />
    </label>
  </>
);

const ControlledForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<DataType>({
    mode: 'all',
    resolver: yupResolver<DataType>(formSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: StateType) => state.countries);
  return (
    <>
      <h2>Form with control (RHF)</h2>
      <form
        className="form"
        onSubmit={handleSubmit((data) => {
          const reader = new FileReader();
          reader.readAsDataURL(data.file[0]);
          reader.onloadend = () => {
            const imgBase64 = reader.result?.toString() || '';
            const dataToSave: FormsState = {
              ...data,
              password: data.password1,
              file: imgBase64,
            };

            dispatch(saveData(dataToSave));
            navigate('/');
          };
        })}
      >
        <Input
          label={'name'}
          labelName="Name:"
          register={register}
          required={true}
        />
        <p className="form__item_hasError">{errors.name?.message}</p>

        <Input
          label={'age'}
          register={register}
          required={true}
          labelName="Age:"
        />
        <p className="form__item_hasError">{errors.age?.message}</p>

        <Input
          label={'email'}
          register={register}
          required={true}
          labelName="Email:"
        />
        <p className="form__item_hasError">{errors.email?.message}</p>

        <Input
          label={'password1'}
          register={register}
          required={true}
          labelName="Password:"
        />
        <p className="form__item_hasError">{errors.password1?.message}</p>

        <Input
          label={'password2'}
          register={register}
          required={true}
          labelName="Repeat password:"
        />
        <p className="form__item_hasError">{errors.password2?.message}</p>
        <AutoCompleteRHF
          countries={countries}
          label={'country'}
          register={register}
          required={true}
        />
        <p className="form__item_hasError">{errors.country?.message}</p>

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

        <label className="form__item checkbox">
          Accept TC:
          <input {...register('tc')} type="checkbox" name="tc" />
        </label>
        <p className="form__item_hasError">{errors.tc?.message}</p>

        <label className="form__item">
          Attach Image
          <input {...register('file')} type="file" accept=".png, .jpeg" />
          <p className="form__item_hasError">{errors.file?.message}</p>
        </label>

        <button type="submit" disabled={!isDirty || !isValid}>
          Submit
        </button>
      </form>
    </>
  );
};

export default ControlledForm;
