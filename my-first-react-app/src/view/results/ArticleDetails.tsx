import { Link, useLocation, useParams } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { IArticle } from '../../types';

function ArticleDetails() {
  const data = useLoaderData() as IArticle;

  const showDetails = (data: IArticle) => {
    return (
      <>
        <img src={data.urlToImage} alt="image" />
        <p>{data.title}</p>
        <p>{data.content}</p>
        <p>{data.author}</p>
        <a href={data.url} target="_blank" rel="noreferrer">
          Read more in origin
        </a>
      </>
    );
  };
  const { page, search } = useParams();
  const location = useLocation();
  const limit = location.search.split('=').at(-1);
  const link = limit ? `/${search}/${page}?limit=${limit}` : `/${search}/${page}`;

  return (
    <>
      <div>{showDetails(data)}</div>
      <Link to={link} className="results__closeBtn">
        X
      </Link>
    </>
  );
}

export default ArticleDetails;
