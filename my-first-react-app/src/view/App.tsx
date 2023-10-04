import { Component, ReactNode } from 'react';
import Search from './search/Search';
import Results from './results/Results';
class App extends Component {
  state: Readonly<{ name: string }>;
  constructor(props: object) {
    super(props);
    const localValue = localStorage.getItem('inputValue');
    this.state = {
      name: localValue ? JSON.parse(localValue) : '',
    };
  }

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
