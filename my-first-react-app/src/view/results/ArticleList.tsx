import Article from './Article';

import { IArticle } from '../../types';
// import { useDetailedNewsQuery } from '../../apiRTK';

type Props = { handleClick: (index: number) => void; results: IArticle[] };

const ArticleList = (props: Props) => {
  const { handleClick, results } = props;

  // const { list } = useDetailedNewsQuery()

  if (results.length) {
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
