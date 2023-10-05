import { ChangeEvent, Component, ReactNode } from 'react';

class Search extends Component {
  declare props: Readonly<{ updateInputValue: (value: string) => void }>;
  input: string;

  constructor(props: Readonly<{ updateInputValue: (value: string) => void }>) {
    super(props);
    this.input = '';
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('inputValue', JSON.stringify(e.target.value));
    this.input = e.target.value;
  };

  getInputValue = () => {
    const localValue = localStorage.getItem('inputValue');
    return localValue ? JSON.parse(localValue) : '';
  };

  render(): ReactNode {
    const inputValue = this.getInputValue();
    return (
      <section className="search">
        <h1 className="search__heading">Looking for a starship?</h1>
        <div className="search__block">
          <input
            type="text"
            className="search__input"
            placeholder={inputValue}
            onInput={this.handleInputChange}
          ></input>
          <button
            className="search__btn"
            onClick={() => {
              this.props.updateInputValue(this.input);
            }}
          >
            Search
          </button>
        </div>
      </section>
    );
  }
}

export default Search;
