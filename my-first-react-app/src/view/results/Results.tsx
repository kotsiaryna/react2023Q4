import { ReactNode, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import Pagination from './Pagination';
import Loader from './Loader';
import ShowContent from './ShowContent';

import './results.scss';
import { IArticle } from '../../types';

const Results = (): ReactNode => {
  const { id, page, search } = useParams();

  const [totalResults, setTotalResults] = useState(0);
  const limit = window.location.search.split('=').at(-1) || '10'; //TODO add limit to query

  const [articles, setArticles] = useState<IArticle[] | null>(null);

  useEffect(() => {
    const BaseURL = 'https://newsapi.org/v2/top-headlines';
    const url = `${BaseURL}?q=${search}&pageSize=${limit}&page=${page}&apiKey=a6748dc91b9e4f7a8af5cc41a1090947`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setArticles(data.articles);
        setTotalResults(data.totalResults);
        setIsLoading(false);
      });
  }, [id, page, search, limit]);

  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    setIsLoadingDetails(false);
  }, [id]);

  const startLoading = () => {
    setIsLoadingDetails(true);
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
        <>
          <div className="results__bg"></div>
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
            false
          )}
        </>
      )}
      <div className="results__details">
        {isLoadingResults ? '' : isLoadingDetails ? <Loader /> : <Outlet />}{' '}
      </div>
    </section>
  );
};
export default Results;
