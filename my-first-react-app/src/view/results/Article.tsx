import { ReactNode } from 'react';
import { IArticle } from '../../types';
import { Link, useLocation } from 'react-router-dom';

const Article = (props: IArticle): ReactNode => {
  const { title, author, index, handleClick } = props;
  const location = useLocation();
  const limit = location.search.split('=').at(-1);
  const link = limit ? `${index}?limit=${limit}` : `${index}`;
  return (
    <Link to={link} onClick={handleClick} data-testid={`article${index}`}>
      <div className="results__item">
        <h4 className="item__name">{title}</h4>
        <p className="item__author">{author}</p>
      </div>
    </Link>
  );
};

export default Article;
