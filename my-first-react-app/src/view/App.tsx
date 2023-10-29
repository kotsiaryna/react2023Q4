import { Component, ReactNode } from 'react';
import Search from './search/Search';
import Results from './results/Results';
import ErrorButton from './error/errorButton';

class App extends Component {
  state: Readonly<{ searchValue: string; errorIsThrown: boolean }>;
  constructor(props: object) {
    super(props);
    const localValue = localStorage.getItem('inputValue');
    this.state = {
      searchValue: localValue ? JSON.parse(localValue) : '',
      errorIsThrown: false,
    };
  }

  updateInputValue = (value: string) => {
    this.setState({
      ...this.state,
      searchValue: value,
    });
  };

  throwError = () => {
    this.setState({
      ...this.state,
      errorIsThrown: true,
    });
  };

  render(): ReactNode {
    if (this.state.errorIsThrown) {
      throw new Error('broken');
    } else {
      return (
        <>
          <ErrorButton handleClick={this.throwError} />
          <Search
            updateInputValue={this.updateInputValue}
            inputPlaceholder={this.state.searchValue}
          />
          <Results searchValue={this.state.searchValue} />
        </>
      );
    }
  }
}

export default App;
