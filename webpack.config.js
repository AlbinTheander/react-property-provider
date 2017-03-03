module.exports = {
  context: __dirname + '/src',

  entry: './index',

  output: {
    library: 'PropertyProvider',
    libraryTarget: 'commonjs2',
    filename: 'property-provider.js',
    path: __dirname + '/dist'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    }
  }
};