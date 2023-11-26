import { useRouteError } from 'react-router-dom';
import './errorPage.scss';

const ErrorPage = () => {
  const reload = () => {
    window.location.reload();
  };
  const error = useRouteError() as Error;

  return (
    <section className="error-page">
      <h2 className="error-page__message">Something went wrong</h2>
      <p className="error-page__text">{error.message}</p>
      <button className="error-page__btn" type="button" onClick={reload}>
        Reload
      </button>
    </section>
  );
};

export default ErrorPage;
