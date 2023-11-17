import React, { ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './pageLimit.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeItemsPerPage } from '../../redux/itemsPerPageSlice';
import { State } from '../../redux/store';

const PageLimit = () => {
  const [limit] = useSearchParams();
  const navigate = useNavigate();
  const search = useSelector((state: State) => state.searchValue);

  const dispatch = useDispatch();

  const changeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const limit = e.target.value;
    dispatch(changeItemsPerPage(limit));
    navigate(`${search}/1?limit=${limit}`);
  };

  return (
    <section className="limit">
      <label htmlFor="limit">Results per page</label>
      <select
        name="limit"
        id="limit"
        onChange={(e) => {
          changeLimit(e);
        }}
        defaultValue={(limit.get('limit') || 10).toString()}
      >
        <option value={10}>10</option>
        <option value={5}>5</option>
        <option value={20}>20</option>
      </select>
    </section>
  );
};

export default PageLimit;
