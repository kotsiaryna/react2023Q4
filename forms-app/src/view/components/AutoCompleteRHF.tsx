import { useState } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { DataType } from '../../types';

type Props = {
  countries: string[];
  label: Path<DataType>;
  register: UseFormRegister<DataType>;
  required: boolean;
};

function AutoCompleteRHF({ countries, label, register, required }: Props) {
  const [value, setValue] = useState('');

  const [showCountries, setShowCountries] = useState(false);
  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().startsWith(value.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setShowCountries(!!e.target.value);
  };
  const handleCountryClick = (country: string) => {
    setValue(country);
    setShowCountries(false);
  };

  return (
    <div>
      <label htmlFor="count">Country</label>
      <input
        {...register(label, { required })}
        // type="text"
        // id="count"
        onChange={handleInputChange}
        value={value}
        autoComplete="off"
      />
      {showCountries && (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country} onClick={() => handleCountryClick(country)}>
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutoCompleteRHF;
