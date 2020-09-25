const { ProvidePlugin } = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompileDuration = require("./plugins/compileDuration");

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
          // "style-loader",
          {
            loader: MiniCssExtractPlugin.loader
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
      // slider: path.resolve(__dirname, "../src/slider.js")
      slider: "./slider.js"
    },
    modules: [path.resolve(__dirname, "../node_modules")]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new ProvidePlugin({
      // _clone: ["lodash", "clone"]
    }),
    new CompileDuration()
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
    // splitChunks: {
    //   chunks: 'async',
    //   minSize: 20000,
    //   minRemainingSize: 0,
    //   maxSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 30,
    //   maxInitialRequests: 30,
    //   automaticNameDelimiter: '~',
    //   enforceSizeThreshold: 50000,
    //   cacheGroups: {
    //     defaultVendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true
    //     }
    //   }
    // }

    // Seperate the runtime chunk code from bundle -- per entry point
    runtimeChunk: true
  }
};
