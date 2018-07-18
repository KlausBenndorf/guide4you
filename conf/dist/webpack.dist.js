'use strict'

const path = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mustacheLoader = require('guide4you-builder/mustache-loader')

const baseDir = process.cwd()

mustacheLoader.setTemplateVars({
  svgColor: 'rgba(255,255,255,1)',
  languageFile: './files/l10n.json'
})

const common = webpackMerge.smartStrategy({ plugins: 'prepend' })(
  require('guide4you-builder/webpack.common'),
  {
    entry: {
      'g4u': [ path.join(baseDir, 'conf/dist/entry.js') ]
    },
    output: {
      path: path.join(baseDir, 'dist')
    },
    resolve: {
      alias: {
        'config.less': path.join(baseDir, 'node_modules/guide4you/conf/clouds.less')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'node_modules/guide4you/html/client.html',
        inject: 'head',
        favicon: 'node_modules/guide4you/images/g4u-logo.png',
        title: 'g4u test'
      })
    ]
  })

module.exports = webpackMerge.smart(common,
  require('guide4you-builder/webpack.build'),
  require('guide4you-builder/webpack.dist'))
