const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const env = require("dotenv").config({
  path: path.resolve(__dirname, "../.env.production")
});

const envKeys = Object.keys(env.parsed).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env.parsed[next]);
  return prev;
}, {});

module.exports = {
  mode: "production",
  plugins: [
    new DefinePlugin(envKeys),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          title: "webpack training",
          template: path.resolve(__dirname, "../index.html")
        },
        {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        }
      )
    ),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  }
};
