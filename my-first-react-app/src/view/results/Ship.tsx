import { ReactNode } from 'react';
import { IShip } from '../../types';

const Ship = (props: IShip): ReactNode => {
  const { name, model, length, manufacturer, starship_class, cost_in_credits } = props;
  return (
    <div className="results__item">
      <div className="item__name">{name}</div>
      <div className="item__description">
        The model {model} is manufactured by {manufacturer}. It&apos;s length is{' '}
        {new Intl.NumberFormat('ru-RU').format(+length)} meters. It belongs to the class of{' '}
        {starship_class} and costs {new Intl.NumberFormat('ru-RU').format(+cost_in_credits)}{' '}
        credits.
      </div>
    </div>
  );
};

export default Ship;
