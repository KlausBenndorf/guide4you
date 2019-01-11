const webpackMerge = require('webpack-merge')

module.exports = webpackMerge.smart(
  require('./webpack.common'),
  require('guide4you-builder/webpack.build'),
  require('guide4you-builder/webpack.debug'))
