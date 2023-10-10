import { ReactNode, useEffect, useState } from 'react';
import Search from './search/Search';
import { Outlet, useParams } from 'react-router-dom';

const App = (): ReactNode => {
  const { search } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const changeLoadingState = (value: string) => {
    if (value !== search) setIsLoading(true); // check if search has changed
  };

  useEffect(() => {
    setIsLoading(false);
  }, [search]);

  console.log(isLoading);
  return (
    <>
      <Search handleClick={changeLoadingState} />
      {isLoading ? <div className="results__preload"></div> : <Outlet />}
    </>
  );
};

export default App;
