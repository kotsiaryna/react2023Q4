import { Link, useParams } from 'react-router-dom';
import { useDetailedNewsQuery } from '../../redux/apiRTK';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/store';
import Loader from './Loader';
import { useEffect } from 'react';
import { changeDetailsFlag } from '../../redux/flagSlice';

function ArticleDetails() {
  const { page = '1', id } = useParams();
  const search = useSelector((state: State) => state.searchValue);
  const limit = useSelector((state: State) => state.itemsPerPage);
  const {
    data: article,
    isFetching,
    isError,
  } = useDetailedNewsQuery(
    { page, search, limit, id },
    {
      selectFromResult: ({ data, isError, isFetching }) => ({
        data: data?.find((el, i) => i === Number(id)),
        isError,
        isFetching,
      }),
    }
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeDetailsFlag(isFetching));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : article ? (
        <div className="details__inner" data-testid="article-details">
          {article.urlToImage && <img src={article.urlToImage} alt="image" />}
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <p>{article.content}</p>
          <p>{article.author}</p>
          <a className="details__link" href={article.url} target="_blank" rel="noreferrer">
            Read more in origin
          </a>
        </div>
      ) : null}
      {isError && <p>Error in fetch </p>}
      <Link to={`/${search}/${page}?limit=${limit}`} className="results__closeBtn">
        X
      </Link>
    </>
  );
}

export default ArticleDetails;
