const { ProvidePlugin } = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExamplePlugin = require("./plugins/examplePlugin");

module.exports = {
  context: path.join(__dirname, "../src/"),
  target: "web",
  entry: {
    app: ["./index.js"]
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(eot|otf|jpg|png|svg|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[hash].[ext]"
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development"
            }
          }, // instead of style-loader
          "css-loader"
        ]
      }
    ]
  },
  externals: {
    jquery: "jQuery"
  },
  resolve: {
    extensions: [".js"],
    alias: {
      slider: path.resolve(__dirname, "../src/slider.js")
    },
    modules: [path.resolve(__dirname, "../node_modules")]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new ProvidePlugin({
      // _clone: ["lodash", "clone"]
    }),
    new ExamplePlugin()
  ],
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: process.env.ASSET_PATH || "/",
    filename: "static/js/bundle.[name].[hash].js",
    chunkFilename: "static/js/chunk.[name].[chunkhash].js"
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    },

    runtimeChunk: true
  }
};
