import React from 'react';
import ReactDOM from 'react-dom/client';
import Check from './Check';


let root = ReactDOM.createRoot(document.getElementById('root'));

// 생성한 React Element 를 #root 에 붙여넣기
root.render(
  <React.StrictMode>
    <Check />
  </React.StrictMode>
);