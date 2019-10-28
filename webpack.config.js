const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

let getEnvironment = environment => {
  let env = dotenv.config({ path: `./.env.${environment}` }).parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  return envKeys;
};


let basicObject = {
  optimization : {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  // LOADERS
  devServer: {
    hot: true
  },
  // LOADERS
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', require.resolve('babel-preset-react-app')]
          }
        },
        {
          loader: 'eslint-loader',
          options: {
            fix: true,
            emitWarning: true,
          }
        }
        ],
      },
    ],
  },

  // PATH RESOLVE
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
    }
  },
};

let getFunction = (parameter) => {
  let entry = './src/App.jsx';
  let pathOut = '';
  let filename= 'index.bundle.js';
  let plugins = [
    new webpack.DefinePlugin(getEnvironment(parameter)),
    new LoadablePlugin(),
  ];
  if (parameter !== 'production') {
    entry = [
      'webpack-hot-middleware/client?reload=true',
      'react-hot-loader/patch',
      entry
    ];
    plugins = [
      ...plugins,
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname + '/pages/index.html'),
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ];
    pathOut = '/dist/';
  }
  else {
    filename = '[name].bundle.js';
  }
  return {
    ...basicObject,
    entry: entry,
    plugins: plugins,
    mode: process.env.NODE_ENV,
    output: {
      path: __dirname + '/bundle/',
      filename: filename,
      chunkFilename: '[name].bundle.js',
      publicPath: pathOut
    },
  };
};

module.exports = (env) => {
  let returnValue = {};
  if (env && env.NODE_ENV) returnValue = getFunction(env.NODE_ENV);
  else console.log("Please, set env.NODE_ENV");
  return returnValue
};
