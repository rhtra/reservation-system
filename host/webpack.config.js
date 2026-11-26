const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;
module.exports = {
  entry: './src/index.tsx',
  output: { publicPath: 'auto', clean: true },
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },
  devServer: { port: 3000, historyApiFallback: true, headers: { 'Access-Control-Allow-Origin': '*' } },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  plugins: [new ModuleFederationPlugin({
    name: 'host',
    remotes: {
      booking: 'booking@http://localhost:3001/remoteEntry.js',
      courts: 'courts@http://localhost:3002/remoteEntry.js',
      admin: 'admin@http://localhost:3003/remoteEntry.js'
    },
    shared: { react: { singleton: true, requiredVersion: deps.react }, 'react-dom': { singleton: true, requiredVersion: deps['react-dom'] }, '@mui/material': { singleton: true, requiredVersion: deps['@mui/material'] } }
  }), new HtmlWebpackPlugin({ template: './src/index.html' })]
};
