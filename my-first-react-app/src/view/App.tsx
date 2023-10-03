import { Component, ReactNode } from 'react';
import Search from './search/Search';
import Results from './results/results';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <Search />
        <Results searchValue="ab" />
      </>
    );
  }
}

export default App;
