import { ReactNode } from 'react';
import { IArticle } from '../../types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../store/store';
import { changeDetailsFlag } from '../../store/flagSlice';

const Article = (props: IArticle): ReactNode => {
  const { title, author, index, handleClick } = props;
  const limit = useSelector((state: State) => state.itemsPerPage.value);
  const dispatch = useDispatch();

  return (
    <Link
      to={`${index}?limit=${limit}`}
      onClick={() => {
        handleClick();
        dispatch(changeDetailsFlag(true));
      }}
      data-testid={`article${index}`}
    >
      <div className="results__item">
        <h4 className="item__name">{title}</h4>
        <p className="item__author">{author}</p>
      </div>
    </Link>
  );
};

export default Article;
