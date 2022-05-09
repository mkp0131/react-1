import React, { useState, useEffect, useCallback, useRef, useReducer } from 'react';
import Table from './Table';

// useReducer 초기값 설정
const initState = {
  tableData: [
    ['','',''],
    ['','',''],
    ['','',''],
  ],
  turn: 'O'
}

export const CLICK_TD = 'CLICK_TD';
export const SET_TURN = 'SET_TURN';

const reducer = (state, action) => {
  switch (action.type) {
    case CLICK_TD: {
      const {rowIndex, colIndex} = action;
      const tableData = [ ...state.tableData ];
      const trData = tableData[rowIndex];
      trData[colIndex] = state.turn;

      return {
        ...state,
        ...tableData,
      }
    }
    case SET_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      }
    }
  
    default:
      return state;
  }
}

const Ttt = () => {
  // useReducer 사용
  const [state, dispatch] = useReducer(reducer, initState);
  const { tableData } = state;

  useEffect(() => {
    
  }, [tableData])

  return (
    <>
      <h1>틱택토</h1>
      <Table tableData={tableData} dispatch={dispatch} />
    </>
  )
}

export default Ttt;