import { ReactNode, useEffect, useState } from 'react';
import { searchRequest } from '../../api';
import { IShip } from '../../types';
import Ship from './Ship';

type SearchValue = {
  searchValue: string;
};

const Results = (props: SearchValue): ReactNode => {
  const [results, setResults] = useState<null | IShip[]>(null);
  const [isLoading, setIsLoading] = useState(true);

  const showContent = (results: IShip[]) => {
    console.log(results);
    if (results.length) {
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

  useEffect(() => {
    const getData = async () => {
      const response = await searchRequest(props.searchValue);
      const results = response.results;
      setResults(results);
      setIsLoading(false);
    };
    setIsLoading(true);
    setResults(null);
    getData();
  }, [props.searchValue]);

  return (
    <section className="results">
      {!isLoading && <div className="results__bg"></div>}
      {isLoading && <div className="results__preload"></div>}
      {results && showContent(results)}
    </section>
  );
};
export default Results;
