const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
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
        // Now we apply rule for images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
               {
                 // Using file-loader for these files
                 loader: "file-loader",
  
                 // In options we can set different things like format
                 // and directory to save
                 options: {
                   outputPath: 'images'
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
    new ExtractTextPlugin('style.css')
  ]
};