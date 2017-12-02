const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ['./frontend/agave.jsx', './scss/main.scss'],
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*'],
    alias: {
      components: path.resolve(__dirname, 'frontend/components'),
      scss: path.resolve(__dirname, 'scss/'),
      reducers: path.resolve(__dirname, 'frontend/reducers'),
      actions: path.resolve(__dirname, 'frontend/actions'),
    },
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react'],
          plugins: ['transform-object-rest-spread', 'transform-class-properties'],
        },
      }, {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'frontend'), path.resolve(__dirname, 'scss'),
        ],
        loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: true,
    }),
    new ExtractTextPlugin('main.css', {
      allChunks: true,
    }),
  ],
};
