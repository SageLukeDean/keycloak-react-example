const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// global variables.  Define with DefinePlugin
const __API_PATH__ = process.env.API_PATH || 'http://localhost:3000/'; // eslint-disable-line no-underscore-dqngle

module.exports = {
  entry: './src/components/app',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '', // change this depending on how/where we deploy
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // historyApiFallback: true, // sends everything to index.html, no 404s
  },
  optimization: {
    namedModules: true, // This lets us use module.id in our logger even in production mode
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 100000,
    },
  },
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: /node_modules/,
    // poll: true,
  },
  plugins: [
    new DefinePlugin({ __API_PATH__: JSON.stringify(__API_PATH__) }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({ template: './src/indexTemplate.html' }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js[x]*$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            // cache: true,
            emitError: true,
            emitWarning: true,
            quiet: true,
          },
        },
      },
      {
        test: /\.js[x]*$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
        },
      },
    ],
  },
};
