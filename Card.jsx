import React from 'react';

function Card({ data }) {
  if (!data || !data.sprites) {
    return (
      <div className="card">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>{data.name}</h3>
      <img src={data.sprites.front_default} alt={data.name} />
      <p>Type: {data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
      <p>Height: {data.height}</p>
      <p>Weight: {data.weight}</p>
    </div>
  );
}

export default Card;
