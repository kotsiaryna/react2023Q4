import { Component } from 'react';
import { searchRequest } from '../../api';
import { ResultsData } from '../../types';
import Ship from './Ship';

class Results extends Component {
  declare props: { searchValue: string };

  state: Readonly<{ results: ResultsData[] }> = {
    results: [{ name: '', model: '', length: '' }],
  };

  render() {
    return (
      <section className="results">
        {this.state.results.map((res, i) => {
          return <Ship key={i} name={res.name} model={res.model} length={res.length} />;
        })}
      </section>
    );
  }
  async componentDidMount(): Promise<void> {
    const searchData = await searchRequest(this.props.searchValue);
    const results = searchData.results;
    this.setState({
      results: results,
    });
  }

  async componentDidUpdate(prevProps: Readonly<{ searchValue: string }>): Promise<void> {
    if (prevProps.searchValue !== this.props.searchValue) {
      const searchData = await searchRequest(this.props.searchValue);
      const results = searchData.results;
      this.setState({
        results: results,
      });
    }
  }
}
export default Results;
