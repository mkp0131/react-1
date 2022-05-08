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

### require, import 차이

-
