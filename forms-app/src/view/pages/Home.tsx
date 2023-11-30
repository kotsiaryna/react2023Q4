// import { useSelector } from 'react-redux';

import { useSelector } from 'react-redux';
import { StateType } from '../../types';
import Card from '../components/Card';

const Home = () => {
  const uncontrolledFormData = useSelector(
    (state: StateType) => state.uncontrolled
  );
  console.log(uncontrolledFormData);
  return (
    <div>
      <h2>Home Page</h2>
      <Card data={uncontrolledFormData} />
    </div>
  );
};

export default Home;
