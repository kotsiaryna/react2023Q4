import { FormsState } from '../../types';
import './card.scss';

type Props = {
  data: FormsState;
};

const Card = (props: Props) => {
  const { data } = props;
  if (!data.name) return;
  const { name, age, email, password, gender, file, country } = data;
  return (
    <div className="card">
      <img src={`${file}`} width={300} alt="Preview" />
      <ul>
        <li>{`Name: ${name}`}</li>
        <li>{`Age: ${age}`}</li>
        <li>{`Email: ${email}`}</li>
        <li>{`Password: ${password}`}</li>
        <li>{`Country: ${country}`}</li>
        <li>{`Gender: ${gender}`}</li>
        <li>T&C: accepted</li>
      </ul>
    </div>
  );
};

export default Card;
