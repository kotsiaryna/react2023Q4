import { IShip } from '../../types';
import Ship from './Ship';

const ShowContent = (props: { results: IShip[]; handleClick: () => void }) => {
  const { results, handleClick } = props;
  if (results.length) {
    return (
      <div className="results__items">
        {results.map((res) => {
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
              handleClick={handleClick}
            />
          );
        })}
      </div>
    );
  } else {
    return <div className="results__no-results">No matches</div>;
  }
};
export default ShowContent;
