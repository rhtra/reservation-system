const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;
module.exports = {
 entry: './src/index.tsx', output: { publicPath: 'auto', clean: true }, resolve: { extensions: ['.tsx','.ts','.jsx','.js'] },
 devServer: { port: 3002, headers: { 'Access-Control-Allow-Origin': '*' } },
 module: { rules: [{ test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ }] },
 plugins: [new ModuleFederationPlugin({ name: 'courts', filename: 'remoteEntry.js', exposes: { './App': './src/App' }, shared: { react: { singleton: true, requiredVersion: deps.react }, 'react-dom': { singleton: true, requiredVersion: deps['react-dom'] }, '@mui/material': { singleton: true, requiredVersion: deps['@mui/material'] } } }), new HtmlWebpackPlugin({ template: './src/index.html' })]
};
