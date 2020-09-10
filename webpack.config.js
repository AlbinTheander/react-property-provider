const path = require('path');

module.exports = {
  mode: 'production',

  context: path.resolve(__dirname, 'src'),
  entry: './index.js',

  output: {
    library: 'PropertyProvider',
    libraryTarget: 'commonjs2',
    filename: 'property-provider.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
  },
};
