import { Component } from 'react';
import { searchRequest } from '../../api';
import { ResultsData } from '../../types';
import Ship from './Ship';

class Results extends Component {
  declare props: { searchValue: string };

  declare state: Readonly<{ results: ResultsData[] }>;

  showContent = (st: { results: ResultsData[] }) => {
    if (st) {
      return st.results.map((res, i) => {
        return <Ship key={i} name={res.name} model={res.model} length={res.length} />;
      });
    } else {
      return '';
    }
  };

  render() {
    return <section className="results">{this.showContent(this.state)}</section>;
  }

  getData = async () => {
    const searchData = await searchRequest(this.props.searchValue);
    const results = searchData.results;
    this.setState({
      results: results,
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
