import React, { useCallback } from 'react';
import { CLICK_TD, SET_TURN } from './Ttt';

const Td = ({ tdData, rowIndex, colIndex, dispatch }) => {
  const onClick = useCallback((e) => {
    e.preventDefault();
    if(tdData) return;
    dispatch({type: CLICK_TD, rowIndex, colIndex});
    dispatch({type: SET_TURN});
  }, [tdData]);
  
  return (
    <td onClick={onClick}>{tdData}</td>
  );
}

export default Td;
