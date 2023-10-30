import { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

function ShipDetails() {
  const data = useLoaderData() as object;
  const showData = (): ReactNode => {
    return Object.entries(data).map(([key, value], i) => {
      return (
        <p key={i}>
          {key.toUpperCase()}: {value}
        </p>
      );
    });
  };
  const { page, search } = useParams();

  return (
    <>
      <div>{showData()}</div>
      <Link to={`/${search}/${page}`} className="results__closeBtn">
        X
      </Link>
    </>
  );
}

export default ShipDetails;
