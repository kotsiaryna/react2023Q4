import { Component, ReactNode, RefObject, createRef } from 'react';

class Search extends Component {
  declare props: Readonly<{ updateInputValue: (value: string) => void; inputPlaceholder: string }>;

  inputRef: RefObject<HTMLInputElement> = createRef();

  handleInputChange = () => {
    localStorage.setItem('inputValue', JSON.stringify(this.inputRef.current?.value));
  };

  render(): ReactNode {
    return (
      <section className="search">
        <h1 className="search__heading">Looking for a starship?</h1>
        <div className="search__block">
          <input
            type="text"
            className="search__input"
            ref={this.inputRef}
            placeholder={this.props.inputPlaceholder}
          ></input>
          <button
            className="search__btn"
            onClick={() => {
              this.props.updateInputValue(this.inputRef.current?.value || '');
              this.handleInputChange();
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
