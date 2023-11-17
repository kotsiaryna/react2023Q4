import { ReactNode, useState } from 'react';
import Search from './search/Search';
import { Outlet } from 'react-router-dom';
import ErrorButton from './error/errorButton';

const App = (): ReactNode => {
  const [errorIsThrown, setErrorIsThrown] = useState(false);

  const throwError = () => {
    setErrorIsThrown(true);
  };

  if (errorIsThrown) {
    throw new Error('This is test error. Please, reload page to continue using this App ');
  } else {
    return (
      <section data-testid="app">
        <ErrorButton handleClick={throwError} />
        <Search />
        <Outlet />
      </section>
    );
  }
};

export default App;
