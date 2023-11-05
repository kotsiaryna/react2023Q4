import { ReactNode, useEffect, useRef, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import Pagination from './Pagination';
import Loader from './Loader';
import ShowContent from './ShowContent';

import './results.scss';
import { IArticle } from '../../types';
import { searchRequest } from '../../api';

const Results = (): ReactNode => {
  const { id, page, search } = useParams();

  const [totalResults, setTotalResults] = useState(0);
  const limit = window.location.search.split('=').at(-1) || '10'; //TODO add limit to query

  const [articles, setArticles] = useState<IArticle[] | null>(null);

  const fetchError = useRef<Error>();

  useEffect(() => {
    if (search && page) {
      searchRequest({ search, page, limit })
        .then((data) => {
          setArticles(data.articles);
          setTotalResults(data.totalResults);
          setIsLoading(false);
        })
        .catch((error: Error) => {
          setIsLoading(false);
          fetchError.current = error;
        });
    }
  }, [id, page, search, limit]);

  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    setIsLoadingDetails(false);
  }, [id]);

  const startLoading = (index: number) => {
    if (index !== Number(id)) {
      setIsLoadingDetails(true);
    } else {
      //TODO navigate and close details
    }
  };

  const [isLoadingResults, setIsLoadingResults] = useState(true);

  const startLoadingResults = () => {
    setIsLoadingResults(true);
  };

  useEffect(() => {
    setIsLoadingResults(false);
  }, [articles]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [search, limit]);

  return (
    <section className="results">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="results__left">
          {articles && !!articles.length && (
            <Pagination
              handleClick={startLoadingResults}
              totalAmount={totalResults}
              limit={+limit}
              page={Number(page)}
            />
          )}
          {isLoadingResults ? (
            <Loader />
          ) : articles ? (
            <ShowContent results={articles} handleClick={startLoading} />
          ) : (
            <div>
              <p>{fetchError.current?.name}</p>
              <p>{fetchError.current?.message}</p>
            </div>
          )}
        </div>
      )}
      <div className="results__details">
        {isLoadingResults ? '' : isLoadingDetails ? <Loader /> : <Outlet />}
      </div>
    </section>
  );
};
export default Results;
