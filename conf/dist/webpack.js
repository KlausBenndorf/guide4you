'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const mustacheEvalLoader = require('guide4you-builder/mustache-eval-loader')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

let path = require('path')
let baseDir = process.cwd()

mustacheEvalLoader.setTemplateVars({
  svgColor: 'rgba(255,255,255,1)',
  languageFile: './files/l10n.json'
})

module.exports = {
  entry: {
    'g4u': [ path.join(baseDir, './conf/dist/entry.js') ]
  },
  output: {
    path: path.join(baseDir, './dist')
  },
  resolve: {
    alias: {
      'lessConfig': path.join(baseDir, 'node_modules/guide4you/conf/clouds.less')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'node_modules/guide4you/html/client.html',
      inject: 'head',
      favicon: 'node_modules/guide4you/images/g4u-logo.png',
      title: 'g4u test'
    }),

    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        '../node_modules/jquery/dist/jquery.min.js',
        '../node_modules/openlayers/dist/ol.js'
      ],
      append: false
    })
  ]
}
