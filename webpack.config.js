const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: '/big-trip/'
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ]
  }
};


