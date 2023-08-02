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
    contentBase: './public',
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@https://main.d1q1nicd5914fm.amplifyapp.com/remoteEntry.js`,
        auth: 'auth@http://localhost:8082/remoteEntry.js',
        cpanel: 'cpanel@http://localhost:8084/remoteEntry.js',
        // dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',
      },
      shared: sharedFunctions.sharedModules(),
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
