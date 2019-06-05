const webpack = require('webpack');
const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';

const polyfills = [
  {
    from: resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
    to: 'vendor',
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/bundles/*.{js,map}`),
    to: 'vendor/bundles',
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
    to: 'vendor',
    flatten: true
  }
];

const plugins = [
  new CleanWebpackPlugin(['dist']),
  new webpack.ProgressPlugin(),
  new CopyWebpackPlugin([...polyfills], {
    ignore: ['.DS_Store']
  })
];

module.exports = {
  output: {
    filename: '[name].js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
          ],
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                targets: '>1%, not dead, not ie 11'
              },
              '@babel/typescript'
            ]
          ]
        }
      }
    ]
  },
  plugins
}


