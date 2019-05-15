var webpack = require("webpack");
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
	mode:'production',
  output: {
    path: __dirname + "/public",
    filename: "assistant.min.js"
  },
  entry:'./public/assistant.js',
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  }
};