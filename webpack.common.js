const path = require("path");
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

var config = {
  entry: {
    app: [
      "./src/stylesheets/app.scss", "./src/index.tsx"
    ]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "library-registry-admin.js",
    library: "LibraryRegistryAdmin",
    libraryTarget: "umd"
  },
  plugins: [
    new CleanWebpackPlugin(),
    // Extract separate css file.
    new MiniCssExtractPlugin({ filename: "library-registry-admin.css" }),
    // Set a local global variable in the app that will be used only
    // for testing AXE in development mode.
    new webpack.DefinePlugin({
      "process.env.TEST_AXE": JSON.stringify(process.env.TEST_AXE)
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: ["ts-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg).*$/,
        use: ["url-loader?limit=100000"]
      }
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
    fallback: {
      buffer: require.resolve("buffer"),
      stream: require.resolve("stream-browserify"),
      timers: require.resolve("timers-browserify"),
      url: require.resolve("url")
    }
  }
};

module.exports = config;
