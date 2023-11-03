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
    throw new Error('broken');
  } else {
    return (
      <>
        <ErrorButton handleClick={throwError} />
        <Search />
        <Outlet />
      </>
    );
  }
};

export default App;
