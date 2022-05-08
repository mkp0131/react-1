const React = require('react');

const getRandomNum = () => {
  return Math.ceil(Math.random() * 9);
};

class GuGuDan extends React.Component {
  // constructor 없이 state 세팅
  state = {
    num1: getRandomNum(),
    num2: getRandomNum(),
    reply: '',
  };

  onChange(event) {
    event.preventDefault();
    const value = event.target.value;
    this.setState({ reply: value });
  }

  myRef;

  onSubmit(event) {
    event.preventDefault();
    if (this.state.num1 * this.state.num2 === Number(this.state.reply)) {
      alert('정답입니다.');
      this.setState({
        num1: getRandomNum(),
        num2: getRandomNum(),
        reply: '',
      });
    } else {
      alert('오답입니다.');
    }
    this.myRef.focus();
  }

  // onclick 으로 state 변경
  render() {
    return (
      <>
        <div className="line">
          <div>{`${this.state.num1} X ${this.state.num2} = `}</div>
          <div>
            <form onSubmit={this.onSubmit.bind(this)}>
              <input
                type="number"
                value={this.state.reply}
                onChange={this.onChange.bind(this)}
                ref={(c) => (this.myRef = c)}
              />
              <button type="submit">확인</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

module.exports = GuGuDan;
