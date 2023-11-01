import { Link, useParams } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { IArticle } from '../../types';

function ArticleDetails() {
  const data = useLoaderData() as IArticle;
  // const showData = (): ReactNode => {
  //   return Object.entries(data).map(([key, value], i) => {
  //     return (
  //       <p key={i}>
  //         {key.toUpperCase()}: {value}
  //       </p>
  //     );
  //   });
  // };
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

  return (
    <>
      <div>{showDetails(data)}</div>
      <Link to={`/${search}/${page}`} className="results__closeBtn">
        X
      </Link>
    </>
  );
}

export default ArticleDetails;
