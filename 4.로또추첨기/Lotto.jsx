import React, { useState, useCallback, useRef, useEffect } from 'react';
import Ball from './Ball';

const Lotto = () => {
  const [lotto, setLotto] = useState([]);
  const [init, setInit] = useState(0);
  const timers = useRef([]);
  const chooseNums = useRef([]);

  useEffect(() => {
    const nums = [...Array(45).keys()];
    while (nums.length > 38) {
      const random = Math.ceil(Math.random() * nums.length);
      chooseNums.current.push(...nums.splice(random, 1));
    }
    return () => {
      chooseNums.current = [];
    } 
  }, [init]);

  const onClick = useCallback(() => {
    setInit(prev => prev + 1);
    if(timers.current.length) {
      timers.current.map(timer => {
        clearTimeout(timer);
      })
      timers.current = [];
      setLotto([]);
    }
    
    chooseNums.current.map((num, i) => {
      const timer = setTimeout(() => {
        setLotto(prev => [...prev, num]);
      }, 1000 * i);
      timers.current.push(timer);
    })
  });


  return (
    <div>
      <h1>로또</h1>
      <button onClick={onClick}>로또추첨하기 {init}</button>
      <ul className='lotto-list'>
        {
          lotto.map(num => <Ball key={num} num={num}/>)
        }
      </ul>
    </div>
  );
}

export default Lotto;
