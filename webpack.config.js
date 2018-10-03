const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'components/getUsers.js'),
    path.resolve(__dirname, 'components/SearchPrincipal.js'),
    path.resolve(__dirname, 'components/SearchProfile.js')
  ],
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        loader: "babel-loader",
        include: [ path.resolve(__dirname, "components") ], 
        exclude: [ path.resolve(__dirname, 'node_modules') ]
      }
    ]
  }
}