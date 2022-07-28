const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  // client => 내가 코딩할 폴더, webpack이 실행되기 전 파일들이 담긴 폴더
  entry: {
    main: "./src/client/js/main.js",
    videoPlayer: "./src/client/js/videoPlayer.js",
    recorder: "./src/client/js/recorder.js",
  },
  mode: "development",
  watch: true,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  // assets => 브라우저가 접근해서 볼 폴더, webpack이 실행된 후 파일들이 담길 폴더
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        // webpack에서는 역순으로 loader 실행
        // 2.1 sass-loader가 scss확장자 파일을 브라우저가 이해할 수 있는 css 파일로 변환시킨다
        // 2.2 css-loader가 @import, url()등의 최신형 css 코드를 브라우저가 이해할 수 있는 코드로 변환시켜 동작할 수 있도록 한다
        // 2.3 style-loader가 위 과정으로 변환시킨 css 코드를 DOM 내부에 적용시켜준다 -> MiniCssExtractPlugin-loader가 대체
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
