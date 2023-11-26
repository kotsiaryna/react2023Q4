import { useRouter } from 'next/router';
import { IArticle } from '../../types';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/article.module.scss';

type Props = {
  article: IArticle;
};
function ArticleDetails(props: Props) {
  const { article } = props;
  const router = useRouter();
  const { search, page, limit } = router.query;

  return (
    <>
      <div className={styles.results__details} data-testid="article-details">
        {article.urlToImage && (
          <Image src={article.urlToImage} alt="image" width={200} height={300} />
        )}

        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <p>{article.content}</p>
        <p>{article.author}</p>
        <a className={styles.details__link} href={article.url} target="_blank" rel="noreferrer">
          Read more in origin
        </a>
      </div>

      <Link
        href={`/${search}/${page}?limit=${limit}`}
        className={styles.results__details__closeBtn}
      >
        X
      </Link>
    </>
  );
}

export default ArticleDetails;
