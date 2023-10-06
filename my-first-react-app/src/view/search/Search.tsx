import { ChangeEvent, ReactNode } from 'react';

const Search = (props: { updateInputValue: (value: string) => void }): ReactNode => {
  let input: string;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('inputValue', JSON.stringify(e.target.value));
    input = e.target.value;
    console.log(input);
  };

  const getInputValue = () => {
    const localValue = localStorage.getItem('inputValue');
    return localValue ? JSON.parse(localValue) : '';
  };

  return (
    <section className="search">
      <h1 className="search__heading">Looking for a starship?</h1>
      <div className="search__block">
        <input
          type="text"
          className="search__input"
          placeholder={getInputValue()}
          onInput={handleInputChange}
        ></input>
        <button
          className="search__btn"
          onClick={() => {
            props.updateInputValue(input);
          }}
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
