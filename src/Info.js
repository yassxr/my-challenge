import React from 'react';

const Info = ({ body }) => {
  return (
    <div>
      {body ? (
        <div>
          <h2>{body.name}</h2>
          <p>Gravity: {body.gravity}</p>
          {/* Add other body information as needed */}
        </div>
      ) : (
        <div>No body selected</div>
      )}
    </div>
  );
};

export default Info;
