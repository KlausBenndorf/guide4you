'use strict'

let path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let baseDir = process.cwd()

module.exports = {
  entry: {
    'lib/g4u.js': [ path.join(baseDir, './conf/full/entry.js') ]
  },
  output: {
    path: path.join(baseDir, './build/full')
  },
  resolve: {
    alias: {
      'lessConfig.less': path.join(baseDir, './conf/full/clouds.less')
    }
  },
  mustacheEvalLoader: {
    templateVars: {
      pageTitle: 'Full g4u3',
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
      template: 'html/client.html',
      inject: 'head'
    })
  ]
}
