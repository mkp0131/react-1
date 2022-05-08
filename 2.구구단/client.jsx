const React = require('react');
const ReactDOM = require('react-dom');

const GuGuDan = require('./GuGuDan');

// 생성한 React Element 를 #root 에 붙여넣기
ReactDOM.render(
  <>
    <GuGuDan />
  </>,
  document.getElementById('root')
);

