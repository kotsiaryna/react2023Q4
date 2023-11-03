import { ReactNode, useEffect, useState } from 'react';
// import { Response } from '../../types';
import { Outlet, useParams } from 'react-router-dom';
import Pagination from './Pagination';
import ChooseLimit from './ChooseLimit';
import Loader from './Loader';

import './results.scss';
import ShowContent from './ShowContent';

const Results = (): ReactNode => {
  // const response = useLoaderData() as Response;
  // console.log(response);
  // const results = response.articles;
  // const { totalResults, articles } = response;

  const { id, page, search } = useParams();
  const [totalResults, setTotalResults] = useState(0);
  const limit = window.location.search.split('=').at(-1) || '10'; //TODO add limit to query

  const handleLimitChange = () => {
    startLoadingResults();
    // redirect(`${search}/1?limit=${limit}`);
  };

  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const BaseURL = 'https://newsapi.org/v2/top-headlines';
    const url = `${BaseURL}?q=${search}&pageSize=${limit}&page=${page}&apiKey=a6748dc91b9e4f7a8af5cc41a1090947`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setArticles(data.articles);
        setTotalResults(data.totalResults);
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

  return (
    <section className="results">
      <div className="results__bg"></div>
      <ChooseLimit handleChange={handleLimitChange} />
      <Pagination
        handleClick={startLoadingResults}
        totalAmount={totalResults}
        limit={+limit}
        page={Number(page)}
      />
      {/* {articles && <ShowContent results={articles} handleClick={startLoading} />}
      {isLoadingResults && <Loader />} */}

      {isLoadingResults ? (
        <Loader />
      ) : articles ? (
        <ShowContent results={articles} handleClick={startLoading} />
      ) : (
        false
      )}
      <div className="results__details">
        {isLoadingResults ? '' : isLoadingDetails ? <Loader /> : <Outlet />}{' '}
      </div>
    </section>
  );
};
export default Results;
