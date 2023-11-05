import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './page404.scss';

function Page404(): ReactNode {
  return (
    <section className="page404">
      <h2>Page Not Found 404</h2>
      <Link to="/">Back on main</Link>
    </section>
  );
}

export default Page404;
