import { ReactNode, useState } from 'react';
import Search from './search/Search';
import Results from './results/Results';

const App = (): ReactNode => {
  const getLocalStorageValue = () => {
    const localValue = localStorage.getItem('inputValue');
    return localValue ? JSON.parse(localValue) : '';
  };

  const [searchValue, setSearchValue] = useState(getLocalStorageValue());

  const updateInputValue = (value: string) => {
    console.log('inputvalue is updated');
    console.log('value:' + value);
    setSearchValue(value);
  };

  return (
    <>
      <Search updateInputValue={updateInputValue} />
      <Results searchValue={searchValue} />
    </>
  );
};

export default App;
