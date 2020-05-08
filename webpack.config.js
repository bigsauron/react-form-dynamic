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
    'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};
