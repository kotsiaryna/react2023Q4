import { ReactNode, useEffect, useState } from 'react';
import Search from './search/Search';
import { Outlet, useParams } from 'react-router-dom';
import Loader from './results/Loader';
// import Pagination from './results/Pagination';
// import ChooseLimit from './results/ChooseLimit';

const App = (): ReactNode => {
  const { search, page } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const changeLoadingState = (value?: string, pageNumber?: string) => {
    if (value !== search || pageNumber !== page) setIsLoading(true); // check if search has changed
  };

  useEffect(() => {
    setIsLoading(false);
  }, [search, page]);

  console.log(isLoading);
  return (
    <>
      <Search handleClick={changeLoadingState} />

      {isLoading ? (
        <Loader />
      ) : page ? (
        <>
          {/* <ChooseLimit /> */}
          {/* <Pagination handleClick={changeLoadingState} /> */}
          <Outlet />
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default App;
