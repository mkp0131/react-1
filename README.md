# 웹 게임을 만들며 배우는 React

## 리액트 프로젝트가 아닌 프로젝트에 리액트 사용

1. 리액트 스크립트 붙여넣기

```html
<script
  crossorigin
  src="https://unpkg.com/react@17/umd/react.development.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"
></script>
```

> react-dom.development.js -> 배포모드: react-dom.product.js

2. 기본 클래스 컴포넌트

```html
<div id="root"></div>
<script>
  // 리액트 엘리먼트 생성
  const e = React.createElement;

  // <button onclick="() => { console.log(1) }">Like</button> 를 생성
  class LikeBtn extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return e(
        'button',
        {
          onClick: () => console.log(1),
        },
        'Like'
      );
    }
  }
</script>

<script>
  // 생성한 React Element 를 #root 에 붙여넣기
  ReactDOM.render(e(LikeBtn), document.getElementById('root'));
</script>
```

3. state (변경되는 값)

```js
class LikeBtn extends React.Component {
  constructor(props) {
    super(props);
    // state 세팅
    this.state = {
      liked: false,
      user: 'mkp',
    };
  }

  // onclick 으로 state 변경
  render() {
    return e(
      'button',
      {
        onClick: () => this.setState((prev) => ({ liked: !prev.liked })),
      },
      'Like: ' + this.state.liked + ' / ' + this.state.user
    );
  }
}
```

> setState(prev 값 사용시): 객체를 리턴하면 달라진 값만 알아서 적용해준다.(기존값은 변경안됨! 개쩜!)

4. JSX: React.createElement로 엘리먼트를 생성하는 것이 가독성이 너무 안좋아 JSX 가 나왔다.

- jsx 는 바벨을 꼭 사용해 주어야한다.

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

- type="text/babel" 을 꼭 포함해준다.

```html
<script type="text/babel">
  // <button onclick="() => { console.log(1) }">Like</button> 를 생성
  class LikeBtn extends React.Component {
    constructor(props) {
      super(props);
      // state 세팅
      this.state = {
        liked: false,
        user: 'mkp',
      };
    }

    // onclick 으로 state 변경
    render() {
      return (
        <button
          onClick={() => this.setState((prev) => ({ liked: !prev.liked }))}
        >
          {'Like: ' + this.state.liked + ' / ' + this.state.user}
        </button>
      );
    }
  }
</script>

<script type="text/babel">
  // 생성한 React Element 를 #root 에 붙여넣기
  ReactDOM.render(<LikeBtn />, document.getElementById('root'));
</script>
```

5. 원하는 갯수만큼 컴포넌트를 늘릴수있다.(안에 있는 state 도 각각 관리된다.)

```js
// 생성한 React Element 를 #root 에 붙여넣기
ReactDOM.render(
  <>
    <LikeBtn />
    <LikeBtn />
    <LikeBtn />
  </>,
  document.getElementById('root')
);
```

## 리액트 class component

```js
<script type="text/babel">
  const getRandomNum = () => {
    return Math.ceil(Math.random() * 9);
  }

  class GuGuDan extends React.Component {

    // constructor 없이 state 세팅
    state = {
      num1: getRandomNum(),
      num2: getRandomNum(),
      reply: '',
    }


    onChange(event) {
      event.preventDefault();
      const value = event.target.value;
      this.setState({reply: value});
    }

    onSubmit(event) {
      event.preventDefault();
      if(this.state.num1 * this.state.num2 === Number(this.state.reply) ) {
        alert('정답입니다.');
        this.setState({
          num1: getRandomNum(),
          num2: getRandomNum(),
          reply: '',
        })
      }
      else {
        alert('오답입니다.');
      }
    }

    // onclick 으로 state 변경
    render() {
      return <>
        <div className="line">
          <div>{`${this.state.num1} X ${this.state.num2} = `}</div>
          <div>
            <form onSubmit={this.onSubmit.bind(this)}>
              <input type="number" value={this.state.reply} onChange={this.onChange.bind(this)} />
              <button type="submit">확인</button>
            </form>
          </div>
        </div>
      </>;
    }
  }
</script>
```

- 🧤 화살표 함수를 사용하지 않을 경우, 함수 호출하는 곳에서 bind(this) 를 꼭 해준다.

```js
onChange(event) {
  event.preventDefault();
  const value = event.target.value;
  this.setState({reply: value});
}

<input type="number" value={this.state.reply} onChange={this.onChange.bind(this)} />
```

- bind 해주기 불편하니 화살표함수로 쓰자!

```js
onChange = (event) => {
  event.preventDefault();
  const value = event.target.value;
  this.setState({ reply: value });
};

<input type="number" value={this.state.reply} onChange={this.onChange} />;
```

## Webpack

```
npm i webpack
npm i webpack-cli
```

```
npm i babel/core babel/preset-env bable-loader
```

### Webpack 리액트 기본설정 / 데브서버, 핫 리로딩

- 리로딩: 새로고침한다.
- 핫리로딩: 변경점만 새로고침한다.

### hook 에서 변수 사용

- useRef 를 이용한다.
- useRef 의 값이 변경되더라도 리랜더링 되지 않는다!
- 사용할때는 .current 로 접근

```js
const Check = () => {
  const [status, setStatus] = useState('Wait');
  const [result, setResult] = useState([]);

  const timer = useRef(null);
  const start = useRef(0);

  const checkInit = useCallback(() => {
    timer.current = setTimeout(() => {
      // .current 사용
      setStatus('Check');
      start = Date.now();
    }, 3000);
  });
  // ...some code
};
```

### 리액트 event 파라미터 함수에 넘기는 법

- 첫번째 JSX 의 onClick 함수를 함수를 리턴하는 함수로 만든다.

```js
const onClick = (say) => (e) => {
  e.preventDefault();
}

<button onClick={onClick('Hello')}>
```

- 두번째 JSX 의 onClick 함수를 함수로 감싸서 실행한다.

```js
<button onClick={(e) => onClick(e, 'Hello')}>
```

### Hook 에서 componentDidUpdate 만 사용하는 방법

- componentDidUpdate

```js
const mounted = useRef(false);
useEffect(() => {
  if(!mounted.current) {
    mounted.current = true;
  }
  else {
    // ajax
  }
}, [변경되는 값])
```

- componentDidMount

```js
useEffect(() => {}, []);
```

### css 텍스트 선택 막기

```css
-webkit-touch-callout: none; /* iOS Safari */
-webkit-user-select: none; /* Safari */
-ms-user-select: none; /* 인터넷익스플로러 */
user-select: none;
```

### useReducer

- Redux 와 사용방법이 똑같다.
- 컴포넌트 안에 useReducer() 를 사용하여 reducer 를 생성

```js
const Ttt = () => {
  // useReducer 사용
  const [state, dispatch] = useReducer(reducer, initState);
  const { tableData } = state;

  useEffect(() => {}, [tableData]);

  return (
    <>
      <h1>틱택토</h1>
      <Table tableData={tableData} dispatch={dispatch} />
    </>
  );
};
```

- reducer() 와 initSate를 선언해준다.

```js
// useReducer 초기값 설정
const initState = {
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  turn: 'O',
};

export const CLICK_TD = 'CLICK_TD';
export const SET_TURN = 'SET_TURN';

const reducer = (state, action) => {
  switch (action.type) {
    case CLICK_TD: {
      const { rowIndex, colIndex } = action;
      const tableData = [...state.tableData];
      const trData = tableData[rowIndex];
      trData[colIndex] = state.turn;

      return {
        ...state,
        ...tableData,
      };
    }
    case SET_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }

    default:
      return state;
  }
};
```

- 사용법

```js
const Td = ({ tdData, rowIndex, colIndex, dispatch }) => {
  const onClick = useCallback((e) => {
    e.preventDefault();
    if(tdData) return;
    dispatch({type: CLICK_TD, rowIndex, colIndex});
    dispatch({type: SET_TURN});
```
