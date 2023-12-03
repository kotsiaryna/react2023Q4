import { Link, Outlet } from 'react-router-dom';
import './navbar.scss';

const Navbar = () => {
  return (
    <main>
      <h1>{'Hello forms ;-)'}</h1>
      <nav>
        <Link to="uncontrolled"> Form without control</Link>
        <Link to="controlled"> Form with control</Link>
      </nav>
      <section className="outlet">
        <Outlet />
      </section>
    </main>
  );
};

export default Navbar;
