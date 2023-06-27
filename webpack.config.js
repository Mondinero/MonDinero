const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  target: 'web',
  devtool: 'eval-source-map',
  mode: process.env.NODE_ENV,

  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    historyApiFallback: true,

    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },

    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/assets/**': {
        target: 'http://localhost:3000/',
        secure: false
      },
      '/server/**': {
        target: 'http://localhost:3000/',
        secure: false
      },
      '/**': {
        target: 'http://localhost:3000/',
        secure: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
<<<<<<< HEAD
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
=======
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
>>>>>>> 9f42742e0821f103166114744b462ae1e9f7b310
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
<<<<<<< HEAD
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
=======
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
>>>>>>> 9f42742e0821f103166114744b462ae1e9f7b310
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    })
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  resolve: {
<<<<<<< HEAD
    extensions: ['.js', '.jsx', '.json'],
  },
}
=======
    extensions: ['.js', '.jsx']
  }
};
>>>>>>> 9f42742e0821f103166114744b462ae1e9f7b310
