import { useRouter } from 'next/router';
import PageLimit from './PageLimit';
import styles from '../styles/search.module.scss';

const Search = () => {
  const router = useRouter();
  const searchInput = {
    value: '',
  };
  const handleClick = () => {
    if (searchInput.value.trim()) {
      router.push(`/${searchInput.value}/1?limit=10`);
    }
  };
  return (
    <section className={styles.search}>
      <h1 className={styles.search__heading}>Looking for the latest news?</h1>
      <div className={styles.search__block}>
        <input
          type="text"
          className={styles.search__input}
          placeholder="Type something..."
          onChange={(e) => {
            searchInput.value = e.target.value;
          }}
        ></input>

        <button className={styles.search__btn} onClick={handleClick}>
          Search
        </button>
      </div>
      <PageLimit />
    </section>
  );
};
export default Search;
