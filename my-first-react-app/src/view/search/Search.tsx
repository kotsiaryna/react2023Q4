import { ChangeEvent, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLimit from './PageLimit';
import './search.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearch } from '../../redux/searchSlice';
import { loadSearchValue, saveSearchValue } from '../../utils/localStorageUtils';
import { State } from '../../redux/store';

const Search = (): ReactNode => {
  const [searchValue, setSearchValue] = useState(loadSearchValue() || '');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const limit = useSelector((state: State) => state.itemsPerPage);

  const handleSearchValue = () => {
    if (searchValue.trim()) {
      dispatch(changeSearch(searchValue.trim()));
      navigate(`/${searchValue.trim()}/1?limit=${limit}`);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    saveSearchValue(e.target.value);
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
          placeholder="Type something..."
          onChange={handleInputChange}
        ></input>

        <button className="search__btn" onClick={handleSearchValue}>
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
