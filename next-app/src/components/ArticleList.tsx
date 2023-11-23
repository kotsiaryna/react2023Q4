import Article from "./Article";
import { IArticle } from "../../types";

type Props = { results: IArticle[] };

const ArticleList = (props: Props) => {
  const { results } = props;

  if (!results.length)
    return <div className="results__no-results">No matches</div>;
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
          />
        );
      })}
    </div>
  );
};

export default ArticleList;
