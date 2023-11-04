import { IArticle } from '../../types';
import Article from './Article';

type Props = { results: IArticle[]; handleClick: (index: number) => void };

const ShowContent = (props: Props) => {
  const { results, handleClick } = props;
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

export default ShowContent;
