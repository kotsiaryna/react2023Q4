import { Link, useLocation, useParams } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { IArticle } from '../../types';

function ArticleDetails() {
  const data = useLoaderData() as IArticle;

  const { page, search } = useParams();
  const location = useLocation();
  const limit = location.search.split('=').at(-1);
  const link = limit ? `/${search}/${page}?limit=${limit}` : `/${search}/${page}`;

  return (
    <>
      <div className="details__inner" data-testid="article-details">
        {data.urlToImage && <img src={data.urlToImage} alt="image" />}
        <h3>{data.title}</h3>
        <p>{data.description}</p>
        <p>{data.content}</p>
        <p>{data.author}</p>
        <a className="details__link" href={data.url} target="_blank" rel="noreferrer">
          Read more in origin
        </a>
      </div>
      <Link to={link} className="results__closeBtn">
        X
      </Link>
    </>
  );
}

export default ArticleDetails;
