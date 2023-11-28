import { Link, Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <h1>{'Hello forms ;-)'}</h1>
      <div>Home page</div>
      <nav>
        <Link to="/"> Back on main</Link>
        <Link to="uncontrolled"> Form without control</Link>
        <Link to="controlled"> Form with control</Link>
      </nav>
      <Outlet />
    </main>
  );
};

export default Home;
