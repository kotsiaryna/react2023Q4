import { Component, ReactNode } from 'react';
import Search from './search/Search';
import Results from './results/Results';
class App extends Component {
  getStartValue = (): string => {
    const localValue = localStorage.getItem('inputValue');
    return localValue ? JSON.parse(localValue) : '';
  };

  state: Readonly<{ name: string }> = {
    name: this.getStartValue(),
  };

  updateInputValue = (value: string) => {
    this.setState({
      name: value,
    });
  };

  render(): ReactNode {
    return (
      <>
        <Search updateInputValue={this.updateInputValue} />
        <Results searchValue={this.state.name} />
      </>
    );
  }
}

export default App;
