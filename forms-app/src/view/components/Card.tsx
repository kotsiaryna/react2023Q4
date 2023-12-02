import { FormsState } from '../../types';
import './card.scss';

type Props = {
  data: FormsState;
};

const Card = (props: Props) => {
  const { data } = props;
  if (!data.name) return;
  return (
    <div className="card">
      {Object.entries(data).map(([key, value], index) => {
        if (key === 'file') {
          return <img key={index} src={`${value}`} width={300} alt="Preview" />;
        } else {
          return <p key={index}>{`${key} : ${value}`}</p>;
        }
      })}
    </div>
  );
};

export default Card;
