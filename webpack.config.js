const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env;

let libraryName = 'react-parlx';

let outputFile, mode, devtool;

if (env === 'build') {
  mode = 'production';
  outputFile = libraryName + '.min.js';
  devtool = false;
} else {
  mode = 'development';
  outputFile = libraryName + '.js';
  devtool = 'source-map';
}

const config = {
  mode,
  entry: __dirname + '/src/index.js',
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'parlx.js': {
      root: 'Parlx',
      commonjs2: 'parlx.js',
      commonjs: 'parlx.js',
      amd: 'parlx.js'
    }
  },
  devtool,
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: 'ReactParlx',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  }
};

module.exports = config;
