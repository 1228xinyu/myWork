const htmlWbpackPlugin = require('html-webpack-plugin'),
  { join } = require('path')

module.exports = {
  entry: join(__dirname, '/src/js/index.js'),

  output: {
    path: join(__dirname, 'dist'),
    filename: 'bound.js',
  },

  plugins: [
    new htmlWbpackPlugin({
      template: join(__dirname, '/src/index.html'),
    }),
  ],

  mode: 'development',
}
