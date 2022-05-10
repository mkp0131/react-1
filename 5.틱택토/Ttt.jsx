import React, { useState, useEffect, useCallback, useRef, useReducer } from 'react';
import Table from './Table';

// useReducer 초기값 설정
const initState = {
  tableData: [
    ['','',''],
    ['','',''],
    ['','',''],
  ],
  turn: '⭕',
  currentPosition: [-1, -1],
  msg: '',
}

export const CLICK_TD = 'CLICK_TD';
export const TOGGLE_TURN = 'TOGGLE_TURN';
export const SET_MSG = 'SET_MSG';
export const RESET = 'RESET';

const reducer = (state, action) => {
  switch (action.type) {
    case CLICK_TD: {
      const {rowIndex, colIndex} = action;
      const tableData = [ ...state.tableData ];
      const trData = tableData[rowIndex];
      trData[colIndex] = state.turn;

      return {
        ...state,
        tableData,
        currentPosition: [rowIndex, colIndex],
      }
    }

    case TOGGLE_TURN: {
      return {
        ...state,
        turn: state.turn === '⭕' ? '❌' : '⭕',
      }
    }

    case SET_MSG: {
      return {
        ...state,
        msg: action.msg,
      }
    }

    case RESET: {
      return {
        ...initState,
        tableData: [
          ['','',''],
          ['','',''],
          ['','',''],
        ],
      }
    }

    default:
      return state;
  }
}


const Ttt = () => {
  // useReducer 사용
  const [state, dispatch] = useReducer(reducer, initState);
  const { tableData, turn, msg } = state;


  const alertMsg = useCallback((mode) => {
    if(mode === 'win') {
      dispatch({type: SET_MSG, msg: turn + '이 이겼습니다.'});
      
    }
  }, [turn]);
  

  const onClick = useCallback(() => {
    dispatch({type: RESET})
  }, [])


  useEffect(() => {
    const [rowIndex, colIndex] = state.currentPosition;
    if(rowIndex < 0) return;

    console.log(tableData[rowIndex], turn);

    // 가로체크
    if(tableData[rowIndex][0] === turn && tableData[rowIndex][1] === turn && tableData[rowIndex][2] === turn) {
      alertMsg('win')
    }
    // 세로체크
    else if(tableData[0][colIndex] === turn && tableData[1][colIndex] === turn && tableData[2][colIndex] === turn) {
      alertMsg('win')
    }
    // 대각선체크1
    else if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      alertMsg('win')
    }
    // 대각선체크2
    else if(tableData[2][0] === turn && tableData[1][1] === turn && tableData[0][2] === turn) {
      alertMsg('win')
    }

    dispatch({type: TOGGLE_TURN});
  }, [state.tableData])

  return (
    <>
      <h1>틱택토</h1>
      <div className={msg && 'block-on-click'}>
        <Table tableData={tableData} dispatch={dispatch} />
      </div>
      <button onClick={onClick}>새로시작하기</button>
      <h3>{msg}</h3>
    </>
  )
}

export default Ttt;