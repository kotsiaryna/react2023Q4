import React, { ChangeEvent } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './chooseLimit.scss';

const ChooseLimit = (props: { handleChange: () => void }) => {
  const { search } = useParams();

  const navigate = useNavigate();

  const [limit, setLimit] = useSearchParams();
  console.log(limit.get('limit'));

  const changeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const limit = e.target.value;
    console.log(limit);
    navigate(`/${search}/1?limit=${limit}`);
    setLimit(`limit=${limit}`);
  };

  return (
    <section className="limit">
      <label htmlFor="limit">Results per page</label>
      <select
        name="limit"
        id="limit"
        onChange={(e) => {
          changeLimit(e);
          props.handleChange();
          // props.handleChange(e.target.value);
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

export default ChooseLimit;
