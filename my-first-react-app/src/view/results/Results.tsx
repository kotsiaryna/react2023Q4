import { ReactNode, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import Pagination from './Pagination';
import Loader from './Loader';
import ArticleList from './ArticleList';
import './results.scss';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { useGetNewsQuery } from '../../redux/apiRTK';
import { changeResultsFlag } from '../../redux/flagSlice';

const Results = (): ReactNode => {
  const { page } = useParams();
  const search = useSelector((state: State) => state.searchValue);
  const limit = useSelector((state: State) => state.itemsPerPage);
  const isLoadingResults = useSelector((state: State) => state.flags.isLoadingResults);

  const { data, isFetching, error } = useGetNewsQuery({ search, limit, page: page || '1' });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeResultsFlag(isFetching));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return (
    <section className="results" data-testid="results">
      <div className="results__left">
        {isLoadingResults ? (
          <Loader />
        ) : (
          <>
            {data && (
              <Pagination
                handleClick={() => {}}
                totalAmount={data.totalResults}
                limit={+limit}
                page={Number(page)}
              />
            )}
            {data && <ArticleList results={data.articles} />}
          </>
        )}
        {error && <p>Error in fetch </p>}
      </div>
      <div className="results__details">
        <Outlet />
      </div>
    </section>
  );
};

export default Results;
