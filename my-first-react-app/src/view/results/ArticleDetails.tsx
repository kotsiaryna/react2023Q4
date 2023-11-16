import { Link, useParams } from 'react-router-dom';
// import { useLoaderData } from 'react-router-dom';
// import { IArticle } from '../../types';
import { useDetailedNewsQuery } from '../../apiRTK';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../store/store';
import Loader from './Loader';
import { changeDetailsFlag } from '../../store/flagSlice';

function ArticleDetails() {
  // const data = useLoaderData() as IArticle;
  const { page, id } = useParams();
  const search = useSelector((state: State) => state.searchValue.value);
  const limit = useSelector((state: State) => state.itemsPerPage.value);
  const { data: articles, isLoading, error } = useDetailedNewsQuery({ page: '1', search, limit });

  const dispatch = useDispatch();
  dispatch(changeDetailsFlag(isLoading));

  // const location = useLocation();
  // const limit = location.search.split('=').at(-1);
  const link = limit ? `/${search}/${page}?limit=${limit}` : `/${search}/${page}`;

  const isLoadingDetails = useSelector((state: State) => state.flags.isLoadingDetails);

  return (
    <>
      {isLoadingDetails && <Loader />}
      {articles && (
        <div className="details__inner" data-testid="article-details">
          {articles[Number(id)].urlToImage && (
            <img src={articles[Number(id)].urlToImage} alt="image" />
          )}
          <h3>{articles[Number(id)].title}</h3>
          <p>{articles[Number(id)].description}</p>
          <p>{articles[Number(id)].content}</p>
          <p>{articles[Number(id)].author}</p>
          <a
            className="details__link"
            href={articles[Number(id)].url}
            target="_blank"
            rel="noreferrer"
          >
            Read more in origin
          </a>
        </div>
      )}
      {error && <p>Error in fetch</p>}
      <Link to={link} className="results__closeBtn">
        X
      </Link>
    </>
  );
}

export default ArticleDetails;
