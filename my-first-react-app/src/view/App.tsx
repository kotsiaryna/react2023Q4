import { Component, ReactNode } from 'react';
import Search from './search/Search';
import Results from './results/results';
class App extends Component {
  state: Readonly<{ name: string }> = {
    name: '',
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
