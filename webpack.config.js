const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
    }
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
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('main.css', {
        allChunks: true
    })
  ]
};
