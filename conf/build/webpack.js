'use strict'

let path = require('path')
let baseDir = process.cwd()

const HtmlWebpackPlugin = require('html-webpack-plugin')
const mustacheEvalLoader = require('guide4you-builder/mustache-eval-loader')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

mustacheEvalLoader.setTemplateVars({
  pageTitle: 'guide4you module URLAPI',
  ajaxProxy: {
    prod: 'proxy/proxy.php?csurl={url}',
    dev: '/proxy/{url}'
  },
  languageFile: 'files/l10n.json',
  svgColor: 'rgba(255,255,255,1)',
  proxyAjaxFilters: 'true',
  proxyFilterDomain: 'true',
  proxyAjaxDebug: 'true',
  proxyValidRequests: [
    'a.tile.openstreetmap.org',
    'b.tile.openstreetmap.org',
    'c.tile.openstreetmap.org'
  ]
})

module.exports = {
  entry: {
    'g4u': [ path.join(baseDir, './conf/build/entry.js') ]
  },
  output: {
    path: path.join(baseDir, './build')
  },
  resolve: {
    modules: [
      'node_modules/guide4you'
    ],
    alias: {
      'lessConfig': path.join(baseDir, 'node_modules/guide4you/conf/clouds.less')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'node_modules/guide4you/html/client.html',
      inject: 'head'
    }),
    new CopyWebpackPlugin([
      { from: 'node_modules/jquery/dist/jquery.min.js', to: 'js/jquery.min.js' },
      { from: 'node_modules/openlayers/dist/ol.js', to: 'js/ol.js' }
    ]),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        'js/jquery.min.js',
        'js/ol.js'
      ],
      append: false
    })
  ]
}
