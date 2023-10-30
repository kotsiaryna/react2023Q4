import { MouseEventHandler, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './pagination.scss';

function Pagination({
  handleClick,
  next,
  previous,
}: {
  handleClick: () => void;
  next: null | string;
  previous: null | string;
}) {
  // TODO add disabled classes on last pages
  const { page, search } = useParams();
  const [curPage, setCurPage] = useState(page);

  const handleBackClick: MouseEventHandler = (e) => {
    if (!previous) {
      e.preventDefault();
    } else {
      setCurPage(`${Number(curPage) - 1}`);
      handleClick();
    }
  };

  const handleForwardClick: MouseEventHandler = (e) => {
    if (!next) {
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
