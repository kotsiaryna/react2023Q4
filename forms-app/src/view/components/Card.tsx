import { UncontrolledFormState } from '../../types';

type Props = {
  // props: {
  data: UncontrolledFormState;
  // };
};

const Card = (props: Props) => {
  const { data } = props;
  if (!data.name) return;
  return (
    <div>
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
