const merge = require('webpack-merge');
const path = require('path');
const webpackCommon = require('./webpack.commonjs.js');
const pkg = require('../package.json');
const ROOT_DIR = path.join(__dirname, './..');
const SRC_DIR = path.join(__dirname, '../src');
const DIST_DIR = path.join(__dirname, '../dist');

module.exports = (env, argv) => {
  const commonConfig = webpackCommon(env, argv, { SRC_DIR, DIST_DIR });
  return merge(commonConfig, {
    devtool: 'source-map',
    stats: {
      colors: true,
      hash: true,
      timings: true,
      assets: true,
      chunks: true,
      chunkModules: true,
      modules: true,
      children: true,
      warnings: true,
    },
    output: {
      path: ROOT_DIR,
      library: 'viewerCore',
      libraryTarget: 'umd',
      filename: pkg.main,
    },
  });
};
