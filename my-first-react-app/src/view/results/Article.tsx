import { ReactNode } from 'react';
import { IArticle } from '../../types';
import { Link } from 'react-router-dom';

const Article = (props: IArticle): ReactNode => {
  const { title, author, description, index, handleClick } = props;
  return (
    <Link to={index.toString()} onClick={handleClick}>
      <div className="results__item">
        <div className="item__name">{title}</div>
        <div className="item__description">{description}</div>
        <div className="item__author">{author}</div>
      </div>
    </Link>
  );
};

export default Article;
