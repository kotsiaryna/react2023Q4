import { ReactNode, useEffect, useState } from 'react';
import { IShip } from '../../types';
import Ship from './Ship';
import { Outlet, useLoaderData, useParams } from 'react-router-dom';

const Results = (): ReactNode => {
  const searchResults = useLoaderData() as IShip[];
  console.log(searchResults);

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [id]);

  const startLoading = () => {
    setIsLoading(true);
  };

  const showContent = (results: IShip[]) => {
    if (results.length) {
      return results.map((res) => {
        const { name, model, length, manufacturer, starship_class, cost_in_credits, url } = res;
        return (
          <Ship
            key={model}
            name={name}
            model={model}
            length={length}
            manufacturer={manufacturer}
            starship_class={starship_class}
            cost_in_credits={cost_in_credits}
            url={url}
            handleClick={startLoading}
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
      <div className="results__items">{showContent(searchResults)} </div>
      {isLoading ? <div className="results__preload"></div> : <Outlet />}
    </section>
  );
};
export default Results;
