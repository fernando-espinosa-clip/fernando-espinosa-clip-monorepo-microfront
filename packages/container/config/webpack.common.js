const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    /* new CopyPlugin({
      patterns: [
        {
          from: 'public/images',
          to: './images',
        },
        {
          from: 'public/css',
          to: './css',
        },
        {
          from: 'public/',
        },
      ],
    }), */
  ],
};
