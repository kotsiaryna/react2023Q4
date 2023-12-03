import { useState } from 'react';

type Props = {
  countries: string[];
};

function AutoComplete({ countries }: Props) {
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
        type="text"
        id="count"
        name="country"
        value={value}
        onChange={handleInputChange}
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

export default AutoComplete;
