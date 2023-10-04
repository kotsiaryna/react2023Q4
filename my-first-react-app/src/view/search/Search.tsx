import { ChangeEvent, Component, ReactNode } from 'react';

class Search extends Component {
  declare props: Readonly<{ updateInputValue: (value: string) => void }>;

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('inputValue', JSON.stringify(e.target.value));
  };

  getInputValue = () => {
    const localValue = localStorage.getItem('inputValue');
    return localValue ? JSON.parse(localValue) : '';
  };

  render(): ReactNode {
    const inputValue = this.getInputValue();
    return (
      <section className="search">
        <input
          className="search__input"
          placeholder={inputValue}
          onChange={this.handleInputChange}
        ></input>
        <button className="search__btn" onClick={() => this.props.updateInputValue(inputValue)}>
          Search
        </button>
      </section>
    );
  }
}

export default Search;
