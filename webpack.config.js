const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.html$/,
        use: [
          {
          loader: "html-loader"
          // loader: "raw-loader"
        }
      ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
          use: [
                 {
                   loader: "file-loader",
                   options: {
                     name: 'images/[name].[ext]',
                   }
                 }
               ]
        },
        {
          // Apply rule for fonts files
          test: /\.(woff|woff2|ttf|otf|eot)$/,
          use: [
                 {
                   // Using file-loader too
                   loader: "file-loader",
                   options: {
                     outputPath: 'fonts'
                   }
                 }
               ]
        }
      ]
      },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      template: "[name].css",
      chunFilename: "[id].css"
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};