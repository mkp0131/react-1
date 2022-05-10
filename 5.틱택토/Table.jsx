import React from 'react';
import Tr from './Tr';

const Table = ({ tableData, msg, dispatch }) => {
  return (
    <table>
      <tbody>
      {
        tableData.map((tr, i) => <Tr key={i} trData={tableData[i]} rowIndex={i} dispatch={dispatch} />)
      }
      </tbody>
    </table>
  );
}

export default Table;
