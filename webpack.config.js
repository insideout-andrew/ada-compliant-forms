const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV,
  watch: process.env.NODE_ENV == 'development',
  entry: {
    main: path.resolve(__dirname, 'js/main.js'),
    test: path.resolve(__dirname, 'js/test.js')
  },
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}