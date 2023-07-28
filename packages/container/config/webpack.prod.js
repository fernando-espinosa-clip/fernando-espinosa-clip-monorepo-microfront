const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@https://main.d1q1nicd5914fm.amplifyapp.com/remoteEntry.js`,
        auth: 'auth@https://main.d1fpni6b6tpdg2.amplifyapp.com/remoteEntry.js',
        // dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
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
