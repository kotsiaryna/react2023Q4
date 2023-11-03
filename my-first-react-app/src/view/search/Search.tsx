import { ChangeEvent, ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';

import './search.scss';

const Search = (props: { handleClick: (value: string) => void }): ReactNode => {
  const getInputValue = () => {
    const localValue = localStorage.getItem('inputValue');
    return localValue ? JSON.parse(localValue) : '';
  };

  const [searchValue, setSearchValue] = useState(getInputValue());

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('inputValue', JSON.stringify(e.target.value));
    setSearchValue(e.target.value);
  };

  const createLink = () => {
    const link = `/${searchValue}/1`;
    return link;
  };

  return (
    <section className="search">
      <h1 className="search__heading">Looking for a starship?</h1>
      <div className="search__block">
        <input
          type="text"
          className="search__input"
          value={searchValue}
          onChange={handleInputChange}
        ></input>
        <NavLink to={createLink()}>
          <button
            className="search__btn"
            onClick={() => {
              props.handleClick(searchValue);
            }}
          >
            Search
          </button>
        </NavLink>
      </div>
    </section>
  );
};

export default Search;
