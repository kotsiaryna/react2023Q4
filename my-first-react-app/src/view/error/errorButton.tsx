import { Component, ReactNode } from 'react';

class ErrorButton extends Component {
  declare props: Readonly<{ handleClick: () => void }>;

  render(): ReactNode {
    return (
      <button className="error-btn" onClick={this.props.handleClick}>
        Throw Error
      </button>
    );
  }
}

export default ErrorButton;
