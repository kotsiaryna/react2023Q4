import { ReactNode, useState } from 'react';
import Search from './search/Search';
import { Outlet } from 'react-router-dom';
import ErrorButton from './error/errorButton';
import { SearchValueContext, defaultSearchValue } from '../context';

const App = (): ReactNode => {
  const [errorIsThrown, setErrorIsThrown] = useState(false);

  const [searchContextValue, setSearchContextValue] = useState<string>(defaultSearchValue);

  const throwError = () => {
    setErrorIsThrown(true);
  };

  if (errorIsThrown) {
    throw new Error('This is test error. Please, reload page to continue using this App ');
  } else {
    return (
      <section data-testid="app">
        <ErrorButton handleClick={throwError} />
        <SearchValueContext.Provider value={{ searchContextValue, setSearchContextValue }}>
          <Search />
          <Outlet />
        </SearchValueContext.Provider>
      </section>
    );
  }
};

export default App;
