import { ReactNode, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import Pagination from './Pagination';
import Loader from './Loader';
import ArticleList from './ArticleList';
import './results.scss';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../store/store';
import { useGetNewsQuery } from '../../apiRTK';
import { changeDetailsFlag, changeResultsFlag } from '../../store/flagSlice';

const Results = (): ReactNode => {
  const { page } = useParams();

  const search = useSelector((state: State) => state.searchValue.value);
  const limit = useSelector((state: State) => state.itemsPerPage.value);
  const isLoadingResults = useSelector((state: State) => state.flags.isLoadingResults);

  const { data, isFetching, error } = useGetNewsQuery({ search, limit, page: page || '1' });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeResultsFlag(isFetching));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  // useEffect(() => {
  //   searchRequest({ search, page: page || '1', limit })
  //     .then((data) => {
  //       if (data) {
  //         setArticles(data.articles);
  //         totalResults.current = data.totalResults;
  //       }
  //       setIsLoading(false);
  //     })
  //     .catch((error: Error) => {
  //       setIsLoading(false);
  //       fetchError.current = error;
  //     });
  // }, [id, page, search, limit]);

  // useEffect(() => {
  //   searchRequest({ search: 'news', page: '1', limit: '10' })
  //     .then((data) => {
  //       if (data) {
  //         setArticles(data.articles);
  //         totalResults.current = data.totalResults;
  //       }
  //       setIsLoading(false);
  //     })
  //     .catch((error: Error) => {
  //       setIsLoading(false);
  //       fetchError.current = error;
  //     });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setIsLoading(true);
  // }, [search, limit]);

  // const [isLoadingResults, setIsLoadingResults] = useState(true);

  // const startLoadingResults = () => {
  //   setIsLoadingResults(true);
  // };

  // useEffect(() => {
  //   setIsLoadingResults(false);
  // }, [articles]);

  // const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // useEffect(() => {
  //   setIsLoadingDetails(false);
  // }, [id]);

  // const startLoadingDetails = (index: number) => {
  //   if (index !== Number(id)) {
  //     setIsLoadingDetails(true);
  //   } else {
  //     //TODO navigate and close details
  //   }
  // };
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
            {data && (
              <ArticleList
                handleClick={() => dispatch(changeDetailsFlag(true))}
                results={data.articles}
              />
            )}
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
// return (
//   <ArticlesContext.Provider value={articles}>
//     <section className="results" data-testid="results">
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="results__left">
//           {articles && !!articles.length && (
//             <Pagination
//               handleClick={startLoadingResults}
//               totalAmount={Number(totalResults.current)}
//               limit={+limit}
//               page={Number(page)}
//             />
//           )}
//           {isLoadingResults ? (
//             <Loader />
//           ) : articles ? (
//             <ArticleList handleClick={startLoadingDetails} />
//           ) : (
//             <div>
//               <p>{fetchError.current?.name}</p>
//               <p>{fetchError.current?.message}</p>
//             </div>
//           )}
//         </div>
//       )}
//       <div className="results__details">
//         {isLoadingResults ? '' : isLoadingDetails ? <Loader /> : <Outlet />}
//       </div>
//     </section>
//   </ArticlesContext.Provider>
// );

export default Results;
