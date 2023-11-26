import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { MouseEventHandler } from 'react';
import styles from '@/styles/pagination.module.scss';

type Props = {
  totalAmount: number;
  query: ParsedUrlQuery;
};

function Pagination(props: Props) {
  const { totalAmount, query } = props;

  const { limit, search, page } = query;

  const router = useRouter();

  const handleBackClick: MouseEventHandler = (e) => {
    if (page === '1') {
      e.preventDefault();
      return;
    }
    const prevPage = Number(page) - 1;
    router.push({
      pathname: `/${search}/${prevPage}`,
      query: {
        limit,
      },
    });
  };

  const handleForwardClick: MouseEventHandler = (e) => {
    const isLastPage = Number(page) * Number(limit) >= totalAmount;
    if (isLastPage) {
      e.preventDefault();
      return;
    }
    const nextPage = Number(page) + 1;
    router.push({
      pathname: `/${search}/${nextPage}`,
      query: {
        limit,
      },
    });
  };

  return (
    <div className={styles.pagination}>
      <button type="button" onClick={handleBackClick}>
        BACK
      </button>
      <div className="pageNumber">{page}</div>
      <button type="button" onClick={handleForwardClick}>
        FORWARD
      </button>
    </div>
  );
}

export default Pagination;
