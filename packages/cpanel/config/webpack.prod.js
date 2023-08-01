const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sharedFunctions = require("./shared.functions");

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: 'auto',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'cpanel',
      filename: 'remoteEntry.js',
      exposes: {
        './CpanelApp': './src/bootstrap',
      },
      shared: sharedFunctions.sharedModules(),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new Dotenv({
      systemvars: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: './',
        },
      ],
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);