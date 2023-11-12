import './errorButton.scss';

type Props = {
  handleClick: () => void;
};

const ErrorButton = (props: Props) => {
  return (
    <button className="error-btn" onClick={props.handleClick}>
      Throw Error
    </button>
  );
};

export default ErrorButton;
