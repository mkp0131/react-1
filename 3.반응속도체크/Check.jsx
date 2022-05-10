import React, { useState, useEffect, useCallback, useRef } from 'react';

const Check = () => {
  const [status, setStatus] = useState('Wait');
  const [result, setResult] = useState([]);

  const timer = useRef(null);
  const start = useRef(0);

  const checkInit = useCallback(() => {
    timer.current = setTimeout(() => {
      setStatus('Check');
      start.current = Date.now();
    }, 3000);
  })

  const onClick = useCallback(() => {
    if(status === 'Wait') {
      setStatus('Ready');
      checkInit();
    }
    else if(status === 'Ready') {
      setStatus('Warning');
      clearTimeout(timer.current);
    }
    else if(status === 'Warning') {
      setStatus('Ready');
      checkInit();
    }
    else if(status === 'Check') {
      setStatus('Wait');
      setResult((prev) => [Date.now() - start.current, ...prev]);
      clearTimeout(timer.current);
    }
  })

  return (
    <div>
      <div className={`click-box ${status}`} onClick={onClick}>
        {status}
      </div>
      <div>
        평균: {
          result.length &&
          result.reduce((a, b) => a + b, 0) / result.length
        }ms
      </div>
      <ul>
        {
          result.map((time, i) => {
            return <li key={i}>{time}ms</li>
          })
        }
      </ul>
    </div>
  );
}

export default Check;