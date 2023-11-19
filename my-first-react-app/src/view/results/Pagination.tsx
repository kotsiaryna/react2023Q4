import { MouseEventHandler } from 'react';
import { Link, useParams } from 'react-router-dom';

import './pagination.scss';

type Props = {
  totalAmount: number;
  limit: number;
  page: number;
};

function Pagination(props: Props) {
  const { totalAmount, limit, page } = props;
  const { search } = useParams();

  const handleBackClick: MouseEventHandler = (e) => {
    if (page === 1) {
      e.preventDefault();
    }
  };

  const handleForwardClick: MouseEventHandler = (e) => {
    const isLastPage = page * limit >= totalAmount;
    if (isLastPage) {
      e.preventDefault();
    }
  };

  return (
    <div className="pagination">
      <Link to={`/${search}/${Number(page) - 1}?limit=${limit}`} onClick={handleBackClick}>
        BACK
      </Link>
      <div className="pageNumber">{page}</div>
      <Link to={`/${search}/${Number(page) + 1}?limit=${limit}`} onClick={handleForwardClick}>
        FORWARD
      </Link>
    </div>
  );
}

export default Pagination;
