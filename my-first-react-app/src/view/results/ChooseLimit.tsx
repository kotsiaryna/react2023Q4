import React, { ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './chooseLimit.scss';

const ChooseLimit = () => {
  const { search } = useParams();

  const navigate = useNavigate();

  const changeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const limit = e.target.value;
    console.log(limit);
    navigate(`/${search}/1`);
  };

  return (
    <section className="limit">
      <label htmlFor="limit">Results per page</label>
      <select name="limit" id="limit" onChange={changeLimit}>
        <option selected value={10}>
          10
        </option>
        <option value={10}>5</option>
        <option value={10}>20</option>
      </select>
    </section>
  );
};

export default ChooseLimit;
