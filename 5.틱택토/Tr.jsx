import React from 'react';
import Td from './Td';

const Tr = ({ trData, rowIndex, dispatch }) => {
  return (
    <tr>
      {
        trData.map((td, i) => <Td key={i} tdData={td} rowIndex={rowIndex} colIndex={i} dispatch={dispatch}/>)
      }
    </tr>
  );
}

export default Tr;
