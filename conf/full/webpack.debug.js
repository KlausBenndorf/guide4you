const webpackMerge = require('webpack-merge')

module.exports = webpackMerge.smart(
  require('../build/webpack.common'),
  require('guide4you-builder/webpack.build'),
  require('guide4you-builder/webpack.debug'))
