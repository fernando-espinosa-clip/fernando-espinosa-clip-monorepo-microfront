const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const sharedFunctions = require('./shared.functions');
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
        cpanel: 'cpanel@https://dashboard.d1kd9pclj6eku6.amplifyapp.com/remoteEntry.js',
        // dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
      },
      shared: sharedFunctions.sharedModules(),
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
