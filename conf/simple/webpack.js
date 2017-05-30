'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const mustacheEvalLoader = require('guide4you-builder/mustache-eval-loader')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

let path = require('path')
let baseDir = process.cwd()

mustacheEvalLoader.setTemplateVars({
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
    'www.wms.nrw.de'
  ]
})

module.exports = {
  entry: {
    'g4u': [ path.join(baseDir, './conf/simple/entry.js') ]
  },
  output: {
    path: path.join(baseDir, './build/simple')
  },
  resolve: {
    alias: {
      'lessConfig': path.join(baseDir, './conf/clouds.less')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'html/client.html',
      inject: 'head',
      favicon: 'images/g4u-logo.png',
      title: 'Simple g4u3'
    }),
    new CopyWebpackPlugin([
      { from: 'node_modules/jquery/dist/jquery.min.js', to: 'lib/jquery.min.js' },
      { from: 'node_modules/openlayers/dist/ol.js', to: 'lib/ol.js' }
    ]),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        'lib/jquery.min.js',
        'lib/ol.js'
      ],
      append: false
    })
  ]
}
