import { ChangeEvent, ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageLimit from './PageLimit';
import './search.scss';
// import { SearchValueContext } from '../../context';
import { useDispatch } from 'react-redux';
import { changeSearch } from '../../store/searchSlice';

const Search = (): ReactNode => {
  const localValue = localStorage.getItem('inputValue') || JSON.stringify('');
  const [searchValue, setSearchValue] = useState(JSON.parse(localValue));

  const limit = useLocation().search.split('=').at(-1) || '10';
  let link: string = `/${searchValue}/1?limit=${limit}`;

  // const { setSearchContextValue } = useContext(SearchValueContext);
  const dispatch = useDispatch();
  const saveSearchValue = () => {
    dispatch(changeSearch(searchValue));
    link = `/${searchValue}/1?limit=${limit}`;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('inputValue', JSON.stringify(e.target.value));
    setSearchValue(e.target.value);
  };

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
          <button className="search__btn" onClick={saveSearchValue}>
            Search
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Search;
