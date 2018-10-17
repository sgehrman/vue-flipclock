var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const {
  VueLoaderPlugin
} = require('vue-loader')
const merge = require('webpack-merge')

module.exports = {
  entry: './test.js',
  target: 'web',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [{
        enforce: 'pre',
        test: /.(vue|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "eslint-loader",
          options: {
            fix: true
          }
        }
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devtool: '#eval-source-map',
  mode: 'development'
};

const TARGET = process.env.npm_lifecycle_event

if (TARGET === 'dist') {
  module.exports = merge(module.exports, {
    entry: './index.js',
    target: 'web',
    output: {
      filename: 'build.js',
      library: 'flipclock',
      libraryTarget: 'umd',
      publicPath: '/'
    }
  })
}

if (process.env.NODE_ENV === 'production') {
  module.exports = merge(module.exports, {
    devtool: false,
    mode: 'production',

    plugins: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          output: {
            semicolons: false,
            comments: false
          }
        },
        sourceMap: false
      })
    ]
  })
}