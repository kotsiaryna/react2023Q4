import { useSelector } from 'react-redux';
import { StateType } from '../../types';
import Card from '../components/Card';
import './home.scss';

const Home = () => {
  const formsData = useSelector((state: StateType) => state.form);

  return (
    <>
      <h2>Home Page</h2>
      <div className="cards-wrapper">
        {formsData.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
    </>
  );
};

export default Home;
