import { ReactNode } from 'react';
import { IArticle } from '../../types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';

const Article = (props: IArticle): ReactNode => {
  const { title, author, index } = props;
  const limit = useSelector((state: State) => state.itemsPerPage);

  return (
    <Link to={`${index}?limit=${limit}`} data-testid={`article${index}`}>
      <div className="results__item">
        <h4 className="item__name">{title}</h4>
        <p className="item__author">{author}</p>
      </div>
    </Link>
  );
};

export default Article;
