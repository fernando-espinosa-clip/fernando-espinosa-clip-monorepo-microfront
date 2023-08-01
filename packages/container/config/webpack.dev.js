const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const sharedFunctions = require("./shared.functions");

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@https://main.d1q1nicd5914fm.amplifyapp.com/remoteEntry.js`,
        auth: 'auth@https://main.d1fpni6b6tpdg2.amplifyapp.com/remoteEntry.js',
        cpanel: 'cpanel@https://dashboard.d1kd9pclj6eku6.amplifyapp.com/remoteEntry.js',
        // dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',
      },
      shared: sharedFunctions.sharedModules(),
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
