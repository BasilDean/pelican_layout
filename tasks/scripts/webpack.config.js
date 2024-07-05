const path = require('path');

module.exports = {
  mode: 'development',  // Or 'production'
  entry: {
    jquery: '/dev/scripts/libraries/jquery.js',
    swiper: '/dev/scripts/libraries/swiper.js',
    // Add your other libraries here...
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
