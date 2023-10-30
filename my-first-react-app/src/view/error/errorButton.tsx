import './errorButton.scss';

const ErrorButton = (props: { handleClick: () => void }) => {
  return (
    <button className="error-btn" onClick={props.handleClick}>
      Throw Error
    </button>
  );
};

export default ErrorButton;
