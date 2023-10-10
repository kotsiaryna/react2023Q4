import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

function ResultsError(): ReactNode {
  const error = useRouteError() as Error;

  return (
    <div>
      <h2>Error</h2>
      <p>{error.message}</p>
      <Link to="/">Back on main</Link>
    </div>
  );
}

export default ResultsError;
