import { ReactNode, useEffect, useState } from 'react';
import { IShip, Response } from '../../types';
import Ship from './Ship';
import { Outlet, useLoaderData, useParams } from 'react-router-dom';
import Pagination from './Pagination';
import ChooseLimit from './ChooseLimit';
import Loader from './Loader';

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

  const showContent = (results: IShip[]) => {
    if (results.length) {
      return results.map((res) => {
        const { name, model, length, manufacturer, starship_class, cost_in_credits, url } = res;
        return (
          <Ship
            key={model}
            name={name}
            model={model}
            length={length}
            manufacturer={manufacturer}
            starship_class={starship_class}
            cost_in_credits={cost_in_credits}
            url={url}
            handleClick={startLoading}
          />
        );
      });
    } else {
      return <div className="results__no-results">No matches</div>;
    }
  };

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
        <div className="results__items">{showContent(results)} </div>
      )}
      <div className="results__details">
        {isLoadingResults ? '' : isLoadingDetails ? <Loader /> : <Outlet />}{' '}
      </div>
    </section>
  );
};
export default Results;
