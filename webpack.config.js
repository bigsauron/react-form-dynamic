const path = require('path');
module.exports = {
  entry: {
    main: './src/index.jsx'
  },
  mode: 'production',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|bower_components|build)/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          failOnError: true,
          failOnWarning: false
        }
      },
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|bower_components|build)/,
        loader: 'babel-loader',
      },
    ]
  },
  externals: {
    'react': 'commonjs react',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};
