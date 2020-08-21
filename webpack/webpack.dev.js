const path = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const env = require("dotenv").config({
  path: path.resolve(__dirname, "../.env.development")
});

const envKeys = Object.keys(env.parsed).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env.parsed[next]);
  return prev;
}, {});

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    host: "localhost",
    clientLogLevel: "silent",
    compress: true,
    historyApiFallback: true,
    port: 8080,
    // contentBase: path.join(__dirname, "../dist"),
    hot: true,
    // noInfo: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    watchOptions: { ignored: /node_modules/ }
  },
  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          title: "webpack training",
          template: path.resolve(__dirname, "../index.html")
        }
      )
    ),
    new DefinePlugin(envKeys)
  ]
};
