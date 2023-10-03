import { Component, ReactNode } from 'react';

class Ship extends Component {
  declare props: Readonly<{ name: string; model: string; length: string }>;
  render(): ReactNode {
    return (
      <div className="results__item">
        {this.props.name} has length of {this.props.length}. The model is {this.props.model}
      </div>
    );
  }
}

export default Ship;
