import { ReactNode } from 'react';
import { IShip } from '../../types';
import Ship from './Ship';
import { useLoaderData } from 'react-router-dom';

const Results = (): ReactNode => {
  const searchResults = useLoaderData() as IShip[];
  console.log(searchResults);

  const showContent = (results: IShip[]) => {
    if (results.length) {
      return results.map((res) => {
        const { name, model, length, manufacturer, starship_class, cost_in_credits } = res;
        return (
          <Ship
            key={model}
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

  return (
    <section className="results">
      <div className="results__bg"></div>
      {showContent(searchResults)}
    </section>
  );
};
export default Results;
