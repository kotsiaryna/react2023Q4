import Article from './Article';
import { IArticle } from '../../types';
import styles from '@/styles/article.module.scss';

type Props = { results: IArticle[] };

const ArticleList = (props: Props) => {
  const { results } = props;

  if (!results.length) return <div className={styles.results__no_results}>No matches</div>;
  return (
    <div className={styles.results__items}>
      {results.map((res, index) => {
        const { title, author, description } = res;
        return (
          <Article
            key={index}
            index={index}
            title={title}
            author={author}
            description={description}
          />
        );
      })}
    </div>
  );
};

export default ArticleList;
