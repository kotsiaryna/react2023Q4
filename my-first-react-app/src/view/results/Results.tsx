import { ReactNode, useEffect, useRef, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import Pagination from './Pagination';
import Loader from './Loader';
import ArticleList from './ArticleList';
import { IArticle } from '../../types';
import { searchRequest } from '../../api';
import { ArticlesContext } from '../../context';
import './results.scss';
import { useSelector } from 'react-redux';
import { State } from '../../store/store';

const Results = (): ReactNode => {
  const { id, page } = useParams();

  // const { searchContextValue: search } = useContext(SearchValueContext);

  const search = useSelector((state: State) => state.searchValue.value);
  const limit = useSelector((state: State) => state.itemsPerPage.value);

  const [articles, setArticles] = useState<IArticle[] | null>(null);

  const totalResults = useRef<number>();
  const fetchError = useRef<Error>();

  useEffect(() => {
    if (page) {
      searchRequest({ search, page, limit })
        .then((data) => {
          if (data) {
            setArticles(data.articles);
            totalResults.current = data.totalResults;
          }
          setIsLoading(false);
        })
        .catch((error: Error) => {
          setIsLoading(false);
          fetchError.current = error;
        });
    }
  }, [id, page, search, limit]);

  useEffect(() => {
    searchRequest({ search: 'news', page: '1', limit: '10' })
      .then((data) => {
        if (data) {
          setArticles(data.articles);
          totalResults.current = data.totalResults;
        }
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setIsLoading(false);
        fetchError.current = error;
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [search, limit]);

  const [isLoadingResults, setIsLoadingResults] = useState(true);

  const startLoadingResults = () => {
    setIsLoadingResults(true);
  };

  useEffect(() => {
    setIsLoadingResults(false);
  }, [articles]);

  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    setIsLoadingDetails(false);
  }, [id]);

  const startLoadingDetails = (index: number) => {
    if (index !== Number(id)) {
      setIsLoadingDetails(true);
    } else {
      //TODO navigate and close details
    }
  };

  return (
    <ArticlesContext.Provider value={articles}>
      <section className="results" data-testid="results">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="results__left">
            {articles && !!articles.length && (
              <Pagination
                handleClick={startLoadingResults}
                totalAmount={Number(totalResults.current)}
                limit={+limit}
                page={Number(page)}
              />
            )}
            {isLoadingResults ? (
              <Loader />
            ) : articles ? (
              <ArticleList handleClick={startLoadingDetails} />
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
    </ArticlesContext.Provider>
  );
};
export default Results;
