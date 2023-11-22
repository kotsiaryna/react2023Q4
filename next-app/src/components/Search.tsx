import { useRouter } from "next/router";
import PageLimit from "./PageLimit";

 const Search = () => {
  const router = useRouter();
  const searchInput = {
    value: ''
  };
  const handleClick = () => {
    if(searchInput.value.trim()) {
      router.push(`/${searchInput.value}/1?limit=10`)
    }
  }
  return <section className="search">
<h1 className="search__heading">Looking for the latest news?</h1>
<div className="search__block">
  <input
    type="text"
    className="search__input"
    placeholder="Type something..."
    onChange={(e) => {searchInput.value = e.target.value}}
  ></input>

  <button className="search__btn" onClick={handleClick}>
    Search
  </button>
</div>
<PageLimit/>
</section>
}
export default Search;
