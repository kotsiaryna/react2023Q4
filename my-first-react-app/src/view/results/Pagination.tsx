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
  const { handleClick, totalAmount, limit, page } = props;
  const { search } = useParams();
  const [curPage, setCurPage] = useState(page);

  const handleBackClick: MouseEventHandler = (e) => {
    // to prevent negative numbers in pages
    if (page !== 1) {
      setCurPage(curPage - 1);
      handleClick();
      return;
    }
    e.preventDefault();
  };

  const handleForwardClick: MouseEventHandler = (e) => {
    const isLastPage = Number(page) * limit >= totalAmount;
    if (!isLastPage) {
      setCurPage(curPage + 1);
      handleClick();
      return;
    }
    e.preventDefault();
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
