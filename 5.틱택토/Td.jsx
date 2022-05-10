import React, { useCallback } from 'react';
import { CLICK_TD, TOGGLE_TURN } from './Ttt';

const Td = ({ tdData, rowIndex, colIndex, dispatch }) => {
  const onClick = useCallback((e) => {
    e.preventDefault();
    if(tdData) return;
    dispatch({type: CLICK_TD, rowIndex, colIndex});
  }, [tdData]);
  
  return (
    <td onClick={onClick}>{tdData}</td>
  );
}

export default React.memo(Td);
