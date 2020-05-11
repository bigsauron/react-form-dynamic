const path = require('path');
const pkg = require('./package.json');
const libraryName = pkg.name;

module.exports = {
  entry: {
    main: './src/index.jsx'
  },
  mode: 'production',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
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
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    }
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};
