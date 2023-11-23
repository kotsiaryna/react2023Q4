import { useRouter } from "next/router";
import { IArticle } from "../../types";
import Link from "next/link";
import Image from "next/image";

type Props = {
  article: IArticle;
};
function ArticleDetails(props: Props) {
  const { article } = props;
  const router = useRouter();
  const { search, page, limit } = router.query;

  return (
    <>
      <div className="details__inner" data-testid="article-details">
        {article.urlToImage && (
          <Image
            src={article.urlToImage}
            alt="image"
            width={400}
            height={600}
          />
        )}
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <p>{article.content}</p>
        <p>{article.author}</p>
        <a
          className="details__link"
          href={article.url}
          target="_blank"
          rel="noreferrer"
        >
          Read more in origin
        </a>
      </div>

      {/* {isError && <p>Error in fetch </p>} */}
      <Link
        href={`/${search}/${page}?limit=${limit}`}
        className="results__closeBtn"
      >
        X
      </Link>
    </>
  );
}

export default ArticleDetails;
