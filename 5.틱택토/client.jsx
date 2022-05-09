import React from 'react';
import ReactDOM from 'react-dom/client';
import Ttt from './Ttt';


let root = ReactDOM.createRoot(document.getElementById('root'));

// 생성한 React Element 를 #root 에 붙여넣기
root.render(
  <React.StrictMode>
    <Ttt />
  </React.StrictMode>
);