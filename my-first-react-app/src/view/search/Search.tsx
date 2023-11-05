import { ChangeEvent, ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageLimit from './PageLimit';
import './search.scss';

const Search = (): ReactNode => {
  const getInputValue = () => {
    const localValue = localStorage.getItem('inputValue');
    return localValue ? JSON.parse(localValue) : '';
  };

  const [searchValue, setSearchValue] = useState(getInputValue());

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('inputValue', JSON.stringify(e.target.value));
    setSearchValue(e.target.value);
  };

  const limit = useLocation().search.split('=').at(-1) || '10';
  const link = `/${searchValue}/1?limit=${limit}`;

  return (
    <section className="search">
      <h1 className="search__heading">Looking for the latest news?</h1>
      <PageLimit />
      <div className="search__block">
        <input
          type="text"
          className="search__input"
          value={searchValue}
          onChange={handleInputChange}
        ></input>
        <Link to={link}>
          <button className="search__btn">Search</button>
        </Link>
      </div>
    </section>
  );
};

export default Search;
