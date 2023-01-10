const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './CLIENT/src/index.js',
  output: {
    path: path.resolve(__dirname, 'CLIENT/dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'CLIENT/dist')
    },
    allowedHosts: ['.amazonaws.com'],
    compress: true,
    port: 3000
  }
}