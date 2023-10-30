import './errorPage.scss';

const ErrorPage = () => {
  const reload = () => {
    window.location.reload();
  };

  return (
    <section className="error-page">
      <h2 className="error-page__message">Something went wrong</h2>
      <p className="error-page__text">
        This is test error. Please, reload page to continue using this App
      </p>
      <button className="error-page__btn" type="button" onClick={reload}>
        Reload
      </button>
    </section>
  );
};

export default ErrorPage;
