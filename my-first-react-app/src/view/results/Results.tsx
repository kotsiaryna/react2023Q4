import { Component } from 'react';
import { searchRequest } from '../../api';
import { IShip } from '../../types';
import Ship from './Ship';

class Results extends Component {
  declare props: { searchValue: string };

  state: Readonly<{ results: IShip[] | null | string; isLoading: boolean }>;

  constructor(props: { searchValue: string }) {
    super(props);
    this.state = { results: null, isLoading: false };
  }

  showContent = (results: IShip[] | null | string) => {
    if (!results) return;

    if (typeof results === 'string') {
      return <div className="results__no-results">Something went wrong. Try again</div>;
    } else if (results.length) {
      return results.map((res, i) => {
        const { name, model, length, manufacturer, starship_class, cost_in_credits } = res;
        return (
          <Ship
            key={i}
            name={name}
            model={model}
            length={length}
            manufacturer={manufacturer}
            starship_class={starship_class}
            cost_in_credits={cost_in_credits}
          />
        );
      });
    } else {
      return <div className="results__no-results">No matches</div>;
    }
  };

  render() {
    return (
      <section className="results">
        {!this.state.isLoading && <div className="results__bg"></div>}
        {this.state.isLoading && <div className="results__preload"></div>}
        {this.showContent(this.state.results)}
      </section>
    );
  }

  getData = async () => {
    this.setState({
      isLoading: true,
      results: null,
    });
    try {
      const searchData = await searchRequest(this.props.searchValue);
      const results = searchData.results;
      this.setState({
        results: results,
        isLoading: false,
      });
    } catch {
      this.setState({ results: 'error', isLoading: false });
    }
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
