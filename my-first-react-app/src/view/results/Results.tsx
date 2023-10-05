import { Component } from 'react';
import { searchRequest } from '../../api';
import { ResultsData } from '../../types';
import Ship from './Ship';

class Results extends Component {
  declare props: { searchValue: string };

  state: Readonly<{ results: ResultsData[] | null; isLoading: boolean }>;

  constructor(props: { searchValue: string }) {
    super(props);
    this.state = { results: null, isLoading: false };
  }

  showContent = (results: ResultsData[] | null) => {
    if (!results) return;

    if (results.length) {
      return results.map((res, i) => {
        return <Ship key={i} name={res.name} model={res.model} length={res.length} />;
      });
    } else {
      return <div>No matches</div>;
    }
  };

  render() {
    return (
      <section className="results">
        {this.state.isLoading && <p>Loading...</p>}
        {this.showContent(this.state.results)}
      </section>
    );
  }

  getData = async () => {
    this.setState({
      isLoading: true,
      results: null,
    });
    const searchData = await searchRequest(this.props.searchValue);
    const results = searchData.results;
    this.setState({
      results: results,
      isLoading: false,
    });
  };

  async componentDidMount(): Promise<void> {
    await this.getData();
  }

  async componentDidUpdate(prevProps: Readonly<{ searchValue: string }>): Promise<void> {
    if (prevProps.searchValue !== this.props.searchValue) {
      await this.getData();
    }
  }
}
export default Results;
