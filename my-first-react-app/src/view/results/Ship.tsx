import { Component, ReactNode } from 'react';

class Ship extends Component {
  declare props: Readonly<{
    name: string;
    model: string;
    length: string;
    manufacturer: string;
    starship_class: string;
    cost: string;
  }>;
  render(): ReactNode {
    const { name, model, length, manufacturer, starship_class, cost } = this.props;
    return (
      <div className="results__item">
        <div className="item__name">{name}</div>
        <div className="item__description"></div>
        The model {model} is manufactured by {manufacturer}. It&apos;s length is{' '}
        {new Intl.NumberFormat('ru-RU').format(+length)} meters. It belongs to the class of{' '}
        {starship_class} and costs {new Intl.NumberFormat('ru-RU').format(+cost)} credits.
      </div>
    );
  }
}

export default Ship;
