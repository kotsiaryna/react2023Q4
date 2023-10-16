import { ReactNode } from 'react';
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
  return (
    <>
      <div className="results__details">
        ShipDetails
        <div>{showData()}</div>
      </div>
    </>
  );
}

export default ShipDetails;
