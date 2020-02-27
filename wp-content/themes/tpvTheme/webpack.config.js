const path = require("path");

// include the js minification plugin
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const webpack = require('webpack');

// include the css extraction and minification plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: ["./Javascript/src/app.js", "./Stylesheets/src/main.scss"],
  mode: 'development',
  output: {
    filename: "./Javascript/build/app.min.[hash].js",
    path: path.resolve(__dirname)
  },
  resolve: {
    alias: {
      // bind version of jquery-easing
      "jquery-easing": "jquery-easing/dist/jquery.easing.1.3.umd.min.js",
      "jquery-scrollspy": "jquery-scrollspy/dist/jquery-scrollspy.min.js",
      // bind to modules;
      modules: path.join(__dirname, "node_modules")
    }
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      // perform js babelization on all .js files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"]
          }
        }
      },
      // compile all .scss files to plain old css
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 2,
                    sourceMap: true
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: () => [
                    require('autoprefixer')
                    ],
                    sourceMap: true
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true,
                    outputStyle: 'compressed'
                  }
                }
                ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',
            },
          },
          'css-loader',
        ],
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // extract css into dedicated file
    new MiniCssExtractPlugin({
      filename: "./Stylesheets/build/main.min.[hash].css"
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "./Javascript/build/*",
        "./Stylesheets/build/*"
      ]
    }),
    new LiveReloadPlugin({
      appendScriptTag: false
    })
  ],
  optimization: {
    minimizer: [
      // enable the js minification plugin
      new UglifyJSPlugin({
        cache: true,
        parallel: true
      }),
      // enable the css minification plugin
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
