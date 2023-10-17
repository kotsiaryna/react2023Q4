import { MouseEventHandler, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Pagination(props: { handleClick: (value: string) => void }) {
  // TODO disable links on first and last pages
  const { page, search } = useParams();
  const [curPage, setCurPage] = useState(page);

  const handleBackClick: MouseEventHandler = (e) => {
    if (page === '1') {
      e.preventDefault();
    } else {
      setCurPage(`${Number(curPage) - 1}`);
    }
  };

  const handleForwardClick: MouseEventHandler = () => {
    setCurPage(`${Number(curPage) + 1}`);
  };
  return (
    <section className="pagination">
      <Link
        to={`/${search}/${page === '1' ? page : Number(page) - 1}`}
        onClick={(e) => {
          handleBackClick(e);
          if (curPage !== '1') props.handleClick(String(curPage));
        }}
      >
        BACK
      </Link>
      <div className="pageNumber">{page}</div>
      <Link
        to={`/${search}/${Number(page) + 1}`}
        onClick={(e) => {
          handleForwardClick(e);
          props.handleClick(String(curPage));
        }}
      >
        FORWARD
      </Link>
    </section>
  );
}

export default Pagination;
