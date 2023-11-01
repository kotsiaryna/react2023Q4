import { MouseEventHandler, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './pagination.scss';

function Pagination({
  handleClick,
  totalAmount,
  limit,
}: {
  handleClick: () => void;
  totalAmount: number;
  limit: number;
}) {
  // TODO add disabled classes on last pages
  const { page, search } = useParams();
  const [curPage, setCurPage] = useState(page);

  const handleBackClick: MouseEventHandler = (e) => {
    if (page === '1') {
      e.preventDefault();
    } else {
      setCurPage(`${Number(curPage) - 1}`);
      handleClick();
    }
  };

  const handleForwardClick: MouseEventHandler = (e) => {
    const isLastPage = Number(page) * limit >= totalAmount;
    if (isLastPage) {
      e.preventDefault();
    } else {
      setCurPage(`${Number(curPage) + 1}`);
      handleClick();
    }
  };
  return (
    <section className="pagination">
      <Link
        to={`/${search}/${page === '1' ? page : Number(page) - 1}`}
        onClick={(e) => {
          handleBackClick(e);
        }}
      >
        BACK
      </Link>
      <div className="pageNumber">{curPage}</div>
      <Link
        to={`/${search}/${Number(page) + 1}`}
        onClick={(e) => {
          handleForwardClick(e);
        }}
      >
        FORWARD
      </Link>
    </section>
  );
}

export default Pagination;
