import { useSelector } from 'react-redux';
import { StateType } from '../../types';
import Card from '../components/Card';
import './home.scss';

const Home = () => {
  const uncontrolledFormData = useSelector(
    (state: StateType) => state.uncontrolled
  );
  console.log(uncontrolledFormData);
  return (
    <>
      <h2>Home Page</h2>
      <div className="cards-wrapper">
        <Card data={uncontrolledFormData} />
      </div>
    </>
  );
};

export default Home;
