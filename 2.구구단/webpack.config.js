const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 핫리로딩 실패!

module.exports = {
  devtool: 'eval', // 소스맵 (eval: 미생성, source-map: 소스맵[기존의 코드를 볼수있다])
  resolve: {
    extensions: ['.js', '.jsx'],
  }, // 하나로 합칠 파일들의 확장자명 entry.app 에 확장자를 쓰기 힘들때 사용

  // ## 중요사항 START
  // 1. entry 에 있는 파일을 읽고
  // 2. module 을 적용한후
  // 3. output 으로 내보낸다.
  entry: {
    app: './client',
  }, // 입력
  module: {
    rules: [
      {
        test: /\.jsx?/, // 적용할 파일 확장자
        loader: 'babel-loader', // 어떤 것으로 합칠것인지
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['react-refresh/babel'], // 😈 리액트리플래쉬 추가
        }, // 어떤 설정으로 합칠것인지
      },
    ],
  }, // 모듈 적용(규칙 어떤파일을 어떻게 합칠것인지)
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }), // 예시) 모든 로더에 속성을 추가해준다.
    new ReactRefreshWebpackPlugin(), // 😈 리액트리플레시 추가
  ], // 확장프로그램
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  }, // 출력
  devServer: {
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  }, // 😈 개발 서버 세팅
  // ## 중요사항 END
};
