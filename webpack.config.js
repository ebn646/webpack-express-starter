"use strict";

let path = require("path"),
    webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    SpritesmithPlugin = require('webpack-spritesmith'),
    hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

let plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: "common",
    minChunks: 3,
    filename: "common.js",
    chunks: ["home", "about", "contact"],
  }),
  new ExtractTextPlugin("[name].css"),
  new webpack.ProvidePlugin({
    $: path.join(__dirname, "node_modules", "jquery/dist/jquery"),
    jQuery: path.join(__dirname, "node_modules", "jquery/dist/jquery")
  }),
  new SpritesmithPlugin({
    src: {
      cwd: path.resolve(__dirname, 'ui/src'),
      glob: '**/ico/*.png'
    },
    target: {
      image: path.resolve(__dirname, './ui/src/spritesmith-generated/sprite.png'),
      css: [
        path.resolve(__dirname, './ui/src/spritesmith-generated/sprite.styl'),
        path.resolve(__dirname, './ui/src/spritesmith-generated/sprite.css')
          ]
    },
    apiOptions: {
      cssImageRef: "~sprite.png"
    }
  }),
  new webpack.HotModuleReplacementPlugin(),
];

module.exports = {
  context: path.join(__dirname, "ui"),
  entry: {
    common: ["jquery", "bootstrap"],
    home: ["./js/home/index.js",hotMiddlewareScript],
    about: ["./js/about/index.js",hotMiddlewareScript],
    contact: ["./js/contact/index.js",hotMiddlewareScript]
  },
  output: {
    path: path.join(__dirname, "public"),
    publicPath: './public',
    filename: "[name].js",
    chunkFilename: "[name]_[chunkhash].js"
  },
  resove: {
    root: path.join(__dirname, "ui"),
    modulesDirectories: ["node_modules", "spritesmith-generated","web-modules"]
  },
  module: {
    noParse: ["jquery", "underscore"].map(function(name) {
      return path.join(__dirname, "node_modules", name);
    }),
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel"
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("style", 
        "css" + // !autoprefixer-loader?browsers=last 3 version
        "!sass?" +
        "includePaths[]=" + path.resolve(__dirname, "./node_modules"))
    }, { 
      test: /\.otf$|\.eot$|\.svg$|\.woff2?$|\.ttf$/,
      loader: "file?name=[path][name].[ext]" 
    },{test: /\.styl$/, loaders: [
      'style',
      'css',
      'stylus'
    ]},
      {test: /\.png$/, loaders: [
        'file?name=i/[hash].[ext]'
      ]}]
  },
  plugins: plugins
};
