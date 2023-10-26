import { Component, ReactNode } from 'react';
import Search from './search/Search';
import Results from './results/Results';
import ErrorButton from './error/errorButton';

class App extends Component {
  state: Readonly<{ name: string; errorIsThrown: boolean }>;
  constructor(props: object) {
    super(props);
    const localValue = localStorage.getItem('inputValue');
    this.state = {
      name: localValue ? JSON.parse(localValue) : '',
      errorIsThrown: false,
    };
  }

  updateInputValue = (value: string) => {
    this.setState({
      ...this.state,
      name: value,
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
          <Search updateInputValue={this.updateInputValue} />
          <Results searchValue={this.state.name} />
        </>
      );
    }
  }
}

export default App;
