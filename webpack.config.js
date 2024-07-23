const path = require('path');
const webpack = require('webpack');

const config = (env, argv) => {
  console.log('argv.mode:', argv.mode);

  const backend_url =
    argv.mode === 'development' ? 'http://localhost:3001/api' : '/api';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
    },
    devServer: {
      static: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url),
        MOOD_LIST: JSON.stringify([
          { mood: 'motivated', emoji: '💪' },
          { mood: 'joyful', emoji: '😄' },
          { mood: 'grateful', emoji: '🙏' },
          { mood: 'peaceful', emoji: '😌' },
          { mood: 'hopeful', emoji: '🌟' },
          { mood: 'inspired', emoji: '🌼' },
          { mood: 'content', emoji: '😊' },
          { mood: 'optimistic', emoji: '😃' },
          { mood: 'energetic', emoji: '🚀' },
          { mood: 'blessed', emoji: '🙌' },
        ]),
      }),
    ],
  };
};

module.exports = config;
