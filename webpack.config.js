const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './slides-website/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/intuition-visualisation/', // Ensure this matches your repo name
    clean: true,
  },
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './slides-website/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'slides-website/slideSets.json', to: 'slideSets.json' },
        { from: 'slides', to: 'slides' }, // Copy the slides directory
        { from: 'slides-website/favicon.png', to: 'favicon.png' } // Copy the favicon
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'dist'),
      },
      {
        directory: path.join(__dirname, 'slides'),
        publicPath: '/slides',
      },
    ],
    port: 3000,
    open: true,
  },
};
