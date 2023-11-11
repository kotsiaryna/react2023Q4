import { useContext } from 'react';
import Article from './Article';
import { ArticlesContext } from '../../context';

type Props = { handleClick: (index: number) => void };

const ArticleList = (props: Props) => {
  const { handleClick } = props;
  const results = useContext(ArticlesContext);
  if (results && results.length) {
    return (
      <div className="results__items">
        {results.map((res, index) => {
          const { title, author, description } = res;
          return (
            <Article
              key={index}
              index={index}
              title={title}
              author={author}
              description={description}
              handleClick={() => handleClick(index)}
            />
          );
        })}
      </div>
    );
  } else {
    return <div className="results__no-results">No matches</div>;
  }
};

export default ArticleList;
