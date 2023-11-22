import { IArticle } from '../../types';

type Props = {
  article: IArticle
}
function ArticleDetails(props: Props) {
  const { article } = props;
  
  return (
    <>
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
     
      {/* {isError && <p>Error in fetch </p>} */}
      {/* <Link to={`/${search}/${page}?limit=${limit}`} className="results__closeBtn">
        X
      </Link> */}
    </>
  );
}

export default ArticleDetails;
