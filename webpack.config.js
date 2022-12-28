const path = require('path');
const HWP = require('html-webpack-plugin');

const webpackConfig = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: './assets/[name].js',
    path: path.resolve(__dirname, './dist')
   },
  devServer:{
    host:'localhost',
   	disableHostCheck: true,
    port: 3000,
  },
  devtool: 'inline-source-map',
  plugins:[
    new HWP({
    	title:'Christmas Tree',
    	template:'./src/html/index.html',
    })
  ],
  node: {
    fs: 'empty'
  },
  optimization: {
    splitChunks:{
      cacheGroups:{
        vendors: {
          chunks: 'all',
          test: /node_modules/,
          priority: 10,
          name: 'chunk-vendors',
        }      
      }
    }
  },
  module: {
    rules: [
      {
        test:/\.(ttf|woff|woff2|eot|svg|gltf|glb|fbx|hdr|bin|frag|vert|wasm)$/,
        use:{
          loader: 'file-loader',
          options: {
            name: './assets/[name].[ext]',
          }
        }
      },
      {
        test:/\.(png|gif|jpg|jpeg)$/,
        use:{
          loader: 'file-loader',
          options: {
            name: './assets/textures/[name].[ext]',
          }
        }
      }                                                           
    ],
  }
};

module.exports = webpackConfig;