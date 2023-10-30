import { ReactNode, useEffect, useState } from 'react';
import { Response } from '../../types';
import { Outlet, useLoaderData, useParams } from 'react-router-dom';
import Pagination from './Pagination';
import ChooseLimit from './ChooseLimit';
import Loader from './Loader';

import './results.scss';
import ShowContent from './ShowContent';

const Results = (): ReactNode => {
  const response = useLoaderData() as Response;
  console.log(response);
  const results = response.results;

  const { id, page } = useParams();
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    setIsLoadingDetails(false);
  }, [id]);

  const startLoading = () => {
    setIsLoadingDetails(true);
  };

  const [isLoadingResults, setIsLoadingResults] = useState(false);

  const startLoadingResults = () => {
    setIsLoadingResults(true);
  };

  useEffect(() => {
    setIsLoadingResults(false);
  }, [page]);

  return (
    <section className="results">
      <div className="results__bg"></div>
      <ChooseLimit />
      <Pagination
        handleClick={startLoadingResults}
        next={response.next}
        previous={response.previous}
      />
      {isLoadingResults ? (
        <Loader />
      ) : (
        // <div className="results__items">
        <ShowContent results={results} handleClick={startLoading} />
        // </div>
      )}
      <div className="results__details">
        {isLoadingResults ? '' : isLoadingDetails ? <Loader /> : <Outlet />}{' '}
      </div>
    </section>
  );
};
export default Results;
