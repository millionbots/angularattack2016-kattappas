var webpack = require('webpack');
module.exports = {
  entry: {
    vendor: ['expose?$!expose?jQuery!jquery', 'bootstrap'],
    polyfills: [
        'angular2/bundles/angular2-polyfills.js',
        'es6-shim/es6-shim.js'
    ],
    app: ['./app/app.ts']
  },
  output: {
    path: __dirname,
    filename: "[name].js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts"
      },
      {
        test: /\.html$/,
        loader: "html"
      },
       {
        test: /\.scss$/,
        loaders: ["css", "sass"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ["file"]
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".ts"]
  }
}