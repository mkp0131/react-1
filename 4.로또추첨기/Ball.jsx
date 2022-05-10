import React from 'react';

const Ball = ({num}) => {
  return (
    <div>
      <li>{num}</li>
    </div>
  );
}

export default React.memo(Ball);
