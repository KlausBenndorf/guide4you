'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')

let path = require('path')
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
      inject: 'head',
      title: 'Full g4u3'
    })
  ]
}
