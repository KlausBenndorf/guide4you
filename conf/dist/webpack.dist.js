'use strict'

const path = require('path')
const webpackMerge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const mustacheLoader = require('guide4you-builder/mustache-loader')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

const baseDir = process.cwd()

mustacheLoader.setTemplateVars({
  svgColor: 'rgba(255,255,255,1)',
  languageFile: './files/l10n.json'
})

const common = webpackMerge.smartStrategy({ plugins: 'prepend' })(
  require('guide4you-builder/webpack.common'),
  {
    entry: {
      'g4u': [path.join(baseDir, 'conf/dist/entry.js') ]
    },
    output: {
      path: path.join(baseDir, 'dist')
    },
    resolve: {
      alias: {
        'config.less': path.join(baseDir, 'conf/clouds.less')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'html/client.html',
        inject: 'head',
        favicon: 'images/g4u-logo.png',
        title: 'Guide4You'
      })
    ]
  })

module.exports = webpackMerge.smart(common,
  require('guide4you-builder/webpack.build'),
  require('guide4you-builder/webpack.dist'))
