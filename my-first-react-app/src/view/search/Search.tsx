import { ChangeEvent, Component, ReactNode } from 'react';

class Search extends Component {
  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('inputValue', JSON.stringify(e.target.value));
  };

  getInputValue = () => {
    const localValue = localStorage.getItem('inputValue');
    if (localValue) {
      return JSON.parse(localValue);
    } else {
      return '';
    }
  };
  handleSubmit = () => {};
  render(): ReactNode {
    return (
      <section className="search">
        <input
          className="search__input"
          placeholder={this.getInputValue()}
          onChange={this.handleInputChange}
        ></input>
        <button className="search__btn" type="submit" onSubmit={this.handleSubmit}></button>
      </section>
    );
  }
}

export default Search;
