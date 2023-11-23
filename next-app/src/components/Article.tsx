import { ReactNode } from "react";
import { IArticle } from "../../types";
import { useRouter } from "next/router";

const Article = (props: IArticle): ReactNode => {
  const { title, author, index } = props;
  const router = useRouter();
  const { limit, search } = router.query;
  const handleClick = () => {
    router.push({
      pathname: `/${search}/1`,
      query: { limit, id: index },
    });
  };
  return (
    <div
      onClick={handleClick}
      className="results__item"
      data-testid={`article${index}`}
    >
      <h4 className="item__name">{title}</h4>
      <p className="item__author">{author}</p>
    </div>
  );
};

export default Article;
