import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

function Page404(): ReactNode {
  return (
    <div>
      <h2>Page Not Found 404</h2>

      <Link to="/">Back on main</Link>
    </div>
  );
}

export default Page404;
