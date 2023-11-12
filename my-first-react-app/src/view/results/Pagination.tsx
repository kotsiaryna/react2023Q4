import { MouseEventHandler, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './pagination.scss';

type Props = {
  handleClick: () => void;
  totalAmount: number;
  limit: number;
  page: number;
};

function Pagination(props: Props) {
  // TODO add disabled classes on last pages
  const { handleClick, totalAmount, limit, page } = props;
  const { search } = useParams();
  const [curPage, setCurPage] = useState(page);

  const handleBackClick: MouseEventHandler = (e) => {
    if (page === 1) {
      e.preventDefault();
    } else {
      setCurPage(curPage - 1);
      handleClick();
    }
  };

  const handleForwardClick: MouseEventHandler = (e) => {
    const isLastPage = Number(page) * limit >= totalAmount;
    if (isLastPage) {
      e.preventDefault();
    } else {
      setCurPage(curPage + 1);
      handleClick();
    }
  };
  return (
    <div className="pagination">
      <Link
        to={`/${search}/${Number(page) - 1}?limit=${limit}`}
        onClick={(e) => {
          handleBackClick(e);
        }}
      >
        BACK
      </Link>
      <div className="pageNumber">{page}</div>
      <Link
        to={`/${search}/${Number(page) + 1}?limit=${limit}`}
        onClick={(e) => {
          handleForwardClick(e);
        }}
      >
        FORWARD
      </Link>
    </div>
  );
}

export default Pagination;
