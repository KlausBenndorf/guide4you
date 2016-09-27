'use strict'

let path = require('path')
let baseDir = process.cwd()
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    'lib/g4u.js': [ path.join(baseDir, './conf/entry.js') ]
  },
  output: {
    path: path.join(baseDir, './build')
  },
  resolve: {
    alias: {
      'lessConfig.less': path.join(baseDir, './conf/clouds.less')
    }
  },
  mustacheEvalLoader: {
    templateVars: {
      pageTitle: 'guide4you module URLAPI',
      ajaxProxy: 'proxy/proxy.php?csurl={url}',
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
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'node_modules/guide4you/html/client.html',
      inject: 'head'
    })
  ]
}
